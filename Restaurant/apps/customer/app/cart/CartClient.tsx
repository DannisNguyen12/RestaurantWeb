"use client";
import React, { useEffect, useState } from "react";
import Header from "@repo/ui/header/header";
import Footer from "@repo/ui/footer/footer";
import Card from "@repo/ui/item/card";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image?: string;
  quantity: number;
}

export default function CartClient() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load cart from localStorage
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const updateCart = (updated: CartItem[]) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeFromCart = (id: number) => {
    const updated = cart.filter(item => item.id !== id);
    updateCart(updated);
  };

  const changeQuantity = (id: number, delta: number) => {
    const updated = cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    updateCart(updated);
  };

  const handlePayment = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Payment successful! Order ID: " + data.orderId);
        setCart([]);
        localStorage.removeItem("cart");
        // Optionally redirect to order summary
        // router.push(`/order/${data.orderId}`);
      } else {
        setMessage(data.error || "Payment failed.");
      }
    } catch {
      setMessage("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {message && (
          <div className={`mb-4 p-2 rounded ${message.startsWith("Payment successful") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}
        {cart.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cart.map(item => (
              <div key={item.id} className="relative p-2 border rounded bg-white">
                <Card item={{ ...item, image: item.image || "" }} />
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => changeQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => changeQuantity(item.id, 1)}
                  >
                    +
                  </button>
                  <button
                    className="ml-auto bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <button
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded font-bold text-lg disabled:opacity-50"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
}
