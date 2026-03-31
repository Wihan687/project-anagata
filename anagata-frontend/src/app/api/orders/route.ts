import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { customerName, paymentMethod, items } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: "Keranjang kosong" }, { status: 400 });
        }

        // Calculate total amount from items to prevent client manipulation
        let totalAmount = 0;
        const orderItemsData = [];

        for (const item of items) {
            // Verify price from db
            const menu = await prisma.menu.findUnique({ where: { id: item.id } });
            if (!menu) {
                return NextResponse.json({ error: `Menu dengan ID ${item.id} tidak ditemukan` }, { status: 400 });
            }

            let validPrice = menu.price;
            if (item.variant && menu.variants) {
                const variants = menu.variants as any[];
                const matched = variants.find(v => v.name === item.variant);
                if (matched) {
                    validPrice = matched.price;
                }
            }

            const itemTotal = validPrice * item.quantity;
            totalAmount += itemTotal;

            orderItemsData.push({
                menuId: menu.id,
                variant: item.variant || null,
                quantity: item.quantity,
                price: validPrice // record exactly what they paid
            });
        }

        // Create Order and OrderItems in a single transaction
        const newOrder = await prisma.order.create({
            data: {
                customerName: customerName || null,
                totalAmount,
                paymentMethod: paymentMethod || "CASH",
                status: "COMPLETED", // Assuming it's paid instantly at POS
                items: {
                    create: orderItemsData
                }
            },
            include: {
                items: true
            }
        });

        // Update sales stats for the dashboard
        for (const item of orderItemsData) {
            // Re-fetch menu to construct itemName properly as we did in calculation
            const menu = await prisma.menu.findUnique({ where: { id: item.menuId } });
            if (menu) {
                const itemName = item.variant ? `${menu.name} - ${item.variant}` : menu.name;
                await prisma.menuSales.upsert({
                    where: { itemName },
                    update: { sales: { increment: item.quantity } },
                    create: { itemName, sales: item.quantity }
                });
            }
        }

        // Invalidate dashboard cache immediately so the stats reflect
        revalidatePath('/admin/dashboard');

        return NextResponse.json(newOrder, { status: 201 });

    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                items: {
                    include: { menu: true }
                }
            }
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Terjadi kesalahan internal" }, { status: 500 });
    }
}
