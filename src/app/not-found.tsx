'use client';
import { useEffect, useState } from 'react';
import "@clayui/css/lib/css/atlas.css";
import ClayEmptyState from "@clayui/empty-state";
import ClayLayout from "@clayui/layout";

export default function NotFound() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Only run after the component is mounted in the browser
        console.log(window.location);
    }, []);

    if (!isClient) return null; // Prevent SSR issues

    return (
        <>
            <ClayLayout.ContentRow>
                <ClayEmptyState
                    description="The page you are looking for is not found."
                    imgProps={{ alt: "Don't touch me", title: "I said Not FOund!!!" }}
                    imgSrc="/images/success_state.svg"
                    title="404 Not Found"
                    small={false}
                    className={"mt-10"}
                />
            </ClayLayout.ContentRow>
        </>
    );
}

