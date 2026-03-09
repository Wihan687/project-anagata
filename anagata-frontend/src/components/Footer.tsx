"use client";

import Link from "next/link";

const footerLinks = {
  Pages: [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
  Support: [
    { href: "#", label: "FAQ" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #1a0e00 0%, #0d0700 100%)",
        color: "rgba(255,255,255,0.8)",
        paddingTop: "64px",
        paddingBottom: "32px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            gap: "48px",
            marginBottom: "48px",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  background: "linear-gradient(135deg, #c8882b, #e6a336)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                ☕
              </div>
              <span
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                Anagata Coffee
              </span>
            </div>
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: "1.75",
                color: "rgba(255,255,255,0.6)",
                maxWidth: "280px",
              }}
            >
              A cozy corner for coffee lovers. We craft every cup with passion, quality beans, and a whole lot of love.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: "38px",
                    height: "38px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    textDecoration: "none",
                    transition: "background 0.2s ease",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(200,136,43,0.3)")}
                  onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)")}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                style={{
                  color: "#e6a336",
                  fontSize: "0.85rem",
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        color: "rgba(255,255,255,0.6)",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        transition: "color 0.2s ease",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "#e6a336")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Hours */}
          <div>
            <h4
              style={{
                color: "#e6a336",
                fontSize: "0.85rem",
                fontWeight: "700",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Opening Hours
            </h4>
            {[
              { day: "Mon – Fri", time: "07:00 – 22:00" },
              { day: "Saturday", time: "08:00 – 23:00" },
              { day: "Sunday", time: "09:00 – 21:00" },
            ].map(({ day, time }) => (
              <div
                key={day}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  fontSize: "0.88rem",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.6)" }}>{day}</span>
                <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: "500" }}>{time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} Anagata Coffee. All rights reserved.
          </p>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
            Crafted with ☕ & love
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
