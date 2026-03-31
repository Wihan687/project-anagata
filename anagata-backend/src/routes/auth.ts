import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
    try {
        const body = req.body;
        
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
            // Set HttpOnly cookie for auth
            // Since it's on localhost, cookie will be shared between :3000 and :5000
            res.cookie("admin_token", tokenValue, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax", // Must be lax to work across ports locally sometimes
                maxAge: 60 * 60 * 24 * 1000 // 1 day in ms
            });
            
            return res.json({ success: true, role });
        }

        return res.status(401).json({ error: "Unauthorized" });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("admin_token");
    res.json({ success: true });
});

export default router;
