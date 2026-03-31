import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // In Next.js 15 route handlers, params is a Promise
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    
    // Authorization check
    if (!token || token.value !== "authenticated_owner") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];
    if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await prisma.reservation.update({
      where: { id: resolvedParams.id },
      data: { status }
    });

    return NextResponse.json({ success: true, reservation: updated });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
