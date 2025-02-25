'use client';

import React, { useEffect, useState } from 'react';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayButton from '@clayui/button';
import ClayIcon from "@clayui/icon";
import ClayMultiSelect from '@clayui/multi-select';
import SearchLoader from "@/app/ui/components/searching";
import SearchRadio from "@/app/ui/components/search-radio-button"; // Fixed import name
import { useRouter } from 'next/navigation';
import { supabase } from "@/utils/supabase/client";

interface Item {
    label: string | number;
    value: string | number;
}

export default function Search() {
    const [mounted, setMounted] = useState(false);
    const [query, setQuery] = useState<string>("");
    const [items, setItems] = useState<Item[]>([]);
    const [searching, setSearching] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [selectedRadio, setSelectedRadio] = useState('normal'); // Default to 'normal'
    const router = useRouter();


    useEffect(() => {
        import("@clayui/css/lib/css/atlas.css");
        setMounted(true);
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
            }
        };
        fetchUser();
    }, []);
    const handleSearch = async () => {
        setSearching(true);
        try {
            let data;
            if (selectedRadio === 'ingredient') {
                const selectedValues = items.map(item => item.value).join(',+');
                const number = selectedValues.match(/\d+/)?.[0] || 1;
                const url = `/api/ingredientMode?name=${selectedValues}&number=${number}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);

                data = await response.json();
            } else if (selectedRadio === 'random') {
                const selectedValues = items.map(item => item.value).join(',+');
                const number = selectedValues.match(/\d+/)?.[0] || 1;
                const url = `/api/randomMode?number=${number}`; // Removed unnecessary & before number
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);

                const rawData = await response.json();
                data = rawData.recipes || [];
            } else {
                return; // Exit early if mode isn’t recognized
            }
            // Store data based on user status
            if (user?.user_metadata?.sub) {
                const key = `${user.user_metadata.sub}_searchData`;
                localStorage.setItem(key, JSON.stringify(data));
            } else {
                const key = "guest_searchData";
                sessionStorage.setItem(key, JSON.stringify(data));
            }

        } catch (error) {
        } finally {
            setTimeout(() => {
                setSearching(false);
                router.push("/result");
            }, 3000);
        }

    };

    const handleItemsChange = (newItems: Item[]) => {
        setItems(newItems);
    };

    const handleRadioChange = (value: string) => {
        setSelectedRadio(value);
    };

    if (!mounted) {
        return null;
    }


    return (
        <>
            {searching ? (
                <div className="flex justify-center items-center">
                    <SearchLoader />
                </div>
            ) : (
                <>
                    <ClayForm.Group>
                        <ClayInput.Group>
                            <ClayInput.GroupItem
                                style={{
                                    border: "2px solid #FDE047",
                                    boxShadow: "4px 4px #F59E0B",
                                }}
                            >
                                <ClayMultiSelect
                                    inputName="searchInput"
                                    items={items}
                                    onChange={setQuery}
                                    onItemsChange={handleItemsChange}
                                    spritemap="/icons.svg"
                                    size="sm"
                                    // @ts-ignore
                                    placeholder="Type to search..."
                                    value={query}
                                    style={{
                                        maxHeight: '10px', // Optional: constrain overall component height
                                        // overflowY: ''   // Add scrollbar if needed
                                    }}
                                />
                            </ClayInput.GroupItem>
                            <ClayInput.GroupItem shrink>
                                <ClayButton
                                    aria-label="search"
                                    displayType="secondary"
                                    onClick={handleSearch}
                                    style={{
                                        border: "2px solid #FDE047",
                                        boxShadow: "4px 4px #F59E0B",
                                        height: '43.2px'
                                    }}
                                >
                                    <ClayIcon symbol="search" spritemap="/icons.svg" />
                                </ClayButton>
                            </ClayInput.GroupItem>
                        </ClayInput.Group>
                    </ClayForm.Group>
                    <div className="w-full flex justify-end">
                        <SearchRadio
                            selectedRadio={selectedRadio}
                            onChange={handleRadioChange}
                        />
                    </div>
                </>
            )}
        </>
    );
}