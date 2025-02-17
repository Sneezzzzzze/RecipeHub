"use client";

import React, {useEffect, useState} from "react";
import {supabase} from "@/utils/supabase/client";
import Navbar from "@/app/ui/components/navbar";

export default function Profile() {
    const [background, setBackground] = useState("");
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        setBackground("url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg')");
        import("@clayui/css/lib/css/atlas.css");
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
            }
        };
        fetchUser();
    }, []);
    return(
        <>
            <div
                className="min-h-screen flex flex-col"
                style={{
                    backgroundImage: background,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Navbar/>
            </div>
        </>
    );
}