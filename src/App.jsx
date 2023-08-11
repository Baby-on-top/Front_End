import Router from "./routes/Router";
import { CookiesProvider } from "react-cookie";
import { useEffect } from "react";
import { socket, SocketContext } from "./utils/socket";

export default function App() {
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <CookiesProvider>
      <SocketContext.Provider value={socket}>
        <Router />
      </SocketContext.Provider>
    </CookiesProvider>
  );
}
