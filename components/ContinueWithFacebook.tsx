"use client";

import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AccountExistsModal from "./AccountExistsModal";
import { toast } from "sonner";

const ContinueWithFacebookButton = ({
  handleNavigate,
}: {
  handleNavigate: "back" | "refresh";
}) => {
  const auth = useAuth();
  const router = useRouter();
  const [accountExistsFlag, setAccountExistsFlag] = useState(false);
  return (
    <>
      <Button
        className="w-full rounded-3xl text-xs bg-white text-black justify-center relative"
        onClick={async () => {
          try {
            await auth?.loginWithFacebook();
            toast("Welcome! You're now signed in.!");
            if (handleNavigate === "back") router.back();
            if (handleNavigate === "refresh") router.refresh();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (e: any) {
            if (e.code === "auth/account-exists-with-different-credential") {
              setAccountExistsFlag(true);
            }
          }
        }}
      >
        {" "}
        <Image
          src="/facebook.png"
          alt="Google logo"
          width={20}
          height={20}
          className="absolute my-auto left-2"
        />
        Continue with Facebook
      </Button>
      <AccountExistsModal
        open={accountExistsFlag}
        setOpen={setAccountExistsFlag}
      />
    </>
  );
};

export default ContinueWithFacebookButton;
