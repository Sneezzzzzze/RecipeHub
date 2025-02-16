import React from "react";
import { FaGithub, FaHeart  } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-amber-200 items-center">
            <div className="w-full h-full text-center flex flex-col items-center p-4">
                <p className="text-[30px] p-2 py-4">About Us</p>

                {/* Made with love in one line */}
                <span className="flex items-center text-center text-lg">
                    Made with <FaHeart className="text-red-600 mx-1" /> by Junbeom, Chaipipat
                </span>

                {/* Centered GitHub Icon with Clickable Link */}
                <FaGithub
                    onClick={() => window.open("https://github.com/Sneezzzzzze/RecipeHub", "_blank")}
                    className="h-[40px] w-[40px] mt-2 cursor-pointer hover:text-amber-400 transition duration-300"
                />

                <div className="flex items-center gap-2 justify-center py-2">
                    <span className="text-sm text-gray-500">
                        © {new Date().getFullYear()} All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}