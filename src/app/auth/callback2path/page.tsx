"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/app/ui/components/loading";

// Prevent static generation since this is a dynamic callback
export const dynamic = "force-dynamic";

const Callback2Path = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleSession = async () => {
            // Get the pathname from query parameters, default to "/" if not provided
            const pathname = searchParams.get("pathname") || "/";

            setTimeout(() => {
                router.push(pathname);
            }, 3000);
        };
        handleSession();
    }, [searchParams]);

    return <Loader />;
};

export default Callback2Path;