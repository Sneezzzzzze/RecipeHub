'use client';
import React, { useState, useEffect, useRef } from "react";
import ClayButton from "@clayui/button";
import ClayIcon from "@clayui/icon";
import {supabase} from "@/utils/supabase/client";
import {redirect} from "next/navigation";
import "@clayui/css/lib/css/atlas.css";
import Image from "next/image";

export default function Header() {
    
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null); // Specify the type for dropdownRef

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setTimeout(() => setIsOpen(false), 150); // Add a slight delay
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
            }
        };

        fetchUser();
    }, []);
    const handleLogin = async () => {
        redirect("/auth/signin");
    }
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsOpen(false);
        setUser(null);
    };

    return (
        <header className="fixed top-0 left-0 right-0 shadow-md px-4 py-3 sm:px-5 sm:py-4 z-10 text-wrap
            ">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl sm:text-2xl font-semibold text-black ">RecipeHub</div>
                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-4 sm:space-x-6">
                    <ClayButton.Group spaced>
                        <ClayButton borderless displayType="secondary">
                            Item 1
                        </ClayButton>
                        <ClayButton borderless displayType="secondary"
                                    className="text-black">
                            Item 2
                        </ClayButton>
                        <ClayButton borderless displayType="secondary"
                                    className="text-black">
                            Item 3
                        </ClayButton>
                        {!user ? (
                            <>
                                <ClayButton
                                    borderless
                                    displayType="secondary"
                                    className="text-black h-[48px]"
                                    onClick={handleLogin}
                                >
                                    Sign In / Sign Up
                                </ClayButton>
                            </>
                        ): (
                            <>
                                {/* User Profile */}
                                {user?.user_metadata?.avatar_url ? (
                                    <button onClick={() => setIsOpen(!isOpen)} className="">
                                        <Image
                                            width={48}
                                            height={48}
                                            src={user?.user_metadata.avatar_url}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-black"
                                        />
                                    </button>
                                ) : (
                                    <button onClick={() => setIsOpen(!isOpen)} className="">
                                    <ClayIcon
                                        symbol="user"
                                        spritemap="/images/icons.svg"
                                        style={{ fontSize: '48px', width: '36px', height: '36px' }}
                                        className="w-12 h-12 rounded-full hover:border-2 border-gray-300"
                                    />
                                    </button>
                                )}

                                <div
                                    className={`absolute right-0 top-12 bg-white shadow-lg rounded-lg p-3 space-y-2 w-40 transition-all duration-300 ${
                                        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                    }`}
                                >
                                    <ClayButton.Group spaced>
                                        <ClayButton borderless displayType="secondary">
                                            Profile
                                        </ClayButton>
                                        <ClayButton borderless displayType="secondary">
                                            Settings
                                        </ClayButton>
                                        <ClayButton
                                            borderless
                                            displayType="secondary"
                                            onClick={handleLogout}
                                        >
                                            Sign Out
                                            <ClayIcon
                                                symbol="sign-in"
                                                spritemap="/images/icons.svg"
                                                className="ml-2"
                                            />
                                        </ClayButton>
                                    </ClayButton.Group>
                                </div>
                            </>
                        )}

                    </ClayButton.Group>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden relative" ref={dropdownRef}>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-black ">
                        ☰
                    </button>

                    {/* Mobile Dropdown */}
                    <div
                        className={`absolute right-0 top-12 bg-white shadow-lg rounded-lg p-3 space-y-2 w-40 transition-all duration-300 ${
                            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                        }`}
                    >
                        <ClayButton.Group spaced>
                            <ClayButton borderless displayType="secondary">
                                Item 1
                            </ClayButton>
                            <ClayButton borderless displayType="secondary">
                                Item 2
                            </ClayButton>
                            <ClayButton borderless displayType="secondary">
                                Item 3
                            </ClayButton>
                            <ClayButton borderless displayType="secondary" aria-label="User">
                                Profile
                            </ClayButton>
                        </ClayButton.Group>
                    </div>
                </div>
            </div>
        </header>
    );
}
