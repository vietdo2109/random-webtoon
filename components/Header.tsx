"use client";

import { useAuth } from "@/context/auth";
import { ArchiveIcon, MenuIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AuthButton from "./AuthButton";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignInModal from "./SignInModal";
const Header = () => {
  const [isMenuOut, setIsMenuOut] = useState(false);
  const toggleIdMenuOut = () => {
    setIsMenuOut(!isMenuOut);
  };
  const auth = useAuth();

  return (
    <header
      className="w-full max-w-6xl bg-dark-gray flex flex-col px-4 md:px-8 justify-between items-center 
        py-3 sm:py-5 sticky top-0 z-200"
    >
      <div className="w-full justify-between items-center flex">
        <div className="flex gap-10 h-[32px] items-center">
          <div className="relative h-[32px] sm:h-[40px]  aspect-[250/120]">
            {" "}
            <Link href="/">
              <Image
                src={"/logo-full.png"}
                alt="logo"
                className="object-fill"
                fill
              />
            </Link>
          </div>

          <div className="hidden md:flex gap-6 items-center text-gray-200 font-lilita-one font-thin text-sm tracking-wider">
            <Link
              href="/generator"
              className="hover:underline decoration-2 underline-offset-2"
            >
              Generator
            </Link>
            <Link
              href="/similar-webtoon"
              className="hover:underline decoration-2 underline-offset-2"
            >
              Webtoon like..
            </Link>
            <Link
              href="/random-combo"
              className="hover:underline decoration-2 underline-offset-2"
            >
              Random Combo
            </Link>
            <Link
              href="/about"
              className="hover:underline decoration-2 underline-offset-2"
            >
              About
            </Link>
          </div>
        </div>

        <div className="hidden md:flex justify-between items-center text-white gap-8">
          <Link href={"/search"}>
            {" "}
            <SearchIcon className="cursor-pointer" />
          </Link>
          <Link href={"/my-series"}>
            <ArchiveIcon className="cursor-pointer" />
          </Link>
          <AuthButton />
        </div>
        <div
          className="md:hidden text-white cursor-pointer"
          onClick={toggleIdMenuOut}
        >
          <MenuIcon />
        </div>
      </div>
      {isMenuOut && (
        <div className="w-full flex flex-col gap-4 mt-4 text-gray-200 font-lilita-one font-thin text-md tracking-wider md:hidden ">
          <Link
            href="/generator"
            className="hover:underline decoration-2 underline-offset-2"
          >
            Generator
          </Link>
          <Link
            href="/similar-webtoon"
            className="hover:underline decoration-2 underline-offset-2"
          >
            Webtoon like..
          </Link>
          <Link
            href="/random-combo"
            className="hover:underline decoration-2 underline-offset-2"
          >
            Random Combo
          </Link>
          <Link
            href="/about"
            className="hover:underline decoration-2 underline-offset-2"
          >
            About
          </Link>
          <Link
            href={"/my-series"}
            className="hover:underline decoration-2 underline-offset-2"
          >
            My series
          </Link>
          <Link
            href={"/search"}
            className="hover:underline decoration-2 underline-offset-2"
          >
            {" "}
            Search
          </Link>
          {!!auth?.currentUser && (
            <Avatar>
              {!!auth?.currentUser.photoURL && (
                <Image
                  src={auth.currentUser.photoURL}
                  alt={`${auth.currentUser.displayName} avatar`}
                  width={70}
                  height={70}
                ></Image>
              )}
              <AvatarFallback className="text-sky-950">
                {(auth.currentUser.displayName || auth.currentUser.email)?.[0]}
              </AvatarFallback>
            </Avatar>
          )}
          {!auth?.currentUser && (
            <SignInModal />
            // <a className="hover:underline decoration-2 underline-offset-2 cursor-pointer">
            //   {" "}
            //   sign in
            // </a>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
