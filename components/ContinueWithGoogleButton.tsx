"use client";

import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AccountExistsModal from "./AccountExistsModal";
import { toast } from "sonner";

const ContinueWithGoogleButton = ({
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
            await auth?.loginWithGoogle();
            toast("Welcome!");

            if (handleNavigate === "back") router.back();
            if (handleNavigate === "refresh") router.refresh();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (e: any) {
            if (e.code === "auth/account-exists-with-different-credential") {
              // The pending Facebook credential.
              setAccountExistsFlag(true);
            }
          }
        }}
      >
        <Image
          src="/google.png"
          alt="Google logo"
          width={20}
          height={20}
          className="absolute left-2 my-auto"
        />
        Continue with Google
      </Button>
      <AccountExistsModal
        open={accountExistsFlag}
        setOpen={setAccountExistsFlag}
      />
    </>
  );
};

export default ContinueWithGoogleButton;
