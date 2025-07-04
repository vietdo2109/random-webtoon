"use client";

import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Dropdown = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    containerRef.current = document.getElementById("menu-container");
    if (containerRef.current) {
      setContainer(containerRef.current);
    }
  }, []);
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="text-white">
        <MenuIcon />
      </DropdownMenuTrigger>

      {container && (
        <DropdownMenuPortal
          container={document.getElementById("menu-container")!}
        >
          <DropdownMenuContent className="bg-dark-gray p-5 rounded-2xl flex w-full relative">
            <DropdownMenuItem>
              <Link
                href="/generator"
                className="hover:underline decoration-2 underline-offset-2"
              >
                Generator
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/similar-webtoon"
                className="hover:underline decoration-2 underline-offset-2"
              >
                Webtoon like..
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/spinner"
                className="hover:underline decoration-2 underline-offset-2"
              >
                Spinner
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/about"
                className="hover:underline decoration-2 underline-offset-2"
              >
                About
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      )}
    </DropdownMenu>
  );
};

export default Dropdown;
