import { useState, useEffect, useRef } from "react";
import { Card } from "./components/ui/8bit/card";
import { TitleBar } from "./components/ui/8bit/TitleBar";
import Ribbon2 from "./assets/images/ribbon2.png";
import Girl from "./assets/images/girl.png";
import GirlEating from "./assets/images/girl-eating.png";

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
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationImage, setAnimationImage] = useState('');
  const timerRef = useRef(null)
  const prevMealRef = useRef<string>("");
  const isFirstRun = useRef<boolean>(true);

  function startAnimation() {
    if (!isAnimating) {
      setIsAnimating(true);
      let count = 0;
      setAnimationImage(GirlEating);
      const interval = setInterval(() => {
        setAnimationImage((img: string) => (img === Girl ? GirlEating : Girl));
        count++;
        if (count >= 10) {
          clearInterval(interval);
          setIsAnimating(false);
          setAnimationImage(Girl);
        }
      }, 500);
    }
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
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

      if (prevMealRef.current !== nextMealName) {
        if (!isFirstRun.current) {
          startAnimation();
        }
        setNextMeal(nextMealName);
        setNextMealTime(formattedNextMealTime);
        prevMealRef.current = nextMealName;
        if (isFirstRun.current) {
          isFirstRun.current = false;
        }
      }

      // Convert to hours, minutes, seconds
      const { hours, minutes, seconds } = convertTime(diff);

      setTimeRemaining(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#fee3e0] border-4 border-[#c45363] text-[#d6697b]">
      <TitleBar title="meal tracker" />
      <div className="relative flex flex-col items-center justify-start w-full h-full py-4 px-4">
        <p className="text-2xl">Meal Tracker</p>
        <div className="w-full flex justify-start items-center gap-8">
          <Card
            className="bg-[#fec7cd] text-[#8c303f] p-2 flex flex-col justify-center items-center gap-0"
            border="border-[#c45363]"
          >
            <p className="text-xs">{`${nextMeal} (${nextMealTime}) in:`}</p>
            <p>{timeRemaining}</p>
          </Card>
          <div className="relative top-3">
            <Card
              border="border-[#c45363]"
              className="bg-[#fec7cd] text-[#8c303f] p-2 flex flex-col justify-center items-center gap-0"
            >
              <p className="text-xs">Current time:</p>
              <p className="text-base">{currentTime}</p>
            </Card>
          </div>
        </div>
        <div className="max-h-full h-65 w-120 border-4 border-[#c45363]">
          <img
            className="object-cover w-full h-full"
            src={isAnimating ? animationImage : Girl}
          />
        </div>
        <img className="absolute top-1 left-1 w-20" src={Ribbon2}></img>
        <img className="absolute top-1 right-1 w-20" src={Ribbon2}></img>
        <img className="absolute bottom-1 left-1 w-20" src={Ribbon2}></img>
        <img className="absolute bottom-1 right-1 w-20" src={Ribbon2}></img>
      </div>
    </div>
  );
}
