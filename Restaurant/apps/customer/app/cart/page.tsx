import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CartClient from "./CartClient";

export default async function CartPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");
  if (!authToken) {
    redirect("/login");
  }
  return <CartClient />;
}
