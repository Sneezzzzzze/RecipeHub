'use client';

import { useEffect } from "react";

import "@clayui/css/lib/css/atlas.css";
import ClayLayout from "@clayui/layout";
import ClayCol from "@clayui/layout/lib/Col";
import ClayCard from "@clayui/card";
import ClayButton from "@clayui/button";

export default function Home() {
    useEffect(() => {
        document.title = "Home Page";
    }, []);

    return (
        <>
            <ClayLayout.Container>
                <ClayLayout.ContentRow className="align-items-center">
                    <ClayCol className="ml-10 my-3 mt-5">
                        <h1>test 1</h1>
                    </ClayCol>
                    <ClayCol>
                        <h1>test 2</h1>
                    </ClayCol>
                    <ClayCol>
                        <h1>test 3</h1>
                    </ClayCol>
                </ClayLayout.ContentRow>
                <ClayLayout.ContentRow className="align-items-center">
                    <ClayCard className="align-items-center">
                        <ClayCard.Body>
                            <ClayCard.Description displayType="title">
                                {"Card Title"}
                            </ClayCard.Description>
                            <ClayCard.Description truncate={false} displayType="text">
                                {
                                    "Some quick example text to build on the card title and make up the bulk of the card content."
                                }
                            </ClayCard.Description>
                            <ClayButton>{"Go somewhere"}</ClayButton>
                        </ClayCard.Body>
                    </ClayCard>
                </ClayLayout.ContentRow>
            </ClayLayout.Container>
        </>
    );
}