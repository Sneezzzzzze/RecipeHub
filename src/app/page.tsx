'use client';

import "@clayui/css/lib/css/atlas.css";
import Search from './ui/components/search';
import NavBar from './ui/components/navbar';
import Content from './ui/components/content';
import Footer from "./ui/components/footer";
import React from "react";

export default function Home() {

    return (
        <>
            {/* NavBar */}
            <NavBar/>
            {/* Content */}
            <Content>
                <p className="text-3xl sm:text-4xl md:text-5xl text-black mb-3 text-center">RecipeHub</p>
                <p className="text-black sm:text-lg md:text-xl mb-4 p-1">Welcome to RecipeHub! Explore recipes, create your own, and share with the world.</p>
                <Search/>
            </Content>
            <Footer/>
            {/* Footer */}
        </>
    );
}
