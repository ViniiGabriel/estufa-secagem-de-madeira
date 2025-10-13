import { useState } from "react";

export default function Dropdown({ options, onSelect }) {
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative w-56">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-left hover:bg-gray-200"
      >
        {selected || "Selecione uma estufa ▼"}
      </button>

      {isOpen && (
        <ul className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
