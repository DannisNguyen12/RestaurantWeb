"use client";
import React, { useEffect, useState } from "react";
import Header from "@repo/ui/header/header";
import Footer from "@repo/ui/footer/footer";

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

export default function PaymentPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    // Simulate payment delay
    setTimeout(() => {
      setLoading(false);
      setMessage("Payment successful! Thank you for your order.");
      setCart([]);
      localStorage.removeItem("cart");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Payment</h1>
        {message ? (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-6 text-center">{message}</div>
        ) : (
          <form onSubmit={handlePay} className="bg-white p-6 rounded shadow-md space-y-4">
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Table Number</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={table}
                onChange={e => setTable(e.target.value)}
                required
                type="number"
                min={1}
              />
            </div>
            <div>
              <h2 className="font-bold mb-2">Order Summary</h2>
              {cart.length === 0 ? (
                <div className="text-gray-500">Your cart is empty.</div>
              ) : (
                <ul className="mb-2">
                  {cart.map(item => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex justify-between font-bold border-t pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded font-bold text-lg disabled:opacity-50"
              disabled={loading || cart.length === 0}
            >
              {loading ? "Processing Payment..." : "Pay Now"}
            </button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
}
