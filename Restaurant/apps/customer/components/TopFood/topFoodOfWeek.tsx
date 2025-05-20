// components/topFood.tsx
import React from 'react';
import Image from "next/image";

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const topFood: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage = "https://placehold.co/1920x800 ",
}) => {
  return (
    <section className="relative">
      <Image
        src={backgroundImage}
        alt="Hero"
        className="w-full h-[600px] object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
        <div>
          <h2 className="text-5xl font-bold">{title}</h2>
          {subtitle && <p className="text-2xl mt-2">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
};

export default topFood;