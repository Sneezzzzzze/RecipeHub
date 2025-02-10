'use client';
import React, { useState, useEffect, useRef } from "react";
import ClayButton from "@clayui/button";
import { FaRegUserCircle } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import {supabase} from "@/utils/supabase/client";
import {redirect} from "next/navigation";
import Image from "next/image";
import Loading from "./loading";

export default function Header() {
    
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
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
            setLoading(true); // Start loading
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
            }
            setTimeout(() => {
                setLoading(false); // Stop loading after 2 seconds
            }, 4000);
        };
        fetchUser();
    }, []);


    // if (loading) {
    //     return (
    //         <div className="flex h-screen items-center justify-center bg-white">
    //             <Loading/>
    //         </div>
    //     );
    // }

    const handleLogin = async () => {
        redirect("/auth/signin");
    }
    const handleLogout = async () => {
        setIsOpen(false);
        setLoading(true);
        setTimeout(() => {
            setLoading(false); // Stop loading after 2 seconds
        }, 4000);
        await supabase.auth.signOut();
        setUser(null);
    };
    const handleHome = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false); // Stop loading after 2 seconds
        }, 4000);
        redirect("/");
    }
    return (
        <header className="fixed top-0 left-0 right-0 px-2 py-3 sm:px-5 sm:py-4 z-100 text-wrap
            ">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl sm:text-2xl font-semibold text-amber-500 cursor-pointer"
                     onClick={handleHome}>
                    RecipeHub
                </div>
                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-4 sm:space-x-6">
                    <ClayButton.Group spaced>
                        {!user ? (
                            <>
                                <button
                                    className="text-white mb-0"
                                    onClick={handleLogin}
                                >
                                    Sign In | Sign Up
                                </button>
                            </>
                        ): (
                            <>
                                {/* User Profile */}
                                {user?.user_metadata?.avatar_url ? (
                                    <button onClick={
                                        () => setIsOpen(!isOpen)}>
                                        <Image
                                            width={48}
                                            height={48}
                                            src={user?.user_metadata.avatar_url}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full border-2 border-black hover:border-gray-300"
                                        />
                                    </button>
                                ) : (
                                    <button onClick={() => setIsOpen(!isOpen)} className="">
                                        <FaRegUserCircle/>
                                    </button>
                                )}
                                    <div className={
                                        `origin-top-right absolute top-12 right-0 mt-2 w-44 rounded-lg shadow-xl bg-white
                                         ${
                                             isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                         }`}>
                                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu" className="pt-3">
                                            <li>
                                                <button
                                                    className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 w-full"
                                                >
                                                    Option 1
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 w-full"
                                                >
                                                    Option 2
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 w-full"
                                                    onClick={handleLogout}
                                                >
                                                    Option 3
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                            </>
                        )}

                    </ClayButton.Group>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden relative" ref={dropdownRef}>
                    <ClayButton.Group spaced>
                        {!user ? (
                            <>
                                <ClayButton
                                    borderless
                                    displayType="secondary"
                                    className="text-white"
                                    onClick={handleLogin}
                                >
                                    Sign In | Sign Up
                                </ClayButton>
                            </>
                        ): (
                            <>
                                {/* User Profile */}
                                {user?.user_metadata?.avatar_url ? (
                                    <button onClick={
                                        () => setIsOpen(!isOpen)}>
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
                                        <FaRegUserCircle/>
                                    </button>
                                )}

                                <div className={
                                    `origin-top-right absolute top-12 right-0 mt-2 w-44 rounded-lg shadow-xl bg-white
                                         ${
                                        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                    }`}>
                                    <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu" className="pt-3">
                                        <li>
                                            <button
                                                className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 w-full"
                                            >
                                                Option 1
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 w-full"
                                            >
                                                Option 2
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 w-full"
                                            >
                                                Option 3
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </ClayButton.Group>
                </div>
            </div>
        </header>
    );
}
