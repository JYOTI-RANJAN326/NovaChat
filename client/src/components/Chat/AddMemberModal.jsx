import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";

import { searchUsers } from "../../services/userAPI";
import { addMember } from "../../services/chatAPI";

const AddMemberModal = ({
  chat,
  onClose,
  refreshChat,
}) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] =
    useState([]);
  const [loading, setLoading] =
    useState(false);
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
const filteredUsers = users.filter(
  (user) =>
    !chat.participants.some(
      (member) => member._id === user._id
    )
);

 return (
  <div
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/60
      backdrop-blur-sm
    "
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="
        w-[520px]
        rounded-3xl
        bg-[#111C2F]
        p-8
      "
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-white">
          Add Members
        </h2>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white"
        >
          <FiX size={22} />
        </button>

      </div>

      {/* Search */}

      <input
        type="text"
        value={search}
        placeholder="Search Members..."
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          mb-5
          w-full
          rounded-xl
          bg-[#1A2944]
          p-3
          text-white
          outline-none
        "
      />
      {selectedUsers.length > 0 && (

<div className="mb-4 flex flex-wrap gap-2">

  {selectedUsers.map((user) => (

    <div
      key={user._id}
      className="
        flex
        items-center
        gap-2
        rounded-full
        bg-cyan-500
        px-3
        py-1
        text-sm
        text-white
      "
    >

      {user.fullName}

      <button
        onClick={() =>
          setSelectedUsers((prev) =>
            prev.filter(
              (u) => u._id !== user._id
            )
          )
        }
      >
        ✕
      </button>

    </div>

  ))}

</div>

)}
<div
  className="
    mb-6
    h-60
    overflow-y-auto
    rounded-xl
    bg-[#0D1728]
    p-3
  "
>

  {filteredUsers.length === 0 ? (

    <p className="mt-20 text-center text-slate-500">
      Search users to add...
    </p>

  ) : (

    <div className="space-y-2">

      {filteredUsers.map((user) => (

        <button
          key={user._id}
          onClick={() => {

            if (
              selectedUsers.some(
                (u) => u._id === user._id
              )
            )
              return;

            setSelectedUsers((prev) => [
              ...prev,
              user,
            ]);

          }}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            p-3
            transition
            hover:bg-white/5
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-cyan-500
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

<button
  disabled={loading}
  onClick={async () => {

    if (selectedUsers.length === 0) {
      toast.error(
        "Select at least one member."
      );
      return;
    }

   try {

  setLoading(true);

  for (const member of selectedUsers) {

    await addMember(
      chat._id,
      member._id
    );

  }

  toast.success(
    "Members added successfully"
  );

  // Clear modal state
  setSearch("");
  setUsers([]);
  setSelectedUsers([]);

  // Refresh group/chat
  await refreshChat();

  // Close modal
  onClose();

} catch (error) {

  console.log(error);

  toast.error(
    error.response?.data?.message ||
    "Unable to add members"
  );

} finally {

  setLoading(false);

}

}}
  className="
    w-full
    rounded-xl
    bg-cyan-500
    py-3
    font-semibold
    text-white
    transition
    hover:bg-cyan-600
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {loading
    ? "Adding..."
    : "Add Members"}
</button>

    </motion.div>
  </div>
);
};

export default AddMemberModal;