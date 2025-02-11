'use client';

// import "@clayui/css/lib/css/atlas.css";
import React, { useEffect, useState } from 'react';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayButton from '@clayui/button';
import ClayIcon from "@clayui/icon";
import ClayMultiSelect from '@clayui/multi-select';
import { redirect } from "next/navigation";
import SearchLoader from "@/app/ui/components/searching";

// Define types
interface Item {
    label: string | number;
    value: string | number;
}

export default function Search() {
    // State management
    const [mounted, setMounted] = useState(false);
    const [query, setQuery] = useState<string>("");
    const [items, setItems] = useState<Item[]>([]);
    const [searching, setSearching] = useState(false);

    // Source data
    const sourceItems: Item[] = [
        { label: "one", value: "1" },
        { label: "two", value: "2" },
        { label: "three", value: "3" }
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSearch = async () => {
        setSearching(true); // Show loading animation

        const selectedValues = items.map(item => item.value).join(',+');
        const number = selectedValues.match(/\d+/) || 1;

        try {
            const response = await fetch(`/api/ingredient-search?name=${selectedValues}&number=${number}`);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            const data = await response.json();
            sessionStorage.setItem('searchData', JSON.stringify(data));
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setTimeout(() => {
                setSearching(false); // Hide loader after 3 seconds
                redirect('/result');
            }, 3000);
        }
    };

    const handleItemsChange = (newItems: Item[]) => {
        setItems(newItems);
    };

    return (
        <>
            {searching ? (
                <div className="flex justify-center items-center">
                    <SearchLoader />
                </div>
            ) : (
                <ClayForm.Group>
                    <ClayInput.Group>
                        <ClayInput.GroupItem>
                            <ClayMultiSelect
                                inputName="searchInput"
                                items={items}
                                onChange={setQuery}
                                onItemsChange={handleItemsChange}
                                sourceItems={sourceItems}
                                spritemap="/images/icons.svg"
                                value={query}
                            />
                        </ClayInput.GroupItem>
                        <ClayInput.GroupItem shrink>
                            <ClayButton aria-label="search" displayType="secondary" onClick={handleSearch}>
                                <ClayIcon symbol="search" spritemap="/images/icons.svg" />
                            </ClayButton>
                        </ClayInput.GroupItem>
                    </ClayInput.Group>
                </ClayForm.Group>
                )
            }
        </>
    );
}
