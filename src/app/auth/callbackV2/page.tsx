"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/ui/components/loading";

const CallbackV2 = () => {
    const router = useRouter();

    useEffect(() => {
        const handleSession = async () => {
            setTimeout(() => {
                router.push("/");
            }, 3000);
        };
        handleSession();
    }, []);

    return <Loader />;
};

export default CallbackV2;

