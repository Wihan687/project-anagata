"use client";

import { useState } from "react";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "./ThemeToggle";

export default function AdminSidebar({ activePage, isOwner }: { activePage: string, isOwner: boolean }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const navLinks = [
        isOwner && { id: 'dashboard', href: '/admin/dashboard', label: 'Dashboard' },
        isOwner && { id: 'reservasi', href: '/admin/reservasi', label: 'Data Reservasi' },
        { id: 'pos', href: '/admin/pos', label: 'POS Kasir' },
        { id: 'kasir', href: '/admin/kasir', label: 'Katalog Menu' },
        isOwner && { id: 'pengaturan', href: '/admin/pengaturan', label: 'Pengaturan Kedai' },
    ].filter(Boolean) as { id: string, href: string, label: string, disabled?: boolean }[];

    return (
        <>
            {/* Desktop Sidebar (hidden on mobile) */}
            <aside className="admin-sidebar" style={{ 
                width: "260px", 
                background: "var(--admin-sidebar)", 
                padding: "30px 20px", 
                borderRight: "1px solid var(--admin-border)", 
                display: "flex", 
                flexDirection: "column", 
                position: "sticky", 
                top: 0, 
                height: "100vh", 
                transition: "background 0.3s ease, border-color 0.3s ease",
                zIndex: 40
            }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "var(--admin-text)", marginBottom: "40px", paddingLeft: "10px", transition: "color 0.3s ease" }}>
                    Anagata <span style={{ color: "var(--admin-accent)" }}>{isOwner ? "Admin" : "POS"}</span>
                </h2>
                <nav style={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
                    <style dangerouslySetInnerHTML={{__html: `
                        .admin-sidebar { display: flex; }
                        .admin-mobile-header { display: none; }
                        .admin-layout-wrapper { flex-direction: row; }
                        .admin-main-content { padding: 40px; }
                        
                        @media (max-width: 768px) {
                            .admin-sidebar { display: none !important; }
                            .admin-mobile-header { display: flex !important; }
                            .admin-layout-wrapper { flex-direction: column !important; }
                            .admin-main-content { padding: 20px !important; }
                            .admin-page-title { font-size: 1.8rem !important; }
                        }
                    `}} />
                    {navLinks.map((link) => (
                        <a 
                            key={link.id}
                            href={link.href} 
                            style={
                                activePage === link.id
                                ? { padding: "14px", background: "var(--admin-accent-bg)", color: "var(--admin-accent)", borderRadius: "8px", fontWeight: "700", textDecoration: "none", display: "block", borderLeft: "3px solid var(--admin-accent)", transition: "all 0.3s ease" }
                                : { padding: "14px", color: "var(--admin-text-muted)", borderRadius: "8px", fontWeight: "500", textDecoration: "none", display: "block", transition: "all 0.2s" }
                            }
                            onMouseOver={(e) => {
                                if (activePage !== link.id) {
                                    e.currentTarget.style.background = "var(--admin-hover)";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (activePage !== link.id) {
                                    e.currentTarget.style.background = "transparent";
                                }
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
                <div style={{ marginTop: "auto", borderTop: "1px solid var(--admin-border)", paddingTop: "20px", transition: "border-color 0.3s ease" }}>
                    <ThemeToggle />
                    <a href="/" style={{ color: "var(--admin-text-muted)", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", paddingLeft: "10px", transition: "color 0.2s" }}>
                        &larr; Kembali ke Website
                    </a>
                    <LogoutButton />
                </div>
            </aside>

            {/* Mobile Header (hidden on desktop) */}
            <header className="admin-mobile-header" style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                background: "var(--admin-sidebar)",
                borderBottom: "1px solid var(--admin-border)",
                padding: "16px 20px",
                display: "none",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "background 0.3s ease, border-color 0.3s ease"
            }}>
                <h2 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "var(--admin-text)" }}>
                    Anagata <span style={{ color: "var(--admin-accent)" }}>{isOwner ? "Admin" : "POS"}</span>
                </h2>
                <button 
                    onClick={toggleMenu}
                    style={{ background: "transparent", border: "none", color: "var(--admin-text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "8px" }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isMobileMenuOpen ? (
                            <>
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </>
                        ) : (
                            <>
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </>
                        )}
                    </svg>
                </button>
            </header>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div style={{
                    position: "fixed",
                    top: "65px",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "var(--admin-bg)",
                    zIndex: 49,
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto"
                }}>
                    <nav style={{ display: "flex", flexDirection: "column", gap: "10px", flexGrow: 1 }}>
                        {navLinks.map((link) => (
                            <a 
                                key={link.id}
                                href={link.href} 
                                style={
                                    activePage === link.id
                                    ? { padding: "16px", background: "var(--admin-accent-bg)", color: "var(--admin-accent)", borderRadius: "12px", fontWeight: "700", textDecoration: "none", display: "block", borderLeft: "4px solid var(--admin-accent)", fontSize: "1.1rem" }
                                    : { padding: "16px", color: "var(--admin-text-muted)", borderRadius: "12px", fontWeight: "500", textDecoration: "none", display: "block", fontSize: "1.1rem", border: "1px solid var(--admin-border)", background: "var(--admin-sidebar)" }
                                }
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div style={{ marginTop: "40px", borderTop: "1px solid var(--admin-border)", paddingTop: "20px" }}>
                        <ThemeToggle />
                        <div style={{ height: "20px" }}></div>
                        <a href="/" style={{ color: "var(--admin-text-muted)", textDecoration: "none", fontSize: "1rem", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", padding: "12px", border: "1px solid var(--admin-border)", borderRadius: "12px", background: "var(--admin-sidebar)", justifyContent: "center" }}>
                            &larr; Kembali ke Website
                        </a>
                        <LogoutButton />
                    </div>
                </div>
            )}
        </>
    );
}
