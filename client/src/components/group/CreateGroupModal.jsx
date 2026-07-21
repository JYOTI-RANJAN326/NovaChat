import { useState } from "react";
import { FiX, FiSearch } from "react-icons/fi";
import { useEffect } from "react";
import {
  getAllUsers,
  createGroup,
} from "../../services/groupAPI";
const CreateGroupModal = ({
  open,
  onClose,
  onGroupCreated,
}) => {
  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");
const [users, setUsers] = useState([]);
const [selectedUsers, setSelectedUsers] = useState([]);
useEffect(() => {

    const fetchUsers = async () => {

        try {

            const data = await getAllUsers();

            setUsers(data);

        } catch (error) {

            console.log(error);

        }

    };

    if (open) {

        fetchUsers();

    }

}, [open]);
const toggleUser = (userId) => {

    setSelectedUsers((prev) => {

        if (prev.includes(userId)) {

            return prev.filter(
                (id) => id !== userId
            );

        }

        return [...prev, userId];

    });

};
const handleCreateGroup = async () => {
  try {
    if (!chatName.trim()) {
      return alert("Please enter a group name.");
    }

    if (selectedUsers.length < 2) {
      return alert("Select at least 2 members.");
    }

   const newGroup = await createGroup(chatName, selectedUsers);
if (onGroupCreated) {
  onGroupCreated(newGroup.group);
}
    alert("Group created successfully!");

    setChatName("");
    setSearch("");
    setSelectedUsers([]);

    onClose();

  } catch (error) {
    console.log(error);
    alert("Failed to create group.");
  }
};
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[600px] rounded-2xl bg-[#0B1220] border border-white/10 p-6">
<br/>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            Create Group
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-white/10"
          >
            <FiX className="text-white text-xl" />
          </button>
        </div>

        {/* Group Name */}
        <div className="mb-5 leading-10">
          <label className="mb-2 block h-[30px] text-sm text-slate-400">
            Group Name
          </label>

          <input
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            placeholder="Enter group name"
            className="w-[597px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>
<br/>
        {/* Search */}
        <div className="mb-5 relative h-[30px] leading-10">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="         Search members..."
            className="w-[597px] rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none focus:border-cyan-500"
          />
        </div>
<br/>
        {/* Selected Users */}
       <div className="mb-5 h-60 overflow-y-auto rounded-xl border border-white/10 bg-white/5">

    {users
        .filter((user) =>
            user.fullName
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        .map((user) => (

            <div
                key={user._id}
                onClick={() => toggleUser(user._id)}
                className={`flex cursor-pointer items-center justify-between border-b border-white/5 p-3 transition hover:bg-white/10 ${
                    selectedUsers.includes(user._id)
                        ? "bg-cyan-600/30"
                        : ""
                }`}
            >

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 text-white font-bold">
                        {user.fullName
                            ?.charAt(0)
                            .toUpperCase()}
                    </div>

                    <div>

                        <h4 className="text-white font-medium">
                            {user.fullName}
                        </h4>

                        <p className="text-xs text-slate-400">
                            @{user.username}
                        </p>

                    </div>

                </div>

                <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    readOnly
                />

            </div>

        ))}

</div>
<br/>
        {/* Footer */}
        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl  h-[30px] w-[97px] border border-white/10 px-5 py-2 text-white hover:bg-white/10"
          >
            Cancel
          </button>

         <button
  onClick={handleCreateGroup}
  className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-white hover:bg-cyan-600"
>
  Create Group
</button>

        </div>
<br/>
      </div>
    </div>
  );
};

export default CreateGroupModal;