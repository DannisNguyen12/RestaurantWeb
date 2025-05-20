// components/Header.tsx
import React from 'react';
import CartButton from '../cart/CartButton';

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white p-6">
      <nav className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">VIETNAMESERESTAURANT</h1>
        <div className="flex space-x-6 items-center">
          <a href="/" className="hover:text-green-400">
            Home
          </a>
          <a href="/about" className="hover:text-green-400">
            About
          </a>
          <a href="/menu" className="text-green-400 border-b-2 border-green-400">
            Menu
          </a>
          <button className="bg-white text-black px-4 py-2 rounded">
            CONTACT
          </button>
          <CartButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;