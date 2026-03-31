import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function GET(request: Request) {
    try {
        const menus = await prisma.menu.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(menus);
    } catch (error) {
        console.error("GET Menus Error:", error);
        return NextResponse.json({ error: "Failed to fetch menus" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const category = formData.get("category") as string;
        const price = formData.get("price") as string;
        const file = formData.get("image") as File | null;
        const variantsString = formData.get("variants") as string | null;

        let variants = [];
        if (variantsString) {
            try { variants = JSON.parse(variantsString); } catch (e) { console.warn("Failed to parse variants"); }
        }

        if (!name || !category || !price) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let imageUrl = "/logo-anagata.png";

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

        const menu = await prisma.menu.create({
            data: {
                name,
                category,
                price: parseInt(price),
                image: imageUrl,
                variants
            },
        });

        return NextResponse.json(menu, { status: 201 });
    } catch (error) {
        console.error("POST Menu Error:", error);
        return NextResponse.json({ error: "Failed to create menu" }, { status: 500 });
    }
}
