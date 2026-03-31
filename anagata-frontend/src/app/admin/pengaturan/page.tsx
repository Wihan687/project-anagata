import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import PengaturanClient from "@/components/PengaturanClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
const defaultOperatingHours = {
    0: { start: "15:00", end: "21:00" },
    1: { start: "15:00", end: "21:00" },
    2: { start: "15:00", end: "21:00" },
    3: { start: "15:00", end: "21:00" },
    4: null,
    5: null,
    6: { start: "08:00", end: "21:00" },
};

export default async function PengaturanKedai() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    
    // Auth check: Strictly allow ONLY owner
    if (!token || token.value !== "authenticated_owner") {
        redirect("/admin/dashboard");
    }

    // Fetch or spawn settings
    let settings = await prisma.storeSettings.findUnique({
        where: { id: "GLOBAL" }
    });

    if (!settings) {
        settings = await prisma.storeSettings.create({
            data: {
                id: "GLOBAL",
                isEmergencyClosed: false,
                operatingHours: defaultOperatingHours
            }
        });
    }

    return (
        <div className="admin-layout-wrapper" style={{ minHeight: "100vh", background: "var(--admin-bg)", display: "flex", color: "var(--admin-text)", transition: "background 0.3s ease, color 0.3s ease" }}>
            <AdminSidebar activePage="pengaturan" isOwner={true} />

            {/* Main Content */}
            <main className="admin-main-content" style={{ flexGrow: 1, padding: "40px", maxWidth: "1200px", width: "100%" }}>
                <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                        <h1 className="admin-page-title" style={{ fontSize: "2.4rem", color: "var(--admin-accent-glow)", margin: 0, transition: "color 0.3s ease" }}>
                            Pengaturan Kedai
                        </h1>
                        <p style={{ color: "var(--admin-text-muted)", marginTop: "8px", transition: "color 0.3s ease", fontSize: "0.95rem" }}>Kelola jadwal buka tutup darurat dan tetapkan jam operasional utama agar mencegah reservasi masuk di luar jadwal.</p>
                    </div>
                    <div style={{ background: "var(--admin-accent)", color: "white", padding: "8px 16px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700", boxShadow: "0 4px 12px rgba(200,136,43,0.3)" }}>
                        Akses Khusus: Owner
                    </div>
                </div>

                <PengaturanClient initialSettings={JSON.parse(JSON.stringify(settings))} />
            </main>
        </div>
    );
}
