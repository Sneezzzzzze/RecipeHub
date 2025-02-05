'use client';

import "@clayui/css/lib/css/atlas.css";
import React, { useEffect, useState } from 'react';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayButton from '@clayui/button';
import ClayIcon from "@clayui/icon";
import ClayMultiSelect from '@clayui/multi-select';
import {redirect} from "next/navigation";

// Define types
interface Item {
    label: string | number;
    value: string | number;
}

export default function Search() {
    // State management
    const [mounted, setMounted] = useState(false);
    const [query, setQuery] = useState<string>(""); // Renamed from value
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);

    // Source data
    const sourceItems: Item[] = [
        { label: "one", value: "1" },
        { label: "two", value: "2" },
        { label: "three", value: "3" }
    ];

    // Handle client-side mounting
    useEffect(() => {
        setMounted(true);

    }, []);

    const handleSearch = async () => {
        // Collect all the selected values from `items`
        const selectedValues = items.map(item => item.value).join(',+');
        const number = selectedValues.match(/\d+/) || 1;
        try {
            // Make the API request with multiple values as a query parameter
            const response = await fetch(`/api/ingredient-search?name=${selectedValues}&number=${number}`);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            // Parse the fetched data
            const data = await response.json();


            sessionStorage.setItem('searchData', JSON.stringify(data));

            // Optionally, update state with the fetched data
            // setItems(data); // If you want to update the displayed items
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setLoading(false);
            redirect('/result');
        }
    };

    // Handle multi-select item changes
    const handleItemsChange = (newItems: Item[]) => {
        setItems(newItems);
    };

    // Early return for SSR
    if (!mounted) {
        return (
            <ClayForm.Group>
                <ClayInput.Group>
                    <ClayInput.GroupItem>
                        <div className="form-control"></div>
                    </ClayInput.GroupItem>
                </ClayInput.Group>
            </ClayForm.Group>
        );
    }

    return (
        <ClayForm.Group>
            <ClayInput.Group>
                <ClayInput.GroupItem>
                    <ClayMultiSelect
                        inputName="searchInput"
                        items={items}
                        onChange={setQuery} // Correctly updating query
                        onItemsChange={handleItemsChange}
                        sourceItems={sourceItems}
                        spritemap="/images/icons.svg"
                        value={query}
                    />
                </ClayInput.GroupItem>
                <ClayInput.GroupItem shrink>
                    <ClayButton
                        aria-label="search"
                        displayType="secondary"
                        onClick={
                        handleSearch
                        }>
                        <ClayIcon symbol="search" spritemap="/images/icons.svg" />
                    </ClayButton>
                </ClayInput.GroupItem>
            </ClayInput.Group>
        </ClayForm.Group>
    );
}
