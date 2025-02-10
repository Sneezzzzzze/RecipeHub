import React from "react";
type ContentProps = React.PropsWithChildren<{
    customProp?: string;
    onClick?: () => void;
}>;


export default function ButtonTW({ children, onClick }: ContentProps) {
    return (
            <button
                onClick={onClick}
                className="bg-white mx-auto mt-10 w-30 h-10 rounded-md border-2 border-[#FDE047] shadow-[4px_4px_#F59E0B] text-sm font-semibold text-black cursor-pointer">
                {children}
            </button>
    );
}
