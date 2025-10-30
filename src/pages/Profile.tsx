import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [profileData, setProfileData] = useState<any>(null); 

  const loadData = (auth0Id: string | undefined) => {
    if (!auth0Id) return;

    axios.get(`http://localhost:8080/api/users/auth0/${auth0Id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, 
        },
    })
    .then((response) => {
        console.log("Profile Data Fetched:", response.data);
        setProfileData(response.data);
    })
    .catch((error) => {
        console.error("❌ Error fetching the profile data:", error);
    });
  }

  useEffect(() => {
    const syncAndLoad = async () => {
      if (!isAuthenticated || !user) return;

      try {
        const token = await getAccessTokenSilently({
        });
        
        localStorage.setItem("access_token", token);
        localStorage.setItem("user_id", user.sub || ""); 

        const syncResponse = await fetch("http://localhost:8080/api/users/me", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth0Id: user?.sub,
            email: user?.email,
            username: user?.nickname || user?.name,
            profileImageUrl: user?.picture,
          }),
        });

        if (!syncResponse.ok) {
          console.error("Failed to sync user:", await syncResponse.text());
        } else {
          console.log("✅ User synced with backend");
          
          loadData(user.sub);
        }
        
      } catch (err) {
        console.error("❌ Error during Auth0 operation or sync:", err);
      }
    };

    syncAndLoad();
  }, [isAuthenticated, getAccessTokenSilently, user]);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div>Loading ...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const role = profileData?.role || (user["app/roles"] === "admin" ? "ADMIN" : "USER");



  return (
    <div className="min-h-screen text-black">
      {/* Max width container, centered, with a light border */}
      <div className="max-w-2xl mx-auto bg-white border border-gray-200">
        
        {/* Banner - Simple gray placeholder */}
        <div className="h-48 relative bg-gray-300">
          {/* Optional: Add a subtle pattern/gradient here */}
        </div>

        {/* Profile Section */}
        <div className="px-4 pb-4 relative">
          
          {/* Profile Picture & Edit Button */}
          <div className="flex justify-between items-start -mt-16 mb-4">
            <img
              src={profileData?.profileImageUrl || "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Luis"}
              // Ensure border color matches the background for a clean cutout look
              className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-black"
            />
            <button className="mt-4 px-4 py-1 border border-gray-400 text-sm rounded-full font-semibold hover:bg-gray-100 transition">
              Edit profile
            </button>
          </div>

          {/* User Info */}
          <div className="mb-4">
            <h1 className="text-xl font-bold">{profileData?.username}</h1>
            <p className="text-gray-500 text-sm">@{profileData?.email}</p>
          </div>
          
          {/* Join Date */}
          <div className="flex items-center text-gray-500 mb-4 text-sm">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 11h2v2H7zM21 6v14c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2zm-4 0h2v-2h-2z"/>
            </svg>
            <span>Joined {profileData?.createdAt}</span>
          </div>

          {/* Following/Followers */}
          <div className="flex gap-4 mb-4 text-sm">
            <div>
              <span className="font-bold">{110}</span>
              <span className="text-gray-500"> Following</span>
            </div>
            <div>
              <span className="font-bold">{0}</span>
              <span className="text-gray-500"> Followers</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex text-sm">
              {['Posts', 'Replies', 'Highlights', 'Articles', 'Media', 'Likes'].map(tab => (
                <button 
                  key={tab} 
                  className={`flex-1 py-3 text-center transition ${tab === 'Posts' 
                    ? 'font-bold border-b-4 border-blue-500 text-black' 
                    : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Role Info (Custom Info Block) */}
          <div className="mt-6 p-3 bg-gray-50 rounded-md border border-gray-200">
            <h4 className="text-xs text-gray-700">Role: <span className="text-black font-semibold">{role}</span></h4>
            <p className="text-xs text-gray-700 mt-1">Email: <span className="text-black">{user.email}</span></p>
            {profileData && (
                 <p className="text-xs text-gray-700 mt-1">Backend ID: <span className="text-black">{profileData.id}</span></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;