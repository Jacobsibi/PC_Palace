import React, { useState, useEffect } from 'react';

const ComputerBuilder = () => {
  // State variables
  const [selectedOptions, setSelectedOptions] = useState([]); // Stores the selected options
  const [showGamingPerformance, setShowGamingPerformance] = useState(false); // Controls whether to show the gaming performance options
  const [generatedNumber, setGeneratedNumber] = useState(null); // Stores the generated number

  // Event handler for the "Generate" button click
  const handleGenerateClick = () => {
    if (selectedOptions.includes('gaming') && selectedOptions.includes('high-end')) {
      // If both "Gaming" and "High-end" are selected, set the generated number to 3500
      setGeneratedNumber(3500);
    } else {
      // Otherwise, reset the generated number
      setGeneratedNumber(null);
    }
  };

  // Event handler for option changes
  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        // If the option is already selected, remove it from the selected options
        return prevSelectedOptions.filter((item) => item !== option);
      } else {
        // Otherwise, add the option to the selected options
        return [...prevSelectedOptions, option];
      }
    });
  };

  // Effect hook to handle changes in selectedOptions and showGamingPerformance
  useEffect(() => {
    if (!selectedOptions.includes('gaming') && showGamingPerformance) {
      // If "Gaming" is not selected and showGamingPerformance is true, hide the gaming performance options
      setShowGamingPerformance(false);
    } else if (selectedOptions.includes('gaming') && !showGamingPerformance) {
      // If "Gaming" is selected and showGamingPerformance is false, show the gaming performance options
      setShowGamingPerformance(true);
    }
  }, [selectedOptions, showGamingPerformance]);

  return (
    <div style={{ textAlign: 'left', marginLeft: 300, marginRight: 300 }}>
      <h1>Computer Builder</h1>
      <p>To get started, answer a few simple questions to help us understand what type of computer best fits you!</p>
      <br />

      <label style={{ fontWeight: 'bold' }}>What will you be using the computer for?</label>
      <br />

      <p style={{ fontSize: 23 }}>
        <input
          type="checkbox"
          name="myCheckbox"
          value="gaming"
          style={{ width: 25, height: 25, margin: 20 }}
          onChange={handleOptionChange}
        />
        Gaming
        <input
          type="checkbox"
          name="myCheckbox"
          value="streaming"
          style={{ width: 25, height: 25, margin: 20 }}
          onChange={handleOptionChange}
        />
        Streaming
        <input
          type="checkbox"
          name="myCheckbox"
          value="workstation"
          style={{ width: 25, height: 25, margin: 20 }}
          onChange={handleOptionChange}
        />
        Workstation
        <input
          type="checkbox"
          name="myCheckbox"
          value="imageEditing"
          style={{ width: 25, height: 25, margin: 20 }}
          onChange={handleOptionChange}
        />
      </p>

      {showGamingPerformance && (
        <>
          <label style={{ fontWeight: 'bold' }}>What is the desired gaming performance?</label>
          <p>
            <input type="radio" name="gamingPerformance" value="low-end" onChange={handleOptionChange} />
            Low-end
            <input type="radio" name="gamingPerformance" value="medium" onChange={handleOptionChange} />
            Medium
            <input type="radio" name="gamingPerformance" value="high-end" onChange={handleOptionChange} />
            High-end
          </p>
        </>
      )}

      <button onClick={handleGenerateClick} style={{ fontSize: 23, padding: '1rem', width: '45rem' }}>
        Generate
      </button>

      {generatedNumber !== null && (
        <div>
          <h2>Generated Number: ${generatedNumber}</h2>
        </div>
      )}
    </div>
  );
};

export default ComputerBuilder;
