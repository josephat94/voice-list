import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Recorder from "./components/Recorder";
import List from "./components/List";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="h-[calc(100%-5rem)]  px-4 md:p-0 flex items-center justify-end  flex-col border-none">
        <div className="flex h-[calc(100%-222px)] w-full  overflow-y-auto">
          <List />
        </div>

        <Recorder />
      </div>
    </div>
  );
}

export default App;
