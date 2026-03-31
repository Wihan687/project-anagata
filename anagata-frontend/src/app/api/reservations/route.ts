import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
        return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    try {
        const reservations = await prisma.reservation.findMany({
            where: {
                date: date,
                status: { not: "CANCELLED" },
            },
            select: {
                timeSlot: true,
            },
        });

        return NextResponse.json(reservations);
    } catch (error) {
        console.error("GET Reservations Error:", error);
        return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, whatsapp, date, timeSlot, pax } = body;

        if (!name || !whatsapp || !date || !timeSlot || !pax) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if slot already exists
        const existing = await prisma.reservation.findFirst({
            where: {
                date: date,
                timeSlot: timeSlot,
                status: { not: "CANCELLED" },
            },
        });

        if (existing) {
            return NextResponse.json({ error: "Slot ini sudah dipesan orang lain." }, { status: 409 });
        }

        const reservation = await prisma.reservation.create({
            data: {
                customerName: name,
                whatsapp: whatsapp,
                pax: parseInt(pax),
                date: date,
                timeSlot: timeSlot,
            },
        });

        return NextResponse.json(reservation, { status: 201 });
    } catch (error) {
        console.error("POST Reservation Error:", error);
        return NextResponse.json({ error: "Gagal membuat reservasi. Pastikan database sudah terhubung." }, { status: 500 });
    }
}
