import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // In Next.js 15, route params is a Promise
) {
    try {
        const { id } = await params;
        const formData = await request.formData();
        
        const name = formData.get("name") as string;
        const category = formData.get("category") as string;
        const price = formData.get("price") as string;
        const file = formData.get("image") as File | null;
        const variantsString = formData.get("variants") as string | null;

        let variants = undefined;
        if (variantsString) {
            try { variants = JSON.parse(variantsString); } catch (e) { console.warn("Failed to parse variants"); }
        }

        if (!name || !category || !price) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const existingMenu = await prisma.menu.findUnique({
            where: { id }
        });

        if (!existingMenu) {
            return NextResponse.json({ error: "Menu not found" }, { status: 404 });
        }

        let imageUrl = existingMenu.image;

        // Verify if there is a newly uploaded file
        if (file && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
            const uploadDir = path.join(process.cwd(), "public", "uploads", "menus");
            
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filepath = path.join(uploadDir, filename);
            await writeFile(filepath, buffer);
            imageUrl = `/uploads/menus/${filename}`;
        }

        const updatedMenu = await prisma.menu.update({
            where: { id },
            data: {
                name,
                category,
                price: parseInt(price),
                image: imageUrl,
                ...(variants !== undefined && { variants })
            },
        });

        return NextResponse.json(updatedMenu, { status: 200 });
    } catch (error) {
        console.error("PUT Menu Error:", error);
        return NextResponse.json({ error: "Failed to update menu" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        await prisma.menu.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Menu deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("DELETE Menu Error:", error);
        return NextResponse.json({ error: "Failed to delete menu" }, { status: 500 });
    }
}
