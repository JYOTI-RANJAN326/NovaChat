import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

import { searchUsers } from "../../services/userAPI";
import { createChat } from "../../services/chatAPI";



const CreateChatModal = ({
  onClose,
  onChatCreated,
}) => {

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  if (!search.trim()) {

    setUsers([]);

    return;

  }

  const timer = setTimeout(async () => {

    try {

      const response = await searchUsers(search);

      setUsers(response.data || []);

    } catch (error) {

      console.log(error);

    }

  }, 300);

  return () => clearTimeout(timer);

}, [search]);
<div
  className="
    h-80
    overflow-y-auto
    rounded-2xl
    bg-[#0D1728]
    p-3
  "
>

  {users.length === 0 ? (

    <p className="mt-20 text-center text-slate-500">
      Search users to start chatting...
    </p>

  ) : (

    <div className="space-y-2">

      {users.map((user) => (

        <button
          key={user._id}
          onClick={async () => {

            try {

              setLoading(true);

              await createChat(user._id);

              toast.success("Chat Created");

              await onChatCreated();

              onClose();

            } catch (error) {

              console.log(error);

              toast.error(
                error.response?.data?.message ||
                "Unable to create chat"
              );

            } finally {

              setLoading(false);

            }

          }}
          disabled={loading}
          className="
            flex
            w-full
            items-center
            gap-4
            rounded-xl
            p-3
            transition
            hover:bg-white/5
          "
        >

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-cyan-500
              text-lg
              font-bold
              text-white
            "
          >
            {user.fullName.charAt(0)}
          </div>

          <div className="text-left">

            <p className="text-white">
              {user.fullName}
            </p>

            <p className="text-sm text-slate-400">
              @{user.username}
            </p>

          </div>

        </button>

      ))}

    </div>

  )}

</div>

  return (
<div className="p-6">

  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-bold text-white">
      New Chat
    </h2>

    <button
      onClick={onClose}
      className="text-slate-400 hover:text-white"
    >
      <FiX size={22} />
    </button>

  </div>

  <div className="relative mb-6">

  <FiSearch
    className="
      absolute
      left-4
      top-1/2
      -translate-y-1/2
      text-slate-400
    "
  />

  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search users..."
    className="
      w-full
      rounded-2xl
      bg-[#0D1728]
      py-3
      pl-12
      pr-4
      text-white
      outline-none
    "
  />

</div>

</div>

  );

};

export default CreateChatModal;