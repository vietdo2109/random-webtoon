import type { Metadata } from "next";
import { Lilita_One, Poppins, Zain } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import StoreProvider from "./StoreProvider";
import { AuthProvider } from "@/context/auth";
import Footer from "@/components/Footer";

const lilitaOne = Lilita_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-lilita-one",
});

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const zain = Zain({
  weight: ["200", "300", "400", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-zain",
});

export const metadata: Metadata = {
  title: "Random Webtoon Generator",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${zain.variable} ${lilitaOne.variable} ${poppins.variable} antialiased bg-dark-gray flex flex-col items-center`}
      >
        <AuthProvider>
          <Header />
          <div className="w-full max-w-6xl px-4 md:px-8 min-h-screen text-white bg-dark-gray">
            <StoreProvider>
              {children}
              {modal}
            </StoreProvider>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
