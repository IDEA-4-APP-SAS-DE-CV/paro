import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Paro",
  description: "¡Nosotros de hacemos el Paro!",
  openGraph: {
    images: ['https://www.paro.com.mx/images/logo_paro.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
