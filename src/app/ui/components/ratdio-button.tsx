import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface RadioProps {
    notification: number;
    name: string;
    selectedRadio: string;
    onChange: (value: string) => void;
}

const Radio = ({ notification, name, selectedRadio, onChange }: RadioProps) => {
    const [gliderStyle, setGliderStyle] = useState({ width: "0px", left: "0px" });
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const tabsRef = useRef<HTMLLabelElement[]>([]);

    useEffect(() => {
        // Set the active tab index based on the selectedRadio value
        const index = ["ingredients", "how-to-make", "nutrition"].indexOf(selectedRadio);
        setActiveTabIndex(index);

        const updateGlider = (index: number) => {
            if (tabsRef.current[index]) {
                const tab = tabsRef.current[index];
                setGliderStyle({
                    width: `${tab.offsetWidth}px`,
                    left: `${tab.offsetLeft}px`,
                });
            }
        };
        updateGlider(index);
    }, [selectedRadio]);

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
                            id={`radio-1-${name}`}
                            name={`tabs-${name}`}
                            checked={selectedRadio === "ingredients"}
                            onChange={() => handleTabClick(0, "ingredients")}
                        />
                        <label
                            ref={(el) => {
                                if (el) tabsRef.current[0] = el;
                            }}
                            className="tab"
                            htmlFor={`radio-1-${name}`}
                        >
                            Ingredients<span className="notification">{notification}</span>
                        </label>
    
                        <input
                            type="radio"
                            id={`radio-2-${name}`}
                            name={`tabs-${name}`}
                            checked={selectedRadio === "how-to-make"}
                            onChange={() => handleTabClick(1, "how-to-make")}
                        />
                        <label
                            ref={(el) => {
                                if (el) tabsRef.current[1] = el;
                            }}
                            className="tab"
                            htmlFor={`radio-2-${name}`}
                        >
                            How to Make
                        </label>
    
                        <input
                            type="radio"
                            id={`radio-3-${name}`}
                            name={`tabs-${name}`}
                            checked={selectedRadio === "nutrition"}
                            onChange={() => handleTabClick(2, "nutrition")}
                        />
                        <label
                            ref={(el) => {
                                if (el) tabsRef.current[2] = el;
                            }}
                            className="tab"
                            htmlFor={`radio-3-${name}`}
                        >
                            Nutrition
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
            padding: 0 12px;
            height: 30px;
            font-size: 0.8rem;
            color: black;
            font-weight: 500;
            border-radius: 99px;
            margin-right: 2px;
            cursor: pointer;
            transition: color 0.15s ease-in;
            position: relative;
        }
    
        .notification {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 0.8rem;
            height: 0.8rem;
            position: absolute;
            top: 0px;
            right: -1px;
            font-size: 10px;
            border-radius: 50%;
            background-color: #e6eef9;
            transition: 0.15s ease-in;
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
    
    export default Radio;
