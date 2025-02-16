import { createAdapter } from '@socket.io/redis-streams-adapter';
import { config } from 'dotenv';
import express, { Request, Response } from 'express'
import { createServer } from 'http';
import Redis from 'ioredis';
import morgan from 'morgan';
import { Server } from 'socket.io';

config()

const app = express()
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(morgan('dev'))

const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || '6379', 10)
})

const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: '*'
    },
    adapter: createAdapter(redis)
})

io.on('connection',(socket) =>{
    console.log(`User Connected: ${socket.id}`);
    socket.on('msg',(data) =>{
        console.log(data);
        io.emit('msg',data);
    })
})

app.get('/',(req: Request, res: Response)=>{
    res.json({
        "message": "working ws"
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});