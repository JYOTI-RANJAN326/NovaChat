import { Routes, Route } from "react-router-dom";
import {
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const stream = await getLocalStream();

  createCallerPeer({
    stream,

    onSignal: (signal) => {

      socket.emit("webrtc-signal", {
        
        receiverId: outgoingCall.receiverId,
        signal,
      });

    },

    onStream: (remoteStream) => {

      if (remoteAudioRef.current) {

       remoteAudioRef.current.srcObject = remoteStream;

remoteAudioRef.current
  .play()
  .catch(console.error);

      }

    },

    onClose: () => {

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

  const stream = await getLocalStream();

  createReceiverPeer({
    stream,

    onSignal: (signal) => {

      socket.emit("webrtc-signal", {
        receiverId: incomingCall.callerId,
        signal,
      });

    },

    onStream: (remoteStream) => {

      if (remoteAudioRef.current) {

       remoteAudioRef.current.srcObject = remoteStream;

remoteAudioRef.current
  .play()
  .catch(console.error);

      }

    },

    onClose: () => {

     destroyPeer();
dispatch(endCall());
dispatch(clearOutgoingCall());

    },

  });

}, [
  incomingCall,
  dispatch,
]);
  // ===============================
  // Online Users
  // ===============================

  useEffect(() => {
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
    dispatch(setIncomingCall(data));
  });

  // ===============================
  // Call Accepted
  // ===============================

 socket.on("call-accepted", () => {

 dispatch(startCall(outgoingCall));

startCaller();

dispatch(clearOutgoingCall());
});

  // ===============================
  // Call Rejected
  // ===============================

 socket.on("call-rejected", () => {

  dispatch(clearOutgoingCall());
  destroyPeer();

  alert("Call Rejected");

});

  // ===============================
  // Call Ended
  // ===============================
socket.on("call-ended", () => {

  destroyPeer();

  dispatch(endCall());
  dispatch(clearOutgoingCall());

});
socket.on(
  "webrtc-signal",
  ({ signal }) => {

    signalPeer(signal);

  }
);

  return () => {
    socket.off("online-users");
    socket.off("incoming-call");
    socket.off("call-accepted");
    socket.off("call-rejected");
    socket.off("call-ended");
    socket.off("webrtc-signal");
     destroyPeer();
  };
}, [
  dispatch,
  startCaller,
  startReceiver,
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
  startReceiver();

  dispatch(clearIncomingCall());

}}onReject={() => {

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
  onEnd={() => {

  socket.emit("end-call", {
    receiverId:
      remoteUser.receiverId ||
      remoteUser.callerId,
  });

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
      bg-black/60
    "
  >
    <div
      className="
        rounded-3xl
        bg-[#111C2F]
        p-8
        text-center
      "
    >
      <h2 className="text-2xl font-bold text-white">
        Calling...
      </h2>

      <p className="mt-3 text-slate-400">
        {outgoingCall.receiverName}
      </p>
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