import React from "react";
import { PrismaClient } from '@repo/database/generated/prisma';
import MenuClient from "./MenuClient";

export default async function MenuPage() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  const dbItems = await prisma.item.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } });

  // Map to expected Item[] type
  const items = dbItems.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description ?? "",
    price: item.price !== null && item.price !== undefined ? String(item.price) : undefined,
    image: item.image ?? "",
    category: item.category ? { name: item.category.name } : undefined,
  }));

  return <MenuClient categories={categories} items={items} />;
}
