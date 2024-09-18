import React from 'react';

// Define the props interface
interface CheckboxProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, checked, onCheckedChange, label }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="hidden"
      />
      <label
        htmlFor={id}
        className="flex items-center cursor-pointer"
      >
        <span className={`w-5 h-5 inline-block mr-2 rounded border ${
          checked ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
        } flex-shrink-0`}>
          {checked && (
            <svg
              className="w-4 h-4 text-white fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </span>
        <span className="select-none">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
