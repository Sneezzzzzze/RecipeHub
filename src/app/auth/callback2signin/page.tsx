"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/ui/components/loading";

const Callback2SignIn = () => {
    const router = useRouter();

    useEffect(() => {
        const handleSession = async () => {
            setTimeout(() => {
                router.push("/auth/signin");
            }, 3000);
        };
        handleSession();
    }, []);

    return <Loader />;
};

export default Callback2SignIn;

