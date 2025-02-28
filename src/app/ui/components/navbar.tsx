'use client';
import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { supabase } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Loader from "@/app/ui/components/loading"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [imageTimestamp, setImageTimestamp] = useState(Date.now()); // For cache busting
    const router = useRouter();
    const pathname = usePathname();
    const isHome = pathname === "/" || pathname === "/profile";

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
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
                // Update timestamp to ensure we get a fresh image
                setImageTimestamp(Date.now());
            }
        };
        fetchUser();
    }, []);

    // Fetch profile image whenever the user changes or component mounts
    useEffect(() => {
        // Set up a listener for storage changes
        const channel = supabase
            .channel('profile-changes')
            .on('postgres_changes', {
                event: '*',
                schema: 'storage',
                table: 'objects',
                filter: `name=eq.${user?.id}`
            }, () => {
                // When storage changes, update the image timestamp
                setImageTimestamp(Date.now());
                fetchProfileImage(user.id);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]); // Runs whenever the `user` state changes
    // Add a function to fetch profile image
    const fetchProfileImage = async (userId: string) => {
        if (!userId) return;

        // Check if the image exists
        const { data: files, error } = await supabase.storage
            .from("profile_images")
            .list("", { search: userId });

        if (error || !files || files.length === 0) {
            console.log("No profile image found, using default.");
            setProfileImage("/default.jpg"); // Will fallback to default image
            return;
        }

        // If file exists, get public URL
        const { data } = supabase.storage
            .from("profile_images")
            .getPublicUrl(userId);

        setProfileImage(data?.publicUrl || "/default.jpg");
    };
    const handleSignUp = async () => router.push("/auth/signup")
    const handleLogin = async () => router.push("/auth/signin");
    const handleLogout = async () => {
        await supabase.auth.signOut();

        // Redirect to callback2path with current pathname
        const redirectPath = encodeURIComponent(pathname || "/"); // 안전한 기본값
        router.push(`/auth/callback2path?path=${redirectPath}`);

        setIsOpen(false);
        setUser(null);
    };
    const handleHome = () => {
        router.push("/");
    };
    const handleProfile = async () => router.push("/profile")

    return (
        <header className="top-5 left-0 right-0 px-4 py-3 z-50 flex-grow flex justify-center">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-xl sm:text-2xl font-semibold text-amber-500 cursor-pointer" onClick={handleHome}>
                    <div>
                        <span className={`font-medium cursor-pointer ${isHome ? "text-white" : "text-black"}`}>Recipe</span>
                        <span style={{ color: '#F59E0B' }}>Hub</span>
                    </div>
                </div>
                <div className="relative" ref={dropdownRef}>
                    {!user ? (
                        <>
                            <div className="flex">
                                <button
                                    onClick={() => router.push("/docs")}
                                    className="text-amber-500 font-medium cursor-pointer mx-4">
                                    doc
                                </button>
                                <button
                                    onClick={() => router.push("/result")}
                                    className="text-amber-500 font-medium cursor-pointer mx-4">
                                    Result
                                </button>
                                <button className={`font-medium cursor-pointer ${isHome ? "text-white" : "text-black"}`} onClick={handleLogin}>
                                    Sign In
                                </button>

                                <p className={`font-medium mb-0 mx-2 ${isHome ? "text-white" : "text-black"}`}> | </p>
                                <button className={`font-medium cursor-pointer ${isHome ? "text-white" : "text-black"}`} onClick={handleSignUp}>
                                    Sign Up
                                </button>
                            </div>
                        </>

                    ) : (
                        <>
                            <div className="flex">
                                <button
                                    onClick={() => router.push("/docs")}
                                    className="text-amber-500 font-medium cursor-pointer mx-4">
                                    docs
                                </button>
                                <button
                                    onClick={() => router.push("/result")}
                                    className="text-xl sm:text-2xl font-semibold text-amber-500 cursor-pointe mx-4">
                                    Result
                                </button>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="focus:outline-none cursor-pointer relative w-10 h-10"
                                >
                                    <Image
                                        alt="Profile Image"
                                        width={35}
                                        height={35}
                                        className="w-10 h-10 rounded-full border-3 border-transparent hover:border-amber-500 transition-colors duration-200 object-cover"
                                        src={
                                            user?.user_metadata?.avatar_url
                                                ? user.user_metadata?.avatar_url
                                                : profileImage
                                                    ? `${profileImage}?t=${imageTimestamp || Date.now()}`
                                                    : '/default.jpg'
                                        }
                                        priority
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = '/default.jpg'; // Fallback to default image on error
                                        }}
                                    />
                                </button>
                            </div>
                            {isOpen && (
                                <div className="absolute right-0 mt-2  h-auto bg-white rounded-md shadow-lg overflow-hidden z-50 w-[200px]">
                                    <ul className="py-2 text-gray-700 text-center">
                                        <li>
                                            <button className="p-2 w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleProfile}>Profile</button>
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