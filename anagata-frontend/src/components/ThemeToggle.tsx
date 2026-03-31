"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        // Load preference
        const storedTheme = localStorage.getItem("admin-theme");
        if (storedTheme === "light") {
            setTheme("light");
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            // Default to dark mode
            setTheme("dark");
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("admin-theme", newTheme);
    };

    return (
        <button 
            onClick={toggleTheme}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "10px 14px",
                background: "transparent",
                border: "1px solid var(--admin-border)",
                borderRadius: "8px",
                cursor: "pointer",
                color: "var(--admin-text-muted)",
                transition: "all 0.2s",
                marginBottom: "12px",
                fontWeight: "600",
                fontSize: "0.85rem",
                justifyContent: "flex-start",
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.background = "var(--admin-hover)";
                e.currentTarget.style.color = "var(--admin-text)";
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--admin-text-muted)";
            }}
        >
            {theme === "dark" ? (
                <>
                    <span style={{ fontSize: "1.1rem" }}>☀️</span> Mode Terang
                </>
            ) : (
                <>
                    <span style={{ fontSize: "1.1rem" }}>🌙</span> Mode Gelap
                </>
            )}
        </button>
    );
}
