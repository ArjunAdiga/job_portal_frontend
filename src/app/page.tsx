"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SignUp from "./auth/SignUp";
import { Box } from "@mui/material";
import { useState } from "react";
import SignIn from "./auth/signIn";

export default function Home() {
  const [loginState, setLoginState] = useState<boolean>(false);
  const handleLogin = () => {
    setLoginState((prev) => !prev);
  };
  return (
    <div>
      {loginState ? (
        <SignIn login={handleLogin} />
      ) : (
        <SignUp login={handleLogin} />
      )}
    </div>
  );
}
