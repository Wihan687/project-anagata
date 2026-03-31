import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import KasirClient from "@/components/KasirClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function KasirDashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    
    // Auth check: Allow both kasir and owner
    if (!token || !token.value.startsWith("authenticated_")) {
        redirect("/admin");
    }

    const isOwner = token.value === "authenticated_owner";

    // Fetch menus from database
    let menus = await prisma.menu.findMany({
        orderBy: { createdAt: 'desc' }
    });

    if (menus.length === 0) {
        // Seed default dummy menus
        const dummyMenus = [
            { name: "Espresso", category: "Coffee", price: 20000, image: "/logo-anagata.png" },
            { name: "Americano", category: "Coffee", price: 22000, image: "/logo-anagata.png" },
            { name: "Cappuccino", category: "Coffee", price: 25000, image: "/logo-anagata.png" },
            { name: "Cafe Latte", category: "Coffee", price: 25000, image: "/logo-anagata.png" },
            { name: "Mocha", category: "Coffee", price: 28000, image: "/logo-anagata.png" },
            { name: "French Fries", category: "Snacks", price: 18000, image: "/logo-anagata.png" }
        ];

        for (const m of dummyMenus) {
            await prisma.menu.create({ data: m });
        }
        
        menus = await prisma.menu.findMany({ orderBy: { createdAt: 'desc' } });
    }

    return (
        <div className="admin-layout-wrapper" style={{ minHeight: "100vh", background: "var(--admin-bg)", display: "flex", color: "var(--admin-text)", transition: "background 0.3s ease, color 0.3s ease" }}>
            <AdminSidebar activePage="kasir" isOwner={isOwner} />

            {/* Main Content */}
            <main className="admin-main-content" style={{ flexGrow: 1, padding: "40px", maxWidth: "1200px", width: "100%" }}>
                <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                        <h1 className="admin-page-title" style={{ fontSize: "2.4rem", color: "var(--admin-accent-glow)", margin: 0, transition: "color 0.3s ease" }}>
                            Katalog POS Kasir
                        </h1>
                        <p style={{ color: "var(--admin-text-muted)", marginTop: "8px", transition: "color 0.3s ease", fontSize: "0.95rem" }}>Pilih menu untuk membuat pesanan baru.</p>
                    </div>
                    <div style={{ background: "var(--admin-accent)", color: "white", padding: "8px 16px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700", boxShadow: "0 4px 12px rgba(200,136,43,0.3)" }}>
                        Akses: {isOwner ? "Owner" : "Kasir"}
                    </div>
                </div>

                <KasirClient initialMenus={menus} isOwner={isOwner} />
            </main>
        </div>
    );
}
