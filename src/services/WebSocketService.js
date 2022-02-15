import { io } from 'socket.io-client';

class WebSocketService {
  socket;
  constructor() {}

  createSocketConnection(userEmail) {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT, { query: `userEmail=${userEmail}` });
    return this.socket;
  }



  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
}
}

export default new WebSocketService();