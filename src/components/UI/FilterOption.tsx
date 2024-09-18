import Checkbox from "./Checkbox";

interface FilterOptionProps {
  label: string;
  options: string[];
  selected: string[]; // Change to array of strings
  onChange: (selectedOption: string[]) => void; // Change to handle array of strings
}

const FilterOption: React.FC<FilterOptionProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  const handleChange = (option: string) => {
    // Toggle the option in the selected array
    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  return (
    <div className="m-4">
      <label className="font-semibold mb-2">{label}</label>
      {options.map((option) => (
        <div key={option} className="flex items-center">
          <Checkbox
            key={option}
            id={option}
            checked={selected.includes(option)}
            onCheckedChange={(checked) => onChange(option, checked)}
            label={option}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterOption;
