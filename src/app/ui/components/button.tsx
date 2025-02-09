import React from "react";
type ContentProps = React.PropsWithChildren<{
    customProp?: string;
}>;


export default function ButtonTW({ children }: ContentProps) {
    return (
            <button className="mx-auto mt-8 w-30 h-10 rounded-md border-2 border-main-color bg-bg-color shadow-[4px_4px_black] text-sm font-semibold text-black cursor-pointer">
                {children}
            </button>
    );
}
