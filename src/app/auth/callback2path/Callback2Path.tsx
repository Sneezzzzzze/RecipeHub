"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/app/ui/components/loading";

const Callback2Path = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const path = searchParams.get("path") || "/";

    useEffect(() => {
        const handleSession = async () => {
            setTimeout(() => {
                router.push(path);
            }, 3000);
        };
        handleSession();
    }, [path, router]);

    return <Loader />;
};

export default Callback2Path;