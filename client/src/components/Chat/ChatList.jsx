import { useEffect, useState } from "react";
import {
  FiSearch,
  FiEdit,
  FiMessageCircle,
} from "react-icons/fi";
import { useSelector } from "react-redux";

import ChatItem from "./ChatItem";
import { getMyChats } from "../../services/chatAPI";
import CreateGroupModal from "./CreateGroupModal";

const ChatList = ({ selectedChat, setSelectedChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGroupModal, setShowGroupModal] =
    useState(false);
    const [search, setSearch] = useState("");

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await getMyChats();
      setChats(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  const filteredChats = chats
  .filter((chat) => {
    const chatName = chat.isGroupChat
      ? chat.chatName
      : chat.participants.find(
          (p) => p._id !== user?._id
        )?.fullName || "";

    return chatName
      .toLowerCase()
      .includes(search.toLowerCase());
  })
  .sort((a, b) => {
    const timeA = new Date(
      a.latestMessage?.createdAt || a.updatedAt
    ).getTime();

    const timeB = new Date(
      b.latestMessage?.createdAt || b.updatedAt
    ).getTime();

    return timeB - timeA;
  });
  return (
    <aside
      className="
      flex
      h-screen
      w-[360px]
      flex-col
      border-r
      border-white/10
      bg-gradient-to-b
      from-[#0F172A]
      via-[#111827]
      to-[#0B1120]
    "
    >
      {/* Header */}

      <div className="border-b border-white/5 px-6 py-4 leading-13">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Chats
            </h2>
            
            <p className="mt-1 text-sm text-slate-400">
              {filteredChats.length} Conversations
            </p>
          </div>

          <button
            onClick={() => setShowGroupModal(true)}
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-cyan-500/10
            text-cyan-400
            transition-all
            duration-300
            hover:scale-105
            hover:bg-cyan-500/20
          "
          >
            <FiEdit className="text-xl" />
          </button>
        </div>
        
        {/* Search */}

        <div className="relative mt-6 leading-16">
          <FiSearch
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
          />

          <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="  Search conversations..."
            className="
            w-full
            h-[40px]
            rounded-2xl
            border
            border-white/10
            bg-white/5
            py-3
            pl-11
            pr-4
            text-white
            backdrop-blur-xl
            placeholder:text-slate-500
            outline-none
            transition-all
            focus:border-cyan-400
            focus:ring-2
            focus:ring-cyan-500/20
          "
          />
        </div>
      </div>
       
      {/* Chat List */}
<br/>
      <div
        className="
        flex-1
        space-y-20
        leading-12
        overflow-y-auto

        px-3
        py-8
      "
      >
        {loading ? (
          <div className="mt-16 flex flex-col items-center">
            <div
              className="
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              
              border-cyan-500
              border-t-transparent
            "
            />

            <p className="mt-4 text-slate-400">
              Loading conversations...
            </p>
          </div>
        ) : chats.length === 0 ? (
          <div className="mt-24 text-center">
            <FiMessageCircle className="mx-auto text-5xl text-slate-600" />

            <h3 className="mt-5 text-xl font-semibold text-white">
              No Conversations
            </h3>

            <p className="mt-4 text-sm text-slate-400">
              Start chatting with someone to see
              your conversations here.
            </p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <ChatItem
              key={chat._id}
              chat={chat}
              currentUserId={user?._id}
              active={selectedChat?._id === chat._id}
              onSelect={setSelectedChat}
            />
          ))
        )}
      </div>
  
      {showGroupModal && (
        <CreateGroupModal
          onClose={() => setShowGroupModal(false)}
          onGroupCreated={fetchChats}
        />
      )}
    </aside>
  );
};

export default ChatList;