import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import PosClient from "@/components/PosClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PosPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    
    // Auth check: Allow both kasir and owner
    if (!token || !token.value.startsWith("authenticated_")) {
        redirect("/admin");
    }

    const isOwner = token.value === "authenticated_owner";
    const kasirName = isOwner ? "Owner" : "Admin Kasir";

    // Fetch available menus
    const menus = await prisma.menu.findMany({
        where: { isAvailable: true },
        orderBy: { category: 'asc' }
    });

    return (
        <div className="admin-layout-wrapper" style={{ minHeight: "100vh", background: "var(--admin-bg)", display: "flex", color: "var(--admin-text)", transition: "background 0.3s ease, color 0.3s ease" }}>
            <AdminSidebar activePage="pos" isOwner={isOwner} />

            {/* Main Content */}
            <main className="admin-main-content" style={{ flexGrow: 1, padding: "20px 40px", width: "100%", height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
                    <div>
                        <h1 className="admin-page-title" style={{ fontSize: "2rem", color: "var(--admin-accent-glow)", margin: 0 }}>
                            POS Kasir
                        </h1>
                        <p style={{ color: "var(--admin-text-muted)", margin: "4px 0 0", fontSize: "0.9rem" }}>Point of Sales - Anagata Coffee</p>
                    </div>
                    <div style={{ background: "var(--admin-accent)", color: "white", padding: "6px 16px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700" }}>
                        👤 {kasirName}
                    </div>
                </div>

                <div style={{ flexGrow: 1, overflow: "hidden" }}>
                    <PosClient menus={menus} kasirName={kasirName} />
                </div>
            </main>
        </div>
    );
}
