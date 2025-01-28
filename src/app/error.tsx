'use client';
import { useEffect, useState } from 'react';
import "@clayui/css/lib/css/atlas.css";
import ClayEmptyState from "@clayui/empty-state";
import ClayLayout from "@clayui/layout";

export default function SomethingWentWrong() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Only render on the client side
        console.log(window.location);
    }, []);

    if (!isClient) return null; // Prevent rendering on the server

    return (
        <>
            <ClayLayout.ContentRow>
                <ClayEmptyState
                    description="Something went wrong. Please try again later."
                    imgProps={{ alt: "Illustration of success", title: "Success Illustration" }}
                    imgSrc="/images/success_state.svg"
                    title="Something Went Wrong"
                    small={false}
                    className={"mt-10"}
                />
            </ClayLayout.ContentRow>
        </>
    );
}
