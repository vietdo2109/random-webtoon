"use server";

import { auth, firestore } from "@/firebase/server";
import { FieldValue } from "firebase-admin/firestore";
export const removeMySeries = async (webtoonId: number, token: string) => {
  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  await firestore
    .collection("mySeries")
    .doc(verifiedToken.uid)
    .update({
      [webtoonId]: FieldValue.delete(),
    });
};

export const addMySeries = async (webtoonId: number, token: string) => {
  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  await firestore
    .collection("mySeries")
    .doc(verifiedToken.uid)
    .set(
      {
        [webtoonId]: true,
      },
      {
        merge: true,
      }
    );
};
