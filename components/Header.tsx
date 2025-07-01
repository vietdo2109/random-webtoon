"use client";

import { ArchiveIcon, MenuIcon, SearchIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOut, setIsMenuOut] = useState(false);
  const toggleIdMenuOut = () => {
    setIsMenuOut(!isMenuOut);
  };
  return (
    <header
      className="w-full max-w-6xl bg-dark-gray flex flex-col px-2 md:px-8 justify-between items-center 
        py-4 sticky top-0 z-1000 "
    >
      <div className="w-full justify-between items-center flex">
        <div className="flex gap-10">
          <Link href="/">
            <Image
              src={"/logo-full.png"}
              alt="logo"
              className="object-fill"
              width={100}
              height={20}
            />
          </Link>
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
          <UserIcon className="cursor-pointer" />
        </div>
        <Button className="md:hidden" onClick={toggleIdMenuOut}>
          <MenuIcon />
        </Button>
      </div>
      {isMenuOut && (
        <div className="w-full flex flex-col gap-4 mt-10 text-gray-200 font-lilita-one font-thin text-md tracking-wider">
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
            href="/spinner"
            className="hover:underline decoration-2 underline-offset-2"
          >
            Spinner
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
        </div>
      )}
    </header>
  );
};

export default Header;
