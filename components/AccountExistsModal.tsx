"use client";

import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import ContinueWithGoogleButton from "./ContinueWithGoogleButton";
import { Dispatch, SetStateAction } from "react";

const AccountExistsModal = ({
  open = false,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="bg-[#232323] text-white font-poppins border-0 w-[320px] flex flex-col items-center p-[12px] rounded-3xl pb-5">
        <div className="w-full flex justify-end">
          <Button
            className="rounded-full w-[32px] h-[32px] text-white"
            onClick={() => setOpen(false)}
          >
            <XIcon />
          </Button>
        </div>
        <div className="w-full px-[20px]">
          <DialogTitle className=" text-center ml-3">
            Can’t make another account with the same email!
          </DialogTitle>
          <DialogDescription className="text-xs text-light-gray text-center mt-3 mb-3">
            You already have an account with this email. Continue with the
            method below
          </DialogDescription>
        </div>

        <div className="w-full px-5 gap-4 flex flex-col">
          {" "}
          {/* conditional rendering 1 of these */}
          <ContinueWithGoogleButton handleNavigate="refresh" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountExistsModal;
