// search-radio-button.tsx
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface RadioProps {
    selectedRadio: string;
    onChange: (value: string) => void;
}

const SearchRadio = ({ selectedRadio, onChange }: RadioProps) => {
    const [gliderStyle, setGliderStyle] = useState({ width: "0px", left: "0px" });
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const tabsRef = useRef<HTMLLabelElement[]>([]);

    useEffect(() => {
        const updateGlider = (index: number) => {
            if (tabsRef.current[index]) {
                const tab = tabsRef.current[index];
                setGliderStyle({
                    width: `${tab.offsetWidth}px`,
                    left: `${tab.offsetLeft}px`,
                });
            }
        };
        updateGlider(activeTabIndex);
    }, [activeTabIndex]);

    const handleTabClick = (index: number, value: string) => {
        setActiveTabIndex(index);
        onChange(value);
    };

    return (
        <StyledWrapper>
            <div className="container">
                <div className="tabs">
                    <input
                        type="radio"
                        id="radio-1"
                        name="tabs-search"
                        checked={selectedRadio === "normal"}
                        onChange={() => handleTabClick(0, "normal")}
                    />
                    <label
                        ref={(el) => {
                            if (el) tabsRef.current[0] = el;
                        }}
                        className="tab"
                        htmlFor="radio-1"
                    >
                        Normal
                    </label>

                    <input
                        type="radio"
                        id="radio-2"
                        name="tabs-search"
                        checked={selectedRadio === "ingredient"}
                        onChange={() => handleTabClick(1, "ingredient")}
                    />
                    <label
                        ref={(el) => {
                            if (el) tabsRef.current[1] = el;
                        }}
                        className="tab"
                        htmlFor="radio-2"
                    >
                        Ingredient
                    </label>

                    <input
                        type="radio"
                        id="radio-3"
                        name="tabs-search"
                        checked={selectedRadio === "random"}
                        onChange={() => handleTabClick(2, "random")}
                    />
                    <label
                        ref={(el) => {
                            if (el) tabsRef.current[2] = el;
                        }}
                        className="tab"
                        htmlFor="radio-3"
                    >
                        Random
                    </label>

                    <span className="glider" style={gliderStyle} />
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .tabs {
        display: flex;
        position: relative;
        background-color: #fff;
        border: 2px solid #fde047;
        box-shadow: 4px 4px #f59e0b;
        padding: 0.75rem;
        border-radius: 99px;
    }

    .tabs * {
        z-index: 2;
    }

    .container input[type="radio"] {
        display: none;
    }

    .tab {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        height: 30px;
        font-size: 0.8rem;
        color: black;
        font-weight: 500;
        border-radius: 99px;
        cursor: pointer;
        transition: color 0.15s ease-in;
        position: relative;
    }
    
    .container input[type="radio"]:checked + label {
        color: #f59e0b;
    }

    .container input[type="radio"]:checked + label > .notification {
        background-color: #f59e0b;
        color: #323232;
    }

    .glider {
        position: absolute;
        display: flex;
        height: 30px;
        background-color: #323232;
        z-index: 1;
        border-radius: 99px;
        transition: 0.25s ease-out;
    }

    @media (max-width: 700px) {
        .tabs {
            transform: scale(0.8);
        }
    }
`;

export default SearchRadio;