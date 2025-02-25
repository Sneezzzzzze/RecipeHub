'use client';

import Search from '@/app/ui/components/search';
import Content from '@/app/ui/components/content';
import Footer from '@/app/ui/components/footer';
import DetailCard from '@/app/ui/components/detail-card';
import React from 'react';
import { Users, Star, Heart } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Content>
        <div className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl text-amber-500 mb-[10px] text-center">
          <div className="h-auto">
            <div>
              <span style={{ color: 'white' }}>Recipe</span>
              <span style={{ color: '#F59E0B' }}>Hub</span>
            </div>
          </div>
          <div className="text-amber-200 text-lg sm:text-lg md:text-xl mb-4 p-3">
            Welcome to RecipeHub! Explore recipes, create your own, and share with the world.
          </div>
        </div>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <Search />
        </div>
      </Content>
      <div className="flex justify-center space-x-8 my-8 gap-8">
        <DetailCard
          title="Join Community"
          description="Connect with other food lovers, share tips, and get inspired by their creations"
          Icon={Users}
        />
        <DetailCard
          title="Top Recipes"
          description="Discover the most popular recipes loved by our community"
          Icon={Star}
        />
        <DetailCard
          title="Favorites"
          description="Save your favorite recipes and access them anytime"
          Icon={Heart}
        />
      </div>
      <Footer />
    </>
  );
}