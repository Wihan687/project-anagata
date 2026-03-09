"use client";

import Image from "next/image";
import Link from "next/link";

const featuredMenu = [
  {
    name: "Signature Espresso",
    desc: "Bold, smooth single-origin espresso with a velvety crema",
    price: "Rp 28.000",
    icon: "☕",
    badge: "Best Seller",
  },
  {
    name: "Caramel Latte",
    desc: "Creamy steamed milk with espresso and house caramel sauce",
    price: "Rp 38.000",
    icon: "🥛",
    badge: "Favorite",
  },
  {
    name: "Cold Brew Tonic",
    desc: "Refreshing cold brew over tonic water with citrus zest",
    price: "Rp 42.000",
    icon: "🧊",
    badge: "Trending",
  },
  {
    name: "Matcha Latte",
    desc: "Premium Japanese matcha blended with steamed oat milk",
    price: "Rp 40.000",
    icon: "🍵",
    badge: "",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===== Hero Section ===== */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "#1a0e00",
        }}
      >
        {/* Background image - left half */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "52%",
            height: "100%",
            zIndex: 1,
          }}
        >
          <Image
            src="/coffee_hero.png"
            alt="Premium coffee being poured"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          {/* Curved mask */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, transparent 60%, #1a0e00 100%)",
            }}
          />
        </div>

        {/* Bean pattern overlay */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "55%",
            height: "100%",
            backgroundImage: "url('/coffee_bean_pattern.png')",
            backgroundSize: "280px",
            backgroundRepeat: "repeat",
            opacity: 0.08,
            zIndex: 2,
          }}
        />

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
          <div className="animate-fade-right">
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
                Welcome to our coffee
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
              Great Coffee
              <br />
              <span style={{ color: "#e6a336", fontStyle: "italic" }}>
                for Some Joy
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
              Discover handcrafted coffees made with premium single-origin
              beans, brewed with passion and served with warmth in a cozy
              atmosphere you&apos;ll love.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/menu" className="btn-primary">
                Explore Menu
              </Link>
              <Link
                href="/about"
                className="btn-outline"
                style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}
              >
                Our Story
              </Link>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: "40px",
                marginTop: "48px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {[
                { num: "50+", label: "Menu Items" },
                { num: "10K+", label: "Happy Customers" },
                { num: "5★", label: "Rating" },
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
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ===== Featured Menu Section ===== */}
      <section
        style={{
          padding: "100px 24px",
          background: "var(--coffee-beige)",
          position: "relative",
        }}
      >
        {/* Background bean pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/coffee_bean_pattern.png')",
            backgroundSize: "280px",
            backgroundRepeat: "repeat",
            opacity: 0.04,
          }}
        />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="section-tag">Our Specialties</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                margin: "8px 0",
              }}
            >
              <div style={{ width: "60px", height: "1px", background: "#c8882b", opacity: 0.5 }} />
              <span style={{ color: "#c8882b", fontSize: "18px" }}>◆</span>
              <div style={{ width: "60px", height: "1px", background: "#c8882b", opacity: 0.5 }} />
            </div>
            <h2 className="section-title">Popular Menu</h2>
            <p className="section-subtitle" style={{ margin: "16px auto 0" }}>
              Handcrafted with love using the finest beans from around the world.
              Every sip tells a story.
            </p>
          </div>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
            className="menu-grid"
          >
            {featuredMenu.map((item, i) => (
              <div
                key={item.name}
                className="card-coffee"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Icon area */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #4a2c0a22, #c8882b22)",
                    height: "140px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "56px",
                    position: "relative",
                  }}
                >
                  {item.icon}
                  {item.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "linear-gradient(135deg, #c8882b, #e6a336)",
                        color: "white",
                        fontSize: "0.7rem",
                        fontWeight: "700",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      marginBottom: "8px",
                      color: "var(--coffee-dark)",
                    }}
                  >
                    {item.name}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "16px" }}>
                    {item.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.1rem",
                        fontWeight: "700",
                        color: "#c8882b",
                      }}
                    >
                      {item.price}
                    </span>
                    <button
                      style={{
                        background: "linear-gradient(135deg, #c8882b, #e6a336)",
                        border: "none",
                        color: "white",
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 3px 12px rgba(200,136,43,0.35)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
                      }}
                      onMouseOut={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link href="/menu" className="btn-primary">
              See Full Menu
            </Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .menu-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 480px) {
            .menu-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ===== About Snippet ===== */}
      <section
        style={{
          padding: "100px 24px",
          background: "linear-gradient(135deg, #1a0e00 0%, #2d1400 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/coffee_bean_pattern.png')",
            backgroundSize: "300px",
            opacity: 0.05,
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
          className="about-grid"
        >
          {/* Image */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                aspectRatio: "4/5",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <Image
                src="/coffee_about.png"
                alt="Cozy coffee shop interior"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            {/* Floating badge */}
            <div
              style={{
                position: "absolute",
                bottom: "24px",
                right: "-24px",
                background: "linear-gradient(135deg, #c8882b, #e6a336)",
                borderRadius: "16px",
                padding: "20px 28px",
                boxShadow: "0 8px 30px rgba(200,136,43,0.4)",
                textAlign: "center",
              }}
              className="animate-float"
            >
              <div
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "2.2rem",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                Since
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                2018
              </div>
            </div>
          </div>

          {/* Text */}
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
              Our Story
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
              Crafted with Passion,
              <br />
              Served with Heart
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                lineHeight: "1.8",
                fontSize: "0.97rem",
                marginBottom: "16px",
              }}
            >
              Anagata Coffee was born from a deep love for coffee culture. We
              source our beans carefully from farmers who share our values —
              sustainable, ethical, and exceptional quality.
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                lineHeight: "1.8",
                fontSize: "0.97rem",
                marginBottom: "36px",
              }}
            >
              Every cup we serve is a result of careful craft: from the roast
              profile to the pour technique, every detail is treated with
              respect and dedication.
            </p>
            <Link href="/about" className="btn-primary">
              Learn More About Us
            </Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* ===== Testimonials ===== */}
      <section style={{ padding: "100px 24px", background: "var(--coffee-cream)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span className="section-tag">What They Say</span>
            <h2 className="section-title" style={{ marginTop: "8px" }}>
              Customer Reviews
            </h2>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}
            className="review-grid"
          >
            {[
              {
                name: "Dinda Rahayu",
                role: "Coffee Enthusiast",
                text: "Anagata Coffee has the best espresso I've ever had in this city. The atmosphere is incredibly cozy and the staff are very welcoming!",
                stars: 5,
              },
              {
                name: "Budi Santoso",
                role: "Regular Customer",
                text: "I come here every morning before work. The caramel latte is perfection and the warm vibes keep me coming back every single day.",
                stars: 5,
              },
              {
                name: "Sari Wulandari",
                role: "Food Blogger",
                text: "Everything from the interior design to the cup presentation is Instagram-worthy. A definite must-visit for any coffee lover!",
                stars: 5,
              },
            ].map(({ name, role, text, stars }) => (
              <div
                key={name}
                className="card-coffee"
                style={{ padding: "32px" }}
              >
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                  {Array.from({ length: stars }).map((_, i) => (
                    <span key={i} style={{ color: "#e6a336", fontSize: "16px" }}>★</span>
                  ))}
                </div>
                <p
                  style={{
                    color: "var(--text-muted)",
                    lineHeight: "1.75",
                    fontSize: "0.92rem",
                    marginBottom: "24px",
                    fontStyle: "italic",
                  }}
                >
                  &quot;{text}&quot;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #c8882b, #e6a336)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "700",
                      fontSize: "1rem",
                    }}
                  >
                    {name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: "600", color: "var(--coffee-dark)", fontSize: "0.95rem" }}>{name}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .review-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ===== CTA Section ===== */}
      <section
        style={{
          padding: "80px 24px",
          background: "linear-gradient(135deg, #c8882b 0%, #e6a336 50%, #c8882b 100%)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/coffee_bean_pattern.png')",
            backgroundSize: "250px",
            opacity: 0.1,
          }}
        />
        <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: "700",
              color: "white",
              marginBottom: "16px",
            }}
          >
            Ready for Your Next Cup?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", marginBottom: "36px", lineHeight: "1.7" }}>
            Visit us today or explore our full menu online. Great coffee is just a click away.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link
              href="/menu"
              style={{
                background: "white",
                color: "#c8882b",
                padding: "14px 36px",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: "0.95rem",
                letterSpacing: "0.05em",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              }}
            >
              View Menu
            </Link>
            <Link
              href="/contact"
              style={{
                background: "transparent",
                color: "white",
                padding: "13px 34px",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "0.95rem",
                letterSpacing: "0.05em",
                border: "2px solid rgba(255,255,255,0.6)",
                transition: "all 0.3s ease",
              }}
            >
              Find Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
