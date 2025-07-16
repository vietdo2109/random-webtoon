"use client";

import { auth } from "@/firebase/client";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { removeToken, setToken } from "./actions";

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextType = {
  currentUser: User | null;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
};
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user ?? null);
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const token = tokenResult.token;
        const refreshToken = user.refreshToken;

        if (token && refreshToken) {
          await setToken({ token, refreshToken });
        }
      } else {
        await removeToken();
      }
    });

    return () => unsubscribe(); // clean up
  }, []);

  const logout = async () => {
    await auth.signOut();
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const loginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    // (optional) make sure you at least request the default scopes
    provider.addScope("public_profile");

    const result = await signInWithPopup(auth, provider);

    // 1️⃣ grab the OAuth token
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    console.log("Facebook Access Token:", token);
    if (token) {
      // 2️⃣ build a token‑protected URL
      const securePhotoURL = appendAccessToken(result.user.photoURL, token);

      // 3️⃣ write it back to the Firebase user profile
      await updateProfile(result.user, { photoURL: securePhotoURL });

      // 4️⃣ reflect the change in React state
      setCurrentUser({ ...result.user, photoURL: securePhotoURL });
    }
  };
  return (
    <AuthContext.Provider
      value={{ currentUser, logout, loginWithGoogle, loginWithFacebook }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function appendAccessToken(url: string | null, token: string): string {
  if (url === null) {
    return "";
  }
  const hasToken = url.includes("access_token=");
  if (hasToken) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}access_token=${token}`;
}
export const useAuth = () => useContext(AuthContext);
