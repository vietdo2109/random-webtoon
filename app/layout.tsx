import type { Metadata } from "next";
import { Lilita_One, Poppins, Zain } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import StoreProvider from "./StoreProvider";
import { AuthProvider } from "@/context/auth";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

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
        <StoreProvider>
          <AuthProvider>
            <Header />
            <div className="w-full max-w-6xl px-4 md:px-8 min-h-screen text-white bg-dark-gray">
              {children}
              {modal}
              <Toaster
                position="top-center"
                toastOptions={{
                  style: {
                    background: "black",
                    color: "white",
                    opacity: "96%",
                    border: "none",
                    marginTop: "50px",
                    borderRadius: "30px",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "16px",
                  },
                }}
              />
            </div>
            <Footer />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
