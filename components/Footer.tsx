import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
} from "lucide-react";
import SlidingTextFooter from "./SlidingTextFooter";
import MediaButton from "./MediaButton";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center gap-4 overflow-hidden mt-[80px]">
      <div className="w-full h-[1px] bg-zinc-500 mb-5"></div>
      <div className="flex flex-col gap-4 w-full max-w-6xl px-4 md:px-8 text-light-gray ">
        <div className="flex justify-between flex-col gap-4 md:flex-row">
          <div className="flex flex-col w-full">
            <p className="text-2xl">
              Random Webtoon was created, and is maintained, by Viet (VDuck).
            </p>

            <h3 className="text-2xl mt-4">Navigation</h3>
            <div className="flex w-[full] justify-between mt-1 flex-wrap md:max-w-md">
              <div className="flex flex-col gap-1">
                <Link href="/" className="hover:text-gray-200">
                  Home
                </Link>
                <Link href="/generator" className="hover:text-gray-200">
                  Generator
                </Link>
                <Link href="/similar-webtoon" className="hover:text-gray-200">
                  Webtoon like
                </Link>
              </div>
              <div className="flex flex-col gap-1">
                <Link href="/random-combo" className="hover:text-gray-200">
                  Random Combo
                </Link>
                <Link href="/about" className="hover:text-gray-200">
                  About
                </Link>
                <Link href="/search" className="hover:text-gray-200">
                  Search
                </Link>
              </div>
            </div>

            <h3 className="text-2xl mt-4 ">Legal</h3>
            <p className="mt-1 font-poppins text-sm">
              All webtoon series names, images, and content are copyrighted
              content of their respective license holders. I do not own the
              rights to any of these webtoon series. Webtoon information
              compiled from AniList. Usage of website agrees user to Terms of
              Use.
            </p>
          </div>

          <div className="flex gap-5 w-full justify-center mt-2 md:justify-end md:w-[40%]">
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
      <SlidingTextFooter />
    </footer>
  );
};

export default Footer;
