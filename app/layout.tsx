import type { Metadata } from "next";
import { Lilita_One, Zain } from "next/font/google";
import "./globals.css";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";
import Link from "next/link";
import SlidingTextFooter from "@/components/SlidingTextFooter";
import MediaButton from "@/components/MediaButton";
import Header from "@/components/Header";

const lilitaOne = Lilita_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-lilita-one",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${zain.variable} ${lilitaOne.variable} antialiased bg-dark-gray flex flex-col items-center`}
      >
        <Header />
        <div className="w-full max-w-6xl px-2 md:px-8 min-h-screen text-white">
          {children}
        </div>

        <footer className="w-full flex flex-col items-center gap-4 overflow-hidden mt-[80px]">
          <div className="w-full h-[1px] bg-zinc-500 mb-5"></div>
          <div className="flex flex-col gap-4 w-full max-w-6xl min-w-3xl px-8 text-light-gray ">
            <div className="flex justify-between ">
              <div className="flex flex-col max-w-[60%]">
                <p className="text-2xl">
                  Random Webtoon was created, and is maintained, by Viet
                  (VDuck).
                </p>

                <h3 className="text-2xl mt-4">Navigation</h3>
                <div className="flex w-[50%] justify-between">
                  <div className="flex flex-col gap-1">
                    <Link href="/" className="hover:text-gray-200">
                      Home
                    </Link>
                    <Link href="/generator" className="hover:text-gray-200">
                      Generator
                    </Link>
                    <Link href="/random" className="hover:text-gray-200">
                      Random
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/similar-webtoon"
                      className="hover:text-gray-200"
                    >
                      Webtoon like
                    </Link>
                    <Link href="/random-combo" className="hover:text-gray-200">
                      Random Combo
                    </Link>
                    <Link href="/about" className="hover:text-gray-200">
                      About
                    </Link>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Link href="/search" className="hover:text-gray-200">
                      Search
                    </Link>
                  </div>
                </div>

                <h3 className="text-2xl mt-4 ">Legal</h3>
                <p>
                  All webtoon series names, images, and content are copyrighted
                  content of their respective license holders. I do not own the
                  rights to any of these webtoon series. Webtoon information
                  compiled from AniList. Usage of website agrees user to Terms
                  of Use.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-xl">Connect or give me a feedback: </p>

                <div className="flex gap-3">
                  <MediaButton link="https://www.linkedin.com/in/viet-do-8a8154217/">
                    <LinkedinIcon />
                  </MediaButton>
                  <MediaButton link="https://www.facebook.com/vanviet219/">
                    <FacebookIcon />
                  </MediaButton>
                  <MediaButton link="https://www.instagram.com/_vv.d__/">
                    <InstagramIcon />
                  </MediaButton>
                  <MediaButton link="mailto:dovanviet2109@gmail.com">
                    <MailIcon />
                  </MediaButton>
                </div>
              </div>
            </div>
          </div>
          <SlidingTextFooter />
        </footer>
      </body>
    </html>
  );
}
