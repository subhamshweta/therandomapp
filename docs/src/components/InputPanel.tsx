import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToggleButton } from "@/components/ui/toggle-button";
import { Slider } from "@/components/ui/slider";
import { ChartType } from "@/types";
import { createRippleEffect } from "@/utils/utils";

interface InputPanelProps {
  inputData: string;
  setInputData: (value: string) => void;
  chartType: ChartType;
  setChartType: (type: ChartType) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  onRandomize: () => void;
}

const InputPanel: React.FC<InputPanelProps> = ({
  inputData,
  setInputData,
  chartType,
  setChartType,
  animationSpeed,
  setAnimationSpeed,
  onRandomize,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleRandomize = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      createRippleEffect(e, buttonRef.current);
    }
    onRandomize();
  };

  return (
    <motion.div
      className="order-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-background-secondary border border-neutral-600 shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-neutral-100 flex items-center">
            <i className="fas fa-pen-to-square mr-2 text-primary"></i> Input Data
          </h2>

          <div className="mb-6">
            <Label htmlFor="dataInput" className="block text-sm font-medium text-neutral-300 mb-2">
              Enter items to randomize
            </Label>
            <textarea
              id="dataInput"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="w-full h-32 px-4 py-3 rounded-lg bg-neutral-700 border border-neutral-600 focus:border-primary focus:ring-1 focus:ring-primary text-white placeholder-neutral-400 transition-all duration-200 ease-in-out focus:outline-none font-mono text-sm"
              placeholder="Enter items separated by commas..."
            />
            <div className="text-xs text-neutral-400 mt-1 flex items-center">
              <i className="fas fa-circle-info mr-1"></i>
              Separate items with commas
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-300 mb-2 flex items-center">
              <i className="fas fa-sliders mr-2 text-secondary-DEFAULT"></i> Visualization Type
            </h3>

            <ToggleButton 
              options={[
                { value: "pie", label: "Pie", icon: "fas fa-chart-pie" },
                { value: "bar", label: "Bar", icon: "fas fa-chart-bar" },
                { value: "list", label: "List", icon: "fas fa-list" }
              ]}
              value={chartType}
              onChange={(value) => setChartType(value as ChartType)}
              className="mb-4"
            />

            <div className="mb-4">
              <Label htmlFor="animationSpeed" className="block text-sm font-medium text-neutral-300 mb-2">
                Animation Speed
              </Label>
              <Slider
                id="animationSpeed"
                min={0.5}
                max={2}
                step={0.1}
                value={[animationSpeed]}
                onValueChange={(value) => setAnimationSpeed(value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-neutral-400 mt-1">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>
          </div>

          <Button
            ref={buttonRef}
            onClick={handleRandomize}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-medium py-3 px-6 relative overflow-hidden group"
            size="lg"
          >
            <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            <i className="fas fa-random mr-2"></i>
            <span>Randomize</span>
            <i className="fas fa-bolt ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InputPanel;
