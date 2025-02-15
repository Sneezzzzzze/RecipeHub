"use client";
import React, {useEffect, useState} from "react";
import Navbar from "@/app/ui/components/navbar";
import { supabase } from "@/utils/supabase/client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {useRouter} from "next/navigation";
import Alert from '@clayui/alert';

export default function Setting() {
    const [selectedSetting, setSelectedSetting] = useState("change-password");
    const [background, setBackground] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<"Success" | "Danger" | "Warning" | null>(null);
    const [alertDisplayType, setalertDisplayType] = useState<"success" | "danger" | "warning" | null>(null);
    const router = useRouter()
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

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            // Step 1: Re-authenticate the user with the current password
            const { error: authError } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: currentPassword,
            });

            if (authError) {
                setAlertMessage("Current password is incorrect");
                setAlertType("Warning");
                setalertDisplayType("warning");
                return;
            }

            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) {
                setAlertMessage(error.message);
                setAlertType("Danger");
                setalertDisplayType("danger");
            } else {
                setAlertMessage("Password updated successfully!");
                setAlertType("Success");
                setalertDisplayType("success");
                router.push("/auth/callback2signin")
                await supabase.auth.signOut();
            }
        } catch (err) {
            setAlertMessage("Failed to update password.");
            setAlertType("Danger");
            setalertDisplayType('danger');
        }
    };

    const handleAccountUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('users')
                .update({
                    username: user.user_metadata.username,
                    email: user.user_metadata.email,
                })
                .eq('id', user.id);

            if (error) {
                setError(error.message);
            } else {

            }
        } catch (err) {
            setError("Failed to update account details.");
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                backgroundImage: background,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Navbar />

            <div className="flex flex-1 p-6">
                {/* Sidebar */}
                <div className="w-1/4 bg-gray-300 text-white p-6">
                    <h2 className="text-3xl font-bold mb-6">Settings</h2>
                    <ul className="space-y-4">
                        <li>
                            <button
                                onClick={() => setSelectedSetting("change-password")}
                                className={`w-full text-left px-4 py-3 rounded-lg text-lg transition-all ${
                                    selectedSetting === "change-password" ? "bg-amber-500 text-white" : "hover:bg-gray-200"
                                }`}
                            >
                                Change Password
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setSelectedSetting("account")}
                                className={`w-full text-left px-4 py-3 rounded-lg text-lg transition-all ${
                                    selectedSetting === "account" ? "bg-amber-500 text-white" : "hover:bg-gray-200"
                                }`}
                            >
                                Account Information
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-3/4 p-10 flex flex-col items-center justify-center bg-white bg-opacity-90 shadow-lg">
                    <div className="w-full max-w-lg flex flex-col h-full">
                        {/* Change Password Section */}
                        {selectedSetting === "change-password" && (
                            <div className="flex-1 h-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h2>
                                <p className="text-gray-500 mb-4">Update your password for better security.</p>
                                {/*{error && <p className="text-red-500 mb-2">{error}</p>}*/}

                                {alertMessage && <Alert displayType={alertDisplayType || ""} title={alertType || ""}>{alertMessage}</Alert>}

                                <form onSubmit={handleUpdatePassword} className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="Current Password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                    </div>

                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="New Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                        <span
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>

                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Confirm New Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                        <span
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>

                                    <button className="bg-white mx-auto mt-2 w-35 h-10 rounded-md border-2 border-[#FDE047] shadow-[4px_4px_#F59E0B] text-sm font-semibold text-black cursor-pointer">
                                        Update Password
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Account Info Section */}
                        {selectedSetting === "account" && (
                            <div className="flex-1 h-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Account Info</h2>
                                <p className="text-gray-500 mb-4">Your account details.</p>
                                {error && <p className="text-red-500 mb-2">{error}</p>}
                                <form onSubmit={handleAccountUpdate} className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={user?.user_metadata.username}
                                        onChange={(e) => setUser({ ...user, user_metadata: { ...user.user_metadata, username: e.target.value } })}
                                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={user?.user_metadata.email}
                                        onChange={(e) => setUser({ ...user, user_metadata: { ...user.user_metadata, email: e.target.value } })}
                                        className="w-full p-3 border mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                    <button className="bg-white mx-auto mt-2 w-35 h-10 rounded-md border-2 border-[#FDE047] shadow-[4px_4px_#F59E0B] text-sm font-semibold text-black cursor-pointer">
                                        Update Account Info
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
