import React from "react";
import Header from "@repo/ui/header/header";
import Footer from "@repo/ui/footer/footer";
import ListOfCard from "@repo/ui/item/listOfCard";
import AboutUs from "../components/AboutUs/aboutUs";

//Import PrismaClient from generated client
import { PrismaClient } from '@repo/database/generated/prisma';

const prisma = new PrismaClient()

export default async function Home() {
  // Fetch items from the database (with their categories if needed)
  const dbItems = await prisma.item.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  // Map items to match the expected prop types for ListOfCard
  const items = dbItems.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description ?? "",
    price: item.price !== null && item.price !== undefined ? String(item.price) : undefined,
    image: item.image ?? "",
  }));

  return (
    <>
      <Header />
      <ListOfCard items={items} />
      <AboutUs />
      <Footer />
    </>
  );
}
