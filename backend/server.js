const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const users = {};

io.on("connection", (socket) => {
  console.log("what is socket: ", socket);
  console.log("socket is active to be connected");

  socket.on("chat", (payload) => {
    console.log("What is payload", payload);
    io.emit("chat", payload);
  });
  socket.on("join", (userId) => {
    console.log(userId);
    users[userId] = socket.id;
    setInterval(() => {
      io.emit("join", users);
    }, 1000);
  });

  socket.on("leave", (userId) => {
    console.log("Leaving user: " + userId);
    delete users[userId];
    console.log(users);
  });
  socket.on("offerans", (payload) => {
    console.log(users);
    let peer;
    for (u in users) {
      if (users[u] != socket.id) peer = users[u];
    }
    socket.to(peer).emit("offerans", payload);
  });
  socket.on("candidate", (payload) => {
    console.log(users);
    let peer;
    for (u in users) {
      if (users[u] != socket.id) peer = users[u];
    }
    socket.to(peer).emit("candidate", payload);
  });
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
