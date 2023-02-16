import Pusher from "pusher-js";
import Messenger from '../components/Messenger.vue'

const subscribeSocket = () => {
    console.log(import.meta.env.VITE_APP_APPLICATION_KEY)
    const socket = new Pusher(import.meta.env.VITE_APP_APPLICATION_KEY, {
      cluster: import.meta.env.VITE_APP_PUSHER_APPLICATION_CLUSTER,
      wsHost: import.meta.env.VITE_APP_PUSHER_APP_HOST,
      wsPort: import.meta.env.VITE_APP_PUSHER_APP_PORT,
      wssPort: import.meta.env.VITE_APP_PUSHER_APP_PORT,
      disableStats: true,
      enabledTransports: ["ws", "wss"],
      
    });
    window.socket = socket;
    try {
      socket.subscribe("channel-chat");
      Messenger()
    } catch (error) {
      console.error(error, "error");
    }
  };
  subscribeSocket();
export default subscribeSocket;
