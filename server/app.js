import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(cors({ origin: "*" }));

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log("Id", socket.id);
  socket.emit("welcome","welcome to the Server")
  socket.broadcast.emit("welcome", `New user joined ${socket.id}`)
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("Message received: " + msg);
    io.emit("chat message", msg);
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
