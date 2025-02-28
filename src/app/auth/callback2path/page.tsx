"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/ui/components/loading";

const Callback2Path = ({ path = "/"}) => {
    const router = useRouter();

    useEffect(() => {
        const handleSession = async () => {
            setTimeout(() => {
                router.push(path);
            }, 3000);
        };
        handleSession();
    }, [path]);

    return <Loader />;
};

export default Callback2Path;

