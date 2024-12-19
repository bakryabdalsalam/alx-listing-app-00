// components/Pill.tsx
import React from "react";

interface PillProps {
  label: string;
  onClick?: () => void;
}

const Pill: React.FC<PillProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-block bg-gray-100 text-sm text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
    >
      {label}
    </button>
  );
};

export default Pill;
