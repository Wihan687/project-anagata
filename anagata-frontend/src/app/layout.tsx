import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Anagata Coffee — Great Coffee for Some Joy",
  description:
    "Anagata Coffee Shop – a cozy and premium coffee experience. Explore our menu, learn our story, and visit us today.",
  icons: {
    icon: "/logo-anagata.png",
    shortcut: "/logo-anagata.png",
    apple: "/logo-anagata.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem("admin-theme");
                  if (storedTheme === "light") {
                    document.documentElement.setAttribute("data-theme", "light");
                  } else {
                    document.documentElement.setAttribute("data-theme", "dark"); // Default
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
