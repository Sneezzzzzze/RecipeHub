import React from "react";
import "@clayui/css/lib/css/atlas.css";

type ContentProps = React.PropsWithChildren<{
    customProp?: string;
}>;

export default function Content({children}: ContentProps) {
    return (
        <div className="flex flex-col min-h-screen sm:justify-center sm:py-12 md:py-16 lg:py-20 text-wrap shadow-lg">
            <div className="flex-1 flex flex-col justify-center px-4 py-10 sm:px-6 md:px-8 lg:px-10 text-wrap">
                <div className="mx-auto shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 bg-white rounded-xl">
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