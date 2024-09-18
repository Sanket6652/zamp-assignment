import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number[];
  onValueChange: (value: number[]) => void;
}

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step,
  value,
  onValueChange,
}) => {
  return (
    <SliderPrimitive.Root
      className="relative flex items-center w-full select-none touch-none"
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
    >
      <SliderPrimitive.Track className="relative flex-grow h-1 bg-gray-300 rounded-full">
        <SliderPrimitive.Range className="absolute h-full bg-black rounded-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block w-4 h-4 bg-white border-2 border-black rounded-full shadow-md focus:outline-none" />
      <SliderPrimitive.Thumb className="block w-4 h-4 bg-white border-2 border-black rounded-full shadow-md focus:outline-none" />
    </SliderPrimitive.Root>
  );
};

export default Slider;
