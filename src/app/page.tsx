'use client';

import "@clayui/css/lib/css/atlas.css";
import Search from './ui/component/search';
import Header from './ui/component/header';
import Content from './ui/component/content';
import Footer from "./ui/component/footer";
import React from "react";


export default function Home() {

    return (
        <>
            {/* Header */}
            <Header/>
            {/* Content */}
            <Content>
                <p className="text-3xl sm:text-4xl md:text-5xl text-black mb-3">RecipeHub</p>
                <p className="text-black sm:text-lg md:text-xl mb-4 p-1">Welcome to RecipeHub! Explore recipes, create your own, and share with the world.</p>
                <Search/>
            </Content>
            <Footer/>
            {/* Footer */}
        </>
    );
}
