import { Heart, MessageCircle, Repeat2, BarChart3 } from 'lucide-react';

export interface Tweet {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  likes: number;
}

type TweetComponentProps = {
  tweet: Tweet;
  userAvatar?: string;
  userName?: string;
  userHandle?: string;
}

const TweetComponent = ({ 
  tweet, 
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
  userName = "User",
  userHandle = "@user"
}: TweetComponentProps) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  };

  return (
    <div className="outline border bg-white border-gray-200 px-4 py-3 mb-3 hover:bg-gray-50 transition-colors">
      <div className="flex gap-3">
        <img 
          src={userAvatar} 
          alt={userName}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 min-w-0">
              <span className="font-bold text-black truncate">{userName}</span>
              <span className="text-gray-500 truncate">{userHandle}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500 flex-shrink-0">{getTimeAgo(tweet.createdAt)}</span>
            </div>
          </div>

          {tweet.content && (
            <p className="text-black text-[15px] mt-1 whitespace-pre-wrap break-words">
              {tweet.content}
            </p>
          )}

          <div className="flex items-center justify-evenly mt-3 max-w-md">
            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 group">
              <div className="p-2 rounded-full group-hover:bg-blue-50">
                <MessageCircle size={18} />
              </div>
            </button>

            <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 group">
              <div className="p-2 rounded-full group-hover:bg-green-50">
                <Repeat2 size={18} />
              </div>
            </button>

            <button className="flex items-center gap-1 text-gray-500 hover:text-pink-500 group">
              <div className="p-2 rounded-full group-hover:bg-pink-50">
                <Heart size={18} />
              </div>
              <span className="text-sm">{formatNumber(tweet.likes)}</span>
            </button>

            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 group">
              <div className="p-2 rounded-full group-hover:bg-blue-50">
                <BarChart3 size={18} />
              </div>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetComponent;