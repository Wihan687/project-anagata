import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = (await params).id;
        const body = await request.json();
        const { isAvailable } = body;

        const updated = await prisma.menu.update({
            where: { id },
            data: { isAvailable }
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating status:", error);
        return NextResponse.json({ error: "Failed to update menu status" }, { status: 500 });
    }
}
