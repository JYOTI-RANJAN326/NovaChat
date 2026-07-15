import ChatLayout from "../layouts/ChatLayout";
import Sidebar from "../components/chat/sidebar/Sidebar";
import ChatHeader from "../components/chat/chatWindow/ChatHeader";
import Messages from "../components/chat/chatWindow/Messages";
import MessageInput from "../components/chat/chatWindow/MessageInput";

function Chat() {
  return (
    <ChatLayout>

      <div
        className="
        grid
        h-full
        grid-cols-[100px_360px_1fr_380px]
        "
      >

        <div className="border-r border-[#1B2748]">

         <Sidebar/>

        </div>

        <div className="border-r border-slate-800">

          Chat List

        </div>

        <div>

          <div className="flex h-full flex-col">

    <ChatHeader/>

    <Messages/>

    <MessageInput/>

</div>

        </div>

        <div className="border-l border-slate-800">

          AI Panel

        </div>

      </div>

    </ChatLayout>
  );
}

export default Chat;