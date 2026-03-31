"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.role === "kasir") {
                    router.push("/admin/kasir");
                } else {
                    router.push("/admin/dashboard");
                }
                router.refresh();
            } else {
                setError("Password salah.");
            }
        } catch (err) {
            setError("Terjadi kesalahan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#faf7f2" }}>
            <div style={{ background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", width: "100%", maxWidth: "400px", textAlign: "center" }}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#1a0e00", marginBottom: "10px" }}>Portal Pegawai</h1>
                <p style={{ color: "#8d642a", marginBottom: "30px", fontSize: "0.9rem" }}>Masukkan password Anda untuk masuk</p>
                
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <input 
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password..."
                        style={{ padding: "14px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem" }}
                    />
                    {error && <p style={{ color: "red", fontSize: "0.85rem", textAlign: "left", margin: "-10px 0 0" }}>{error}</p>}
                    
                    <button 
                        disabled={loading}
                        style={{
                            background: "linear-gradient(135deg, #c8882b, #b07420)",
                            color: "white",
                            padding: "14px",
                            borderRadius: "8px",
                            border: "none",
                            fontWeight: "700",
                            cursor: "pointer"
                        }}
                    >
                        {loading ? "Verifying..." : "Login"}
                    </button>
                    
                    <a href="/" style={{ color: "#888", fontSize: "0.85rem", textDecoration: "none", marginTop: "10px" }}>&larr; Kembali ke Beranda</a>
                </form>
            </div>
        </div>
    );
}
