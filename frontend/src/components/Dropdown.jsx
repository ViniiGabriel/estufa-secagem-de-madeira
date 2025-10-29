import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({ options, onSelect }) {
  const [selected, setSelected] = useState("Selecione uma estufa");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  const allOptions = [...options, "Todas as estufas"];

  return (
    <div className="relative w-56">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center hover:bg-gray-200"
      >
        <span>{selected}</span>

        <ChevronDown className={isOpen ? "transform rotate-180" : ""} />
      </button>

      {isOpen && (
        <ul className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {allOptions.map((option) => (
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
