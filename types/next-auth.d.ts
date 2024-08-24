// types/next-auth.d.ts

import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

// Extending the User and Session types from next-auth
declare module "next-auth" {
  interface User {
    id: string;
    role: string; // Add custom fields
  }

  interface Session {
    user: {
      id: string;
      role: string; // Add custom fields
    } & DefaultSession["user"];
  }
}
