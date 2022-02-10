import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [infos, setInfo] = useState([]);

  useEffect(() => {
    const events = new EventSource("http://localhost:3000/events");
    events.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      setInfo(data);
    };

    return () => events?.close();
  }, []);

  return (
    <div className="App">
      <h1>Messages from server:</h1>

      <ul>
        {infos.map(({ info }, index) => (
          <li key={index}>{info}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
