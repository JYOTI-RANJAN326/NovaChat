import { Routes, Route } from "react-router-dom";
import {
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import { socket } from "./services/socket";
import { getCurrentUserAPI } from "./services/authAPI";
import {
  setUser,
  setLoading,
} from "./slices/authSlice";
import {
  getLocalStream,
  createCallerPeer,
  createReceiverPeer,
  signalPeer,
  destroyPeer,
  stopLocalStream,
  getStream,
  getRemoteStream,
} from "./services/webrtc";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { setOnlineUsers } from "./slices/socketSlice";
import {
  setIncomingCall,
  clearIncomingCall,
  clearOutgoingCall,
  startCall,
  endCall,
} from "./slices/callSlice";
import GoogleSuccess from "./pages/GoogleSuccess";
import IncomingCallModal from "./components/Call/IncomingCallModal";
import CallScreen from "./components/Call/CallScreen";
function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
  const loadUser = async () => {
    dispatch(setLoading(true));

    try {
      const response = await getCurrentUserAPI();

      dispatch(
        setUser({
          user: response.data,
          token: null,
        })
      );
    } catch (error) {
      // Not logged in
    } finally {
      dispatch(setLoading(false));
    }
  };

  loadUser();
}, [dispatch]);
  const remoteAudioRef = useRef(null);
  const remoteVideoRef = useRef(null);
const localVideoRef = useRef(null);

const {
  incomingCall,
  outgoingCall,
  inCall,
  remoteUser,

} = useSelector(
  (state) => state.call
);
const { user } = useSelector(
  (state) => state.auth
);
const startCaller = useCallback(async () => {
  if (!outgoingCall) return;
const isVideoCall = outgoingCall?.callType === "video";
 const stream = await getLocalStream(
    outgoingCall?.callType === "video"
);

if (
    stream.getVideoTracks().length > 0 &&
    localVideoRef.current
) {
    localVideoRef.current.srcObject = stream;
}
 // dispatch(setLocalStream(stream));

  createCallerPeer({
    stream,

    onSignal: (signal) => {

      socket.emit("webrtc-signal", {
        
        receiverId: outgoingCall.receiverId,
        signal,
      });

    },

   onStream: (remoteStream) => {
  console.log("📹 Remote Stream:", remoteStream.id);

  if (isVideoCall && remoteVideoRef.current) {
    remoteVideoRef.current.srcObject = remoteStream;
  } else if (remoteAudioRef.current) {
    remoteAudioRef.current.srcObject = remoteStream;
    remoteAudioRef.current.play().catch(console.error);
  }
},
   onClose: () => {
  stopLocalMedia();

  destroyPeer();

  dispatch(endCall());
  dispatch(clearOutgoingCall());
},

  });

}, [
   outgoingCall,
   dispatch,
]);
const startReceiver = useCallback(async () => {
  if (!incomingCall) return;
  const isVideoCall = incomingCall?.callType === "video";
let stream;
try {
 stream = await getLocalStream(isVideoCall);
} catch (err) {
  console.error("Media device error:", err);
  toast.error("Camera/Mic unavailable. Check if another app or tab is using it.");
  dispatch(endCall());
  dispatch(clearOutgoingCall());
  return;
}

if (
    stream.getVideoTracks().length > 0 &&
    localVideoRef.current
) {
    localVideoRef.current.srcObject = stream;
}
  //dispatch(setLocalStream(stream));

  createReceiverPeer({
    stream,

    onSignal: (signal) => {

      socket.emit("webrtc-signal", {
        receiverId: incomingCall.callerId,
        signal,
      });

    },

  onStream: (remoteStream) => {
  console.log("📹 Remote Stream:", remoteStream.id);

  if (isVideoCall && remoteVideoRef.current) {
    remoteVideoRef.current.srcObject = remoteStream;
  } else if (remoteAudioRef.current) {
    remoteAudioRef.current.srcObject = remoteStream;
    remoteAudioRef.current.play().catch(console.error);
  }
},
    onClose: () => {
  stopLocalMedia();

  destroyPeer();

  dispatch(endCall());
  dispatch(clearOutgoingCall());
},

  });

}, [
  incomingCall,
  dispatch,
]);

// const stopLocalMedia = useCallback(() => {
//   if (!localStream) return;

//   localStream.getTracks().forEach((track) => {
//     track.stop();
//   });
// }, [localStream]);
const stopLocalMedia = useCallback(() => {
  stopLocalStream();
}, []);
useEffect(() => {
  if (!inCall) return;

  const local = getStream();
  const remote = getRemoteStream();

  if (localVideoRef.current && local) {
    localVideoRef.current.srcObject = local;
  }

  if (remoteVideoRef.current && remote) {
    remoteVideoRef.current.srcObject = remote;
  }

  if (remoteAudioRef.current && remote) {
    remoteAudioRef.current.srcObject = remote;
    remoteAudioRef.current.play().catch(console.error);
  }
}, [inCall]);
  // ===============================
  // Online Users
  // ===============================

  useEffect(() => {

    socket.off("online-users");
socket.off("incoming-call");
socket.off("call-accepted");
socket.off("call-rejected");
socket.off("call-ended");
socket.off("webrtc-signal");
socket.off("user-busy");
  // ===============================
  // Online Users
  // ===============================

  socket.on("online-users", (users) => {
    dispatch(setOnlineUsers(users));
  });

  // ===============================
  // Incoming Call
  // ===============================

  socket.on("incoming-call", (data) => {
    console.log("Incoming Call", data);

    dispatch(setIncomingCall(data));
  });
  
  socket.on("user-busy", () => {
  destroyPeer();

  dispatch(clearOutgoingCall());

  alert("User is already in another call.");
});
  // ===============================
  // Call Accepted
  // ===============================

socket.on("call-accepted", async () => {
  console.log("Call Accepted");

  dispatch(startCall(outgoingCall));

   startCaller();

  dispatch(clearOutgoingCall());
});

  // ===============================
  // Call Rejected
  // ===============================

 socket.on("call-rejected", () => {

  stopLocalMedia();

  destroyPeer();

  dispatch(clearOutgoingCall());

});

  // ===============================
  // Call Ended
  // ===============================
socket.on("call-ended", () => {

  stopLocalMedia();

  destroyPeer();

  dispatch(endCall());
  dispatch(clearOutgoingCall());

});
socket.on(
  "webrtc-signal",
  ({ signal }) => {
     console.log("Received Signal", signal.type);

    signalPeer(signal);

  }
);



  return () => {
    socket.off("online-users");
    socket.off("incoming-call");
    socket.off("call-accepted");
    socket.off("user-busy");
    socket.off("call-rejected");
    socket.off("call-ended");
    socket.off("webrtc-signal");
     
  };
}, [
  dispatch,
  startCaller,
  startReceiver,
]);
useEffect(() => {
  const handleLeave = () => {
    if (!inCall || !remoteUser) return;

    socket.emit("end-call", {
      receiverId:
        remoteUser.receiverId ||
        remoteUser.callerId,
    });

    stopLocalMedia();
    destroyPeer();
  };

  window.addEventListener("beforeunload", handleLeave);
  window.addEventListener("pagehide", handleLeave);

  return () => {
    window.removeEventListener("beforeunload", handleLeave);
    window.removeEventListener("pagehide", handleLeave);
  };
}, [
  inCall,
  remoteUser,
  stopLocalMedia,
]);
  return (
    <>
      {/* Incoming Call Modal */}

      {incomingCall && (
        <IncomingCallModal
          caller={incomingCall}
       onAccept={() => {
  socket.emit("accept-call", {
    callerId: incomingCall.callerId,
    receiverId: user._id,
  });

  dispatch(startCall(incomingCall));

  startReceiver();   // or startReceiver() if you don't make it async here

  dispatch(clearIncomingCall());
}
}onReject={() => {

  socket.emit("reject-call", {

    callerId: incomingCall.callerId,

  });

  dispatch(clearIncomingCall());

}}
        />
      )}
      

      {inCall && (
 <CallScreen
remoteUser={remoteUser}
    
  remoteAudioRef={remoteAudioRef}
  remoteVideoRef={remoteVideoRef}
  localVideoRef={localVideoRef}
  callType={remoteUser?.callType || "audio"}
 onEnd={() => {

  socket.emit("end-call", {
    receiverId:
      remoteUser.receiverId ||
      remoteUser.callerId,
  });

  stopLocalMedia();

  destroyPeer();

  dispatch(endCall());
  dispatch(clearOutgoingCall());

}}
/>
)}
 {outgoingCall && (
  <div
    className="
      fixed
      inset-0
      z-[999]
      flex
      items-center
      justify-center
      bg-black/70
      backdrop-blur-md
    "
  >
    <div
      className="
        w-[360px]
        rounded-3xl
        border
        border-cyan-500/20
        bg-[#111C2F]
        p-8
        text-center
        shadow-[0_0_40px_rgba(34,211,238,.15)]
      "
    >
      {/* Avatar */}
      <div
        className="
          mx-auto
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-cyan-500
          via-sky-500
          to-blue-600
          text-4xl
          font-bold
          text-white
        "
      >
        {outgoingCall.receiverName
          ?.charAt(0)
          .toUpperCase()}
      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">
        Calling...
      </h2>

      <p className="mt-2 text-slate-400">
        {outgoingCall.receiverName}
      </p>

      <p className="mt-4 animate-pulse text-cyan-300">
        Ringing...
      </p>

      <button
        onClick={() => {
          socket.emit("end-call", {
            receiverId: outgoingCall.receiverId,
          });
             stopLocalMedia();
          destroyPeer();
          dispatch(endCall());
          dispatch(clearOutgoingCall());
        }}
        className="
          mt-8
          rounded-full
          bg-red-500
          px-6
          py-3
          font-semibold
          text-white
          transition
          hover:bg-red-600
        "
      >
        Cancel Call
      </button>
    </div>
  </div>
)}

      {/* Routes */}

      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
  path="/google-success"
  element={<GoogleSuccess />}
/>

        <Route
  path="/chat"
  element={
    <ProtectedRoute>
      <Chat />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
      </Routes>
    </>
  );
}

export default App;