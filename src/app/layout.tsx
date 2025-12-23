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
    "comunidad cristiana doral florida",
    "church in doral",
    "hispanic church miami",
    "spanish church doral fl",
    "iglesia cerca de mi miami",
    "church near me doral"
  ],
  authors: [{ name: "Vida con Vida Miami" }],
  creator: "Vida con Vida Miami",
  publisher: "Vida con Vida Miami",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://vidaconvidamiami.com",
    languages: {
      "es-US": "https://vidaconvidamiami.com",
    },
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
        url: "https://vidaconvidamiami.com/images/frontVida.jpg",
        width: 1200,
        height: 630,
        alt: "Iglesia Vida con Vida Miami - Comunidad de fe cristiana en Doral, Florida",
        type: "image/jpeg",
      },
      {
        url: "https://vidaconvidamiami.com/images/logoVida.jpg",
        width: 400,
        height: 400,
        alt: "Logo Iglesia Vida con Vida Miami",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iglesia Vida con Vida Miami | Doral, FL",
    description: "Una familia de fe cristiana. Servicios domingos 10:30 AM. ¡Eres parte de esta familia!",
    images: ["https://vidaconvidamiami.com/images/frontVida.jpg"],
    creator: "@vidaconvida",
  },
  other: {
    "geo.region": "US-FL",
    "geo.placename": "Doral",
    "geo.position": "25.7897;-80.3389",
    "ICBM": "25.7897, -80.3389",
    "og:locality": "Doral",
    "og:region": "FL",
    "og:postal-code": "33172",
    "og:country-name": "USA",
  },
  category: "religion",
};

const jsonLdChurch = {
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

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuál es el horario de los servicios de Iglesia Vida con Vida Miami?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nuestros servicios presenciales son los domingos a las 10:30 AM en Doral, FL. Los miércoles a las 8:00 PM tenemos estudio bíblico vía Zoom."
      }
    },
    {
      "@type": "Question",
      "name": "¿Dónde está ubicada la Iglesia Vida con Vida Miami?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Estamos ubicados en 10200 NW 25 St, Unit 113 Mezzanine, 2nd Floor, Doral, FL 33172."
      }
    },
    {
      "@type": "Question",
      "name": "¿Tienen ministerios para niños y jóvenes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, tenemos Vida Kids para niños y Vida Youth para jóvenes de 12 a 17 años. Ambos ministerios ofrecen enseñanza bíblica adaptada a cada edad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Ofrecen consejería pastoral?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, ofrecemos ayuda pastoral y sanidad interior. Puede contactarnos al (561) 591-4771 o por email a secretaria@vidaconvidamiami.com para agendar una cita."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo puedo donar a la iglesia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Puede donar vía Zelle a secretaria@vidaconvidamiami.com, mediante cheque a nombre de 'Disciple of Christ Church Spanish', o en efectivo durante los servicios."
      }
    }
  ]
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdChurch) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
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
