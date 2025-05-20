import { PrismaClient } from '@repo/database/generated/prisma';
import MenuItemDetail from '@repo/ui/item/detail';
import React from "react";
import LikeButton from "./LikeButton";
import AddToCartButton from "./AddToCartButton";

const prisma = new PrismaClient();

interface PageProps {
  params: { id: string };
}

export default async function ItemDetailPage({ params }: PageProps) {
  const itemId = Number(params.id);

  // Fetch the item by ID, including all relevant fields
  const item = await prisma.item.findUnique({
    where: { id: itemId },
    include: { likes: true },
  });

  if (!item) {
    return <div className="text-center mt-10 text-red-500">Item not found.</div>;
  }

  // Count likes
  const likeCount = item.likes.filter(like => like.type === "LIKE").length;

  // Map DB fields to the props expected by MenuItemDetail
  const detailProps = {
    id: item.id,
    name: item.name,
    description: item.description ?? "",
    price: item.price.toLocaleString("en-US", { style: "currency", currency: "USD" }),
    image: item.image ?? "",
    fullDescription: item.fullDescription ?? "",
    ingredients: Array.isArray(item.ingredients)
      ? item.ingredients.filter((i): i is string => typeof i === "string")
      : [],
    servingTips: Array.isArray(item.servingTips)
      ? item.servingTips.filter((i): i is string => typeof i === "string")
      : [],
    recommendations: Array.isArray(item.recommendations)
      ? item.recommendations.filter((i): i is string => typeof i === "string")
      : [],
    quantity: 1,
  };

  // Like button (client component)
  return (
    <>
      <MenuItemDetail item={detailProps} />
      <div className="flex gap-4 mt-4">
        <LikeButton itemId={item.id} likeCount={likeCount} />
        <AddToCartButton item={detailProps} />
      </div>
    </>
  );
}