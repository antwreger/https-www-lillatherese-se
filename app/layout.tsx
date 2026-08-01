import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600"] });
const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600"] });

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "www.lillatherese.se";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const title = "Lilla Therese Bokhandel | Katolsk bokhandel i Göteborg";
  const description = "Katolsk bokhandel vid Kristus Konungens kyrka i Göteborg. Böcker, rosenkransar, ikoner, krucifix och gåvor.";
  return {
    metadataBase: base,
    title,
    description,
    openGraph: { title, description, type: "website", locale: "sv_SE", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Lilla Therese Bokhandel – Tro, hopp och god läsning" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="sv"><body className={`${serif.variable} ${sans.variable}`}>{children}</body></html>;
}
