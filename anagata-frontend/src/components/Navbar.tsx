"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/reserve", label: "Reservasi" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.4s ease",
        background: scrolled
          ? "rgba(26, 14, 0, 0.96)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <nav
        className="nav-container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Logo */}
        <Link href="/admin" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              position: "relative",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(200,136,43,0.4)",
            }}
          >
            <img
              src="/logo-anagata.png"
              alt="Anagata Coffee Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <span
            className="nav-logo-text"
            style={{
                fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              fontWeight: "700",
              color: "white",
              letterSpacing: "0.02em",
            }}
          >
            Anagata Coffee
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul
          style={{
            display: "flex",
            gap: "36px",
            listStyle: "none",
            alignItems: "center",
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  color: pathname === link.href ? "#e6a336" : "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: "500",
                  fontSize: "0.95rem",
                  letterSpacing: "0.03em",
                  transition: "color 0.2s ease",
                  position: "relative",
                  paddingBottom: "4px",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#e6a336")}
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = pathname === link.href ? "#e6a336" : "rgba(255,255,255,0.85)")
                }
              >
                {link.label}
                {pathname === link.href && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "linear-gradient(135deg, #c8882b, #e6a336)",
                      borderRadius: "2px",
                    }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "white",
            fontSize: "24px",
            padding: "4px",
          }}
          className="nav-hamburger"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(26, 14, 0, 0.98)",
            backdropFilter: "blur(20px)",
            padding: "16px 24px 24px",
            borderTop: "1px solid rgba(200,136,43,0.2)",
          }}
        >

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                color: pathname === link.href ? "#e6a336" : "rgba(255,255,255,0.85)",
                textDecoration: "none",
                padding: "12px 0",
                fontFamily: "'Inter', sans-serif",
                fontWeight: "500",
                fontSize: "1rem",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-container { padding: 0 40px !important; }
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-logo-text { display: none !important; }
        }
      `}</style>
    </header>
  );
}
