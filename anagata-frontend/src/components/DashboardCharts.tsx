"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";

export default function DashboardCharts({ reservationData, salesData }: { reservationData: any[], salesData: any[] }) {
    const maxSales = salesData.length > 0 ? Math.max(...salesData.map(d => d.sales)) : 0;
    const maxTick = Math.max(5, Math.ceil(maxSales / 5) * 5);
    const xAxisTicks = [];
    for (let i = 0; i <= maxTick; i += 5) {
        xAxisTicks.push(i);
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {/* Top Cards for Quick Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
                <div style={{ background: "var(--admin-card)", padding: "24px", borderRadius: "16px", boxShadow: "var(--admin-card-shadow)", border: "1px solid var(--admin-border)", transition: "all 0.3s ease" }}>
                    <h3 style={{ margin: "0 0 10px", fontSize: "1rem", color: "var(--admin-text-muted)" }}>Total Reservasi Aktif</h3>
                    <p style={{ margin: 0, fontSize: "2rem", fontWeight: "800", color: "var(--admin-accent-glow)" }}>
                        {reservationData.reduce((acc, curr) => acc + curr.reservations, 0)}
                    </p>
                </div>
                <div style={{ background: "var(--admin-card)", padding: "24px", borderRadius: "16px", boxShadow: "var(--admin-card-shadow)", border: "1px solid var(--admin-border)", transition: "all 0.3s ease" }}>
                    <h3 style={{ margin: "0 0 10px", fontSize: "1rem", color: "var(--admin-text-muted)" }}>Total Menu Terjual</h3>
                    <p style={{ margin: 0, fontSize: "2rem", fontWeight: "800", color: "var(--admin-accent-glow)" }}>
                        {salesData.reduce((acc, curr) => acc + curr.sales, 0)}
                    </p>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                {/* Reservation Line Chart */}
                <div style={{ background: "var(--admin-card)", padding: "24px", borderRadius: "16px", boxShadow: "var(--admin-card-shadow)", border: "1px solid var(--admin-border)", transition: "all 0.3s ease" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "var(--admin-text)", marginBottom: "20px" }}>
                        Trend Reservasi (7 Hari Terakhir)
                    </h2>
                    <div style={{ height: "300px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={reservationData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--admin-border)" />
                                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{fill: "var(--admin-text-muted)", fontSize: 12}} />
                                <YAxis tickLine={false} axisLine={false} tick={{fill: "var(--admin-text-muted)", fontSize: 12}} allowDecimals={false} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: "12px", background: "var(--admin-sidebar)", border: "1px solid var(--admin-border)", color: "var(--admin-text)", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                                    cursor={{ stroke: 'var(--admin-hover)', strokeWidth: 2 }}
                                    itemStyle={{ color: "var(--admin-accent)" }}
                                />
                                <Line type="monotone" dataKey="reservations" stroke="var(--admin-accent)" strokeWidth={4} activeDot={{ r: 8, fill: "var(--admin-accent-glow)", stroke: "var(--admin-card)" }} name="Jumlah Reservasi" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sales Bar Chart */}
                <div style={{ background: "var(--admin-card)", padding: "24px", borderRadius: "16px", boxShadow: "var(--admin-card-shadow)", border: "1px solid var(--admin-border)", transition: "all 0.3s ease" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "var(--admin-text)", marginBottom: "20px" }}>
                        Top Penjualan Menu
                    </h2>
                    <div style={{ height: "300px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData} layout="vertical" margin={{ left: 40, right: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--admin-border)" />
                                <XAxis type="number" tickLine={false} axisLine={false} tick={{fill: "var(--admin-text-muted)", fontSize: 12}} ticks={xAxisTicks} domain={[0, 'dataMax']} />
                                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{fill: "var(--admin-text-muted)", fontSize: 12, fontWeight: 500}} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: "12px", background: "var(--admin-sidebar)", border: "1px solid var(--admin-border)", color: "var(--admin-text)", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                                    cursor={{fill: "var(--admin-hover)"}}
                                    itemStyle={{ color: "var(--admin-accent)" }}
                                />
                                <Bar dataKey="sales" fill="var(--admin-accent)" radius={[0, 4, 4, 0]} barSize={24} name="Terjual" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            
            <style>{`
                @media (max-width: 1024px) {
                    div[style*="grid-template-columns: 1fr 1fr"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
