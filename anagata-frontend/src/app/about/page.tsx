"use client";

import Image from "next/image";

const values = [
  {
    icon: "🌱",
    title: "Sustainably Sourced",
    desc: "We partner with ethical farmers across Indonesia, Ethiopia, and Colombia who share our commitment to sustainable and fair-trade practices.",
  },
  {
    icon: "🔥",
    title: "Artisan Roasting",
    desc: "Our in-house roaster carefully profiles each batch to unlock the unique flavors and aromas of every single-origin bean.",
  },
  {
    icon: "❤️",
    title: "Made with Love",
    desc: "Every cup is crafted with intention. Our baristas train extensively to ensure consistency and excellence in every pour.",
  },
  {
    icon: "🏡",
    title: "A Home Away from Home",
    desc: "We design our spaces to be warm, welcoming, and inspiring — so you can relax, work, or connect over great coffee.",
  },
];

const team = [
  { name: "Rina Kusuma", role: "Founder & Head Barista", emoji: "👩‍🍳" },
  { name: "Arif Prabowo", role: "Head Roaster", emoji: "👨‍🏭" },
  { name: "Maya Sari", role: "Café Manager", emoji: "👩‍💼" },
  { name: "Dani Wijaya", role: "Pastry Chef", emoji: "👨‍🍳" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#1a0e00",
        }}
      >
        <Image
          src="/coffee_about.png"
          alt="Anagata Coffee interior"
          fill
          style={{ objectFit: "cover", opacity: 0.3 }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(26,14,0,0.3), rgba(26,14,0,0.85))",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/coffee_bean_pattern.png')",
            backgroundSize: "260px",
            opacity: 0.05,
          }}
        />
        <div style={{ position: "relative", textAlign: "center" }}>
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
            Get to know us
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
              fontWeight: "700",
              color: "white",
            }}
          >
            About Us
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section
        style={{
          padding: "100px 24px",
          background: "var(--coffee-beige)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/coffee_bean_pattern.png')",
            backgroundSize: "280px",
            opacity: 0.03,
          }}
        />
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            position: "relative",
          }}
          className="story-grid"
        >
          <div>
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
              Our Journey
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: "700",
                color: "var(--coffee-dark)",
                marginBottom: "20px",
                lineHeight: "1.25",
              }}
            >
              Brewed with Passion <br /> Since 2018
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: "1.8",
                fontSize: "0.97rem",
                marginBottom: "18px",
              }}
            >
              Anagata Coffee started as a humble kiosk with one espresso machine and
              an endless dream. Founded by Rina Kusuma — a barista champion and coffee
              traveler — Anagata (meaning &quot;future&quot; in Sanskrit) was built to create
              a space where every cup tells a story.
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: "1.8",
                fontSize: "0.97rem",
                marginBottom: "18px",
              }}
            >
              Over the years, we&apos;ve grown into a beloved neighborhood café, welcoming
              thousands of guests daily. But our core values have never changed: we
              believe the best coffee is made with the best beans, the right technique,
              and a genuine love for people.
            </p>
            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: "1.8",
                fontSize: "0.97rem",
              }}
            >
              Today, we source our beans from sustainable farms across three continents,
              roast them in-house, and serve them in a carefully designed space that
              feels like a second home. We&apos;re proud of where we&apos;ve been and excited
              for where we&apos;re going.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                aspectRatio: "4/5",
                boxShadow: "0 20px 60px rgba(74,44,10,0.2)",
              }}
            >
              <Image
                src="/coffee_hero.png"
                alt="Our barista at work"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            {/* Accent box */}
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                left: "-20px",
                background: "linear-gradient(135deg, #c8882b, #e6a336)",
                borderRadius: "14px",
                padding: "24px 28px",
                boxShadow: "0 8px 30px rgba(200,136,43,0.4)",
              }}
              className="animate-float"
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.2rem",
                  fontWeight: "700",
                  color: "white",
                  lineHeight: "1",
                }}
              >
                10K+
              </div>
              <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", fontWeight: "500" }}>
                Happy Customers
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .story-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
        `}</style>
      </section>

      {/* Values */}
      <section
        style={{
          padding: "100px 24px",
          background: "linear-gradient(135deg, #1a0e00, #2d1800)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/coffee_bean_pattern.png')",
            backgroundSize: "280px",
            opacity: 0.06,
          }}
        />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
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
              What Drives Us
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
                fontWeight: "700",
                color: "white",
              }}
            >
              Our Core Values
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
            className="values-grid"
          >
            {values.map((val) => (
              <div
                key={val.title}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(200,136,43,0.2)",
                  borderRadius: "16px",
                  padding: "32px 24px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(200,136,43,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,136,43,0.4)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,136,43,0.2)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    fontSize: "40px",
                    marginBottom: "16px",
                    display: "block",
                  }}
                >
                  {val.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#e6a336",
                    marginBottom: "10px",
                  }}
                >
                  {val.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "0.87rem",
                    lineHeight: "1.7",
                  }}
                >
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .values-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 480px) {
            .values-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Team */}
      <section style={{ padding: "100px 24px", background: "var(--coffee-cream)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
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
              The People Behind the Cups
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
                fontWeight: "700",
                color: "var(--coffee-dark)",
              }}
            >
              Meet Our Team
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "28px",
            }}
            className="team-grid"
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="card-coffee"
                style={{ textAlign: "center", padding: "36px 24px" }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "linear-gradient(135deg, #c8882b22, #e6a33644)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "36px",
                    margin: "0 auto 16px",
                    border: "3px solid rgba(200,136,43,0.25)",
                  }}
                >
                  {member.emoji}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "var(--coffee-dark)",
                    marginBottom: "6px",
                  }}
                >
                  {member.name}
                </h3>
                <p style={{ color: "#c8882b", fontSize: "0.85rem", fontWeight: "500" }}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 480px) {
            .team-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}
