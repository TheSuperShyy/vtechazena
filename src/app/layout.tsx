import type { Metadata, Viewport } from "next";
import { Assistant, Frank_Ruhl_Libre, Pinyon_Script } from "next/font/google";
import "./globals.css";
import "./site.css";
import SmoothScroll from "@/components/site/SmoothScroll";
import Cursor from "@/components/site/Cursor";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0d0c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${assistant.variable} ${frank.variable} ${pinyon.variable}`}
    >
      <body className="site">
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
