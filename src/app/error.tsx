'use client';
import "@clayui/css/lib/css/atlas.css";
import ClayEmptyState from "@clayui/empty-state";
import ClayLayout from "@clayui/layout";

export default function somethingWentWrong() {
    return (
        <>
            <ClayLayout.ContentRow>
                <ClayEmptyState
                    description="Something went wrong. Please try again later."
                    imgProps={{ alt: "Illustration of success", title: "Success Illustration" }}
                    imgSrc="/images/success_state.svg"
                    title="Something Went Wrong"
                    small={false}
                    className={"mt-10"}/>
            </ClayLayout.ContentRow>
        </>
    );
}
