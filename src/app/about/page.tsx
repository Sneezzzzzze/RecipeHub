import "@clayui/css/lib/css/atlas.css";
import ClayLayout from "@clayui/layout";
import ClayCol from "@clayui/layout/lib/Col";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Create Invoices',
};
export default function About() {

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
