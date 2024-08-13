import { Server } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Initialized Socket Service");
    this._io = new Server();
  }

  public initListeners() {
    const io = this._io;
    console.log("Initialized Socket Listeners");

    io.on("connect", (socket) => {
      console.log("New socket connected:", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message received:", message);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
