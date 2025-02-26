"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Alert from "@clayui/alert";
import Image from "next/image";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import Navbar from "@/app/ui/components/navbar";
import Dropdown from "@/app/ui/components/dropdown";

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
    const [isAlertVisible, setIsAlertVisible] = useState(false); // New state for visibility
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
    const [imageTimestamp, setImageTimestamp] = useState(Date.now()); // Add timestamp for cache busting
    const router = useRouter();
    const [preferences, setPreferences] = useState({
            cuisine: "",
            mealType: "",
            diet: "",
            intolerances: "",
    });

    useEffect(() => {
        import("@clayui/css/lib/css/atlas.css");
        setBackground("url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg')");
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
                // Try to get profile image URL when user data is loaded
                fetchProfileImage(session.user.id);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchPreferences = async () => {
            // Guard clause to exit if user or user.id is not available
            if (!user || !user.id) return;

            const { data, error } = await supabase
                .from("users")
                .select("cuisine, meal_type, diet, intolerances")
                .eq("id", user.id) // Now safe to use user.id
                .single();

            if (error) {
                console.error("Error fetching preferences:", error);
            } else {
                setPreferences({
                    cuisine: data.cuisine || "",
                    mealType: data.meal_type || "",
                    diet: data.diet || "",
                    intolerances: data.intolerances || "",
                });
            }
        };

        fetchPreferences();
    }, [user]); // Dependency on user

    // Add a function to fetch profile image
    const fetchProfileImage = async (userId: string) => {
        if (!userId) return;

        // Check if the image exists
        const { data: files, error } = await supabase.storage
            .from("profile_images")
            .list("", { search: userId });

        if (error || !files || files.length === 0) {
            console.log("No profile image found, using default.");
            setProfileImageUrl("/default.jpg"); // Will fallback to default image
            return;
        }

        // If file exists, get public URL
        const { data } = supabase.storage
            .from("profile_images")
            .getPublicUrl(userId);

        setProfileImageUrl(data?.publicUrl || "/default.jpg");
    };


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


    const handleAutoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            showAlert("Please select a file first", "Warning", "warning");
            return;
        }

        // Show preview immediately
        setProfileImageUrl(URL.createObjectURL(file));

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                showAlert("User not authenticated", "Danger", "danger");
                setProfileImageUrl(null);
                return;
            }

            const fileName = session.user.id;

            // Upload with 'upsert' (overwrite existing image)
            const { error } = await supabase.storage
                .from("profile_images")
                .upload(fileName, file, {
                    contentType: file.type,
                    upsert: true
                });

            if (error) {
                showAlert(error.message, "Danger", "danger");
                setProfileImageUrl(null);
                return;
            }

            // Fetch the updated image URL
            await fetchProfileImage(session.user.id);
            setImageTimestamp(Date.now()); // Cache busting
            showAlert("Profile image updated successfully", "Success", "success");
        } catch (error) {
            console.error("Upload failed:", error);
            showAlert("Failed to upload image", "Danger", "danger");
            setProfileImageUrl(null);
        }
    };

    // Assuming showAlert is defined like this (based on previous context):
    const showAlert = (message: string, type: "Success" | "Danger" | "Warning", displayType: "success" | "danger" | "warning") => {
        setAlertMessage(message);
        setAlertType(type);
        setAlertDisplayType(displayType);
        setIsAlertVisible(true);
        setTimeout(() => {
            setIsAlertVisible(false);
            setTimeout(() => {
                setAlertMessage(null);
                setAlertType(null);
                setAlertDisplayType(null);
            }, 300); // Wait for fade-out transition
        }, 1000); // Show alert for 1 second
    };

    const handleDropDownChange = async (field: string, value: string) => {
        const fieldMapping: { [key: string]: string } = {
            cuisine: "cuisine",
            mealType: "meal_type",
            diet: "diet",
            intolerances: "intolerances",
        };

        const dbField = fieldMapping[field] || field;

        setPreferences((prev) => ({ ...prev, [field]: value }));

        if (!user || !user.id) {
            showAlert("User not authenticated", "Danger", "danger");
            console.error("No user ID available for update");
            return;
        }

        try {
            const { data, error } = await supabase
                .from("users")
                .update({ [dbField]: value })
                .eq("id", user.id);

            console.log(`Update response for ${dbField}:`, { data, error });

            if (error) {
                console.error(`Error updating ${dbField}:`, error);
                showAlert(`Failed to update ${field}`, "Danger", "danger");
            } else {
                showAlert(`${field} updated successfully`, "Success", "success");
            }
        } catch (err) {
            console.error("Unexpected error during update:", err);
            showAlert("An unexpected error occurred", "Danger", "danger");
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
            <Navbar key={imageTimestamp} /> {/* Add key prop to force re-render */}
            <div className="relative w-full">
                {alertMessage && (
                    <div className="absolute top-0 left-0 right-0 flex justify-center z-10 transition-opacity duration-300 ease-in-out opacity-100">
                        <Alert
                            displayType={alertDisplayType || undefined}
                            title={alertType || ""}
                        >
                            {alertMessage}
                        </Alert>
                    </div>
                )}
            </div>
            <div className="flex flex-1 p-6">
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
                        <li>
                            <button
                                onClick={() => setSelectedSetting("nm-setting")}
                                className={`w-full text-left px-4 py-3 text-[#323232] rounded-lg text-lg transition-all mb-2 ${
                                    selectedSetting === "change-password" ? "bg-amber-500 text-white" : "hover:bg-gray-200"
                                }`}
                            >
                                Normal Mode Setting
                            </button>
                        </li>
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

                        {/* Profile Details Section */}
                        {selectedSetting === "profile-details" && (
                            <div className="flex-1 h-full">
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="relative w-40 h-40 mx-auto mb-4">
                                        <label htmlFor="profileImageUpload" className="cursor-pointer w-full h-full flex items-center justify-center">
                                            <Image
                                                alt="Profile Image"
                                                width={150}
                                                height={150}
                                                className="w-40 h-40 rounded-full border-5 border-amber-500 mb-4 mx-auto object-cover cursor-pointer"
                                                src={
                                                    profileImageUrl ? `${profileImageUrl}?t=${imageTimestamp || Date.now()}` :
                                                        user?.user_metadata?.avatar_url ||
                                                        '/default.jpg'
                                                }
                                                priority
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/default.jpg'; // Fallback to default image on error
                                                }}
                                            />
                                        </label>
                                        <input
                                            id="profileImageUpload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAutoUpload}
                                        />
                                    </div>
                                </form>
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

                        {/* Normal Mode Setting Section */}
                        {selectedSetting === "nm-setting" && (
                            <div className="flex-1 h-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Preferences</h2>
                                <Dropdown
                                    label="Cuisine"
                                    options={[
                                        "African", "Asian", "American", "British", "Cajun", "Caribbean",
                                        "Chinese", "Eastern European", "European", "French", "German",
                                        "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish",
                                        "Korean", "Latin American", "Mediterranean", "Mexican",
                                        "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
                                    ]}
                                    value={preferences.cuisine}
                                    onChange={(value) => handleDropDownChange("cuisine", value)}
                                />

                                <Dropdown
                                    label="Meal Type"
                                    options={[
                                        "main course", "side dish", "dessert", "appetizer", "salad",
                                        "bread", "breakfast", "soup", "beverage", "sauce"
                                    ]}
                                    value={preferences.mealType}
                                    onChange={(value) => handleDropDownChange("mealType", value)}
                                />

                                <Dropdown
                                    label="Diet"
                                    options={[
                                        "Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian",
                                        "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal",
                                        "Low FODMAP", "Whole30"
                                    ]}
                                    value={preferences.diet}
                                    onChange={(value) => handleDropDownChange("diet", value)}
                                />

                                <Dropdown
                                    label="Intolerances"
                                    options={[
                                        "Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood",
                                        "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"
                                    ]}
                                    value={preferences.intolerances}
                                    onChange={(value) => handleDropDownChange("intolerances", value)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}