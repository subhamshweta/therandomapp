import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChartType } from "@/types";
import { 
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Legend 
} from "recharts";

interface VisualizationPanelProps {
  items: string[];
  chartType: ChartType;
  animationSpeed: number;
  isLoading: boolean;
  randomizeCount: number;
}

// Color schemes for charts
const colorSchemes = [
  "#00B4FF", "#8A2BE2", "#40E0D0", "#FF6B6B", "#FFD166", 
  "#06D6A0", "#118AB2", "#073B4C", "#9381FF", "#B8B8FF"
];

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  items,
  chartType,
  animationSpeed,
  isLoading,
  randomizeCount,
}) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Set initial load to false after component mounts
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Convert items to chart data
  const chartData = items.map((item, index) => ({
    name: item,
    value: 1, // Equal values for equal representation
    color: colorSchemes[index % colorSchemes.length]
  }));

  // Animation duration based on speed
  const animationDuration = Math.round(1000 / animationSpeed);

  return (
    <motion.div
      className="lg:col-span-2 order-2 lg:order-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-background-secondary border border-neutral-600 shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-neutral-100 flex items-center">
              <i className="fas fa-chart-simple mr-2 text-accent"></i>
              <span>
                {chartType === "pie" && "Pie Chart Visualization"}
                {chartType === "bar" && "Bar Chart Visualization"}
                {chartType === "list" && "List Visualization"}
              </span>
            </h2>
            {isLoading && (
              <div className="text-neutral-400 text-sm flex items-center transition-opacity duration-300">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            )}
          </div>

          <div className="relative bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700 min-h-[400px] flex items-center justify-center">
            {items.length === 0 && !isLoading ? (
              <div className="text-center p-6">
                <div className="w-24 h-24 rounded-full bg-neutral-700 mx-auto mb-4 flex items-center justify-center">
                  <i className="fas fa-chart-pie text-neutral-500 text-4xl"></i>
                </div>
                <h3 className="text-xl font-medium text-neutral-300 mb-2">No Data to Visualize</h3>
                <p className="text-neutral-400">Enter some items and click randomize to get started</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    key="loading"
                    className="absolute inset-0 bg-neutral-800 h-full w-full flex flex-col items-center justify-center p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-32 h-32 rounded-full shimmer animate-shimmer bg-neutral-700 mb-6"></div>
                    <div className="w-48 h-4 shimmer animate-shimmer bg-neutral-700 rounded mb-3"></div>
                    <div className="w-32 h-4 shimmer animate-shimmer bg-neutral-700 rounded"></div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key={`visualization-${chartType}`}
                    className="w-full h-[400px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {chartType === "pie" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={120}
                            paddingAngle={2}
                            dataKey="value"
                            animationDuration={animationDuration}
                            animationBegin={0}
                            label={({ name }) => name}
                            labelLine={true}
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} stroke="#1E1E1E" strokeWidth={2} />
                            ))}
                          </Pie>
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: 'rgba(30, 30, 30, 0.9)',
                              border: '1px solid #333333',
                              borderRadius: '8px',
                              padding: '12px'
                            }}
                            itemStyle={{ color: '#CCCCCC' }}
                            labelStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    )}

                    {chartType === "bar" && (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                          <XAxis 
                            dataKey="name" 
                            stroke="#CCCCCC"
                            angle={-45}
                            textAnchor="end"
                            height={60}
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis stroke="#CCCCCC" />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: 'rgba(30, 30, 30, 0.9)',
                              border: '1px solid #333333',
                              borderRadius: '8px',
                              padding: '12px'
                            }}
                            itemStyle={{ color: '#CCCCCC' }}
                            labelStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
                          />
                          <Legend />
                          <Bar 
                            dataKey="value" 
                            name="Items"
                            animationDuration={animationDuration}
                            animationBegin={0}
                            maxBarSize={50}
                            radius={[4, 4, 0, 0]}
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    )}

                    {chartType === "list" && (
                      <div className="w-full py-4 px-3 overflow-y-auto" style={{ maxHeight: 400 }}>
                        <ul className="space-y-2">
                          {chartData.map((item, index) => (
                            <motion.li
                              key={`item-${index}-${item.name}`}
                              className="flex items-center p-3 bg-neutral-700 rounded-lg"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                duration: 0.3, 
                                delay: index * 0.08 * (1/animationSpeed) 
                              }}
                            >
                              <span 
                                className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-medium mr-3" 
                                style={{ backgroundColor: item.color }}
                              >
                                {index + 1}
                              </span>
                              <span className="text-white">{item.name}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-neutral-700 rounded-lg p-3 border border-neutral-600">
              <div className="text-xs text-neutral-400 uppercase">Items</div>
              <div className="text-xl font-semibold text-white">{items.length}</div>
            </div>
            <div className="bg-neutral-700 rounded-lg p-3 border border-neutral-600">
              <div className="text-xs text-neutral-400 uppercase">Randomizations</div>
              <div className="text-xl font-semibold text-white">{randomizeCount}</div>
            </div>
            <div className="bg-neutral-700 rounded-lg p-3 border border-neutral-600">
              <div className="text-xs text-neutral-400 uppercase">First Item</div>
              <div className="text-xl font-semibold text-white truncate">
                {items.length > 0 ? items[0] : '-'}
              </div>
            </div>
            <div className="bg-neutral-700 rounded-lg p-3 border border-neutral-600">
              <div className="text-xs text-neutral-400 uppercase">Last Item</div>
              <div className="text-xl font-semibold text-white truncate">
                {items.length > 0 ? items[items.length - 1] : '-'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VisualizationPanel;
