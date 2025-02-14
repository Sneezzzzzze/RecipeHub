import React from "react";
import ButtonTW from "@/app/ui/components/button";

export default function ConfirmSignUp ({ email }: { email: string }) {
    const extractEmailProvider = (email: string): string | null => {
        const match = email.match(/@([^.]+)\./); // Regex to capture the part between "@" and "."
        return match ? match[1] : null;
    };

    const provider = extractEmailProvider(email);
    const emailUrl = provider ? `https://mail.${provider}.com/` : "https://www.google.com/search?q=email+login";
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-5 p-20 bg-gray-300  border-2 border-[#FDE047] shadow-[4px_4px_#F59E0B] w-[250px] h-[250px]">
                <p className="text-black text-xl text-center font-[900]">Confirm SignUp</p>
                <ButtonTW onClick={() => {
                    if (typeof window !== "undefined") {
                        window.open(emailUrl, "_blank"); // Open dynamically generated email provider link
                        window.close(); // Close the current tab
                    }
                }}>
                    Go to {provider}
                </ButtonTW>
            </div>
        </>
    );
}