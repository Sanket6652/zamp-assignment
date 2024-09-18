import React, { ReactNode } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode; // Add children prop to the interface
}

const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger className="inline-flex items-center justify-between w-full p-2 bg-white border border-gray-300 rounded shadow focus:outline-none">
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="bg-white border border-gray-300 rounded shadow-md">
          <SelectPrimitive.ScrollUpButton />
          <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};
interface SelectItemProps {
  value: string;
  children: ReactNode; // Add the children prop to the interface
}
export const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => {
  return (
    <SelectPrimitive.Item
      value={value}
      className="p-2 cursor-pointer hover:bg-gray-200"
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

export default Select;
