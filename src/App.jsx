import { useState } from "react";
import "./index.css"; // Ensure Tailwind CSS is imported
import CustomSelectBox from "./components/CustomSelectBox";

const App = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const options = [
    { displayLabel: "Apple", value: "apple" },
    { displayLabel: "Banana", value: "banana" },
    { displayLabel: "Cherry", value: "cherry" },
    { displayLabel: "Date", value: "date" },
    { displayLabel: "Downtown", value: "downtown" },
    { displayLabel: "Elderberry", value: "elderberry" },
  ];

  return (
    <div className='flex justify-center items-center flex-col min-h-screen'>
      <h1 className='text-xl font-semibold'>Custom Select Box</h1>
      <CustomSelectBox value={selectedValue} onChange={handleSelectChange} options={options} />
      <p className='mt-4 font-medium'>Selected Value: {selectedValue}</p>
    </div>
  );
};

export default App;
