import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Vida con Vida Miami - Iglesia Cristiana en Doral",
  description: "Iglesia Vida con Vida Miami - Una familia de fe en Doral, FL. Servicios domingos 10:30 AM. Respondemos bíblicamente a la vida. Eres parte de esta familia.",
  keywords: "iglesia, cristiana, miami, doral, vida con vida, fe, familia, biblia",
  authors: [{ name: "Vida con Vida Miami" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Vida con Vida Miami - Iglesia Cristiana en Doral",
    description: "Una familia de fe en Doral, FL. Servicios domingos 10:30 AM. Eres parte de esta familia.",
    type: "website",
    locale: "es_US",
    siteName: "Vida con Vida Miami",
  },
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
        <meta name="theme-color" content="#FF6B35" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased font-open-sans`}
      >
        {children}
      </body>
    </html>
  );
}
