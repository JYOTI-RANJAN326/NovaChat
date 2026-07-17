import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";

import { searchUsers } from "../../services/userAPI";
import { createGroupChat } from "../../services/chatAPI";

const CreateGroupModal = ({
  onClose,
  onGroupCreated,
}) => {
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // Search Users
  // =====================================

  useEffect(() => {
    if (!search.trim()) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await searchUsers(
          search
        );

        setUsers(response.data || []);

      } catch (error) {
        console.log(error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // =====================================
  // Create Group
  // =====================================

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      toast.error("Enter group name");
      return;
    }

    if (selectedUsers.length < 2) {
      toast.error(
        "Select at least 2 members."
      );
      return;
    }

    try {
      setLoading(true);

     await createGroupChat({
  chatName: groupName,
  participants: selectedUsers.map(
    (user) => user._id
  ),
});

      toast.success(
        "Group created successfully"
      );

      setGroupName("");
      setSearch("");
      setUsers([]);
      setSelectedUsers([]);

      if (onGroupCreated) {
        await onGroupCreated();
      }

      onClose();

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to create group"
      );
    } finally {
      setLoading(false);
    }
  };

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
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
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
            Create Group
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <FiX size={22} />
          </button>

        </div>

        {/* Group Name */}

        <input
          type="text"
          value={groupName}
          placeholder="Group Name"
          onChange={(e) =>
            setGroupName(e.target.value)
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

        {/* Search */}

        <input
          type="text"
          value={search}
          placeholder="Search Members..."
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            mb-4
            w-full
            rounded-xl
            bg-[#1A2944]
            p-3
            text-white
            outline-none
          "
        />

        {/* Selected Members */}

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
                        (u) =>
                          u._id !== user._id
                      )
                    )
                  }
                  className="font-bold"
                >
                  ✕
                </button>

              </div>
            ))}

          </div>
        )}

        {/* Search Results */}

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
          {users.length === 0 ? (

            <p className="mt-20 text-center text-slate-500">
              Search users to add...
            </p>

          ) : (

            <div className="space-y-2">

              {users.map((user) => (

                <button
                  key={user._id}
                  onClick={() => {

                    if (
                      selectedUsers.some(
                        (u) =>
                          u._id === user._id
                      )
                    )
                      return;

                    setSelectedUsers(
                      (prev) => [
                        ...prev,
                        user,
                      ]
                    );
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
                  {user.profilePic ? (

                    <img
                      src={user.profilePic}
                      alt={user.fullName}
                      className="h-10 w-10 rounded-full object-cover"
                    />

                  ) : (

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-cyan-500
                        font-semibold
                        text-white
                      "
                    >
                      {user.fullName
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                  )}

                  <div className="text-left">

                    <p className="font-medium text-white">
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

        {/* Button */}

        <button
          disabled={loading}
          onClick={handleCreateGroup}
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
            ? "Creating..."
            : "Create Group"}
        </button>

      </motion.div>
    </div>
  );
};

export default CreateGroupModal;