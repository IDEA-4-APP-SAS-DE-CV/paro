import './ui/global.css';
import {NextUIProvider} from "@nextui-org/react";

import {  montserrat } from './ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
        <body className={`${montserrat.className} antialiased`}>
          <NextUIProvider>
            {children}
          </NextUIProvider>
        </body>
    </html>
  );
}
