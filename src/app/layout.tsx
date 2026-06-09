import type { Metadata } from "next";
import { Heebo, Frank_Ruhl_Libre, Pinyon_Script } from "next/font/google";
import "./globals.css";
import "./site.css";
import SmoothScroll from "@/components/site/SmoothScroll";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});
const frank = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-serif",
  display: "swap",
});
const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ותחזנה — סטודיו לאמנות קיר",
  description:
    "ותחזנה — סטודיו לציורי קיר ייחודיים בהשראת זכר לחורבן. מותאמים אישית, בכל גודל ובכל סגנון.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${frank.variable} ${pinyon.variable}`}
    >
      <body className="site">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
