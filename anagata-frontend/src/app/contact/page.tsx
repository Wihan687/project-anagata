"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "340px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "#1a0e00",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/coffee_bean_pattern.png')",
            backgroundSize: "260px",
            opacity: 0.07,
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
            We&apos;d love to hear from you
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
              fontWeight: "700",
              color: "white",
            }}
          >
            Contact Us
          </h1>
        </div>
      </section>

      {/* Main content */}
      <section
        style={{
          padding: "90px 24px",
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
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "60px",
            position: "relative",
          }}
          className="contact-grid"
        >
          {/* Info */}
          <div>
            <span
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "1.4rem",
                color: "#e6a336",
                fontWeight: "600",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Get in Touch
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem",
                fontWeight: "700",
                color: "var(--coffee-dark)",
                marginBottom: "16px",
                lineHeight: "1.25",
              }}
            >
              Come Visit Us or Send a Message
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                lineHeight: "1.8",
                fontSize: "0.95rem",
                marginBottom: "40px",
              }}
            >
              Whether you have a question about our menu, want to book our space for
              an event, or just want to say hello — we&apos;re always happy to connect!
            </p>

            {/* Contact cards */}
            {[
              {
                icon: "📍",
                label: "Visit Us",
                lines: ["Jl. Kopi Nusantara No. 88", "Jakarta Selatan, 12940"],
              },
              {
                icon: "⏰",
                label: "Opening Hours",
                lines: ["Mon–Fri: 07:00 – 22:00", "Sat: 08:00 – 23:00 | Sun: 09:00 – 21:00"],
              },
              {
                icon: "📞",
                label: "Call Us",
                lines: ["+62 821-0000-1234"],
              },
              {
                icon: "✉️",
                label: "Email Us",
                lines: ["hello@anagatacoffee.id"],
              },
            ].map(({ icon, label, lines }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "24px",
                  padding: "20px",
                  background: "white",
                  borderRadius: "14px",
                  boxShadow: "0 2px 12px rgba(74,44,10,0.06)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(74,44,10,0.12)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(74,44,10,0.06)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #c8882b22, #e6a33633)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    flexShrink: 0,
                    border: "1.5px solid rgba(200,136,43,0.25)",
                  }}
                >
                  {icon}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#c8882b",
                      fontSize: "0.82rem",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {label}
                  </div>
                  {lines.map((l) => (
                    <div key={l} style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "48px",
              boxShadow: "0 8px 40px rgba(74,44,10,0.1)",
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "var(--coffee-dark)",
                marginBottom: "8px",
              }}
            >
              Send Us a Message
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "32px" }}>
              We&apos;ll get back to you within 24 hours.
            </p>

            {submitted && (
              <div
                style={{
                  background: "linear-gradient(135deg, #c8882b11, #e6a33622)",
                  border: "1px solid rgba(200,136,43,0.4)",
                  borderRadius: "10px",
                  padding: "16px 20px",
                  marginBottom: "24px",
                  color: "#7c4a1e",
                  fontWeight: "500",
                  fontSize: "0.92rem",
                }}
              >
                ✅ Message sent! We&apos;ll be in touch soon. Thank you! ☕
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
                className="form-row"
              >
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "Budi Santoso", key: "name" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "budi@email.com", key: "email" },
                ].map(({ id, label, type, placeholder, key }) => (
                  <div key={id}>
                    <label
                      htmlFor={id}
                      style={{
                        display: "block",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                        color: "var(--coffee-dark)",
                        marginBottom: "6px",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      required
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "10px",
                        border: "1.5px solid #e8ddd0",
                        fontSize: "0.92rem",
                        color: "var(--coffee-dark)",
                        background: "#faf4ec",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#c8882b")}
                      onBlur={(e) => (e.target.style.borderColor = "#e8ddd0")}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  htmlFor="subject"
                  style={{
                    display: "block",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    color: "var(--coffee-dark)",
                    marginBottom: "6px",
                  }}
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help you?"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid #e8ddd0",
                    fontSize: "0.92rem",
                    color: "var(--coffee-dark)",
                    background: "#faf4ec",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#c8882b")}
                  onBlur={(e) => (e.target.style.borderColor = "#e8ddd0")}
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    color: "var(--coffee-dark)",
                    marginBottom: "6px",
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your question, feedback, or request..."
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid #e8ddd0",
                    fontSize: "0.92rem",
                    color: "var(--coffee-dark)",
                    background: "#faf4ec",
                    outline: "none",
                    resize: "vertical",
                    transition: "border-color 0.2s ease",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#c8882b")}
                  onBlur={(e) => (e.target.style.borderColor = "#e8ddd0")}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: "100%", textAlign: "center" }}>
                Send Message ☕
              </button>
            </form>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .contact-grid { grid-template-columns: 1fr !important; }
            .form-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Map placeholder */}
      <section
        style={{
          background: "#1a0e00",
          padding: "60px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.5rem",
              color: "white",
              marginBottom: "8px",
            }}
          >
            Find Us Here
          </h3>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "28px", fontSize: "0.9rem" }}>
            Jl. Kopi Nusantara No. 88, Jakarta Selatan
          </p>
          <div
            style={{
              width: "100%",
              height: "320px",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(200,136,43,0.2)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.9931993226!2d106.6894382!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69edd79f6e0001%3A0x879a563d3b7f30ei!2sJakarta%20Selatan%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Anagata Coffee Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
