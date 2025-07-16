"use client";

import { useAuth } from "@/context/auth";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, UserIcon } from "lucide-react";
import SignInModal from "./SignInModal";

const AuthButton = () => {
  const auth = useAuth();
  const router = useRouter();
  return (
    <div className="flex items-center">
      {!!auth?.currentUser && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-6 h-6">
              {!!auth?.currentUser.photoURL && (
                <img
                  src={auth.currentUser.photoURL}
                  alt={`${auth.currentUser.displayName} avatar`}
                  width={70}
                  height={70}
                ></img>
              )}
              <AvatarFallback className="text-sky-950">
                {(auth.currentUser.displayName || auth.currentUser.email)?.[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="z-300 shadow-black shadow-2xl bg-[#232323] border-1 border-[#393939] mt-6 min-w-[320px] hidden md:block font-poppins text-xs text-white p-2"
            align="end"
          >
            <DropdownMenuLabel className="flex gap-2 items-center">
              <Avatar className="w-7 h-7">
                {!!auth?.currentUser.photoURL && (
                  <img
                    src={auth.currentUser.photoURL}
                    alt={`${auth.currentUser.displayName} avatar`}
                    width={70}
                    height={70}
                  ></img>
                )}
                <AvatarFallback className="text-sky-950">
                  {
                    (auth.currentUser.displayName ||
                      auth.currentUser.email)?.[0]
                  }
                </AvatarFallback>{" "}
              </Avatar>
              <div className="flex flex-col gap-1">
                <div className="font-normal text-xs">
                  {auth.currentUser.email}
                </div>{" "}
                <div className=" text-[10px] text-light-gray">
                  {auth.currentUser.providerData[0].providerId ===
                    "google.com" && "Google account"}
                  {auth.currentUser.providerData[0].providerId ===
                    "facebook.com" && "Facebook account"}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem
              asChild
              className="text-xs mt-3 flex justify-between items-center "
            >
              <Link href="/account">
                <p>My Account</p>
                <ChevronRight className="text-white" />
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="w-80% bg-[#393939]" />
            <DropdownMenuItem
              onClick={async () => {
                await auth.logout();
                router.refresh();
              }}
              className="text-xs mt-1"
            >
              <div className=" w-full flex justify-center">
                <span className="px-auto">Sign out</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {!auth?.currentUser && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="z-300 shadow-black shadow-2xl bg-[#232323] border-1 border-[#393939] mt-6 min-w-[320px] hidden md:block "
            align="end"
          >
            <div className="flex items-center p-2">
              <div className="rounded-full overflow-hidden">
                {" "}
                <Image
                  src={"/empty-profile.png"}
                  alt="emtpy profile image"
                  width={36}
                  height={36}
                ></Image>
              </div>
              <div className="flex-1 flex flex-col text-white ml-4 gap-[2px]">
                <p className="text-xs font-semibold">No account</p>
                <p className="text-[10px] tracking-wide text-gray-400 font-medium">
                  Sign in to enjoy more!
                </p>
              </div>
              <div>
                <SignInModal />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default AuthButton;
