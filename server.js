// server.js
import { Server } from 'socket.io';

const io = new Server(8000, {
    cors: {
        origin: '*',
    },
});

// to create a map function for set id and mail 
const emailToSocketidMap = new Map();
const socketidToEmailMap = new Map();

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);
    socket.on("room:join", (data) => {
        console.log(data);
        const {email,roomNumber,userName} = data;
        emailToSocketidMap.set(email,socket.id);
        socketidToEmailMap.set(socket.id, email);
        io.to(roomNumber).emit("user:joined",{email,userName,id:socket.id});
        socket.join(roomNumber);
        io.to(socket.id).emit("room:join",data);
    });

    socket.on("user:call",({to,offer})=>{
        io.to(to).emit("incomming:call",{from:socket.id, offer})
    });
    socket.on("call:accepted",({to,answer})=>{
        io.to(to).emit("call:accepted",{from:socket.id, answer})
    });
    socket.on("peer:nego:needed",({to,offer})=>{
        io.to(to).emit("peer:nego:needed",{from:socket.id, offer})
    });
    socket.on("peer:nego:done",({to,answer})=>{
        io.to(to).emit("peer:nego:final",{from:socket.id, answer})
    });

});
