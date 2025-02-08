import ClayIcon from "@clayui/icon";
import React from "react";

export default function Footer() {
    return (
        <footer className="mt-auto bg-gray-100 px-4 py-3 sm:px-5 sm:py-4 border-t text-wrap">
            <div className="container mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
                    {/* Left section */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg sm:text-xl font-semibold text-black">RecipeHub</span>
                        <span className="text-sm text-gray-500">
                            © {new Date().getFullYear()} All Rights Reserved.
                        </span>
                    </div>
                    
                    {/* Middle section */}
                    <div className="flex items-center text-sm text-gray-500">
                        Made with{" "}
                        <ClayIcon
                            symbol="heart"
                            spritemap="/images/icons.svg"
                            className="text-red-500 mx-1 w-4 h-4"
                        />{" "}
                        by{" "}
                        <span className="ml-1">
                            Junbeom, Chaipipat
                        </span>
                    </div>

                    {/* Right section */}
                    <div className="flex items-center">
                        <a 
                            href="https://github.com/your-repo"
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Github
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}