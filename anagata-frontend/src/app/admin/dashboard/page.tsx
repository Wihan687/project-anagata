import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardCharts from "@/components/DashboardCharts";
import AdminSidebar from "@/components/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    
    if (!token || token.value !== "authenticated_owner") {
        redirect("/admin");
    }

    // Dynamic Server-Side Aggregation for the past 7 days reservations
    // Generate dates backwards from today
    const past7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        // Simple YYYY-MM-DD local format
        const offset = d.getTimezoneOffset();
        const local = new Date(d.getTime() - (offset * 60 * 1000));
        return local.toISOString().split('T')[0];
    });

    const recentReservations = await prisma.reservation.findMany({
        where: {
            date: { in: past7Days }
        }
    });

    // Bucket reservations by date
    const reservationData = past7Days.map(date => {
        // Just extract DD-MM for cleaner UI
        const [y, m, d] = date.split('-');
        return {
            date: `${d}/${m}`,
            reservations: recentReservations.filter(r => r.date === date).length
        }
    });

    // Optimized fetch for Top Sales using the new MenuSales table
    const topSalesItems = await prisma.menuSales.findMany({
        orderBy: { sales: 'desc' },
        take: 6
    });

    const salesData = topSalesItems.map((item: any) => ({
        name: item.itemName,
        sales: item.sales
    }));

    return (
        <div className="admin-layout-wrapper" style={{ minHeight: "100vh", background: "var(--admin-bg)", display: "flex", color: "var(--admin-text)", transition: "background 0.3s ease, color 0.3s ease" }}>
            <AdminSidebar activePage="dashboard" isOwner={true} />

            {/* Main Content */}
            <main className="admin-main-content" style={{ flexGrow: 1, padding: "40px", maxWidth: "1200px", width: "100%" }}>
                <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                        <h1 className="admin-page-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", color: "var(--admin-accent-glow)", margin: 0, transition: "color 0.3s ease" }}>
                            Overview Analitik
                        </h1>
                        <p style={{ color: "var(--admin-text-muted)", marginTop: "8px", transition: "color 0.3s ease", fontSize: "0.95rem" }}>
                            Pantau performa penjualan dan tingkat reservasi cafe Anda secara real-time.
                        </p>
                    </div>
                    <div style={{ background: "var(--admin-accent)", color: "white", padding: "8px 16px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700", boxShadow: "0 4px 12px rgba(200,136,43,0.3)" }}>
                        Portal Owner
                    </div>
                </div>

                <DashboardCharts reservationData={reservationData} salesData={salesData} />
            </main>
        </div>
    );
}
