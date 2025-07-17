"use client";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  addMySeries,
  removeMySeries,
} from "@/app/(pages)/webtoon/[id]/[slug]/action";
import { CheckCircle, PlusCircle } from "lucide-react";

const MySeriesButton = ({
  webtoonId,
  isMySeries,
  bgColor,
}: {
  webtoonId: number;
  isMySeries: boolean;
  bgColor: string;
}) => {
  const auth = useAuth();
  const router = useRouter();
  return (
    <Button
      asChild
      onClick={async () => {
        const tokenRetsult = await auth?.currentUser?.getIdTokenResult();
        if (!tokenRetsult) {
          router.push("/login");
          return;
        }
        if (isMySeries) {
          await removeMySeries(webtoonId, tokenRetsult.token);
        } else {
          await addMySeries(webtoonId, tokenRetsult.token);
        }

        router.refresh();
      }}
      className={` bg-${bgColor} px-0 py-0 has-[>svg]:px-0 has-[>svg]:py-0`}
    >
      {!isMySeries ? (
        <PlusCircle width={"26px"} height={"26px"} />
      ) : (
        <CheckCircle width={"26px"} height={"26px"} />
      )}
    </Button>
  );
};

export default MySeriesButton;
