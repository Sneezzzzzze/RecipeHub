'use client';

import Typewriter from 'typewriter-effect';
import Search from '@/app/ui/components/search';
import NavBar from '@/app/ui/components/navbar';
import Content from '@/app/ui/components/content';
import Footer from "@/app/ui/components/footer";
import React from "react";

export default function Home() {

    return (
        <>
            {/* NavBar */}
            <NavBar/>
            {/* Content */}
            <Content>
                <div className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl text-amber-500 mb-4 text-center">
                    <Typewriter
                        options={{
                            strings: ['RecipeHub'],
                            autoStart: true,
                            loop: false,
                            deleteSpeed: 10000000,
                            cursor: '',
                        }}
                    />
                </div>
                <div className="text-amber-200 sm:text-lg md:text-xl mb-4 p-1">Welcome to RecipeHub! Explore recipes, create your own, and share with the world.</div>
                <Search/>
            </Content>
            <Footer/>
            {/* Footer */}
        </>
    );
}