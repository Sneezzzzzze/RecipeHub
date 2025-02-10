"use client";

import React, {useEffect, useState} from "react";
import { supabase } from "@/utils/supabase/client";
import Loading from "@/app/ui/components/loading";
import SignUp_Form from "@/app/ui/components/signup-form";
import ConfirmSignUp from "@/app/ui/components/confirm-signup"
import { z } from "zod";

// Define validation schema
const signUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const SignUpPage = () => {
    const [background, setBackground] = useState("");
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    useEffect(() => {
        setBackground("url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg')");
    }, []);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
    const [loading, setLoading] = useState(false);
    const [loadingTxt, setLoadingTxt] = useState(false);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <Loading />
            </div>
        );
    }

    // Email & Password Sign Up
    const handleSignUp = async () => {
        // Validate the form data using the schema
        const validation = signUpSchema.safeParse({ name, email, password, confirmPassword });

        if (!validation.success) {
            setErrors({
                name: validation.error.flatten().fieldErrors.name?.[0],
                email: validation.error.flatten().fieldErrors.email?.[0],
                password: validation.error.flatten().fieldErrors.password?.[0],
                confirmPassword: validation.error.flatten().fieldErrors.confirmPassword?.[0],
            });
            return;
        }

        // Clear any previous errors if validation is successful
        setErrors({});
        setLoadingTxt(true);

        try {
            // Perform the sign-up request using Supabase
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { name },
                },
            });

            if (error) {
                // Handle error from Supabase
                console.error("Sign-up failed:", error.message);
                setErrors({ email: error.message });  // Display the error message
            } else {
                // Set success state or redirect to the next page
                setSignUpSuccess(true);
                // Optionally, redirect to the login page or display a success message
                // redirect("/auth/login");
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            setErrors({ email: "An unexpected error occurred. Please try again." });
        } finally {
            // Set loading state to false after the process
            setLoadingTxt(false);
        }
    };


    // Google OAuth Sign Up
    const handleGoogleSignUp = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: "/auth/callback" },
        });

        if (error) console.error("Google sign-up failed:", error.message);
    };

    return (
        <>
            <div className="bg-white flex flex-col min-h-screen items-center justify-center sm:py-12 md:py-16 lg:py-20 text-wrap relative"
                 style={{
                     backgroundImage: background,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                 }}>
                {!signUpSuccess ? (
                    <SignUp_Form
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        errors={errors}
                        handleSignUp={handleSignUp}
                        handleGoogleSignUp={handleGoogleSignUp}
                        loadingTxt={loadingTxt}
                    />
                    ) : (
                        <ConfirmSignUp/>
                )}
            </div>
        </>
    );
};

export default SignUpPage;
