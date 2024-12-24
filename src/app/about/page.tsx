'use client';

import { useEffect } from "react";

import "@clayui/css/lib/css/atlas.css";
import ClayLayout from "@clayui/layout";
import ClayCol from "@clayui/layout/lib/Col";

export default function About() {
    useEffect(() => {
        document.title = "Home Page";
    }, []);
    return (
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
        </ClayLayout.Container>
    );
}
