import ClayIcon from "@clayui/icon";
import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-200 px-4 py-4 sm:px-5 sm:py-4 border-t text-wrap ">
            <div className="container mx-auto flex justify-between items-center">
                <p className="mb-0 text-muted flex items-center">
                    © {new Date().getFullYear()} RecipeHub. All Rights Reserved.
                </p>
                <p className="mb-0 text-muted flex items-center">
                    Made with <ClayIcon
                    symbol="heart"
                    spritemap="/images/icons.svg"
                    className="text-red-500 mx-1"
                /> by Junbeom, Chaipipat
                </p>
                <div className="flex items-center text-muted">
                    <a href="/terms" className="mr-3">
                        Github
                    </a>
                </div>
            </div>
        </footer>
    );
}