import React, { FC } from "react";

export interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupInputProps {
  label: string;
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  error?: string;
}

const RadioGroupInput: FC<RadioGroupInputProps> = ({
  label,
  name,
  selectedValue,
  onChange,
  options,
  error,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>

      <div className="flex space-x-6 mt-2">
        {options.map((option) => {
          const inputId = `${name}-${option.value}`;
          return (
            <div key={option.value}>
              <input
                id={inputId}
                name={name}
                type="radio"
                value={option.value}
                checked={selectedValue === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-600"
              />
              <label htmlFor={inputId} className="ml-2 text-sm text-gray-700">
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default RadioGroupInput;
