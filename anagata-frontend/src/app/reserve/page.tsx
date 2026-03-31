"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationSection from "@/components/ReservationSection";
import Link from "next/link";
import Image from "next/image";

export default function ReservePage() {
    return (
        <main style={{ background: "#fdf8f3", minHeight: "100vh" }}>
            <Navbar />

            {/* Hero Header for Reservation */}
            <section style={{
                padding: "160px 0 100px",
                position: "relative",
                overflow: "hidden",
                background: "#1a0e00",
            }}>
                {/* Background Image with Overlay */}
                <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                    <Image
                        src="/bg.jpg"
                        alt="Anagata Background"
                        fill
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        priority
                        unoptimized
                    />
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, rgba(26, 14, 0, 0.8) 0%, rgba(26, 14, 0, 0.9) 100%)"
                    }} />
                </div>

                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                        <div style={{ width: "40px", height: "2px", background: "#e6a336" }} />
                        <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.4rem", color: "#e6a336" }}>Reservasi Praktis</span>
                        <div style={{ width: "40px", height: "2px", background: "#e6a336" }} />
                    </div>
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                        color: "white",
                        fontWeight: "700",
                        marginBottom: "16px"
                    }}>
                        Booking Meja & Menu
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto", fontSize: "1.1rem", lineHeight: "1.6" }}>
                        Pilih waktu kunjungan Anda dan kami akan menyiapkan pesanan Anda dengan presisi agar Anda bisa langsung menikmati momen santai tanpa menunggu lama.
                    </p>
                </div>
            </section>

            {/* Main Reservation Component */}
            <div style={{ marginTop: "-40px", position: "relative", zIndex: 10, paddingBottom: "100px" }}>
                <ReservationSection />
            </div>

          
        </main>
    );
}
