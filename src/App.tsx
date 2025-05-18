import { useState } from "react";

export default function App() {
  const [breakfast, setBreakfast] = useState("adrian");
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-green-700">{breakfast}</div>
      <button
        onClick={() =>
          setBreakfast((prev) => (prev === "adrian" ? "butskow" : "adrian"))
        }
        className="bg-blue-400 rounded-md p-2"
      >
        click to change state
      </button>
    </div>
  );
}
