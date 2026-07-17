import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../services/socket";
import { setOnlineUsers,addTypingUser,removeTypingUser, } from "../slices/socketSlice";
import {
  addNotification,
} from "../slices/socketSlice";
// (Optional) create later
// import { setOnlineUsers } from "../slices/socketSlice";

const useSocket = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("setup", userId);

    socket.on("connect", () => {
      console.log("🟢 Socket Connected:", socket.id);
    });

   socket.on("online-users", (users) => {
    dispatch(setOnlineUsers(users));
});

      // Later we'll store in Redux
      // dispatch(setOnlineUsers(users));
    //});
// User started typing
socket.on("typing", (userId) => {
  dispatch(addTypingUser(userId));
});

// User stopped typing
socket.on("stop-typing", (userId) => {
  dispatch(removeTypingUser(userId));
});
socket.on("new-notification", (notification) => {
  dispatch(addNotification(notification));
});
    socket.on("disconnect", () => {
      console.log("🔴 Socket Disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("online-users");
      socket.off("typing");
      socket.off("stop-typing");
      socket.off("new-notification");
      socket.off("disconnect");
    };
  }, [userId, dispatch]);
};

export default useSocket;