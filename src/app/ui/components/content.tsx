import React from "react";
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

            {/* ฺ Black Overlay */}
            <div className="absolute inset-0 bg-black opacity-65"></div>
            
            <div className="flex-1 flex flex-col justify-center px-4 py-10 sm:px-6 md:px-8 lg:px-10 text-wrap z-10">
                <div className="mx-auto p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl">
                    {children}
                </div>
            </div>
            {/*<div className="bg-white rounded-2xl shadow-md overflow-hidden w-80 mx-auto shadow-lg">*/}
            {/*    <div className="p-4">*/}
            {/*        <h2 className="text-xl font-bold text-gray-800">test</h2>*/}
            {/*        <p className="text-gray-600 mt-2">test</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}