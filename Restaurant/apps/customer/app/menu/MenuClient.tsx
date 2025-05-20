"use client";
import React, { useState } from "react";
import Header from "@repo/ui/header/header";
import Footer from "@repo/ui/footer/footer";
import Card from "@repo/ui/item/card";

interface Category {
  id: number;
  name: string;
}

interface Item {
  id: number;
  name: string;
  description?: string;
  price?: string;
  image?: string;
  category?: { name: string };
}

export default function MenuClient({ categories, items }: { categories: Category[]; items: Item[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = items.filter(item => {
    const matchesCategory = !selectedCategory || item.category?.name === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Menu</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            className={`px-3 py-1 rounded ${!selectedCategory ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`px-3 py-1 rounded ${selectedCategory === cat.name ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full mb-6 px-3 py-2 border rounded"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500">No items found.</div>
          ) : (
            filteredItems.map(item => (
              <Card
                key={item.id}
                item={{
                  ...item,
                  description: item.description ?? "",
                  image: item.image ?? "",
                }}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
