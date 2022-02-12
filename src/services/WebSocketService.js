import { io } from 'socket.io-client';

class WebSocketService {
  socket;
  constructor() {}

  createSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    console.log(this.socket)
    return this.socket;
  }



  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
}
}

export default new WebSocketService();