"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ background: "#faf7f2", minHeight: "100vh" }}>
      {/* ===== Hero Section ===== */}
      <section
        style={{
          position: "relative",
          height: "70vh",
          minHeight: "550px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "#1a0e00",
        }}
      >
        <Image
          src="/bg.jpg"
          alt="Anagata Coffee"
          fill
          style={{ objectFit: "cover", objectPosition: "top", opacity: 0.6 }}
          priority
          quality={100}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(26,14,0,0.4), rgba(26,14,0,0.85))",
            zIndex: 1,
          }}
        />

        <div
          className="hero-text-container"
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            padding: "0 24px",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <div className="hero-text-inner" style={{ maxWidth: "550px", textAlign: "left" }}>


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
              Tentang Kami
              <br />
              <span style={{ color: "#e6a336", fontStyle: "italic" }}>
                Anagata Coffee
              </span>
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "1rem",
                lineHeight: "1.8",
                marginBottom: "36px",
              }}
            >
              Pelajari perjalanan kami dalam menghadirkan pengalaman kopi modern yang
              berkualitas dan berkesan bagi masyarakat di Desa Broto, Ponorogo.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Introduction (Meaning) ===== */}
      <section style={{ padding: "100px 24px 60px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              color: "#1a0e00",
              marginBottom: "30px",
            }}
          >
            Makna di Balik <span style={{ color: "#c8882b" }}>Anagata</span>
          </h2>
          <p
            style={{
              fontSize: "1.15rem",
              lineHeight: "1.9",
              color: "#4a3c2c",
              fontStyle: "italic",
            }}
          >
            "Dalam bahasa Sansekerta, kata <strong>Anagata</strong> memiliki arti masa depan atau sesuatu yang belum terjadi namun penuh dengan harapan dan kemungkinan. Nama ini mencerminkan semangat kami untuk terus berkembang, berinovasi, dan memberikan pengalaman baru bagi masyarakat."
          </p>
        </div>
      </section>

      {/* ===== Dynamic Story Grid ===== */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Part 1: Cultural Context */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "80px",
              alignItems: "center",
              marginBottom: "120px",
            }}
            className="about-row"
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.8rem",
                  color: "#1a0e00",
                  marginBottom: "20px",
                }}
              >
                Gaya Hidup & Kopi
              </h3>
              <p style={{ color: "#555", lineHeight: "1.8", fontSize: "1rem" }}>
                Perkembangan budaya minum kopi di Indonesia dalam beberapa tahun terakhir mengalami peningkatan yang pesat. Coffee shop tidak lagi hanya menjadi tempat menikmati kopi, tetapi juga menjadi ruang sosial untuk berkumpul, bekerja, berdiskusi, dan mengekspresikan gaya hidup modern.
              </p>
              <p style={{ color: "#555", lineHeight: "1.8", fontSize: "1rem", marginTop: "16px" }}>
                Tren ini tidak hanya berkembang di kota besar, tetapi juga mulai merambah ke daerah dan desa, membawa angin segar bagi interaksi komunitas lokal.
              </p>
            </div>
            <div style={{ position: "relative", height: "400px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
              <Image src="/1.jpg" alt="Budaya Kopi" fill style={{ objectFit: "cover" }} />
            </div>
          </div>

          {/* Part 2: The Village Choice */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.8fr 1.2fr",
              gap: "80px",
              alignItems: "center",
              marginBottom: "120px",
            }}
            className="about-row reversed"
          >
            <div style={{ position: "relative", height: "450px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
              <Image src="/2.jpg" alt="Anagata Coffee Village" fill style={{ objectFit: "cover" }} />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.8rem",
                  color: "#1a0e00",
                  marginBottom: "20px",
                }}
              >
                Hadir di Desa Broto
              </h3>
              <p style={{ color: "#555", lineHeight: "1.8", fontSize: "1rem" }}>
                Salah satu contohnya adalah Anagata Coffee, coffee shop yang berlokasi di Desa Broto, Kecamatan Slahung, Kabupaten Ponorogo. Meskipun berada di wilayah pedesaan, tempat ini hadir dengan konsep modern sehingga menjadi alternatif tempat berkumpul bagi masyarakat sekitar.
              </p>
              <p style={{ color: "#555", lineHeight: "1.8", fontSize: "1rem", marginTop: "16px" }}>
                Kami percaya bahwa kualitas dan kenyamanan berstandar modern harus bisa dinikmati oleh siapa saja, di mana saja.
              </p>
            </div>
          </div>

          {/* Part 3: Design & Experience */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "80px",
              alignItems: "center",
            }}
            className="about-row"
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.8rem",
                  color: "#1a0e00",
                  marginBottom: "20px",
                }}
              >
                Konsep & Kenyamanan
              </h3>
              <p style={{ color: "#555", lineHeight: "1.8", fontSize: "1rem" }}>
                Anagata Coffee mengusung desain industrial minimalis dengan suasana yang nyaman dan estetik, sehingga pengunjung dapat bersantai, bekerja, maupun berkumpul bersama teman.
              </p>
              <p style={{ color: "#555", lineHeight: "1.8", fontSize: "1rem", marginTop: "16px" }}>
                Selain berbagai menu kopi seperti americano dan cappuccino, kami juga menyediakan minuman lain serta makanan ringan yang dikurasi dengan baik untuk menyempurnakan hari Anda.
              </p>
            </div>
            <div style={{ position: "relative", height: "400px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
              <Image src="/3.jpg" alt="Interior Anagata" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Visual Gallery ===== */}
      <section style={{ padding: "100px 24px", background: "#1a0e00" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span style={{ color: "#e6a336", fontFamily: "'Dancing Script', cursive", fontSize: "1.4rem" }}>Suasana Kami</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", color: "white", marginTop: "10px" }}>Galeri Visual</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }} className="gallery-grid">
            {[4, 5, 6, 7].map((num) => (
              <div key={num} style={{ position: "relative", height: "300px", borderRadius: "12px", overflow: "hidden" }} className="gallery-item">
                <Image src={`/${num}.jpg`} alt={`Suasana ${num}`} fill style={{ objectFit: "cover", transition: "transform 0.5s ease" }} className="hover-zoom" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Conclusion / Value ===== */}
      <section style={{ padding: "100px 24px", textAlign: "center", background: "white" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#1a0e00", marginBottom: "30px" }}>
            Mendukung Ekonomi Kreatif Lokal
          </h2>
          <p style={{ color: "#555", lineHeight: "1.8", fontSize: "1.1rem" }}>
            Kehadiran Anagata Coffee menjadi bagian dari perkembangan usaha kreatif di daerah dan memberikan pengalaman baru bagi masyarakat yang sebelumnya lebih terbiasa dengan warung kopi tradisional. Dengan tempat yang nyaman, menu beragam, dan harga terjangkau, kami berharap dapat menjadi tempat berkumpul yang positif sekaligus mendukung perkembangan ekonomi kreatif di Ponorogo.
          </p>
          <div style={{ marginTop: "50px" }}>
            <Link href="/" style={{
              color: "#c8882b",
              textDecoration: "none",
              fontWeight: "600",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}>
              Kembali ke Beranda <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hover-zoom:hover {
          transform: scale(1.1);
        }
        @media (max-width: 1024px) {
          .about-row { 
            grid-template-columns: 1fr !important; 
            gap: 40px !important; 
          }
          .about-row div:nth-child(2) {
            order: -1; /* Move image to top of text in all rows on mobile */
          }
          .about-row.reversed div:first-child {
            order: -1;
          }
          .about-row h3 {
            text-align: center;
          }
          .about-row p {
            text-align: center;
          }
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          section { padding: 60px 20px !important; }
          .hero-text-container { justify-content: center !important; text-align: center !important; }
          .hero-text-inner { max-width: 100% !important; text-align: center !important; }
          .hero-deco-line { display: none !important; }
          .hero-span { justify-content: center !important; }
        }
        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
          h1 { fontSize: 2.8rem !important; }
          h2 { fontSize: 1.8rem !important; }
        }
      `}</style>
    </div>
  );
}
