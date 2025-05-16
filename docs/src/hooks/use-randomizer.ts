import { useState, useCallback } from "react";
import { parseInputData, shuffleArray } from "@/utils/utils";

interface UseRandomizerProps {
  inputData: string;
}

export function useRandomizer({ inputData }: UseRandomizerProps) {
  const [randomizedItems, setRandomizedItems] = useState<string[]>(parseInputData(inputData));
  const [randomizeCount, setRandomizeCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const randomizeData = useCallback(() => {
    const parsedItems = parseInputData(inputData);
    
    if (parsedItems.length === 0) {
      return;
    }

    setIsLoading(true);
    // Play the randomize sound
    try {
      // Create an audio element dynamically
      const audio = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAMAAAGTgBVVVVVVVVVVVVVVVVVVVWqqqqqqqqqqqqqqqqqqqr//////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+NAwAAAAnIARjGAAIDCEYxwAEAgEHQfB8Hw/g+D4+D4fwfD+D4JOD4fwfB8EAQBAEHwQDgQDn8EAQDgQDgQDkAQDgQDgQBAEAQD4PwfB8X5gQAAAAAAFnwQDn+YBAEAQA");
      // Play the sound
      audio.volume = 0.5; // Set the volume to 50%
      audio.play().catch(err => console.log("Audio play prevented by browser policy:", err));
    } catch (error) {
      console.error("Error playing randomize sound", error);
    }

    // Simulate processing time for visual effect
    setTimeout(() => {
      // Shuffle the array
      const shuffled = shuffleArray([...parsedItems]);
      
      // Update state
      setRandomizedItems(shuffled);
      setRandomizeCount(prev => prev + 1);
      setIsLoading(false);
    }, 800);
  }, [inputData]);

  return {
    randomizedItems,
    isLoading,
    randomizeCount,
    randomizeData
  };
}
