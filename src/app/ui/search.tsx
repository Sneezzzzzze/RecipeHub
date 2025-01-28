'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import "@clayui/css/lib/css/atlas.css";
import ClayForm, { ClayInput } from '@clayui/form';
import ClayButton from '@clayui/button';
import ClayIcon from "@clayui/icon";

// Dynamically import ClayMultiSelect with no SSR
const ClayMultiSelect = dynamic(
    () => import('@clayui/multi-select'),
    { ssr: false }
);

// Define types
interface Item {
    label: string;
    value: string;
}

export default function Search() {
    // State management with proper typing
    const [mounted, setMounted] = useState(false);
    const [value, setValue] = useState<string>("");
    const [items, setItems] = useState<Item[]>([]);

    // Source data
    const sourceItems: Item[] = [
        { label: "one", value: "1" },
        { label: "two", value: "2" },
        { label: "three", value: "3" }
    ];

    // Handle client-side mounting
    useEffect(() => {
        setMounted(true);
        setItems([{ label: "one", value: "1" }]);
    }, []);

    const handleItemsChange = (newItems: Item[]) => {
        setItems(newItems);
    };

    // Early return for server-side rendering
    if (!mounted) {
        return (
            <ClayForm.Group>
                <ClayInput.Group>
                    <ClayInput.GroupItem>
                        <div className="form-control">Loading...</div>
                    </ClayInput.GroupItem>
                </ClayInput.Group>
            </ClayForm.Group>
        );
    }

    const handleSearch = () => {
        alert(`Selected Items: ${items.map(item => item.label).join(", ")}`);
    };

    return (
        <ClayForm.Group>
            <ClayInput.Group>
                <ClayInput.GroupItem>
                    <ClayMultiSelect
                        inputName="myInput"
                        items={items as unknown[]}
                        onChange={setValue}
                        onItemsChange={handleItemsChange as (items: unknown[]) => void}
                        sourceItems={sourceItems as unknown[]}
                        spritemap="/images/icons.svg"
                        value={value}
                    />
                </ClayInput.GroupItem>
                <ClayInput.GroupItem shrink>
                    <ClayButton
                        aria-label="search"
                        displayType="secondary"
                        onClick={handleSearch}
                    >
                        <ClayIcon
                            symbol="search"
                            spritemap="/images/icons.svg"
                        />
                    </ClayButton>
                </ClayInput.GroupItem>
            </ClayInput.Group>
        </ClayForm.Group>
    );
}