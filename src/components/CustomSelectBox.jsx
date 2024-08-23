/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";

const CustomSelectBox = ({ value, onChange, options }) => {
  const [selectedValue, setSelectedValue] = useState(value || "");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortedOptions, setSortedOptions] = useState([]);

  const dropdownContainerRef = useRef(null);
  const optionsRef = useRef(null);

  //setting focus on dropdown option
  useEffect(() => {
    if (showDropdown) {
      optionsRef.current?.children[selectedIndex]?.focus();
    }
  }, [showDropdown, selectedIndex]);

  //sorting the dropdown list alphabetically
  useEffect(() => {
    const optionsCopy = [...options];
    optionsCopy.sort((a, b) => a.displayLabel.localeCompare(b.displayLabel));
    setSortedOptions(optionsCopy);
  }, [options]);

  //setting selected option
  const handleSelectOption = (item) => {
    setSelectedValue(item.displayLabel);
    setShowDropdown(false);
    onChange(item.value);
  };

  //setting the index of selected value
  useEffect(() => {
    const index = sortedOptions.findIndex((item) => item.displayLabel === selectedValue);
    setSelectedIndex(index >= 0 ? index : 0);
  }, [selectedValue, sortedOptions]);

  const handleToggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleKeyPress = (e) => {
    if (!showDropdown && e.key === "Enter") {
      setShowDropdown(true);
    } else if (showDropdown) {
      switch (e.key) {
        case "ArrowDown":
          setSelectedIndex((prev) => Math.min(prev + 1, sortedOptions.length - 1));
          break;
        case "ArrowUp":
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          handleSelectOption(sortedOptions[selectedIndex]);
          setShowDropdown(false);
          break;
        //Additional feature to close dropdown
        case "Escape":
          setShowDropdown(false);
          break;
        //focus on the first option that starts with the pressed key
        default: {
          const key = e.key.toLowerCase();
          const index = sortedOptions.findIndex((item) => item.displayLabel.toLowerCase().startsWith(key));
          if (index !== -1) {
            setSelectedIndex(index);
          }
          break;
        }
      }
    }
  };

  return (
    <div
      ref={dropdownContainerRef}
      className='relative w-64 mt-5'
      onKeyDown={handleKeyPress}
      tabIndex='0'
      aria-labelledby='custom-select-label'
      role='combobox'
    >
      <div
        className='border border-gray-300 rounded p-2 bg-white cursor-pointer focus:outline-none'
        onClick={handleToggleDropdown}
        aria-haspopup='listbox'
        aria-expanded={showDropdown}
        aria-controls='custom-select-list'
      >
        <span id='custom-select-label'>{selectedValue || "Select..."}</span>
      </div>
      {showDropdown && (
        <div
          id='custom-select-list'
          ref={optionsRef}
          className='absolute mt-1 w-full border border-gray-300 bg-white rounded shadow-lg z-10'
          role='listbox'
          aria-activedescendant={`option-${selectedIndex}`}
        >
          {sortedOptions.map((item, index) => (
            <div
              key={item.value}
              id={`option-${index}`}
              className={`p-2 cursor-pointer ${selectedIndex === index ? "bg-gray-200" : ""}`}
              role='option'
              tabIndex='0'
              onClick={() => handleSelectOption(item)}
              aria-selected={selectedIndex === index}
            >
              {item.displayLabel}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelectBox;
