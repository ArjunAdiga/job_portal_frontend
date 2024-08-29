"use client";
import SignUp from "./auth/SignUp";
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
