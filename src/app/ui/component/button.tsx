import React from "react";

type ContentProps = React.PropsWithChildren<{
    customProp?: string;
}>;
export default function ButtonTW({ children }: ContentProps) {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {children}
        </button>
    );
}