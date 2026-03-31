import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const defaultOperatingHours = {
    0: { start: "15:00", end: "21:00" },
    1: { start: "15:00", end: "21:00" },
    2: { start: "15:00", end: "21:00" },
    3: { start: "15:00", end: "21:00" },
    4: null,
    5: null,
    6: { start: "08:00", end: "21:00" },
};

export async function GET() {
    try {
        let settings = await prisma.storeSettings.findUnique({
            where: { id: "GLOBAL" }
        });

        // Initialize default settings if not exists
        if (!settings) {
            settings = await prisma.storeSettings.create({
                data: {
                    id: "GLOBAL",
                    isEmergencyClosed: false,
                    operatingHours: defaultOperatingHours
                }
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Error fetching settings:", error);
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        // Authenticate owner
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;

        if (token !== "authenticated_owner") {
             return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await request.json();
        
        let updateData: any = {};
        if (typeof body.isEmergencyClosed === "boolean") {
            updateData.isEmergencyClosed = body.isEmergencyClosed;
        }
        if (body.operatingHours) {
            updateData.operatingHours = body.operatingHours;
        }

        const updated = await prisma.storeSettings.upsert({
            where: { id: "GLOBAL" },
            update: updateData,
            create: {
                id: "GLOBAL",
                isEmergencyClosed: body.isEmergencyClosed ?? false,
                operatingHours: body.operatingHours ?? defaultOperatingHours
            }
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating settings:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
