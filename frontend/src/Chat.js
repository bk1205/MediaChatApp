import { useEffect, useState, useRef } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import { useStateValue } from "./StateContext";
import { actionTypes } from "./reducer";

import { InsertEmoticon, Mic, Send, CallMade } from "@mui/icons-material";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import CallIcon from "@mui/icons-material/Call";

import "react-toastify/dist/ReactToastify.css";
import { socket } from "./config";
import Call from "@mui/icons-material/Call";

const config = {
  iceServers: [
    { urls: "stun:stun1.l.google.com:19302" },
    {
      urls: "turn:numb.viagenie.ca",
      credential: "muazkh",
      username: "webrtc@live.com",
    },
  ],
};
let pc = null;
let dataChannel = null;

function Chat(props) {
  const toastId = useRef(null);
  const [glow, setGlow] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user, peer }, dispatch] = useStateValue();

  console.log(peer);
  const AnsToast = ({ closeToast }) => (
    <div>
      <button onClick={setOffer}>
        <CallIcon />
      </button>
    </div>
  );

  useEffect(() => {
    socket.on("offerans", (payload) => {
      console.log("Hearing for offerans event: " + payload);
      if (payload.type === "offer") setGlow("answer");
      pc.setRemoteDescription(payload);
    });

    socket.on("candidate", (payload) => {
      console.log("Hearing for candidate: " + payload);
      pc.addIceCandidate(payload);
    });

    pc = new RTCPeerConnection(config);
    pc.onicecandidate = ({ candidate }) => socket.emit("candidate", candidate);
  }, []);

  const handleMessage = (e) => {
    const data = JSON.parse(e.data);
    console.log("messsage received!!!" + data.message);
    setMessages((state) => [...state, data]);
  };

  const generateOffer = async (e) => {
    e.preventDefault();
    console.log("Generating offer...");
    dataChannel = pc.createDataChannel("sendChannel");
    dataChannel.onmessage = handleMessage;
    dataChannel.onopen = (e) => console.log("open!!!!");
    dataChannel.onclose = (e) => console.log("closed!!!!!!");
    await pc.setLocalDescription(await pc.createOffer());
    socket.emit("offerans", pc.localDescription);
  };

  const setOffer = async (e) => {
    e.preventDefault();
    setGlow("");
    pc.ondatachannel = (e) => {
      dataChannel = e.channel;
      dataChannel.onmessage = handleMessage;
      dataChannel.onopen = (e) => console.log("open!!!!");
      dataChannel.onclose = (e) => console.log("closed!!!!!!");
    };
    await pc.setLocalDescription(await pc.createAnswer());
    socket.emit("offerans", pc.localDescription);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    console.log(dataChannel);
    const obj = {
      name: user,
      timestamp: new Date().toLocaleString(),
      message: input,
    };
    setMessages([...messages, obj]);

    const data = JSON.stringify(obj);
    dataChannel.send(data);

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        {/* <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> */}

        <div className="chat__headerInfo">
          <h3>{peer}</h3>
          <p>
            Last seen at{" "}
            {new Date(messages[messages.length - 1]?.timestamp).toUTCString()}
          </p>
        </div>

        <div className="chat__headerRight">
          <IconButton onClick={generateOffer}>
            <Call />
          </IconButton>
          <IconButton classes={{ root: glow }} onClick={setOffer}>
            <CallMade />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((m, idx) => (
          <p
            key={idx}
            className={`chat__message ${m.name === user && "chat__receiver"}`}
          >
            <span className="chat__name">{m.name}</span>
            {m.message}
            <span className="chat__timestamp">
              {new Date(m.timestamp).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            <Send />
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
