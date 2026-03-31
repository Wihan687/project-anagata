"use client";

import Image from "next/image";
import Link from "next/link";
import ReservationSection from "@/components/ReservationSection";

export default function HomePage() {

  return (
    <>
      {/* ===== Hero Section ===== */}
      <section
        className="hero-section"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "#1a0e00",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
          }}
        >
          <Image
            src="/bg.jpg"
            alt="Anagata Coffee Desktop"
            fill
            className="hero-bg-desktop"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
            unoptimized
            quality={100}
          />
          <Image
            src="/8.jpeg"
            alt="Anagata Coffee Mobile"
            fill
            className="hero-bg-mobile"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
            unoptimized
            quality={100}
          />
          {/* Dark overlay for readability */}
          <div
            className="hero-overlay"
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
            position: "relative",
            zIndex: 3,
            width: "100%",
          }}
          className="hero-grid"
        >
          {/* Left spacer */}
          <div />

          {/* Right text */}
          <div className="animate-fade-right hero-text-container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "2px",
                  background: "linear-gradient(135deg, #c8882b, #e6a336)",
                  borderRadius: "2px",
                }}
              />
              <span
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.4rem",
                  color: "#e6a336",
                  fontWeight: "600",
                }}
              >
                Selamat datang di kedai kami
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
                fontWeight: "700",
                color: "white",
                lineHeight: "1.15",
                marginBottom: "20px",
              }}
            >
              Kopi Nikmat
              <br />
              <span style={{ color: "#e6a336", fontStyle: "italic" }}>
                Penuh Inspirasi
              </span>
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "1rem",
                lineHeight: "1.8",
                maxWidth: "440px",
                marginBottom: "36px",
              }}
            >
              Temukan kopi pilihan yang dibuat dari biji kopi berkualitas, diseduh
              dengan penuh semangat dan disajikan dengan kehangatan dalam
              suasana nyaman yang akan Anda sukai.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/about"
                className="btn-primary"
              >
                Tentang Kami
              </Link>
            </div>

            {/* Stats */}
            <div
              className="hero-stats-container"
              style={{
                display: "flex",
                gap: "40px",
                marginTop: "48px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {[
                { num: "50+", label: "Pilihan Menu" },
                { num: "10K+", label: "Pelanggan Puas" },
                { num: "5★", label: "Penilaian" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.8rem",
                      fontWeight: "700",
                      color: "#e6a336",
                    }}
                  >
                    {num}
                  </div>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="hero-scroll-container"
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
            }}
            className="animate-float"
          />
          SCROLL
        </div>

        <style>{`
          .hero-bg-mobile { display: none; }
          @media (max-width: 768px) {
            .hero-section {
              min-height: unset !important;
              height: 100svh !important;
            }
            .hero-bg-desktop { display: none !important; }
            .hero-bg-mobile { 
              display: block !important; 
              object-fit: contain !important;
              background: #1a0e00;
            }
            .hero-overlay { display: none !important; }
            .hero-text-container, .hero-stats-container, .hero-scroll-container { display: none !important; }
            .hero-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>


      {/* ===== About Snippet ===== */}
      <section
        className="about-snippet-section"
        style={{
          padding: "100px 0",
          background: "white",
          position: "relative",
          overflow: "hidden",
          minHeight: "600px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* SVG Definition for Masking */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <clipPath id="about-wave" clipPathUnits="objectBoundingBox">
              <path d="M0.30,0 C0.37,0.25 0.24,0.5 0.37,0.75 C0.44,0.9 0.50,1 0.50,1 L1,1 L1,0 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Clipped Right Side Content - Hidden on Mobile */}
        <div
          className="about-desktop-clipped"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            clipPath: "url(#about-wave)",
          }}
        >
          <Image
            src="/about.jpg"
            alt="Anagata Coffee Ambience"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            unoptimized
          />
          {/* Dark overlay for readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(26, 14, 0, 0.85)",
            }}
          />
        </div>

        {/* Wavy Divider - Borderless for minimalist look */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            position: "relative",
            zIndex: 3,
            width: "100%",
          }}
          className="about-grid"
        >
          {/* Left: Image inside Card */}
          <div className="about-image-container" style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                width: "100%",
                maxWidth: "440px",
                aspectRatio: "1/1.2",
                boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
                border: "8px solid white",
              }}
            >
              <Image
                src="/about.jpg"
                alt="Kedai Anagata Coffee"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="animate-fade-right">
            <span
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "1.4rem",
                color: "#e6a336",
                fontWeight: "600",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Latar Belakang
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: "700",
                color: "white",
                lineHeight: "1.2",
                marginBottom: "20px",
              }}
            >
              Anagata Coffee
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                lineHeight: "1.8",
                fontSize: "0.97rem",
                marginBottom: "16px",
              }}
            >
              Perkembangan budaya minum kopi di Indonesia semakin meningkat dan
              menjadikan coffee shop sebagai tempat untuk bersantai, berkumpul,
              maupun bekerja. Hal ini juga mulai berkembang di daerah pedesaan.
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                lineHeight: "1.8",
                fontSize: "0.97rem",
                marginBottom: "36px",
              }}
            >
              Anagata Coffee hadir sebagai salah satu coffee shop di Desa Broto,
              Slahung, Ponorogo yang menawarkan konsep tempat yang modern dan
              nyaman. Dengan berbagai pilihan menu kopi dan suasana yang menarik,
              Anagata Coffee menjadi salah satu tempat berkumpul bagi masyarakat
              serta turut mendukung perkembangan usaha kreatif di daerah.
            </p>
            <Link href="/about" className="btn-primary">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .about-snippet-section {
              background: white !important;
              position: relative;
            }
            .about-snippet-section::after {
              display: none !important;
            }
            .about-grid { 
              grid-template-columns: 1fr !important; 
              gap: 40px !important; 
              text-align: center;
              position: relative;
              z-index: 2;
            }
            .about-grid h2 { color: #1a0e00 !important; }
            .about-grid p { color: rgba(26, 14, 0, 0.7) !important; }
            .about-image-container { justify-content: center !important; }
            .about-desktop-clipped { display: none !important; }
          }
        `}</style>
      </section>

      {/* ===== Visit & Reserve Section ===== */}
      <section
        id="visit"
        className="visit-section"
        style={{
          padding: "100px 0",
          background: "white",
          position: "relative",
          overflow: "hidden",
          marginTop: "-1px"
        }}
      >
        <style>{`
          .visit-bg-dark-mobile { display: none; }
          .visit-mobile-pattern { display: none; }
          @media (max-width: 1024px) {
            .visit-grid { 
              grid-template-columns: 1fr !important; 
              gap: 40px !important;
              padding: 0 20px !important;
            }
            .visit-section { padding: 0 0 60px 0 !important; }
            .visit-container-inner { padding-top: 0px !important; margin-top: -20px !important; }
            .visit-left-col {
              transform: translateX(0) !important;
              margin-bottom: 60px; /* Increased margin for more space */
            }
            .visit-right-col {
              transform: translateX(0) !important;
              padding-bottom: 80px;
              margin-top: 60px !important;
            }
            .visit-bg-desktop {
              display: none !important;
            }
            .visit-bg-dark-mobile {
              display: block !important;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 62%; /* Slightly reduced for a tighter fit */
              background: linear-gradient(180deg, var(--coffee-dark) 0%, #1a0e00 100%);
              z-index: 1;
              border-bottom: 2px solid #e6a336;
            }
            .visit-mobile-pattern {
              display: block !important;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 62%;
              background-image: url('/coffee_bean_pattern.png');
              background-size: 200px;
              opacity: 0.03;
              z-index: 2;
              pointer-events: none;
            }
            .mobile-wave-divider {
              display: none !important; /* Kept hidden as per user request for flat look */
            }
            .decorative-photo-1 {
              width: 110px !important;
              height: 150px !important;
              top: -30px !important;
              right: 10px !important;
              border-width: 4px !important;
              border-radius: 20px !important;
              display: block !important;
              transform: rotate(3deg) !important;
            }
            .decorative-photo-2 {
              width: 90px !important;
              height: 90px !important;
              bottom: 30px !important;
              left: 10px !important;
              border-width: 4px !important;
              border-radius: 16px !important;
              display: block !important;
              transform: rotate(-4deg) !important;
            }
          }
          @media (max-width: 600px) {
            .visit-bg-dark-mobile, .visit-mobile-pattern { height: 60%; }
            .visit-grid { gap: 32px !important; }
            .decorative-photo-1 { width: 90px !important; height: 120px !important; top: -20px !important; }
            .decorative-photo-2 { width: 75px !important; height: 75px !important; bottom: 40px !important; }
          }
        `}</style>

        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <clipPath id="visit-wave-scurve" clipPathUnits="objectBoundingBox">
              <path d="M0,0 L0.5,0 C0.58,0.25 0.42,0.75 0.5,1 L0,1 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Mobile Dark Background */}
        <div className="visit-bg-dark-mobile" />
        <div className="visit-mobile-pattern" />

        {/* Mobile Wave Divider */}
        <div className="mobile-wave-divider" style={{ display: "none" }}>
          <svg width="100%" height="80" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,0 Q360,80 720,40 T1440,80 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>

        {/* Desktop Designs (Hidden on Mobile via class) */}
        <div className="visit-bg-desktop">
          {/* Precise SVG Background for the dark left side */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              pointerEvents: "none"
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 600"
              preserveAspectRatio="none"
              style={{ display: "block" }}
            >
              <path
                d="M0,0 L50,0 C58,150 42,450 50,600 L0,600 Z"
                fill="var(--coffee-dark)"
              />
            </svg>
          </div>

          {/* Ambient Background Image for the dark side */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              backgroundImage: "url('/6.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.3,
              clipPath: "url(#visit-wave-scurve)",
              pointerEvents: "none"
            }}
          />

          {/* Coffee bean pattern over the dark side only */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/coffee_bean_pattern.png')",
              backgroundSize: "300px",
              opacity: 0.04,
              zIndex: 2,
              clipPath: "url(#visit-wave-scurve)",
            }}
          />
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 3, paddingTop: "80px" }}>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "start",
              position: "relative"
            }}
            className="visit-grid"
          >
            {/* Left: Location & Maps */}
            <div className="visit-left-col" style={{ transform: "translateX(-60px)" }}>
              <span
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.4rem",
                  color: "#e6a336",
                  fontWeight: "600",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Kunjungi Kami
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
                  fontWeight: "700",
                  color: "white",
                  marginBottom: "24px",
                }}
              >
                Lokasi Kedai
              </h2>
              {/* Map Embed with Photo Overlay */}
              <div
                className="map-premium-card"
                style={{
                  borderRadius: "32px",
                  overflow: "hidden",
                  boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  height: "440px",
                  background: "#0c0700",
                  position: "relative",
                  transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                {/* Background texture for depth when map is transparent */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "url('/bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.2,
                    filter: "blur(10px)",
                  }}
                />

                {/* The Map */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.773789497087!2d111.41079657572374!3d-8.022246092004197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79731b597f464d%3A0x3c22fc5ada9f5c98!2sAnagata%20Coffee!5e0!3m2!1sid!2sid!4v1773097277232!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    opacity: 1,
                    filter: "contrast(1.1) saturate(1.2) brightness(0.9)",
                    position: "relative",
                    zIndex: 2,
                    mixBlendMode: "normal" // Removed screen blend for better visibility with high opacity
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* Subtle Inner Glow/Vignette */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    boxShadow: "inset 0 0 100px rgba(0,0,0,0.6)",
                    pointerEvents: "none",
                    zIndex: 3
                  }}
                />

                {/* Floating Photo Card (Atmosphere Preview) - Repositioned and refined */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "24px",
                    left: "24px",
                    width: "150px",
                    background: "rgba(25, 14, 0, 0.75)",
                    backdropFilter: "blur(15px)",
                    borderRadius: "20px",
                    padding: "8px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
                    zIndex: 10,
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                  className="atmosphere-card"
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-8px) scale(1.02)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(25, 14, 0, 0.9)";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(25, 14, 0, 0.75)";
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100px",
                      borderRadius: "14px",
                      overflow: "hidden",
                      marginBottom: "8px",
                      position: "relative"
                    }}
                  >
                    <img
                      src="/1.jpg"
                      alt="Suasana Anagata Coffee"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                  </div>
                  <div style={{ padding: "0 4px" }}>
                    <span style={{ color: "#e6a336", fontSize: "0.75rem", fontWeight: "700", display: "block", marginBottom: "2px" }}>
                      Menu & Suasana
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem" }}>
                      Klik untuk melihat →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Info & CTA */}
            <div
              className="visit-right-col"
              style={{
                position: "relative",
                zIndex: 4,
                transform: "translate(40px, 100px)", // Geser ke kanan (positif) agar tepat di tengah area putih
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "16px",
                padding: "20px"
              }}
            >
              <span
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.6rem",
                  color: "#e6a336",
                  fontWeight: "600",
                  display: "block",
                }}
              >
                Select Your Time Of Visit
              </span>

              <div style={{ width: "40px", height: "2px", background: "rgba(200, 136, 43, 0.4)", borderRadius: "2px", marginBottom: "8px" }} />

              <p style={{
                color: "rgba(26, 14, 0, 0.7)",
                fontSize: "1.05rem",
                lineHeight: "1.8",
                marginBottom: "24px",
                maxWidth: "480px",
                fontWeight: "400"
              }}>
                Kami menghargai waktu Anda. Daftarkan pesanan Anda terlebih dahulu untuk penyajian yang lebih presisi dan konsisten, terutama saat jam sibuk.
              </p>

              <div style={{ display: "flex", width: "100%", maxWidth: "300px" }}>
                <Link href="/reserve" className="btn-primary" style={{ flex: 1, textAlign: "center", textDecoration: "none" }}>
                  Pesan Slot Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
