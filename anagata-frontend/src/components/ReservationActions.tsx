"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ReservationActionsProps {
    id: string;
    currentStatus: string;
}

export default function ReservationActions({ id, currentStatus }: ReservationActionsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const updateStatus = async (newStatus: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/reservations/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            
            if (res.ok) {
                router.refresh();
            } else {
                alert("Gagal merubah status reservasi.");
            }
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan sistem saat menghubungi server.");
        } finally {
            setIsLoading(false);
        }
    };

    // Logical thematic assignments for rendering 
    let badgeBg = "var(--admin-badge-pending-bg)";
    let badgeText = "var(--admin-badge-pending-text)";
    let badgeBorder = "var(--admin-badge-pending-border)";

    if (currentStatus === "CONFIRMED") {
        badgeBg = "var(--admin-badge-confirmed-bg)";
        badgeText = "var(--admin-badge-confirmed-text)";
        badgeBorder = "var(--admin-badge-confirmed-border)";
    } else if (currentStatus === "CANCELLED") {
        badgeBg = "var(--admin-badge-cancelled-bg)";
        badgeText = "var(--admin-badge-cancelled-text)";
        badgeBorder = "var(--admin-badge-cancelled-border)";
    } else if (currentStatus === "COMPLETED") {
        badgeBg = "var(--admin-badge-completed-bg)";
        badgeText = "var(--admin-badge-completed-text)";
        badgeBorder = "var(--admin-badge-completed-border)";
    }

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <span style={{ 
                padding: "6px 12px", 
                borderRadius: "20px", 
                fontSize: "0.8rem", 
                fontWeight: "700", 
                background: badgeBg, 
                color: badgeText, 
                border: badgeBorder,
                transition: "all 0.3s ease"
            }}>
                {currentStatus}
            </span>

            {/* Action Buttons Group */}
            {currentStatus === "PENDING" && (
                <div style={{ display: "flex", gap: "6px" }}>
                    <button 
                        disabled={isLoading}
                        onClick={() => updateStatus("CONFIRMED")}
                        style={{ background: "#25D366", color: "white", border: "none", padding: "6px 12px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "700", cursor: isLoading ? "wait" : "pointer", opacity: isLoading ? 0.7 : 1, transition: "background 0.2s", boxShadow: "0 2px 8px rgba(37,211,102,0.3)" }}
                        title="Terima Reservasi"
                    >
                        ✓ Terima
                    </button>
                    <button 
                        disabled={isLoading}
                        onClick={() => updateStatus("CANCELLED")}
                        style={{ background: "#dc3545", color: "white", border: "none", padding: "6px 12px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "700", cursor: isLoading ? "wait" : "pointer", opacity: isLoading ? 0.7 : 1, transition: "background 0.2s", boxShadow: "0 2px 8px rgba(220,53,69,0.3)" }}
                        title="Tolak Reservasi"
                    >
                        ✕ Tolak
                    </button>
                </div>
            )}

            {currentStatus === "CONFIRMED" && (
                <button 
                    disabled={isLoading}
                    onClick={() => updateStatus("COMPLETED")}
                    style={{ background: "var(--admin-accent)", color: "white", border: "none", padding: "6px 14px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "700", cursor: isLoading ? "wait" : "pointer", opacity: isLoading ? 0.7 : 1, display: "flex", alignItems: "center", gap: "4px", transition: "background 0.2s", boxShadow: "0 4px 12px rgba(200,136,43,0.3)" }}
                    title="Selesaikan Reservasi"
                >
                    🏁 Selesai
                </button>
            )}
        </div>
    );
}
