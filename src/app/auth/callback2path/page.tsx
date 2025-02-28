"use client";
import {Suspense, useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Loader from "@/app/ui/components/loading";

const Callback2PathContent = () => {
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
    }, [router, searchParams]);

    return <Loader />;
};

// Main component with Suspense
const Callback2Path = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Callback2PathContent />
        </Suspense>
    );
};

export default Callback2Path;