"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import SignIn_Form from "@/app/ui/components/signin-form";
import { z } from "zod";
import {redirect} from "next/navigation";

// Define validation schema
const loginSchema = z.object({
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignInPage = () => {
    const [, setUser] = useState<unknown>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [loadingTxt, setLoadingTxt] = useState(false);
    const [background, setBackground] = useState("");
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
            }
        };
        fetchUser();
        setBackground("url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg')");
    }, []);

    // Email & Password Login
    const handleEmailLogin = async () => {
        const validation = loginSchema.safeParse({ email, password });
        if (!validation.success) {
            setErrors({
                email: validation.error.flatten().fieldErrors.email?.[0],
                password: validation.error.flatten().fieldErrors.password?.[0],
            });
            return;
        }
        setErrors({});
        setLoadingTxt(true);

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.error("Email login failed:", error.message);
            setErrors({ email: error.message });
        } else {
            setUser(data.user);
        }
        setLoadingTxt(false);
        redirect('/auth/callback')
    };

    // Google OAuth Login
    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: "/auth/callback" },
        });

        if (error) console.error("Google login failed:", error.message);
    };
    const handleKeyPress = async (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent Enter from triggering Google login
            await handleEmailLogin(); // Await the Promise from handleEmailLogin
        }
    };

    return (
        <>
            <div className="bg-white flex flex-col min-h-screen items-center justify-center sm:py-12 md:py-16 lg:py-20 text-wrap relative"
                 style={{
                     backgroundImage: background,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                 }}>
                <SignIn_Form
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    errors={errors}
                    handleEmailLogin={handleEmailLogin}
                    handleGoogleLogin={handleGoogleLogin}
                    loadingTxt={loadingTxt}
                    handleKeyPress={handleKeyPress}
                />
            </div>
        </>
    );
};

export default SignInPage;