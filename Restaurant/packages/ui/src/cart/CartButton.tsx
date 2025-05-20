"use client";
import { useEffect, useState } from "react";

export default function CartButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function updateCount() {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCount(cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0));
    }
    updateCount();
    window.addEventListener("storage", updateCount);
    return () => window.removeEventListener("storage", updateCount);
  }, []);

  return (
    <a href="/cart" className="relative inline-block ml-4">
      <span className="material-icons align-middle">shopping_cart</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-2">
          {count}
        </span>
      )}
    </a>
  );
}