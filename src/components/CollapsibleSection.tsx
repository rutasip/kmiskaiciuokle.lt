import { useState, ReactNode, FC } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React from "react";

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
}

const CollapsibleSection: FC<CollapsibleSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg bg-gray-100 shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full gap-4 items-center text-start justify-between px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-gray-100 transition-colors duration-200 rounded-t-lg"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUpIcon className="w-4 h-4 min-w-4 text-gray-500" />
        ) : (
          <ChevronDownIcon className="w-4 h-4 min-w-4 text-gray-500" />
        )}
      </button>

      <div
        className={`
          px-5 overflow-hidden transition-all duration-300 bg-white rounded-b-lg
          ${isOpen ? "max-h-[1000px] py-4" : "max-h-0 py-0"}
        `}
      >
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
