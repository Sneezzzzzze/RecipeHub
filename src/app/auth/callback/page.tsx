"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Loader from "@/app/ui/components/loading"

const Callback = () => {
    const router = useRouter();

    useEffect(() => {
        const handleSession = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error("Session retrieval error:", error.message);
            } else if (data?.session) {
                console.log("User logged in:", data.session.user);
                setTimeout(() => {
                    router.push("/");
                }, 3000)
            } else {
                setTimeout(() => {
                router.push("/auth/login");
                }, 3000)
            }
        };

        handleSession();
    }, [router]);

    return <Loader/>;
};

export default Callback;
