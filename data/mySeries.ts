import "server-only";
import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";
// import { auth, firestore, getTotalPages } from "@/firebase/server";

export const getMySeriesIds = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    return {};
  }

  const verifiedToken = await auth.verifyIdToken(token);
  if (!verifiedToken) {
    return {};
  }

  const mySeriesSnapshot = await firestore
    .collection("mySeries")
    .doc(verifiedToken.uid)
    .get();
  const mySeries = mySeriesSnapshot.data();
  return mySeries || {};
};
