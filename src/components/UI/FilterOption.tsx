import React from "react";
import Checkbox from "./Checkbox";

interface FilterOptionProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string, checked: boolean) => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  return (
    <div className="m-4">
      <label className="font-semibold mb-2">{label}</label>
      {options.map((option) => (
        <div key={option} className="flex items-center">
          <Checkbox
            id={option}
            checked={selected.includes(option)}
            onCheckedChange={(checked) => onChange(option, checked as boolean)}
            label={option}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterOption;