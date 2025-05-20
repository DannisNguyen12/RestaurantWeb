// components/aboutUs.tsx
import React from 'react';
import Image from 'next/image';

const aboutUs: React.FC = () => {
  return (
    <section className="py-12 px-6">
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto">
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-bold text-green-500">EXPERIENCE AUTHENTIC FLAVORS</h3>
          <h2 className="text-3xl font-bold mt-2">Discover the richness of Vietnamese cuisine</h2>
          <p className="mt-4 text-gray-700">
            At Vietnameserestaurant, we bring the vibrant tastes of Vietnam right to Hornsby.
            Our carefully curated dishes showcase the unique flavors and fresh ingredients
            that Vietnamese cuisine is famous for.
          </p>
          <a href="#" className="text-green-500 hover:underline mt-4 inline-block">
            Get in touch
          </a>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src="https://images.eatingwell.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/1707339646/our-best-new-vegetable-side-dish-recipes-8651305.jpg"
            alt="Vietnamese Cuisine"
            width={600}
            height={400}
            className="w-full h-[400px] object-cover rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default aboutUs;