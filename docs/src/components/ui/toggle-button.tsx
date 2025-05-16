import * as React from "react";
import { cn } from "@/lib/utils";

interface ToggleButtonOption {
  value: string;
  label: string;
  icon?: string;
}

interface ToggleButtonProps {
  options: ToggleButtonOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div 
      className={cn(
        "inline-flex rounded-md shadow-sm p-1 bg-neutral-700 border border-neutral-600 w-full",
        className
      )}
    >
      {options.map((option) => (
        <div key={option.value} className="toggle-option flex-1">
          <input
            type="radio"
            name="toggleOption"
            id={option.value}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
            className="sr-only"
          />
          <label
            htmlFor={option.value}
            className={cn(
              "flex justify-center items-center py-2 px-4 rounded-md text-sm w-full cursor-pointer transition-all duration-300",
              option.value === value ? "bg-primary text-background-primary font-medium" : "hover:bg-neutral-600/30"
            )}
          >
            {option.icon && <i className={`${option.icon} mr-2`}></i>}
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};
