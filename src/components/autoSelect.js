// components/formElements/StateInput.js
import React, { useState } from 'react';

const AutoSelect = ({ id, placeholder, name, setValue, register, suggestions }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (value) => {
    setValue(name, value)
    setFilteredSuggestions(suggestions.filter((state) => state.toLowerCase().includes(value.toLowerCase())));
  };

  const handleSelectOption = (selectedOption) => {
    setValue(name, selectedOption)
    setFilteredSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        id={id}
        onInput={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
        {...register(name)}
        className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
      />
      {filteredSuggestions.length > 0 && (
        <ul className="mt-1 p-2 border rounded-md w-[370px] bg-white absolute z-10">
          {filteredSuggestions.map((option) => (
            <li
              key={option}
              onClick={() => handleSelectOption(option)}
              className="cursor-pointer py-1 px-2 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSelect;
