'use client';
import "@clayui/css/lib/css/atlas.css";
import ClayEmptyState from "@clayui/empty-state";
import ClayLayout from "@clayui/layout";

export default function notFound() {
    return (
        <>
            <ClayLayout.ContentRow>
                <ClayEmptyState
                    description="The page you are looking for is not found."
                    imgProps={{ alt: "Illustration of success", title: "Success Illustration" }}
                    imgSrc="/images/success_state.svg"
                    title="404 Not Found"
                    small={false}
                className={"mt-10"}/>
            </ClayLayout.ContentRow>
        </>
    );
}
