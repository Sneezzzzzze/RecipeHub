import React from "react";
import Navbar from "@/app/ui/components/navbar"
type ContentProps = React.PropsWithChildren<{
    customProp?: string;
}>;

export default function Content({children}: ContentProps) {
    return (
        <div
            className="flex flex-col min-h-screen sm:justify-center sm:py-12 md:py-16 lg:py-20 text-wrap shadow-lg relative"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* NavBar */}
            <Navbar/>

            {/* ฺ Black Overlay */}
            <div className="absolute inset-0 bg-black opacity-65"></div>

            <div className="flex-1 flex flex-col justify-center px-4 py-10 sm:px-6 md:px-8 lg:px-10 text-wrap z-10">
                <div className="mx-auto sm:p-8 md:p-10 lg:p-12 rounded-xl">
                    {children}
                </div>
            </div>
        </div>
    );
}