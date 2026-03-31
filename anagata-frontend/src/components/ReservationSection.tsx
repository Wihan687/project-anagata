"use client";

import { useState, useEffect } from "react";
import { format, addDays, startOfToday, isSameDay, isBefore, parse, isAfter } from "date-fns";



const SLOT_DURATION = 20; // minutes

export default function ReservationSection() {
    const [operatingHours, setOperatingHours] = useState<any>(null);
    const [isEmergencyClosed, setIsEmergencyClosed] = useState(false);
    const [isLoadingSettings, setIsLoadingSettings] = useState(true);

    const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
    const [selectedHour, setSelectedHour] = useState("");
    const [selectedMinute, setSelectedMinute] = useState("");
    const [bookedSlots, setBookedSlots] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", whatsapp: "", pax: 1 });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/settings");
                if (res.ok) {
                    const data = await res.json();
                    setOperatingHours(data.operatingHours);
                    setIsEmergencyClosed(data.isEmergencyClosed);
                }
            } catch (err) {
                console.error("Failed fetching settings", err);
            } finally {
                setIsLoadingSettings(false);
            }
        };
        fetchSettings();
    }, []);

    const dateOptions = (() => {
        if (!operatingHours) return [];
        const options = [];
        let cur = startOfToday();
        while (options.length < 7) {
            if (operatingHours[cur.getDay().toString()]) {
                options.push(cur);
            }
            cur = addDays(cur, 1);
        }
        return options;
    })();

    const isDatePassed = (date: Date) => {
        if (!operatingHours) return true;
        const now = new Date();
        
        // Disable anything that is not Today (either past or future)
        if (!isSameDay(date, startOfToday())) return true;
        
        // If it's today, verify if we are past closing time
        if (isSameDay(date, now)) {
            const dayOfWeek = date.getDay().toString();
            const hours = operatingHours[dayOfWeek];
            if (!hours) return true;
            
            const endHour = parseInt(hours.end.split(":")[0]);
            if (now.getHours() >= endHour) return true;
        }
        return false;
    };

    useEffect(() => {
        if (operatingHours && dateOptions.length > 0) {
            const firstValidDate = dateOptions.find(d => !isDatePassed(d)) || dateOptions[0];
            setSelectedDate(firstValidDate);
        }
    }, [operatingHours]);

    useEffect(() => {
        if (operatingHours) {
            setSelectedHour("");
            setSelectedMinute("");
            fetchBookedSlots();
        }
    }, [selectedDate, operatingHours]);

    const fetchBookedSlots = async () => {
        try {
            setLoading(true);
            const dateStr = format(selectedDate, "yyyy-MM-dd");
            const res = await fetch(`/api/reservations?date=${dateStr}`);
            if (res.ok) {
                const data = await res.json();
                setBookedSlots(data.map((r: any) => r.timeSlot));
            }
        } catch (error) {
            console.error("Failed to fetch slots", error);
        } finally {
            setLoading(false);
        }
    };

    const availableHours = (() => {
        if (!selectedDate || !operatingHours) return [];
        const dayOfWeek = selectedDate.getDay().toString();
        const hours = operatingHours[dayOfWeek];
        if (!hours) return [];

        const startHour = parseInt(hours.start.split(":")[0]);
        let endHour = parseInt(hours.end.split(":")[0]);
        if (hours.end.endsWith(":00")) endHour -= 1;

        const now = new Date();
        const isToday = isSameDay(selectedDate, now);

        const hrs = [];
        for (let i = startHour; i <= endHour; i++) {
            // Strictly exclude any past hours from appearing at all
            if (isToday && i < now.getHours()) continue;
            
            hrs.push(i.toString().padStart(2, "0"));
        }
        return hrs;
    })();

    const minutesList = ["00", "20", "40"];

    const handleConfirm = async () => {
        const finalTime = selectedHour && selectedMinute ? `${selectedHour}:${selectedMinute}` : "";
        if (!finalTime || !form.name || !form.whatsapp) {
            alert("Mohon melengkapi waktu reservasi dan data diri!");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    whatsapp: form.whatsapp,
                    pax: form.pax,
                    date: format(selectedDate, "yyyy-MM-dd"),
                    timeSlot: finalTime,
                }),
            });

            if (res.ok) {
                alert("Reservasi berhasil! Tim kami akan menghubungi Anda.");
                setSelectedHour("");
                setSelectedMinute("");
                fetchBookedSlots();
            } else {
                const err = await res.json();
                alert(err.error || "Gagal membuat reservasi.");
            }
        } catch (error) {
            alert("Terjadi kesalahan teknis.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="reserve"
            style={{
                padding: "80px 24px",
                background: "#faf7f2",
                minHeight: "800px"
            }}
        >
            <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
                <span className="desktop-header" style={{ fontFamily: "'Dancing Script', cursive", color: "#c8882b", fontSize: "1.5rem" }}>
                    Layanan Praktis
                </span>
                <h2 className="desktop-header" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem", color: "#1a0e00", margin: "16px 0 60px" }}>
                    Reservasi Pembuatan Menu
                </h2>
                <h2 className="mobile-header">
                    Select Your Time of Visit
                </h2>

                {isLoadingSettings ? (
                    <div style={{ padding: "40px", background: "white", borderRadius: "32px", color: "var(--admin-text-muted)" }}>
                        Memuat jadwal operasional...
                    </div>
                ) : isEmergencyClosed ? (
                    <div style={{ background: "#fff5f5", border: "2px solid #dc3545", borderRadius: "32px", padding: "40px", textAlign: "center", boxShadow: "0 10px 40px rgba(0,0,0,0.04)" }}>
                        <h3 style={{ color: "#dc3545", margin: "0 0 16px", fontSize: "1.8rem", fontFamily: "'Playfair Display', serif" }}>
                            ⛔ Mohon Maaf, Kedai Tutup Darurat
                        </h3>
                        <p style={{ color: "#555", fontSize: "1.1rem" }}>
                            Saat ini sistem reservasi ditutup karena kedai sedang tutup secara mendadak (Maintenance / Acara Privat). Silakan cek kembali nanti atau hubungi WhatsApp kami.
                        </p>
                    </div>
                ) : (
                <>
                <div className="reservation-card" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "40px",
                    alignItems: "start",
                    marginBottom: "60px",
                    background: "white",
                    padding: "40px",
                    borderRadius: "32px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
                    border: "1px solid rgba(0,0,0,0.03)"
                }}>

                    {/* Left Side: Date Selection */}
                    <div style={{ textAlign: "left" }}>
                        <h3 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", marginBottom: "20px", color: "#1a0e00", display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#c8882b" }} />
                            1. Pilih Tanggal
                        </h3>
                        <div className="date-picker-container">
                            {dateOptions.map((date) => {
                                const isSelected = isSameDay(selectedDate, date);
                                const passed = isDatePassed(date);
                                return (
                                <div key={date.toString()} className="date-item" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: passed ? 0.35 : 1 }}>
                                    <span style={{ fontSize: "0.75rem", color: passed ? "#999" : "#8d642a", fontWeight: "500", transition: "color 0.3s" }}>
                                        {format(date, "EEE")}
                                    </span>
                                    <button
                                        disabled={passed}
                                        onClick={() => setSelectedDate(date)}
                                        className={`date-btn ${isSelected ? 'selected' : ''}`}
                                        style={{ cursor: passed ? 'not-allowed' : 'pointer', background: passed ? "#f5f5f5" : "" }}
                                    >
                                        {format(date, "dd")}
                                    </button>
                                </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side: Time Selection */}
                    <div style={{ textAlign: "left", borderLeft: "1px solid #f0f0f0", paddingLeft: "40px" }} className="time-col">
                        <h3 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", marginBottom: "20px", color: "#1a0e00", display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#c8882b" }} />
                            2. Pilih Waktu
                        </h3>

                        {availableHours.length > 0 ? (
                            <div className="time-picker-split">
                                {/* Jam */}
                                <div className="time-wheel" onScroll={(e) => {
                                    const st = e.currentTarget.scrollTop;
                                    const index = Math.round(st / 50);
                                    if(availableHours[index] && availableHours[index] !== selectedHour) {
                                        setSelectedHour(availableHours[index]);
                                    }
                                }}>
                                    {availableHours.map((hh, i) => {
                                        return (
                                            <div
                                                key={`h-${hh}`}
                                                className={`wheel-btn ${selectedHour === hh ? 'selected' : ''}`}
                                                onClick={(e) => e.currentTarget.parentElement?.scrollTo({top: i * 50, behavior: 'smooth'})}
                                            >
                                                {hh}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="wheel-colon">:</div>
                                {/* Menit */}
                                <div className="time-wheel" onScroll={(e) => {
                                    const st = e.currentTarget.scrollTop;
                                    const index = Math.round(st / 50);
                                    if(minutesList[index] && minutesList[index] !== selectedMinute) {
                                        setSelectedMinute(minutesList[index]);
                                    }
                                }}>
                                    {minutesList.map((mm, i) => {
                                        const now = new Date();
                                        const timeStr = selectedHour ? `${selectedHour}:${mm}` : `00:${mm}`;
                                        let isBooked = selectedHour ? bookedSlots.includes(timeStr) : false;
                                        
                                        // Also block if it's strictly in the past (same day, same hour, past minute)
                                        if (isSameDay(selectedDate, now) && selectedHour && parseInt(selectedHour) === now.getHours()) {
                                            if (parseInt(mm) <= now.getMinutes()) {
                                                isBooked = true;
                                            }
                                        }

                                        return (
                                            <div
                                                key={`m-${mm}`}
                                                className={`wheel-btn ${selectedMinute === mm ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                                                onClick={(e) => e.currentTarget.parentElement?.scrollTo({top: i * 50, behavior: 'smooth'})}
                                            >
                                                {mm}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div style={{ color: "#d93025", padding: "20px", background: "#fff5f5", borderRadius: "12px", fontSize: "0.9rem" }}>
                                <p>Maaf, kedai sudah tutup pada hari ini. Silakan pilih hari lain 🙏</p>
                            </div>
                        )}
                    </div>
                </div>

                <style>{`
                    .desktop-header { display: block; }
                    .mobile-header { display: none; }
                    
                    .date-picker-container {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 10px;
                    }
                    .date-btn {
                        padding: 10px 4px;
                        border-radius: 12px;
                        border: 1px solid #f0f0f0;
                        background: #fbfbfb;
                        color: #444;
                        font-weight: 700;
                        font-size: 1rem;
                        cursor: pointer;
                        transition: all 0.2s;
                        width: 100%;
                    }
                    .date-btn.selected {
                        border: 2px solid #c8882b;
                        background: #fff8f0;
                        color: #c8882b;
                    }
                    
                    /* NEW DUAL PICKER CSS */
                    .time-picker-split {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 30px;
                        margin-top: 10px;
                        position: relative;
                        padding: 10px 0;
                    }
                    .time-picker-split::before {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: -5%;
                        right: -5%;
                        width: 110%;
                        transform: translateY(-50%);
                        height: 50px;
                        background: #fdf0d5;
                        border-top: 1.5px solid #eebb77;
                        border-bottom: 1.5px solid #eebb77;
                        border-radius: 12px;
                        box-shadow: 0 4px 15px rgba(200, 136, 43, 0.15);
                        z-index: 0;
                    }
                    .time-wheel {
                        display: flex;
                        flex-direction: column;
                        gap: 0;
                        height: 150px;
                        overflow-y: scroll;
                        scroll-snap-type: y mandatory;
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                        z-index: 1;
                        padding: 50px 0;
                        mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
                        -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
                    }
                    .time-wheel::-webkit-scrollbar { display: none; }
                    
                    .wheel-btn {
                        scroll-snap-align: center;
                        min-height: 50px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: none;
                        background: transparent;
                        color: #ccc;
                        font-family: 'Playfair Display', serif;
                        font-weight: 500;
                        font-size: 1.6rem;
                        cursor: pointer;
                        transition: all 0.2s;
                    }
                    .wheel-btn.selected {
                        color: #8d642a;
                        font-weight: 700;
                        font-size: 1.8rem;
                    }
                    .wheel-btn.booked {
                        opacity: 0.3;
                        cursor: not-allowed;
                        text-decoration: line-through;
                    }
                    .wheel-colon {
                        font-size: 2rem;
                        font-weight: 700;
                        color: #8d642a;
                        margin-bottom: 5px;
                        z-index: 1;
                    }

                    @media (max-width: 768px) {
                        .desktop-header { display: none !important; }
                        .mobile-header { 
                            display: block !important; 
                            font-family: 'Playfair Display', serif; 
                            color: #8d642a; 
                            font-size: 1.8rem; 
                            margin-bottom: 30px; 
                            font-weight: 700;
                            text-align: center;
                        }
                        
                        .reservation-card {
                            padding: 20px 10px !important;
                            box-shadow: none !important;
                            border: none !important;
                            background: transparent !important;
                        }
                        .section-title { display: none !important; }
                        
                        /* Dates */
                        .date-picker-container {
                            display: flex;
                            overflow-x: auto;
                            gap: 12px;
                            padding-bottom: 10px;
                            scrollbar-width: none;
                        }
                        .date-item {
                            flex: 0 0 calc(20% - 8px);
                            min-width: 55px;
                        }
                        .date-btn {
                            border-radius: 8px;
                            padding: 12px 0;
                            border: 1px solid #e0e0e0;
                            background: white;
                            color: #666;
                            font-weight: 500;
                        }
                        .date-btn.selected {
                            border: 1px solid #8d642a;
                            color: #8d642a;
                            background: white;
                            font-weight: 600;
                        }
                        
                        /* Times */
                        .time-col { border-left: none !important; padding-left: 0 !important; border-top: none !important; margin-top: 20px;}
                        
                        .time-picker-split {
                            gap: 40px;
                        }
                        .wheel-btn {
                            font-size: 1.8rem;
                            padding: 16px 24px;
                            min-width: 100px;
                        }
                        .wheel-colon {
                            font-size: 2.2rem;
                        }
                    }
                `}</style>

                {/* Form Details */}
                {(selectedHour && selectedMinute) && (
                    <div style={{
                        maxWidth: "500px",
                        margin: "0 auto",
                        background: "white",
                        padding: "40px",
                        borderRadius: "24px",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.05)",
                        textAlign: "left"
                    }}>
                        <h4 style={{ marginBottom: "24px", color: "#1a0e00" }}>Detail Pemesan</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <div>
                                <label style={{ fontSize: "0.8rem", color: "#8d642a", fontWeight: "700" }}>NAMA LENGKAP</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", marginTop: "4px" }}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: "0.8rem", color: "#8d642a", fontWeight: "700" }}>WHATSAPP</label>
                                <input
                                    type="text"
                                    value={form.whatsapp}
                                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                                    placeholder="0812..."
                                    style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", marginTop: "4px" }}
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: "0.8rem", color: "#8d642a", fontWeight: "700" }}>JUMLAH ORANG (PAX)</label>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
                                    <button
                                        disabled={loading}
                                        onClick={() => setForm(f => ({ ...f, pax: Math.max(1, f.pax - 1) }))}
                                        style={{ width: "45px", height: "45px", borderRadius: "10px", background: "#fdf5e6", border: "1.5px solid #eebb77", color: "#8d642a", fontSize: "1.2rem", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={form.pax}
                                        onChange={(e) => setForm({ ...form, pax: parseInt(e.target.value) || 1 })}
                                        style={{ flexGrow: 1, textAlign: "center", padding: "12px", borderRadius: "10px", border: "1px solid #ddd", fontWeight: "700", fontSize: "1.1rem" }}
                                    />
                                    <button
                                        disabled={loading}
                                        onClick={() => setForm(f => ({ ...f, pax: Math.min(50, f.pax + 1) }))}
                                        style={{ width: "45px", height: "45px", borderRadius: "10px", background: "#fdf5e6", border: "1.5px solid #eebb77", color: "#8d642a", fontSize: "1.2rem", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                onClick={handleConfirm}
                                style={{
                                    background: "linear-gradient(135deg, #c8882b, #b07420)",
                                    color: "white",
                                    padding: "16px",
                                    borderRadius: "12px",
                                    border: "none",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                    marginTop: "12px",
                                    boxShadow: "0 8px 16px rgba(200,136,43,0.3)"
                                }}
                            >
                                {loading ? "Memproses..." : "Konfirmasi Reservasi"}
                            </button>
                        </div>
                    </div>
                )}
                </>
                )}
            </div>
        </section>
    );
}
