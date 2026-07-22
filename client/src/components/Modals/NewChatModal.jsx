import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";

import { searchUsers } from "../../services/userAPI";
import { createChat } from "../../services/chatAPI";

const NewChatModal = ({ onClose, refreshChats }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);
  const handleSearch = async (value) => {
    setQuery(value);

    if (!value.trim()) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);

      const res = await searchUsers(value);

      setUsers(res.data);

    } catch (error) {
      console.error(error);
      toast.error("Failed to search users");
    } finally {
      setLoading(false);
    }
  };

 const handleCreateChat = async (receiverId) => {
  if (creating) return;

  try {
    setCreating(true);

    await createChat(receiverId);

    toast.success("Chat opened");

    if (refreshChats) {
      await refreshChats();
    }

    onClose();
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Unable to create chat"
    );
  } finally {
    setCreating(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-[500px] rounded-2xl bg-[#08111F] p-6">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            New Chat
          </h2>

          <button
            onClick={onClose}
            className="text-white"
          >
            <FiX size={22} />
          </button>

        </div>

        <div className="relative">

          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="      Search users..."
            className="w-full rounded-xl bg-[#111827] py-3 pl-11 pr-4 text-white outline-none"
          />

        </div>

        <div className="mt-5 max-h-[380px] overflow-y-auto">

          {loading && (
            <div className="py-10 text-center text-slate-400">
  Searching users...
</div>
          )}

          {!loading &&
            users.map((user) => (
              <button
                key={user._id}
                onClick={() => handleCreateChat(user._id)}
                disabled={creating}
className="
flex w-full items-center gap-4 rounded-xl p-3
transition hover:bg-white/5
disabled:opacity-60
disabled:cursor-not-allowed
"
              >
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.fullName}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 font-bold text-white">
                    {user.fullName
  ?.split(" ")
  .map((n) => n[0])
  .join("")
  .slice(0, 2)
  .toUpperCase()}
                  </div>
                )}

                <div className="text-left">
                  <h4 className="font-semibold text-white">
                    {user.fullName}
                  </h4>

                  <p className="text-sm text-slate-400">
                    @{user.username}
                  </p>
                </div>
              </button>
            ))}

          {!loading &&
            query &&
            users.length === 0 && (
              <p className="py-8 text-center text-slate-500">
                No users found
              </p>
            )}

        </div>

      </div>

    </div>
  );
};

export default NewChatModal;