import { Image, Smile, MapPin, Calendar } from 'lucide-react';
import TweetComponent, { type Tweet } from "@/scenes/tweet/index";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
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
  const tweets: Tweet[] = [
    {
      id: "2",
      userId: "user456",
      content: "Test.",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), 
      likes: 1500
    },
    {
      id: "3",
      userId: "user789",
      content: "test",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), 
      likes: 890
    }
  ];
    useEffect(() => {
        loadData(localStorage.getItem("user_id") || "");
    }, []);

  return (
    <div className="min-h-screen text-black">
      <div className="max-w-2xl mx-auto border-x border-gray-200">
        {/* New Tweet Input */}
        <div className="outline border-b border-gray-200 bg-white px-4 py-3 my-3">
          <div className="flex gap-3">
            <img 
              src={`${profileData?.profileImageUrl || "https://api.dicebear.com/9.x/adventurer/svg?seed=George"}`}
              alt="Your avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea 
                placeholder="What's happening?"
                className="w-full bg-transparent text-black placeholder-gray-500 outline-none resize-none"
                rows={8}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button className="text-blue-500 p-2 hover:bg-blue-50 rounded-full">
                    <Image size={20} />
                  </button>
                  <button className="text-blue-500 p-2 hover:bg-blue-50 rounded-full">
                    <Smile size={20} />
                  </button>
                  <button className="text-blue-500 p-2 hover:bg-blue-50 rounded-full">
                    <Calendar size={20} />
                  </button>
                  <button className="text-blue-500 p-2 hover:bg-blue-50 rounded-full">
                    <MapPin size={20} />
                  </button>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-full">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* Feed */}
        <div>
          {tweets.map((tweet) => {
            return (
              <TweetComponent
                key={tweet.id}
                tweet={tweet}
                userName={profileData?.username}
                userHandle={profileData?.email}
                userAvatar={profileData?.profileImageUrl}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;