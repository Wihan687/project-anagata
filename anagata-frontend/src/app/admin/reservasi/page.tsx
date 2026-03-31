import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/AdminSidebar";
import ReservationActions from "@/components/ReservationActions";

export const dynamic = "force-dynamic";

export default async function DataReservasi(props: { searchParams: Promise<{ tab?: string }> }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    
    if (!token || token.value !== "authenticated_owner") {
        redirect("/admin");
    }

    const searchParams = await props.searchParams;
    const tab = searchParams?.tab || "today";

    // Generate local today's date
    const d = new Date();
    const offset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - (offset * 60 * 1000));
    const todayLocal = local.toISOString().split('T')[0];

    // Build the query constraints dynamically
    let whereClause: any = {};
    let orderClause: any = [{ date: 'asc' }, { timeSlot: 'asc' }];

    if (tab === "today") {
        whereClause = {
            date: todayLocal,
            status: { in: ["PENDING", "CONFIRMED"] }
        };
    } else if (tab === "history") {
        whereClause = {
            OR: [
                { date: { lt: todayLocal } },
                { status: { in: ["COMPLETED", "CANCELLED"] } }
            ]
        };
        orderClause = [{ date: 'desc' }, { timeSlot: 'asc' }];
    }

    const reservations = await prisma.reservation.findMany({
        where: whereClause,
        orderBy: orderClause
    });

    return (
        <div className="admin-layout-wrapper" style={{ minHeight: "100vh", background: "var(--admin-bg)", display: "flex", color: "var(--admin-text)", transition: "background 0.3s ease, color 0.3s ease" }}>
            <AdminSidebar activePage="reservasi" isOwner={true} />

            {/* Main Content */}
            <main className="admin-main-content" style={{ flexGrow: 1, padding: "40px", maxWidth: "1200px", width: "100%" }}>
                <div style={{ marginBottom: "30px" }}>
                    <h1 className="admin-page-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", color: "var(--admin-accent-glow)", margin: 0, transition: "color 0.3s ease" }}>Data Reservasi</h1>
                    <p style={{ color: "var(--admin-text-muted)", marginTop: "8px", transition: "color 0.3s ease", fontSize: "0.95rem" }}>Kelola semua jadwal kedatangan pelanggan secara detail di sini.</p>
                </div>

                {/* Status Tabs Navigation */}
                <div style={{ display: "flex", gap: "4px", marginBottom: "24px", width: "100%", background: "var(--admin-card)", padding: "6px", borderRadius: "12px", border: "1px solid var(--admin-border)", flexWrap: "nowrap", boxShadow: "var(--admin-card-shadow)" }}>
                    <Link href="/admin/reservasi?tab=today" style={{
                        flex: 1,
                        padding: "10px 4px",
                        borderRadius: "8px",
                        background: tab === "today" ? "var(--admin-accent)" : "transparent",
                        color: tab === "today" ? "white" : "var(--admin-text-muted)",
                        textDecoration: "none",
                        fontWeight: tab === "today" ? "600" : "500",
                        fontSize: "0.85rem",
                        textAlign: "center",
                        transition: "all 0.2s"
                    }}>
                        Hari Ini
                    </Link>
                    <Link href="/admin/reservasi?tab=history" style={{
                        flex: 1,
                        padding: "10px 4px",
                        borderRadius: "8px",
                        background: tab === "history" ? "var(--admin-accent)" : "transparent",
                        color: tab === "history" ? "white" : "var(--admin-text-muted)",
                        textDecoration: "none",
                        fontWeight: tab === "history" ? "600" : "500",
                        fontSize: "0.85rem",
                        textAlign: "center",
                        transition: "all 0.2s"
                    }}>
                        Riwayat
                    </Link>
                </div>

                <div style={{ background: "var(--admin-card)", borderRadius: "16px", padding: "24px", boxShadow: "var(--admin-card-shadow)", overflowX: "hidden", border: "1px solid var(--admin-border)", transition: "all 0.3s ease", width: "100%" }}>
                    <style dangerouslySetInnerHTML={{__html: `
                        .hover-row:hover { background-color: var(--admin-table-hover) !important; }
                        
                        @media (max-width: 768px) {
                            .responsive-table, .responsive-table tbody, .responsive-table tr, .responsive-table td {
                                display: block;
                                width: 100%;
                            }
                            .responsive-table thead {
                                display: none;
                            }
                            .responsive-table tr {
                                margin-bottom: 16px;
                                background: var(--admin-bg);
                                border: 1px solid var(--admin-border) !important;
                                border-radius: 12px;
                                padding: 12px;
                                box-shadow: var(--admin-card-shadow);
                            }
                            .responsive-table td {
                                display: flex;
                                justify-content: space-between;
                                alignItems: center;
                                padding: 10px 0 !important;
                                border-bottom: 1px dashed var(--admin-border);
                                text-align: right;
                            }
                            .responsive-table td:last-child {
                                border-bottom: none;
                            }
                            .responsive-table td::before {
                                content: attr(data-label);
                                font-weight: 700;
                                color: var(--admin-text-muted);
                                text-transform: uppercase;
                                font-size: 0.75rem;
                                margin-right: 16px;
                                text-align: left;
                            }
                        }
                    `}} />
                    <table className="responsive-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "var(--admin-table-header)", borderBottom: "2px solid var(--admin-table-border)", transition: "all 0.3s ease" }}>
                                <th style={{ padding: "16px", textAlign: "left", color: "var(--admin-accent-glow)", fontSize: "0.9rem", width: "15%", borderRadius: "8px 0 0 0" }}>Tanggal</th>
                                <th style={{ padding: "16px", textAlign: "left", color: "var(--admin-accent-glow)", fontSize: "0.9rem", width: "15%" }}>Pukul</th>
                                <th style={{ padding: "16px", textAlign: "left", color: "var(--admin-accent-glow)", fontSize: "0.9rem", width: "30%" }}>Nama</th>
                                <th style={{ padding: "16px", textAlign: "left", color: "var(--admin-accent-glow)", fontSize: "0.9rem", width: "20%" }}>WhatsApp</th>
                                <th style={{ padding: "16px", textAlign: "left", color: "var(--admin-accent-glow)", fontSize: "0.9rem", width: "20%", borderRadius: "0 8px 0 0" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "var(--admin-text-muted)" }}>Belum ada reservasi masuk.</td>
                                </tr>
                            ) : (
                                reservations.map((res: any) => (
                                    <tr key={res.id} className="hover-row" style={{ borderBottom: "1px solid var(--admin-table-border)", transition: "background 0.2s" }}>
                                        <td data-label="Tanggal" style={{ padding: "16px", fontWeight: "600", color: "var(--admin-text)", transition: "color 0.3s ease" }}>{res.date}</td>
                                        <td data-label="Pukul" style={{ padding: "16px", color: "var(--admin-text-muted)", transition: "color 0.3s ease" }}>{res.timeSlot}</td>
                                        <td data-label="Nama" style={{ padding: "16px", color: "var(--admin-text)", fontWeight: "600", transition: "color 0.3s ease" }}>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                <span>{res.customerName}</span>
                                                <span style={{ fontSize: "0.75rem", color: "var(--admin-accent)", fontWeight: "700", display: "inline-flex", gap: "4px", alignItems: "center", background: "var(--admin-accent-bg)", padding: "4px 8px", borderRadius: "12px", width: "fit-content" }}>
                                                    👤 {res.pax} Orang
                                                </span>
                                            </div>
                                        </td>
                                        <td data-label="WhatsApp" style={{ padding: "16px", color: "var(--admin-text-muted)", transition: "color 0.3s ease" }}>
                                            <a href={`https://wa.me/${res.whatsapp.replace(/[^0-9]/g, '').replace(/^0/, '62')}`} target="_blank" rel="noreferrer" style={{ color: "#25D366", textDecoration: "none", fontWeight: "600" }}>{res.whatsapp}</a>
                                        </td>
                                        <td data-label="Status" style={{ padding: "16px" }}>
                                            <ReservationActions id={res.id} currentStatus={res.status} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
