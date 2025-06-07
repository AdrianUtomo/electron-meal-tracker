import { useState, useEffect } from "react";
import {
  Card,
} from "./components/ui/8bit/card";
import Ribbon2 from "./assets/images/ribbon2.png";

function convertTime(diff: number) {
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

export default function App() {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [timeRemaining, setTimeRemaining] = useState("");
  const [nextMeal, setNextMeal] = useState<string>("");
  const [nextMealTime, setNextMealTime] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());

      // Meal Timestamp
      const breakfast = new Date(now);
      breakfast.setHours(8, 0, 0, 0);

      const morningSnack = new Date(now);
      morningSnack.setHours(11, 0, 0, 0);

      const lunch = new Date(now);
      lunch.setHours(13, 0, 0, 0);

      const afternoonSnack = new Date(now);
      afternoonSnack.setHours(15, 0, 0, 0);

      const dinner = new Date(now);
      dinner.setHours(19, 0, 0, 0);

      const eveningSnack = new Date(now);
      eveningSnack.setHours(21, 0, 0, 0);

      let diff: number;
      let nextMealName: string;
      let nextMealDate: Date;

      switch (true) {
        // Set next meal to morning snack after breakfast
        case morningSnack > now && now > breakfast:
          diff = morningSnack.getTime() - now.getTime();
          nextMealName = "Morning snack";
          nextMealDate = morningSnack;
          break;
        // Set next meal to lunch after morning snack
        case lunch > now && now > morningSnack:
          diff = lunch.getTime() - now.getTime();
          nextMealName = "Lunch";
          nextMealDate = lunch;
          break;
        // Set next meal to afternoon snack after lunch
        case afternoonSnack > now && now > lunch:
          diff = afternoonSnack.getTime() - now.getTime();
          nextMealName = "Afternoon Snack";
          nextMealDate = afternoonSnack;
          break;
        // Set next meal to dinner after afternoon snack
        case dinner > now && now > afternoonSnack:
          diff = dinner.getTime() - now.getTime();
          nextMealName = "Dinner";
          nextMealDate = dinner;
          break;
        // Set next meal to evening snack after dinner
        case eveningSnack > now && now > dinner:
          diff = eveningSnack.getTime() - now.getTime();
          nextMealName = "Evening Snack";
          nextMealDate = eveningSnack;
          break;
        // After evening snack, set next meal to breakfast of the next day
        default:
          nextMealDate = new Date(now);
          nextMealDate.setDate(now.getDate() + 1);
          nextMealDate.setHours(8, 0, 0, 0);
          diff = nextMealDate.getTime() - now.getTime();
          nextMealName = "Breakfast";
          break;
      }

      // Only update state if changed
      const formattedNextMealTime = nextMealDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      });

      setNextMeal((prev) => (prev !== nextMealName ? nextMealName : prev));
      setNextMealTime((prev) =>
        prev !== formattedNextMealTime ? formattedNextMealTime : prev
      );

      // Convert to hours, minutes, seconds
      const { hours, minutes, seconds } = convertTime(diff);

      setTimeRemaining(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#fee3e0] border-4 border-[#c45363] text-[#d6697b] py-4">
      <p className="text-2xl">Meal Tracker</p>
      <div className="flex justify-center items-center gap-8">
        <Card
          className="bg-[#fec7cd] text-[#8c303f] p-2 flex flex-col justify-center items-center gap-0"
          border="border-[#c45363]"
        >
            <p className="text-xs">{`${nextMeal} (${nextMealTime}) in:`}</p>
            <p>{timeRemaining}</p>
        </Card>
        <Card
          className="bg-[#fec7cd] text-[#8c303f] p-2 flex flex-col justify-center items-center gap-0"
          border="border-[#c45363]"
        >
          <p className="text-xs">Current time:</p>
          <p className="text-base">{currentTime}</p>
        </Card>
      </div>

      <img className="absolute top-0 left-0 w-20" src={Ribbon2}></img>
      <img className="absolute top-0 right-0 w-20" src={Ribbon2}></img>
      <img className="absolute bottom-0 left-0 w-20" src={Ribbon2}></img>
      <img className="absolute bottom-0 right-0 w-20" src={Ribbon2}></img>
    </div>
  );
}
