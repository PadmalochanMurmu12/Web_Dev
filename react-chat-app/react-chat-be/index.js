const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: "http://localhost:5173",
            methods: ["POST", "GET", "PUT", "DELETE"]
        },
    }
);

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("send-message", (message) => {
        try {
            console.log(`Message received from ${socket.id}:`, message);
            io.emit("received-message", message); // Broadcast to all clients
        } catch (error) {
            console.error("Error while handling 'send-message':", error);
        }
    });

    socket.on("disconnect", () => console.log("User disconnected"))
});

server.listen(5000, () => console.log("Server running on port 5000")
);