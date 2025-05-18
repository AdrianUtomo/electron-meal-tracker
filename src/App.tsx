import { useState, useEffect } from "react";

export default function App() {
  const [breakfast, setBreakfast] = useState("adrian");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [timeRemaining, setTimeRemaining] = useState("");
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      
      // Calculate time until 8 PM
      const sevenPM = new Date(now);
      sevenPM.setHours(19, 0, 0, 0);
      
      // If it's already past 8 PM, set target to 8 PM tomorrow
      if (now >= sevenPM) {
        sevenPM.setDate(sevenPM.getDate() + 1);
      }
      
      // Calculate difference in milliseconds
      const diff = sevenPM.getTime() - now.getTime();
      
      // Convert to hours, minutes, seconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <h1 className="text-2xl font-bold">Countdown to 7 PM</h1>
      <div className="text-4xl font-mono">{timeRemaining}</div>
      <p className="text-gray-600">Current time: {currentTime}</p>
      
      <div className="mt-8">
        <div className="text-green-700">{breakfast}</div>
        <button
          onClick={() =>
            setBreakfast((prev) => (prev === "adrian" ? "butskow" : "adrian"))
          }
          className="bg-blue-400 rounded-md p-2 mt-2"
        >
          click to change state
        </button>
      </div>
    </div>
  );
}
