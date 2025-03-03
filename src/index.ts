import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import router from "./routes/route";

const PORT = 4000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
})
app.use(express.json());
app.use(cors());

const MONGO_URL = 'mongodb://127.0.0.1:27017';

mongoose.connect(MONGO_URL, {
    dbName: "messages-hub",
}).then(() => {
    console.log('Database connected...');
}).catch((error) => {
    console.log('error: ',error)
})

app.use('/', router)

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message sent', () => {
        console.log('message sent ');
        io.emit('message sent');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});