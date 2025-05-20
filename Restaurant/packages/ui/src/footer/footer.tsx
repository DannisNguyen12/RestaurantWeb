// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white p-6">
      <div className="max-w-6xl mx-auto text-center">
        <p>Privacy Policy</p>
        <p className="mt-8">
          Web design by{' '}
          <a href="#" className="text-green-500 hover:underline">
            Manh Long Nguyen
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;