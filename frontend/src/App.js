// const App = () => {

//   const [{ user }, dispatch] = useStateValue();

//   // const setAnswer = async (answer) => {
//   //   console.log(answer);
//   //   await pc.setRemoteDescription(answer);
//   // };

//   // // pc.onnegotiationneeded = async () => {
//   // //   try {
//   // //     await pc.setLocalDescription(await pc.createOffer());
//   // //     // send the offer to the other peer
//   // //     socket.emit("private", {
//   // //       sender: user,
//   // //       receiver: userTo,
//   // //       desc: pc.localDescription,
//   // //     });
//   // //   } catch (err) {
//   // //     console.error(err);
//   // //   }
//   // // };
//   // const sendCall = async (e) => {
//   //   console.log("calling...");
//   //   e.preventDefault();
//   //   await generateOffer();
//   //   console.log(pc.localDescription);
//   //   socket.emit("private", {
//   //     receiver: userTo,
//   //     sender: user,
//   //     desc: pc.localDescription,
//   //   });

//   //   //socket.emit("chat", { message, username: user });
//   //   // dataChannel = pc.createDataChannel("sendChannel");
//   //   // dataChannel.onmessage = (e) => console.log("messsage received!!!" + e.data);
//   //   // dataChannel.onopen = (e) => console.log("open!!!!");
//   //   // dataChannel.onclose = (e) => console.log("closed!!!!!!");
//   //   // await pc.setLocalDescription(await pc.createOffer());
//   //   // const offer = pc.localDescription;
//   //   // console.log(offer);
//   //   // socket.emit("private", {
//   //   //   type: "offer",
//   //   //   receiver: userTo,
//   //   //   sender: user,
//   //   //   msg: offer,
//   //   // });
//   // };

//   // const handleCall = async ({ sender, receiver, desc, candidate }) => {
//   //   // if (desc) {
//   //   //   if (desc.type === "offer") {
//   //   //     //console.log(pc.localDescription, pc.remoteDescription);
//   //   //     //console.log(payload.msg);
//   //   //     // pc.ondatachannel = (e) => {
//   //   //     //   dataChannel = e.channel;
//   //   //     //   dataChannel.onmessage = (e) =>
//   //   //     //     console.log("messsage received!!!" + e.data);
//   //   //     //   dataChannel.onopen = (e) => console.log("open!!!!");
//   //   //     //   dataChannel.onclose = (e) => console.log("closed!!!!!!");
//   //   //     // };
//   //   //     // await pc.setRemoteDescription(desc);
//   //   //     // await pc.setLocalDescription(await pc.createAnswer());
//   //   //     // const ans = pc.localDescription;
//   //   //     // socket.emit("private", {
//   //   //     //   receiver: sender,
//   //   //     //   sender: receiver,
//   //   //     //   desc: ans,
//   //   //     //   candidate,
//   //   //     // });
//   //   //   } else if (desc.type === "answer") {
//   //   //     // pc.setRemoteDescription(desc);
//   //   //   }
//   //   // } else if (candidate) {
//   //   //   if (pc.remoteDescription) await pc.addIceCandidate(candidate);
//   //   // }
//   //   if (desc) {
//   //     if (desc.type === "offer") {
//   //       await setOffer(desc);
//   //       socket.emit("private", {
//   //         receiver: sender,
//   //         sender: receiver,
//   //         desc: pc.localDescription,
//   //       });
//   //     } else if (desc.type === "answer") {
//   //       await setAnswer(desc);
//   //     }
//   //   }
//   // };

//   // // useEffect(() => {
//   // //   console.log(new Date().toLocaleString());
//   // //   socket.on("private", (payload) => {
//   // //     console.log(payload);
//   // //     //setMessage(payload.desc);
//   // //     handleCall(payload);
//   // //   });
//   // //   // console.log(message);
//   // // });

//   const logout = (e) => {
//     e.preventDefault();
//     console.log(user + " left");
//     socket.emit("leave", user);
//   };

import React, { useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateValue } from "./StateContext";
import Sidebar from "./Sidebar";

function App() {
  const [{ user, peer }, dispatch] = useStateValue();

  return (
    //BEM naming convention
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <BrowserRouter>
          <div className="app__body">
            <Sidebar />
            {peer ? (
              <Routes>
                <Route path="/" element={<Chat />} />
              </Routes>
            ) : (
              <h2>Say Hi to your Friends!!</h2>
            )}
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
