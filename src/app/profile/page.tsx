"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/ui/components/navbar";
import { supabase } from "@/utils/supabase/client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Alert from "@clayui/alert";
import Image from "next/image";

export default function Profile() {
    const [selectedSetting, setSelectedSetting] = useState("profile-details");
    const [background, setBackground] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<"Success" | "Danger" | "Warning" | null>(null);
    const [alertDisplayType, setAlertDisplayType] = useState<"success" | "danger" | "warning" | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // For storing selected file
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null); // For storing image URL after upload
    const router = useRouter();

    useEffect(() => {
        import("@clayui/css/lib/css/atlas.css");
        setBackground("url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg')");
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
                setAlertDisplayType("warning");
                return;
            }

            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) {
                setAlertMessage(error.message);
                setAlertType("Danger");
                setAlertDisplayType("danger");
            } else {
                setAlertMessage("Password updated successfully!");
                setAlertType("Success");
                setAlertDisplayType("success");
                router.push("/auth/callback2signin");
                await supabase.auth.signOut();
            }
        } catch (err) {
            setAlertMessage("Failed to update password.");
            setAlertType("Danger");
            setAlertDisplayType("danger");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUploadImage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        const { data: { session } } = await supabase.auth.getSession();

        try {
            // Upload image to Supabase storage with the same name (user ID)
            const fileName = `${session?.user?.user_metadata.sub}`; // Ensure the file is named with user ID (or any other unique name)
            const { data, error } = await supabase.storage
                .from("profile_images") // Your storage bucket name
                .upload(fileName, selectedFile, {
                    contentType: selectedFile.type, // Ensure to set the MIME type
                    upsert: true, // Ensures that if a file with the same name exists, it gets overwritten
                });
            if (error) {
                setAlertMessage(error.message);
                setAlertType("Danger");
                setAlertDisplayType("danger");
            } else {
                // Get the public URL of the uploaded image
                setAlertMessage("Image uploaded successfully!");
                setAlertType("Success");
                setAlertDisplayType("success");
            }
        } catch (err) {
            setAlertMessage("Failed to upload image.");
            setAlertType("Danger");
            setAlertDisplayType("danger");
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
                <div className="w-1/4 bg-amber-100 text-[#323232] p-6 rounded-3xl">
                    <h2 className="text-3xl font-bold mb-6">Settings</h2>
                    <ul className="space-y-4">
                        <li>
                            <button
                                onClick={() => setSelectedSetting("profile-details")}
                                className={`w-full text-left px-4 py-3 text-[#323232] rounded-lg text-lg transition-all mb-2 ${
                                    selectedSetting === "profile-details" ? "bg-amber-500 text-white" : "hover:bg-gray-200"
                                }`}
                            >
                                Profile Details
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setSelectedSetting("change-password")}
                                className={`w-full text-left px-4 py-3 text-[#323232] rounded-lg text-lg transition-all mb-2 ${
                                    selectedSetting === "change-password" ? "bg-amber-500 text-white" : "hover:bg-gray-200"
                                }`}
                            >
                                Change Password
                            </button>
                        </li>
                        {!user?.user_metadata?.avatar_url && (
                            <li>
                                {/* Upload Profile Image */}

                                <button
                                    onClick={() => setSelectedSetting("profile")}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-lg transition-all ${
                                        selectedSetting === "profile" ? "bg-amber-500 text-white" : "hover:bg-gray-200"
                                    }`}
                                >
                                    Upload Profile Image
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="mx-4"></div>
                {/* Main Content */}
                <div className="w-3/4 p-10 flex flex-col items-center justify-center bg-amber-100 bg-opacity-90 rounded-3xl">
                    <div className="w-full max-w-lg flex flex-col h-full bg-white p-6 rounded-3xl border-2 border-gray-300">
                        {/* Change Password Section */}
                        {selectedSetting === "change-password" && (
                            <div className="flex-1 h-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h2>
                                <p className="text-gray-500 mb-4">Update your password for better security.</p>

                                {alertMessage && <Alert displayType={alertDisplayType || undefined} title={alertType || ""}>{alertMessage}</Alert>}

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

                        {/* Upload Profile Image Section */}
                        {selectedSetting === "profile" && (
                            <div className="flex-1 h-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Image</h2>
                                <p className="text-gray-500 mb-4">Upload your Image.</p>
                                {alertMessage && <Alert displayType={alertDisplayType || undefined} title={alertType || ""}>{alertMessage}</Alert>}

                                <form onSubmit={handleUploadImage}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                        onChange={handleFileChange}
                                    />
                                    <button
                                        type="submit"
                                        className="bg-white mx-auto mt-2 w-35 h-10 rounded-md border-2 border-[#FDE047] shadow-[4px_4px_#F59E0B] text-sm font-semibold text-black cursor-pointer"
                                    >
                                        Upload
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Profile Details Section */}
                        {selectedSetting === "profile-details" && (
                            <div className="flex-1 h-full">
                                <Image
                                    alt="Profile Image"
                                    width={150}
                                    height={150}
                                    className="w-40 h-40 rounded-full border border-gray-300 mb-4 mx-auto object-cover"
                                    src={user?.id
                                        ? `https://cmubvhgmlnwyoyyashvr.supabase.co/storage/v1/object/public/profile_images/${user.id}`
                                        : "/default-profile.jpg"}
                                />
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Details</h2>
                                <form className="space-y-4">
                                    <div className="relative">
                                        <p className="text-lg">DISPLAY NAME : </p>
                                        <p className="px-4">{user?.user_metadata?.username}</p>
                                    </div>

                                    <div className="relative">
                                        <p className="text-lg">EMAIL : </p>
                                        <p className="px-4">{user?.user_metadata?.email}</p>
                                    </div>
                                </form>
                            </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}
