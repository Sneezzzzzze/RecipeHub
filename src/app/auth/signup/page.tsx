// import ClayIcon from "@clayui/icon";
// import ClayButton from "@clayui/button";
// import Image from "next/image";
//
// const SignUpPage = () => {
//     return(
//         <div className="flex items-center space-x-4">
//             {user?.user_metadata?.avatar_url ? (
//                 <Image
//                     width={48}
//                     src={user.user_metadata.avatar_url}
//                     alt="Profile"
//                     className="w-12 h-12 rounded-full border-2 border-gray-300"
//                 />
//             ) : (
//                 <ClayIcon
//                     symbol="user"
//                     spritemap="/images/icons.svg"
//                     style={{ fontSize: "48px", width: "48px", height: "48px" }}
//                     className="text-gray-500"
//                 />
//             )}
//             <div className="text-black dark:text-white">
//                 <p className="text-lg font-semibold">{user?.user_metadata?.full_name || "Unknown User"}</p>
//                 <p className="text-sm text-gray-600">{user?.email || "No Email"}</p>
//             </div>
//             {/* Logout Button */}
//             <ClayButton
//                 displayType="secondary"
//                 className="mt-4 text-black border-2 px-4 py-2 rounded"
//                 onClick={handleLogout}
//             >
//                 Logout
//             </ClayButton>
//         </div>
//     )
// }
// export default SignUpPage;