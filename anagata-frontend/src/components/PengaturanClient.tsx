"use client";

import React, { useState } from "react";

type OperatingHour = { start: string; end: string } | null;

type StoreSettings = {
    id: string;
    isEmergencyClosed: boolean;
    operatingHours: Record<string, OperatingHour>;
};

const DAY_NAMES = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default function PengaturanClient({ initialSettings }: { initialSettings: StoreSettings }) {
    const [settings, setSettings] = useState<StoreSettings>(initialSettings);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleEmergencyToggle = async () => {
        const newValue = !settings.isEmergencyClosed;
        setSettings({ ...settings, isEmergencyClosed: newValue });
        
        // Immediate save for emergency toggle
        await saveSettings({ isEmergencyClosed: newValue });
    };

    const handleDayChange = (dayIndex: string, field: 'start' | 'end' | 'isOpen', value: string | boolean) => {
        const currentOp = settings.operatingHours[dayIndex];
        let newOp: OperatingHour = currentOp ? { ...currentOp } : { start: "08:00", end: "21:00" };

        if (field === 'isOpen') {
            newOp = value ? { start: "08:00", end: "21:00" } : null;
        } else if (newOp && typeof value === 'string') {
            newOp[field] = value;
        }

        setSettings({
            ...settings,
            operatingHours: {
                ...settings.operatingHours,
                [dayIndex]: newOp
            }
        });
    };

    const saveSettings = async (overrides?: Partial<StoreSettings>) => {
        setIsSaving(true);
        setMessage(null);
        try {
            const payload = {
                isEmergencyClosed: overrides?.isEmergencyClosed ?? settings.isEmergencyClosed,
                operatingHours: overrides?.operatingHours ?? settings.operatingHours
            };

            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setMessage({ type: 'success', text: "Pengaturan berhasil disimpan!" });
            } else {
                setMessage({ type: 'error', text: "Gagal menyimpan pengaturan." });
            }
        } catch (error) {
            setMessage({ type: 'error', text: "Terjadi kesalahan sistem." });
        }
        setIsSaving(false);
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "30px", paddingBottom: "40px" }}>
            <style dangerouslySetInnerHTML={{__html: `
                .day-setting-row { display: flex; align-items: center; gap: 20px; padding: 16px; background: var(--admin-sidebar); border-radius: 12px; border: 1px solid var(--admin-border); }
                .day-setting-time { display: flex; align-items: center; gap: 12px; margin-left: auto; }
                .day-setting-name { width: 120px; font-weight: bold; color: var(--admin-text); font-size: 1.05rem; }
                .admin-settings-card { background: var(--admin-card); border-radius: 20px; padding: 30px; border: 1px solid var(--admin-border); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
                @media (max-width: 600px) {
                    .admin-settings-card { padding: 20px 16px; }
                    .day-setting-row { flex-direction: column; align-items: flex-start; gap: 12px; padding: 16px 14px; }
                    .day-setting-time { margin-left: 0; width: 100%; justify-content: space-between; gap: 8px; }
                    .day-setting-name { width: auto; font-size: 1.1rem; margin-bottom: 4px; }
                    .day-setting-time input { flex-grow: 1; text-align: center; min-width: 0; }
                }
            `}} />
            
            {message && (
                <div style={{ padding: "12px 20px", borderRadius: "12px", background: message.type === 'success' ? "rgba(40,167,69,0.1)" : "rgba(220,53,69,0.1)", color: message.type === 'success' ? "#28a745" : "#dc3545", border: `1px solid ${message.type === 'success' ? "rgba(40,167,69,0.3)" : "rgba(220,53,69,0.3)"}`, display: "flex", alignItems: "center", gap: "10px", fontWeight: "600" }}>
                    {message.text}
                </div>
            )}

            {/* Emergency Switch Card */}
            <div className="admin-settings-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
                <div>
                    <h2 style={{ margin: "0 0 10px", fontSize: "1.4rem", color: "var(--admin-text)" }}>Tutup Darurat (Emergency Stop)</h2>
                    <p style={{ margin: 0, color: "var(--admin-text-muted)", fontSize: "0.95rem", maxWidth: "600px", lineHeight: "1.5" }}>
                        Aktifkan ini jika Anda ingin menutup kedai secara paksa hari ini (contoh: pemadaman listrik, duka, atau acara privat). Sistem akan memblokir pelanggan membuat reservasi baru untuk hari ini.
                    </p>
                </div>
                
                <button 
                    onClick={handleEmergencyToggle}
                    style={{
                        padding: "16px 32px",
                        borderRadius: "30px",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        background: settings.isEmergencyClosed ? "#dc3545" : "var(--admin-sidebar)",
                        color: settings.isEmergencyClosed ? "white" : "var(--admin-text)",
                        border: settings.isEmergencyClosed ? "none" : "2px solid var(--admin-border)",
                        boxShadow: settings.isEmergencyClosed ? "0 8px 24px rgba(220,53,69,0.4)" : "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}
                >
                    {settings.isEmergencyClosed ? (
                        <>
                            <span style={{ fontSize: "1.2rem" }}>⛔</span> Kedai Sedang Tutup Paksa
                        </>
                    ) : (
                        <>
                            <span style={{ fontSize: "1.2rem" }}>🟢</span> Kedai Beroperasi Normal
                        </>
                    )}
                </button>
            </div>

            {/* Operating Hours Card */}
            <div className="admin-settings-card">
                <h2 style={{ margin: "0 0 10px", fontSize: "1.4rem", color: "var(--admin-text)" }}>Jadwal Buka & Tutup Normal</h2>
                <p style={{ margin: "0 0 30px", color: "var(--admin-text-muted)", fontSize: "0.95rem", lineHeight: "1.5" }}>
                    Atur jam buka standar kafe per harinya. Jika ada hari libur, hilangkan centang "Buka". Perubahan di sini akan menjadi acuan formulir reservasi pelanggan harian.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {DAY_NAMES.map((dayName, index) => {
                        const dayData = settings.operatingHours[index.toString()];
                        const isOpen = dayData !== null;
                        
                        return (
                            <div key={index} className="day-setting-row">
                                <div className="day-setting-name">
                                    {dayName}
                                </div>
                                
                                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", userSelect: "none" }}>
                                    <input 
                                        type="checkbox" 
                                        checked={isOpen}
                                        onChange={(e) => handleDayChange(index.toString(), 'isOpen', e.target.checked)}
                                        style={{ width: "20px", height: "20px", accentColor: "var(--admin-accent)" }}
                                    />
                                    <span style={{ color: "var(--admin-text)" }}>Buka</span>
                                </label>

                                {isOpen ? (
                                    <div className="day-setting-time">
                                        <input 
                                            type="time" 
                                            value={dayData.start}
                                            onChange={(e) => handleDayChange(index.toString(), 'start', e.target.value)}
                                            style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--admin-border)", background: "var(--admin-bg)", color: "var(--admin-text)", fontWeight: "bold", outline: "none" }}
                                        />
                                        <span style={{ color: "var(--admin-text-muted)", fontWeight: "bold" }}>s/d</span>
                                        <input 
                                            type="time" 
                                            value={dayData.end}
                                            onChange={(e) => handleDayChange(index.toString(), 'end', e.target.value)}
                                            style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--admin-border)", background: "var(--admin-bg)", color: "var(--admin-text)", fontWeight: "bold", outline: "none" }}
                                        />
                                    </div>
                                ) : (
                                    <div style={{ marginLeft: "auto", padding: "8px 20px", background: "rgba(220,53,69,0.1)", color: "#dc3545", borderRadius: "8px", fontWeight: "bold", fontSize: "0.9rem", width: "100%", textAlign: "center", marginTop: "4px" }}>
                                        Kedai Libur
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: "30px", display: "flex", justifyContent: "flex-end" }}>
                    <button 
                        onClick={() => saveSettings()}
                        disabled={isSaving}
                        style={{
                            padding: "16px 40px",
                            borderRadius: "12px",
                            border: "none",
                            background: "var(--admin-accent)",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            cursor: "pointer",
                            boxShadow: "0 8px 24px rgba(200,136,43,0.3)",
                            opacity: isSaving ? 0.7 : 1,
                            transition: "all 0.3s ease"
                        }}
                    >
                        {isSaving ? "Menyimpan..." : "Simpan Perubahan Jadwal"}
                    </button>
                </div>
            </div>
        </div>
    );
}
