import type { Metadata, Viewport } from "next";
import { Assistant, Frank_Ruhl_Libre, Pinyon_Script } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./site.css";
import SmoothScroll from "@/components/site/SmoothScroll";
import Cursor from "@/components/site/Cursor";
import LeadPopup from "@/components/site/LeadPopup";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-assistant",
  display: "swap",
});
const frank = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-frank",
  display: "swap",
});
const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});
// Oraita (Nerya Studio) — the brand's professional Hebrew display font, used for
// the "ותחזינה" wordmark. Regular weight only.
const oraita = localFont({
  src: "./fonts/NBMOraita-Regular.woff2",
  weight: "400",
  variable: "--font-oraita",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ותחזינה · סטודיו לאמנות קיר",
  description:
    "ותחזינה · סטודיו לציורי קיר ייחודיים בהשראת זכר לחורבן. מותאמים אישית, בכל גודל ובכל סגנון.",
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
      className={`${assistant.variable} ${frank.variable} ${pinyon.variable} ${oraita.variable}`}
    >
      {/* suppressHydrationWarning: browser extensions (e.g. Bitdefender) inject
          attributes onto <body> before React hydrates; this ignores those on this
          element only — real mismatches inside the app are still reported. */}
      <body className="site" suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
        <LeadPopup />
      </body>
    </html>
  );
}
