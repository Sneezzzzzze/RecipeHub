'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Navbar from '@/app/ui/components/navbar';
import Footer from "@/app/ui/components/footer";
import Radio from "@/app/ui/components/ratdio-button"; // Assume Radio component is updated
import { supabase } from "@/utils/supabase/client";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

interface FoodItem {
    id: string;
    title: string;
    image: string;
    description: string;
    category?: string;
}

export default function Result() {
    const [data, setData] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
    const [bookmarks, setBookmarks] = useState<FoodItem[]>([]);
    const [foodMarkColor, setFoodMarkColor] = useState<{ [key: string]: boolean }>({});
    const [selectedRadio, setSelectedRadio] = useState('ingredients'); // Default to 'ingredients'
    const router = useRouter();

    useEffect(() => {
        import("@clayui/css/lib/css/atlas.css");

        const fetchUser = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
                    setUser(session.user);
                    // Get user-specific search data from localStorage
                    const storedData = localStorage.getItem(`${session.user.user_metadata?.sub}_searchData`);
                    setData(storedData ? JSON.parse(storedData) : []);
                } else {
                    // Get guest search data from sessionStorage
                    const guestData = sessionStorage.getItem("guest_searchData");
                    setData(guestData ? JSON.parse(guestData) : []);
                }
            } catch (error) {
                console.error("Error fetching user session:", error);
            } finally {
                setTimeout(() => setLoading(false), 1000);
            }
        };

        fetchUser();
    }, []); // Run only on mount
    console.log(data)
    // Fetch bookmarks when user is available
    useEffect(() => {
        if (!user) {
            // Handle guest (unauthenticated) user bookmarks from localStorage
            const storedBookmarks = localStorage.getItem("guest_bookmarks");
            if (storedBookmarks) {
                const parsedBookmarks = JSON.parse(storedBookmarks);
                setBookmarks(parsedBookmarks);

                // Update foodMarkColor for bookmarked items
                const bookmarkMap = parsedBookmarks.reduce((acc: { [key: string]: boolean }, item: FoodItem) => {
                    acc[item.id] = true;
                    return acc;
                }, {});
                setFoodMarkColor(bookmarkMap);
            } else {
                setBookmarks([]); // Reset bookmarks if none exist
                setFoodMarkColor({});
            }
        } else {
            // Handle authenticated user bookmarks from sessionStorage
            const storedBookmarks = sessionStorage.getItem(`${user.user_metadata?.sub}_bookmarks`);
            if (storedBookmarks) {
                const parsedBookmarks = JSON.parse(storedBookmarks);
                setBookmarks(parsedBookmarks);

                // Update foodMarkColor for bookmarked items
                const bookmarkMap = parsedBookmarks.reduce((acc: { [key: string]: boolean }, item: FoodItem) => {
                    acc[item.id] = true;
                    return acc;
                }, {});
                setFoodMarkColor(bookmarkMap);
            } else {
                setBookmarks([]); // Reset bookmarks if none exist
                setFoodMarkColor({});
            }
        }
    }, [user]); // Runs when `user` is updated

    // Update search results when `data` changes
    useEffect(() => {
        setSearchResults(data);
    }, [data]);

    // Merge bookmarks into search results, avoiding duplicates
    useEffect(() => {
        setSearchResults((prevResults) => {
            const mergedMap = new Map();

            // Add search results first
            prevResults.forEach((item) => mergedMap.set(item.id, item));

            // Add bookmarks (ensuring they stay in results)
            bookmarks.forEach((bookmark) => mergedMap.set(bookmark.id, bookmark));

            return Array.from(mergedMap.values());
        });
    }, [bookmarks]); // Runs when bookmarks change

    const handleBookmark = (item: FoodItem, event: React.MouseEvent) => {
        event.stopPropagation();
        const isBookmarked = foodMarkColor[item.id];
        const updatedBookmarks = isBookmarked
            ? bookmarks.filter((bookmark) => bookmark.id !== item.id)
            : [...bookmarks, item];

        if (user) {
            sessionStorage.setItem(`${user.user_metadata?.sub}_bookmarks`, JSON.stringify(updatedBookmarks));
        } else {
            localStorage.setItem("guest_bookmarks", JSON.stringify(updatedBookmarks));
        }

        setBookmarks(updatedBookmarks);
        setFoodMarkColor({ ...foodMarkColor, [item.id]: !isBookmarked });
    };

    const handleRadioChange = (value: string) => {
        setSelectedRadio(value); // Update selected radio
    };

    const handleClick = (id: string, title: string) => {
        // Passing selectedRadio and title (food name) as query params
        router.push(`/result/${id}?view=${selectedRadio}&name=${encodeURIComponent(title)}`);
    };
    return (
        <>
            <Navbar />
            <div className="flex w-full h-[150px] items-center justify-center relative" style={{ backgroundImage: `url("/image-header.png")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <Radio name="main" notification={data?.length ?? 0} selectedRadio={selectedRadio} onChange={handleRadioChange} />
            </div>

            <div className="flex flex-col lg:flex-row justify-center items-start w-full max-w-screen-xl mx-auto gap-6 p-6">
                <div className="w-full lg:w-2/3">
                    <h1 className="text-2xl font-bold mb-4">Search Result</h1>
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[...Array(data.length ?? 0)].map((_, index) => (
                                <div key={index} className="relative bg-gray-200 animate-pulse rounded-xl h-56">
                                    <div className="bg-gray-300 w-100 h-32 rounded-xl mb-4 mx-auto"></div>
                                    <div className="bg-gray-300 w-60 h-6 mb-2 mx-auto"></div>
                                </div>
                            ))}
                        </div>
                    ) : (data?.length ?? 0) > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {searchResults.map((item) => (
                                <div
                                    key={item.id}
                                    className="relative bg-white border-2 border-[#FDE047] shadow-[4px_4px_#F59E0B] rounded-xl overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                                    onClick={() => handleClick(item.id, item.title)}>
                                    <Image width={400} height={250} src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                                    <div className="p-4">
                                        <h2 className="text-lg font-bold">{item.title}</h2>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                        <p className="text-sm mt-2">{item.description}</p>
                                    </div>
                                    <button
                                        className={`absolute top-4 right-4 ${foodMarkColor[item.id] ? 'text-amber-500' : 'text-black'} hover:text-amber-500 cursor-pointer`}
                                        onClick={(event) => handleBookmark(item, event)}>
                                        {foodMarkColor[item.id] ? <FaBookmark className="w-8 h-8" /> : <CiBookmark className="w-8 h-8" />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="mb-8">No results found</p>
                    )}
                </div>

                <div className="w-full lg:w-1/3">
                    <h2 className="text-2xl font-bold mb-4 ml-3">FoodMark</h2>
                    <div className="flex flex-col gap-5 mt-4 ml-3">
                        {bookmarks.map((item, index) => (
                            <div key={index} className="flex items-center justify-between bg-white border-2 border-yellow-300 rounded-lg shadow-md p-2">
                                <div className="flex items-center w-full cursor-pointer"
                                     onClick={() => handleClick(item.id, item.title)}
                                >
                                    <Image
                                        width={80}
                                        height={80}
                                        src={item.image}
                                        alt={item.title}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div className="ml-2">
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                    </div>
                                </div>

                                <div className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-yellow-100">
                                    <MdOutlineDelete className="w-6 h-6 text-amber-500"
                                                     onClick={(event) => handleBookmark(item, event)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-right text-sm text-gray-500 mt-2 cursor-pointer hover:text-gray-700">({bookmarks.length})</p>
                </div>
            </div>

            <Footer />
        </>
    );
}