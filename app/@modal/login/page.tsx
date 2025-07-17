"use client";
import ContinueWithFacebookButton from "@/components/ContinueWithFacebook";
import ContinueWithGoogleButton from "@/components/ContinueWithGoogleButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const SignInModalIntercept = () => {
  const route = useRouter();
  return (
    <Dialog
      open={true}
      onOpenChange={() => {
        route.back();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="bg-[#232323] text-white font-poppins border-0 w-[320px] flex flex-col items-center p-[12px] rounded-3xl pb-5"
      >
        <div className="w-full flex justify-end">
          <DialogClose asChild>
            <Button className="rounded-full w-[32px] h-[32px] text-white">
              <XIcon />
            </Button>
          </DialogClose>
        </div>
        <div className="w-full px-[20px]">
          <DialogTitle className=" text-center">
            Sign in to save your series!
          </DialogTitle>
          <DialogDescription className="text-xs text-light-gray text-center mt-3 mb-3">
            Create an account or sign in to get your random webtoons
          </DialogDescription>
        </div>

        <div className="w-full px-5 gap-4 flex flex-col">
          {" "}
          <ContinueWithGoogleButton handleNavigate="back" />
          <ContinueWithFacebookButton handleNavigate="back" />
          <div className="text-center text-[10px] mt-3 text-light-gray">
            By creating an account, I agree to the{" "}
            <span className="underline cursor-pointer">Terms of Service</span>{" "}
            and <span className="underline cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModalIntercept;
