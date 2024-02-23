import { useEffect } from "react";
import { io } from "socket.io-client";
function App() {
  const socket = io("http://localhost:8000/");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });
    socket.on("welcome", (s)=>{
      console.log(s)
    })
    return () =>{
      socket.disconnect()
    }
  });
  return (
    <div className="App">
      <h4>Hello Client</h4>
    </div>
  );
}

export default App;
