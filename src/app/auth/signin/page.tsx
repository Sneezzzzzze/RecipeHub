"use client";

import React, {useEffect, useState} from "react";
import {supabase} from "@/utils/supabase/client";
import ClayButton from "@clayui/button";
import ClayIcon from "@clayui/icon";
import "@clayui/css/lib/css/atlas.css";
import {z} from "zod";
import Loading from "@/app/ui/components/loading";

// Define validation schema
const loginSchema = z.object({
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
    const [, setUser] = useState<unknown>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);
    const [loadingTxt, setLoadingTxt] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const {data: {session}} = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <Loading/>
            </div>
        );
    }

    // Email & Password Login
    const handleEmailLogin = async () => {
        // Validate input
        const validation = loginSchema.safeParse({email, password});
        if (!validation.success) {
            setErrors({
                email: validation.error.flatten().fieldErrors.email?.[0], // Store only the first error
                password: validation.error.flatten().fieldErrors.password?.[0],
            });

            return;
        }
        setErrors({}); // Clear previous errors
        setLoadingTxt(true);

        const {data, error} = await supabase.auth.signInWithPassword({email, password});

        if (error) {
            console.error("Email login failed:", error.message);
            setErrors({email: error.message});
        } else {
            setUser(data.user);
        }
        setLoadingTxt(false);
    };

    // Google OAuth Login
    const handleGoogleLogin = async () => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {redirectTo: "/auth/callback"},
        });

        if (error) console.error("Google login failed:", error.message);
    };
    return (
        <div className="relative flex h-screen items-center justify-center bg-gray-200">

            {/* Login Form */}
            <div className="relative p-8 bg-white rounded-lg shadow-lg text-center  z-10 align-items-center">
                <h1 className="text-2xl font-bold text-black p-2">Sign in to RecipeHub</h1>

                {/* Google OAuth Login */}
                <ClayButton
                    displayType="secondary"
                    aria-label="Login with Google"
                    className="w-full flex justify-center items-center p-2 mb-2"
                    onClick={handleGoogleLogin}
                >
                    <ClayIcon
                        symbol="google"
                        spritemap="/images/icons.svg"
                        style={{fontSize: "24px", width: "24px", height: "24px"}}
                        className="text-black"
                    />
                </ClayButton>

                {/* Email Input */}
                <div className="w-full text-left">
                    <input
                        type="email"
                        placeholder="Email"
                        className={`w-full px-3 py-2 mb-2 border rounded text-black 
                                    ${errors.email ? "border-red-500" : "border-gray-300"}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Password Input */}
                <div className="w-full text-left">
                    <input
                        type="password"
                        placeholder="Password"
                        className={`w-full px-3 py-2 mb-2 border rounded text-black 
                                    ${errors.password ? "border-red-500" : "border-gray-300"}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {/* Login Button */}
                <ClayButton
                    displayType="secondary"
                    className="w-full mt-4"
                    onClick={handleEmailLogin}
                    disabled={loadingTxt}
                >
                    {loadingTxt ? "Signing in..." : "Sign In"}
                </ClayButton>

                <p className="text-gray-600 text-sm mt-2">
                    Don&apos;t have an account? <a href="/auth/signup" className="text-blue-500">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
