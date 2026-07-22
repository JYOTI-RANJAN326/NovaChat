import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";

import { searchUsers } from "../../services/userAPI";
import { createGroup } from "../../services/groupAPI";

const CreateGroupModal = ({ onClose }) => {
  const [chatName, setChatName] = useState("");
  const [query, setQuery] = useState("");

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

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
  } catch (err) {
    console.log(err);
    toast.error("Unable to search users");
  } finally {
    setLoading(false);
  }
};
const addMember = (user) => {
  if (selectedUsers.some((u) => u._id === user._id)) {
    return;
  }

  setSelectedUsers((prev) => [...prev, user]);
};
const removeMember = (id) => {
  setSelectedUsers((prev) =>
    prev.filter((u) => u._id !== id)
  );
};

const handleCreateGroup = async () => {
  if (!chatName.trim()) {
    toast.error("Enter group name");
    return;
  }

  if (selectedUsers.length < 2) {
    toast.error("Select at least 2 members");
    return;
  }

  try {
    setCreating(true);

   await createGroup(
  chatName,
  selectedUsers.map((u) => u._id)
);

    toast.success("Group created");

    onClose();
  } catch (err) {
    console.log(err);

    toast.error(
      err.response?.data?.message ||
      "Unable to create group"
    );
  } finally {
    setCreating(false);
  }
};
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="w-[550px] rounded-2xl bg-[#08111F] p-6">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Create Group
        </h2>

        <button
          onClick={onClose}
          className="text-white"
        >
          <FiX size={22} />
        </button>
      </div>

      {/* Group Name */}
      <input
        value={chatName}
        onChange={(e) => setChatName(e.target.value)}
        placeholder="Group Name"
        className="mb-5 w-full rounded-xl bg-[#111827] px-4 py-3 text-white outline-none"
      />

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search members..."
          className="w-full rounded-xl bg-[#111827] py-3 pl-11 pr-4 text-white outline-none"
        />
      </div>

      {/* Selected Members */}
      {selectedUsers.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">

          {selectedUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-2 rounded-full bg-cyan-600 px-3 py-2 text-sm text-white"
            >
              {user.fullName}

              <button
                onClick={() => removeMember(user._id)}
              >
                <FiX />
              </button>
            </div>
          ))}

        </div>
      )}

      {/* Results */}
      <div className="mt-6 max-h-[260px] overflow-y-auto">

        {loading && (
          <p className="text-center text-slate-400">
            Searching users...
          </p>
        )}

        {!loading &&
          users.map((user) => {

            const selected = selectedUsers.some(
              (u) => u._id === user._id
            );

            return (
              <button
                key={user._id}
                disabled={selected}
                onClick={() => addMember(user)}
                className="
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-xl
                  p-3
                  transition
                  hover:bg-white/5
                  disabled:cursor-not-allowed
                  disabled:opacity-50
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
            );
          })}

        {!loading &&
          query &&
          users.length === 0 && (
            <p className="py-8 text-center text-slate-500">
              No users found
            </p>
          )}

      </div>

      {/* Footer */}
      <button
        onClick={handleCreateGroup}
        disabled={creating}
        className="
          mt-6
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
        {creating ? "Creating..." : "Create Group"}
      </button>

    </div>
  </div>
);
};

export default CreateGroupModal;