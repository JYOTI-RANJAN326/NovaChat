import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import ChatItem from "./ChatItem";

import { getChats } from "../../../services/chatAPI";
import {
  setChats,
  setLoading,
} from "../../../slices/chatSlice";

function ChatList() {
  const dispatch = useDispatch();

  const { chats, loading } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    async function fetchChats() {
      try {
        dispatch(setLoading(true));

        const data = await getChats();

        dispatch(setChats(data));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    }

    fetchChats();
  }, [dispatch]);

  return (
    <div className="flex h-full flex-col bg-[#0A1022]">

      {/* Search */}

      <SearchBar />

      {/* Header */}

      <div className="px-5 pt-6 pb-3">

        <h2 className="text-xs uppercase tracking-widest text-slate-500">
          Chats
        </h2>

      </div>

      {/* Chat List */}

      <div className="flex-1 overflow-y-auto">

        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-slate-500">
              Loading chats...
            </p>
          </div>
        ) : chats.length === 0 ? (
          <div className="flex h-full items-center justify-center px-6">
            <p className="text-center text-slate-500">
              No chats found.
            </p>
          </div>
        ) : (
          chats.map((chat) => (
            <ChatItem
              key={chat._id}
              chat={chat}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default ChatList;