import { FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  removeMember,
  leaveGroup,
  makeAdmin,
  removeAdmin,
} from "../../services/chatAPI";

const GroupInfo = ({
  chat,
  onClose,
  refreshChat,
}) => {
  const { user } = useSelector(
  (state) => state.auth
);
console.log(chat);
 if (!chat) return null;

const isAdmin = chat.admins?.some(
  (admin) => admin?._id === user?._id
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
      "
    >
      <div
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
            Group Info
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <FiX />
          </button>

        </div>

        {/* Avatar */}

        <div className="flex flex-col items-center">

          <div
            className="
              mb-4
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-cyan-500
              text-4xl
              text-white
            "
          >
            👥
          </div>

          <h3 className="text-xl font-bold text-white">
            {chat.chatName}
          </h3>

          <p className="mt-2 text-slate-400">
            {chat.participants.length} Members
          </p>

        </div>

        {/* Members */}

        <div className="mt-8">

          <h4 className="mb-3 text-lg font-semibold text-white">
            Members
          </h4>

          <div className="space-y-3">

            {chat.participants.map((member) => (

              <div
                key={member._id}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  bg-[#18233C]
                  p-3
                "
              >
                <div>

                  <p className="font-medium text-white">
                    {member.fullName}
                  </p>

                  <p className="text-sm text-slate-400">
                    @{member.username}
                  </p>

                </div>

                {chat.admins?.some(
  (admin) => admin?._id === member._id
) && (
                  <span className="rounded-full bg-cyan-500 px-2 py-1 text-xs text-white">
                    Admin
                  </span>
                )}
                {isAdmin &&
member._id !== user._id && (

<button
  onClick={async () => {

    await removeMember(
      chat._id,
      member._id
    );

    toast.success("Member Removed");

    await refreshChat();

  }}
  className="
    text-red-400
    hover:text-red-300
  "
>
  Remove
</button>

)}
{isAdmin &&
!chat.admins?.some(
  (admin) => admin?._id === member._id
) && (

<button
  onClick={async () => {

    await makeAdmin(
      chat._id,
      member._id
    );

    toast.success("Admin Added");

    await refreshChat();

  }}
  className="
    text-cyan-400
    hover:text-cyan-300
  "
>
  Make Admin
</button>

)}

{isAdmin &&
chat.admins?.some(
  (admin) => admin?._id === member._id
) &&
member._id !== user._id && (

<button
  onClick={async () => {

    await removeAdmin(
      chat._id,
      member._id
    );

    toast.success("Admin Removed");

    await refreshChat();

  }}
  className="
    text-yellow-400
    hover:text-yellow-300
  "
>
  Remove Admin
</button>

)}

              </div>

            ))}

          </div>

        </div>

      </div>
      <button
  onClick={async () => {
    try {
      await leaveGroup(chat._id);

      toast.success("Left Group");

      await refreshChat();

      onClose();

    } catch (error) {
      console.log(error);
    }
  }}
  className="
    mt-6
    w-full
    rounded-xl
    bg-red-500
    py-3
    font-semibold
    text-white
  "
>
  Leave Group
</button>
    </div>
  );
};

export default GroupInfo;