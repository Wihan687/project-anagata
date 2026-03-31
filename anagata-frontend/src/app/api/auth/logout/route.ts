import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true });
    
    // Clear the auth cookie
    response.cookies.set("admin_token", "", {
        httpOnly: true,
        expires: new Date(0), // Expire immediately
    });

    return response;
}
