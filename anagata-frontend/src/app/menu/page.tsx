import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu — Anagata Coffee",
  description: "Explore our full menu of handcrafted coffees, cold brews, non-coffee drinks, and food pairings at Anagata Coffee.",
};

const menuCategories = [
  {
    category: "Hot Coffee",
    icon: "☕",
    items: [
      { name: "Espresso", desc: "Pure single-origin espresso shot", price: "Rp 25.000" },
      { name: "Americano", desc: "Espresso with hot water, bold and clean", price: "Rp 28.000" },
      { name: "Cappuccino", desc: "Espresso, steamed milk, thick foam", price: "Rp 35.000" },
      { name: "Caramel Latte", desc: "Espresso, steamed milk, caramel drizzle", price: "Rp 38.000" },
      { name: "Hazelnut Latte", desc: "Smooth espresso with hazelnut syrup", price: "Rp 38.000" },
      { name: "Flat White", desc: "Double ristretto with microfoam milk", price: "Rp 40.000" },
    ],
  },
  {
    category: "Cold Coffee",
    icon: "🧊",
    items: [
      { name: "Iced Americano", desc: "Cold water and espresso on ice", price: "Rp 30.000" },
      { name: "Cold Brew Tonic", desc: "Cold brew over sparkling tonic water", price: "Rp 42.000" },
      { name: "Iced Caramel Macchiato", desc: "Layered milk, espresso, caramel", price: "Rp 45.000" },
      { name: "Signature Cold Brew", desc: "18-hour steeped single-origin cold brew", price: "Rp 48.000" },
      { name: "Iced Coconut Latte", desc: "Espresso with coconut milk on ice", price: "Rp 42.000" },
      { name: "Vietnamese Iced Coffee", desc: "Drip coffee with sweetened condensed milk", price: "Rp 38.000" },
    ],
  },
  {
    category: "Non-Coffee",
    icon: "🍵",
    items: [
      { name: "Matcha Latte", desc: "Premium Japanese matcha with oat milk", price: "Rp 40.000" },
      { name: "Chocolate Latte", desc: "Rich Belgian chocolate steamed milk", price: "Rp 38.000" },
      { name: "Hojicha Latte", desc: "Roasted Japanese tea with creamy milk", price: "Rp 40.000" },
      { name: "Taro Latte", desc: "Purple taro with oat milk, sweet and earthy", price: "Rp 40.000" },
      { name: "Fresh Lemonade", desc: "Hand-squeezed lemon with honey and mint", price: "Rp 32.000" },
      { name: "Cold Chamomile", desc: "Relaxing chamomile iced tea", price: "Rp 30.000" },
    ],
  },
  {
    category: "Food & Snacks",
    icon: "🥐",
    items: [
      { name: "Croissant", desc: "Buttery, flaky French croissant", price: "Rp 28.000" },
      { name: "Banana Bread", desc: "Moist house-baked banana bread slice", price: "Rp 25.000" },
      { name: "Avocado Toast", desc: "Sourdough with smashed avocado, sea salt", price: "Rp 55.000" },
      { name: "Granola Bowl", desc: "Yogurt, granola, fresh fruit, honey", price: "Rp 48.000" },
      { name: "Egg Sandwich", desc: "Soft bun, scrambled egg, cheese, herbs", price: "Rp 45.000" },
      { name: "Tiramisu", desc: "Classic Italian tiramisu, coffee-soaked", price: "Rp 38.000" },
    ],
  },
];

export default function MenuPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "360px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#1a0e00",
        }}
      >
        <Image
          src="/coffee_menu.png"
          alt="Our coffee menu"
          fill
          style={{ objectFit: "cover", opacity: 0.35 }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(26,14,0,0.4), rgba(26,14,0,0.8))",
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
            What we serve
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
              fontWeight: "700",
              color: "white",
              lineHeight: "1.15",
            }}
          >
            Our Menu
          </h1>
        </div>
      </section>

      {/* Menu Sections */}
      <section
        style={{
          padding: "80px 24px",
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
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          {menuCategories.map((cat, ci) => (
            <div
              key={cat.category}
              style={{ marginBottom: ci < menuCategories.length - 1 ? "72px" : 0 }}
            >
              {/* Category header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "36px",
                  paddingBottom: "20px",
                  borderBottom: "2px solid rgba(200,136,43,0.2)",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "linear-gradient(135deg, #c8882b, #e6a336)",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    flexShrink: 0,
                    boxShadow: "0 4px 16px rgba(200,136,43,0.35)",
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.8rem",
                      fontWeight: "700",
                      color: "var(--coffee-dark)",
                    }}
                  >
                    {cat.category}
                  </h2>
                </div>
              </div>

              {/* Menu items grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                }}
                className="menu-items-grid"
              >
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="card-coffee"
                    style={{ padding: "24px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "8px",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.05rem",
                          fontWeight: "600",
                          color: "var(--coffee-dark)",
                        }}
                      >
                        {item.name}
                      </h3>
                      <span
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1rem",
                          fontWeight: "700",
                          color: "#c8882b",
                          flexShrink: 0,
                          marginLeft: "12px",
                        }}
                      >
                        {item.price}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.84rem",
                        color: "var(--text-muted)",
                        lineHeight: "1.6",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 900px) {
            .menu-items-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 560px) {
            .menu-items-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Note */}
      <div
        style={{
          background: "linear-gradient(135deg, #c8882b, #e6a336)",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "white", fontSize: "0.95rem", fontWeight: "500" }}>
          ✨ All prices include tax. Ask our barista for customization options (milk alternatives, syrup adjustments, etc.)
        </p>
      </div>
    </>
  );
}
