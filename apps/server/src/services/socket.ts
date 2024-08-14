import { Server } from "socket.io";
import { Redis } from "ioredis";
import prismaClient from "./prisma";

const pub = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

const sub = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Initialized Socket Service");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });

    sub.subscribe("MESSAGES");
  }

  public initListeners() {
    const io = this._io;
    console.log("Initialized Socket Listeners");

    io.on("connect", (socket) => {
      console.log("New socket connected:", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message received:", message);

        // Publish to redis
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });

      socket.on("disconnect", async () => {
        console.log(`${socket.id} disconnected!`);
      });
    });

    sub.on("message", async (channel, message) => {
      if (channel === "MESSAGES") {
        console.log(`Server emitting message ${message} to ${channel}`);

        io.emit("message", message);

        await prismaClient.message.create({
          data: {
            text: JSON.parse(message).message,
          },
        });
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
