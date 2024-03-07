const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require("mongoose");
const app = express();
const server = http.createServer(app);

app.use(express.json());
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors());

const url = "mongodb+srv://chat_app:rRv2t.-WTET9K.n@cluster0.p4hdf9b.mongodb.net/chat_app";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.error('MongoDB Connection Error:', err);
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB established successfully");
});


const signSchema = new mongoose.Schema({
    phone: String,
    room: String,
}, { timestamps: true });
const signIn = mongoose.model("signups", signSchema);

app.post("/signup", async (req, res) => {
    try {
        const data = req.body;

        data.room = data.phone;
        const newSignIn = new signIn(data);

        await newSignIn.save();
        res.send("Success");
    } catch (error) {
        console.log("Login Error", error);
    }
})

const messageSchema = new mongoose.Schema({
    room: String,
    sender: String,
    content: String,
}, { timestamps: true })
const Message = mongoose.model("Message", messageSchema);

app.post("/chat_history", async (req, res) => {
    try {
        const { room, sender, content } = req.body;
        const pair = new Message({ room, sender, content });
        await pair.save();
        res.send("Success");
        console.log("Data Submitted Successfully");
    } catch (error) {
        res.send(error);
        console.log("User Post Error", error);
    }
})


app.get("/chat_history/:room", async (req, res) => {
    const data = req.params.room;
    // console.log(data, "00000");

    try {
        const message = await Message.find({ room: data });
        res.send(message);
        // console.log("success", message)
    } catch (err) {
        res.send(err);
    }
})

app.delete("/chat_history/:room", async (req, res) => {
    const data = req.params.room;
    // console.log(data, "00000");

    try {
        const message = await Message.deleteMany({ room: data });
        res.send("Success");
        // console.log("success", message)
    } catch (err) {
        res.send(err);
    }
})



io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    // socket.on("send_message", (data) => {
    //     socket.to(data.room).emit("receive_message", data);
    // });
    socket.on("send_message", async (data) => {
        try {
            const message = new Message({
                room: data.room,
                sender: data.sender,
                content: data.content,
                timestamp: new Date(),
            })
            await message.save();
            console.log(data.room, "room")
            // socket.br.emit("receive_message", data);
            socket.to(data.room).emit("receive_message", data);
            //  socket.broadcast.emit("receive_message", data);
            console.log(data.room, sent)

        } catch (error) {
            console.error("Error saving message:", error);
        }
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

app.get('/', (req, res) => {
    res.send('<h1>Hello...</h1>');
});

const port = 5000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
