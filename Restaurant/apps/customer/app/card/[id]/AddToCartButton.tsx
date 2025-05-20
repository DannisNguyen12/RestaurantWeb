"use client";
import { useState } from "react";

type CartItem = {
  id: string;
  quantity: number;
  [key: string]: unknown;
};

export default function AddToCartButton({ item }: { item: CartItem }) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    // Get cart from localStorage or initialize
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    // Check if item already in cart
    const existing = cart.find((i: CartItem) => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      onClick={handleAddToCart}
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}