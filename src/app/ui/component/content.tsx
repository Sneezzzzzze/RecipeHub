import React from "react";
import ClayLayout from "@clayui/layout";

type ContentProps = React.PropsWithChildren<{
    customProp?: string;
}>;

export default function Content({ children }: ContentProps) {
    return (
        <div className="align-item-center pt-10" style={{height: "calc((100vh - 56.5px)"}}>
            <ClayLayout.ContentRow className="justify-content-center min-h-screen">
                <ClayLayout.ContentCol className="text-center h-full">
                    <p className="text-11 text-black mb-3">RecipeHub</p>
                    <p className="text-black mb-4">Welcome to RecipeHub! Explore recipes, create your own, and share with the world.</p>
                    {children}
                </ClayLayout.ContentCol>
            </ClayLayout.ContentRow>
        </div>
    );
}
