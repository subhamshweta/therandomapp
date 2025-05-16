import { useState } from "react";
import { motion } from "framer-motion";
import InputPanel from "@/components/InputPanel";
import VisualizationPanel from "@/components/VisualizationPanel";
import { useRandomizer } from "@/hooks/use-randomizer";
import { ChartType } from "@/types";

export default function Home() {
  const [inputData, setInputData] = useState<string>("Apple, Banana, Cherry, Date, Elderberry, Fig, Grape");
  const [chartType, setChartType] = useState<ChartType>("pie");
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);
  
  const {
    randomizedItems,
    isLoading,
    randomizeCount,
    randomizeData,
  } = useRandomizer({ inputData });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-primary to-background-secondary">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.header 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold mb-2 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">DataRandom</span>
          </h1>
          <p className="text-neutral-300 text-lg">Interactive Data Randomization & Visualization</p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <InputPanel
            inputData={inputData}
            setInputData={setInputData}
            chartType={chartType}
            setChartType={setChartType}
            animationSpeed={animationSpeed}
            setAnimationSpeed={setAnimationSpeed}
            onRandomize={randomizeData}
          />

          <VisualizationPanel
            items={randomizedItems}
            chartType={chartType}
            animationSpeed={animationSpeed}
            isLoading={isLoading}
            randomizeCount={randomizeCount}
          />
        </div>

        {/* Mobile Action Button (only on mobile) */}
        <div className="fixed bottom-6 right-6 lg:hidden z-10">
          <motion.button
            id="mobileRandomizeBtn"
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-neon-blue transition-transform duration-300 transform hover:scale-110 active:scale-95"
            onClick={randomizeData}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-random text-lg"></i>
          </motion.button>
        </div>

        <footer className="mt-12 text-center text-neutral-500 text-sm py-4">
          <p>DataRandom © {new Date().getFullYear()} | Interactive Data Visualization Tool</p>
        </footer>
      </div>
    </div>
  );
}
