"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const footerLinks = {
  Halaman: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #c8882b 0%, #b07420 100%)", // Richer golden-brown gradient
        color: "white",
        paddingTop: "72px",
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
            gridTemplateColumns: "1.5fr 0.8fr 1.2fr",
            gap: "64px",
            marginBottom: "60px",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  overflow: "hidden"
                }}
              >
                <img
                  src="/logo-anagata.png"
                  alt="Anagata Coffee Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.6rem",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                Anagata Coffee
              </span>
            </div>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: "1.8",
                color: "rgba(255, 255, 255, 0.85)",
                maxWidth: "320px",
                marginBottom: "28px",
              }}
            >
              Sudut nyaman bagi para pecinta kopi. Kami meracik setiap cangkir dengan gairah, biji kopi berkualitas, dan sepenuh hati untuk masa depan yang penuh inspirasi.
            </p>
            <div style={{ display: "flex", gap: "14px" }}>
              <a
                href="https://www.instagram.com/anagatacoffee?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(255, 255, 255, 0.15)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  textDecoration: "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "inherit",
                  overflow: "hidden" // Ensure image stays within rounded corners
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "white";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.15)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <img
                  src="/ig.jpg"
                  alt="Instagram"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "inherit"
                  }}
                />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                style={{
                  color: "white",
                  fontSize: "1.1rem",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: "700",
                  letterSpacing: "0.02em",
                  marginBottom: "24px",
                  position: "relative",
                  display: "inline-block"
                }}
              >
                {title}
                <span style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: 0,
                  width: "30px",
                  height: "2px",
                  background: "rgba(255,255,255,0.4)",
                  borderRadius: "2px"
                }} />
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        color: "rgba(255, 255, 255, 0.75)",
                        textDecoration: "none",
                        fontSize: "0.95rem",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "white";
                        (e.currentTarget as HTMLElement).style.paddingLeft = "4px";
                      }}
                      onMouseOut={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "rgba(255, 255, 255, 0.75)";
                        (e.currentTarget as HTMLElement).style.paddingLeft = "0";
                      }}
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
                color: "white",
                fontSize: "1.1rem",
                fontFamily: "'Playfair Display', serif",
                fontWeight: "700",
                letterSpacing: "0.02em",
                marginBottom: "24px",
                position: "relative",
                display: "inline-block"
              }}
            >
              Jam Operasional
              <span style={{
                position: "absolute",
                bottom: "-8px",
                left: 0,
                width: "30px",
                height: "2px",
                background: "rgba(255,255,255,0.4)",
                borderRadius: "2px"
              }} />
            </h4>
            <div style={{ marginTop: "12px" }}>
              {[
                { day: "Sabtu", time: "08.00 – 22.00" },
                { day: "Minggu – Rabu", time: "15.00 – 22.00" },
                { day: "Kamis – Jumat", time: "Tutup" },
              ].map(({ day, time }) => (
                <div
                  key={day}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "10px",
                    marginBottom: "10px",
                    fontSize: "0.9rem",
                    borderBottom: "1px solid rgba(255,255,255,0.08)"
                  }}
                >
                  <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>{day}</span>
                  <span style={{ color: "white", fontWeight: "600" }}>{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "32px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <p style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)", letterSpacing: "0.02em" }}>
            © {new Date().getFullYear()} Anagata Coffee. All rights reserved. Slahung, Ponorogo.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)" }}>
              Crafted with ☕ & love
            </span>
            <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)" }}>
              V0.2
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 580px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .footer-grid h4::after { left: 50%; transform: translateX(-50%); }
          .footer-grid div { display: flex; flex-direction: column; align-items: center; }
          .footer-grid ul { align-items: center; }
        }
      `}</style>
    </footer>
  );
}
