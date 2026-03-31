import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        const OWNER_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
        const KASIR_PASSWORD = process.env.KASIR_PASSWORD || "kasir123";

        let role = "";
        let tokenValue = "";

        if (body.password === OWNER_PASSWORD) {
            role = "owner";
            tokenValue = "authenticated_owner";
        } else if (body.password === KASIR_PASSWORD) {
            role = "kasir";
            tokenValue = "authenticated_kasir";
        }

        if (role) {
            const response = NextResponse.json({ success: true, role });
            
            // Set HttpOnly cookie for auth
            response.cookies.set("admin_token", tokenValue, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 // 1 day
            });

            return response;
        }

        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
