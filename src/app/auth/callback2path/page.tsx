import { Suspense } from "react";
import Callback2Path from "./Callback2Path"; // 클라이언트 컴포넌트
import Loader from "@/app/ui/components/loading";

export default function Page() {
    return (
        <Suspense fallback={<Loader />}>
            <Callback2Path />
        </Suspense>
    );
}