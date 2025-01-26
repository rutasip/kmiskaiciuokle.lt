import React, { FC } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
}

const InputField: FC<InputFieldProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder = "",
  error,
  type = "string",
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>

      <div className="mt-2">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 
            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
            focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;
