"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import ClayButton from "@clayui/button";
import ClayIcon from "@clayui/icon";
import { useRouter } from "next/navigation";
import "@clayui/css/lib/css/atlas.css";
import { z } from "zod";

// Define validation schema
const loginSchema = z.object({
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
    const [user, setUser] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Use router for navigation

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
            }
        };
        fetchUser();
    }, []);

    // Email & Password Login
    const handleEmailLogin = async () => {
        // Validate input
        const validation = loginSchema.safeParse({ email, password });
        if (!validation.success) {
            setErrors(validation.error.flatten().fieldErrors);
            return;
        }
        setErrors({}); // Clear previous errors
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.error("Email login failed:", error.message);
            setErrors({ email: error.message });
        } else {
            setUser(data.user);
        }
        setLoading(false);
    };

    // Google OAuth Login
    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: "/auth/callback" },
        });

        if (error) console.error("Google login failed:", error.message);
    };

    // Logout
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
    };

    return (
        <div className="relative flex h-screen items-center justify-center bg-gray-200">

            {/* Login Form */}
            <div className="relative p-8 bg-white rounded-lg shadow-lg text-center  z-10 align-items-center">
                {!user ? (
                    <>
                        <h2 className="text-xl font-bold text-black p-2">Sign in to RecipeHub</h2>

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
                                style={{ fontSize: "24px", width: "24px", height: "24px" }}
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
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </ClayButton>

                        <p className="text-gray-600 text-sm mt-2">
                            Don't have an account? <a href="/auth/signup" className="text-blue-500">Sign Up</a>
                        </p>
                    </>
                ) : (
                    <>
                        {/* User Profile Section */}
                        <div className="flex items-center space-x-4">
                            {user?.user_metadata?.avatar_url ? (
                                <img
                                    src={user.user_metadata.avatar_url}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                                />
                            ) : (
                                <ClayIcon
                                    symbol="user"
                                    spritemap="/images/icons.svg"
                                    style={{ fontSize: "48px", width: "48px", height: "48px" }}
                                    className="text-gray-500"
                                />
                            )}
                            <div className="text-black dark:text-white">
                                <p className="text-lg font-semibold">{user?.user_metadata?.full_name || "Unknown User"}</p>
                                <p className="text-sm text-gray-600">{user?.email || "No Email"}</p>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <ClayButton
                            displayType="secondary"
                            className="mt-4 text-black border-2 px-4 py-2 rounded"
                            onClick={handleLogout}
                        >
                            Logout
                        </ClayButton>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
