import type { Metadata, Viewport } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF6B35",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vidaconvidamiami.com"),
  title: {
    default: "Iglesia Vida con Vida Miami | Iglesia Cristiana en Doral, FL",
    template: "%s | Vida con Vida Miami"
  },
  description: "Iglesia Vida con Vida Miami - Una familia de fe cristiana en Doral, Florida. Servicios domingos 10:30 AM. Ministerios para niños (Vida Kids), jóvenes (Vida Youth), adoración y consejería pastoral. Pastores Jhon y Angela Arévalo. ¡Eres parte de esta familia!",
  keywords: [
    "iglesia cristiana miami",
    "iglesia en doral",
    "vida con vida miami",
    "iglesia hispana miami",
    "iglesia latina doral",
    "servicio dominical miami",
    "iglesia familiar doral",
    "ministerio juvenil miami",
    "vida kids",
    "vida youth",
    "iglesia evangelica miami",
    "culto cristiano doral",
    "consejeria pastoral miami",
    "iglesia en español miami",
    "comunidad cristiana doral florida"
  ],
  authors: [{ name: "Vida con Vida Miami" }],
  creator: "Vida con Vida Miami",
  publisher: "Vida con Vida Miami",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://vidaconvidamiami.com",
  },
  openGraph: {
    title: "Iglesia Vida con Vida Miami | Iglesia Cristiana en Doral, FL",
    description: "Una familia de fe cristiana en Doral, Florida. Servicios domingos 10:30 AM. Ministerios para toda la familia. ¡Te esperamos!",
    type: "website",
    locale: "es_US",
    url: "https://vidaconvidamiami.com",
    siteName: "Vida con Vida Miami",
    images: [
      {
        url: "/images/frontVida.jpg",
        width: 1200,
        height: 630,
        alt: "Iglesia Vida con Vida Miami - Comunidad de fe en Doral",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iglesia Vida con Vida Miami | Doral, FL",
    description: "Una familia de fe cristiana. Servicios domingos 10:30 AM. ¡Eres parte de esta familia!",
    images: ["/images/frontVida.jpg"],
  },
  verification: {
    google: "tu-codigo-de-verificacion-google",
  },
  category: "religion",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  "name": "Iglesia Vida con Vida Miami",
  "alternateName": "Vida con Vida Miami",
  "description": "Iglesia cristiana hispana en Doral, Florida. Una familia de fe donde todos son bienvenidos.",
  "url": "https://vidaconvidamiami.com",
  "logo": "https://vidaconvidamiami.com/images/logoVida.jpg",
  "image": "https://vidaconvidamiami.com/images/frontVida.jpg",
  "telephone": "+1-561-591-4771",
  "email": "secretaria@vidaconvidamiami.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "10200 NW 25 St, Unit 113 Mezzanine, 2nd Floor",
    "addressLocality": "Doral",
    "addressRegion": "FL",
    "postalCode": "33172",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.7897,
    "longitude": -80.3389
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "10:30",
      "closes": "13:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Wednesday",
      "opens": "20:00",
      "closes": "21:30"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61572900027929",
    "https://www.instagram.com/vidaconvida",
    "https://www.youtube.com/@VidaConVidaMiami"
  ],
  "founder": {
    "@type": "Person",
    "name": "Jhon y Angela Arévalo"
  },
  "slogan": "Formando discípulos, transformando generaciones",
  "priceRange": "Free"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/images/logoVida.jpg" />
        <link rel="apple-touch-icon" href="/images/logoVida.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased font-open-sans`}
      >
        {children}
      </body>
    </html>
  );
}
