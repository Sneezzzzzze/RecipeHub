'use client';
import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { supabase } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
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
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
            }
            setLoading(false);
        };
        fetchUser();
    }, []);
    const handleSignUp = async () => redirect("/auth/signup")
    const handleLogin = async () => redirect("/auth/signin");
    const handleLogout = async () => {
        setIsOpen(false);
        setLoading(true);
        await supabase.auth.signOut();
        setUser(null);
        setLoading(false);
    };
    const handleHome = () => {
        window.location.href = "/";
    };

    return (
        <header className="top-5 left-0 right-0 px-4 py-3 z-50 flex-grow flex justify-center">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-xl sm:text-2xl font-semibold text-amber-500 cursor-pointer" onClick={handleHome}>
                    RecipeHub
                </div>
                <div className="relative" ref={dropdownRef}>
                    {!user ? (
                        <>
                            <div className="flex ">
                                <button className="text-white font-medium cursor-pointer" onClick={handleLogin}>
                                    Sign In
                                </button>
                                <p className="text-white font-medium mb-0 mx-2"> | </p>
                                <button className="text-white font-medium cursor-pointer" onClick={handleSignUp}>
                                    Sign Up
                                </button>
                            </div>
                        </>

                    ) : (
                        <>
                            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none cursor-pointer">
                                {user?.user_metadata?.avatar_url ? (
                                    <Image width={35} height={35} src={user.user_metadata.avatar_url} alt="Profile" className="rounded-full border border-gray-300 mb-0" />
                                ) : (
                                    <FaUserCircle className="text-white w-10 h-10" />
                                )}
                            </button>
                            {isOpen && (
                                <div className="absolute right-0 mt-2  h-auto bg-white rounded-md shadow-lg overflow-hidden z-50 w-[200px]">
                                    <ul className="py-2 text-gray-700 text-center">
                                        <li>
                                            <button className="p-2 w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => redirect("/settings")}>Settings</button>
                                        </li>
                                        <li>
                                            <button className="p-2 w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => redirect("/profile")}>Profile</button>
                                        </li>
                                        <li>
                                            <button className="p-2 w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" onClick={handleLogout}>
                                                Sign Out <GoSignOut className="ml-2" />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}