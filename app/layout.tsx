import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  title: "The Tooth Dental Studio | Dental Clinic in Tolichowki, Hyderabad",
  description: "Patient-focused dental care in Tolichowki, Hyderabad, where the experience matters as much as the treatment.",
};

const jsonLd = { "@context": "https://schema.org", "@type": "Dentist", name: "The Tooth Dental Studio", description: metadata.description, address: { "@type": "PostalAddress", streetAddress: "Nasr Plaza, Plot No. 158, above UCO Bank, beside Honda Showroom, Surya Nagar Colony, Toli Chowki", addressLocality: "Hyderabad", addressRegion: "Telangana", postalCode: "500008", addressCountry: "IN" }, founder: { "@type": "Person", name: "Dr. Mohammed Imran Ali", jobTitle: "General Dentist" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} bg-background`}><body className="min-h-full"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}</body></html>;
}
