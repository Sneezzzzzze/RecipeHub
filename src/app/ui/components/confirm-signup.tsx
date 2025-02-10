import React from "react";
import ButtonTW from "@/app/ui/components/button";

export default function ConfirmSignUp () {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-5 p-20 bg-gray-300  border-2 border-[#FDE047] shadow-[4px_4px_#F59E0B] w-[250px] h-[250px]">
                <p className="text-black text-xl text-center font-[900]">Confirm SignUp</p>
                <ButtonTW onClick={() => {
                    if (typeof window !== "undefined") {
                        window.open("https://mail.google.com/", "_blank");
                    }
                }}>
                    Go to Gmail
                </ButtonTW>
            </div>
        </>
    );
}