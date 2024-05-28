import io from 'socket.io-client';

const SOCKET_URL = 'https://www.dev17.ivantechnology.in/varcast/';

class WsService {
  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
      });
      this.socket.on('connect', data => {
        console.log('======Socket Connected======');
      });

      this.socket.on('disconnect', data => {
        console.log('======Socket disconnected======');
      });

      this.socket.on('error', data => {
        console.log('Socket error======', data);
      });
    } catch (error) {
      console.log('Socket is not initialised', error);
    }
  };

  emit(event, data = {}) {
    this.socket.emit(event, data);
  }

  on(event, cb) {
    this.socket.on(event, cb);
  }

  removelistner(listnerName) {
    this.socket.removeListener(listnerName);
  }
}

const socketService = new WsService();

export default socketService;
