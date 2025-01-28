'use client';

import "@clayui/css/lib/css/atlas.css";
import ClayMultiSelect from '@clayui/multi-select';
import ClayButton from '@clayui/button';
import ClayForm, {ClayInput} from '@clayui/form';
import React, {useState} from "react";
import ClayIcon from "@clayui/icon";

export default function Search() {
    const [value, setValue] = useState("");
    const [items, setItems] = useState([
        {
            label: "one",
            value: "1"
        }
    ]);

    const sourceItems = [
        {
            label: "one",
            value: "1"
        },
        {
            label: "two",
            value: "2"
        },
        {
            label: "three",
            value: "3"
        }
    ];

    return (
        <ClayForm.Group>
            <ClayInput.Group>
                <ClayInput.GroupItem>
                    <ClayMultiSelect
                        inputName="myInput"
                        items={items}
                        onChange={setValue}
                        onItemsChange={setItems}
                        sourceItems={sourceItems}
                        spritemap="/images/icons.svg"
                        value={value}
                    />
                </ClayInput.GroupItem>
                <ClayInput.GroupItem shrink>
                    <ClayButton aria-label="search" displayType="secondary" onClick={() => alert(`Selected Items: ${items.map(item => item.label).join(", ")}`)}>
                        <ClayIcon
                            symbol={"search"}
                            spritemap="/images/icons.svg"
                        />
                    </ClayButton>
                </ClayInput.GroupItem>
            </ClayInput.Group>
        </ClayForm.Group>
    );
}