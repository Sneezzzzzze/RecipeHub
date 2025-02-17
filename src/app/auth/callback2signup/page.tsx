"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/ui/components/loading";

const Callback2SignUp = () => {
    const router = useRouter();

    useEffect(() => {
        const handleSession = async () => {
            setTimeout(() => {
                router.push("/auth/signup");
            }, 3000);
        };
        handleSession();
    }, []);

    return <Loader />;
};

export default Callback2SignUp;

