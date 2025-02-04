import React from "react";
import ClayLayout from "@clayui/layout";
import "@clayui/css/lib/css/atlas.css";
type ContentProps = React.PropsWithChildren<{
    customProp?: string;
}>;

export default function Content({ children }: ContentProps) {
    return (
        <div className="flex flex-col min-h-screen sm:justify-center sm:py-12 md:py-16 lg:py-20 text-wrap shadow-lg">
            <div className="flex-1 flex flex-col justify-center px-4 py-10 sm:px-6 md:px-8 lg:px-10 text-wrap">
                <div className="mx-auto">
                    <ClayLayout.ContentRow className="justify-center">
                        <ClayLayout.ContentCol className="text-center ">
                            {children}
                        </ClayLayout.ContentCol>
                    </ClayLayout.ContentRow>
                </div>
            </div>
        </div>
    );
}