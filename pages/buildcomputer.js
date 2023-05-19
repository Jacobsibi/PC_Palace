import React, { useState, useEffect } from 'react';

const ComputerBuilder = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showGamingPerformance, setShowGamingPerformance] = useState(false);
  const [generatedNumber, setGeneratedNumber] = useState(null);

  const handleGenerateClick = () => {
    if (selectedOptions.includes('gaming') && selectedOptions.includes('high-end')) {
      setGeneratedNumber(3500);
    } else {
      setGeneratedNumber(null);
    }
  };

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((item) => item !== option);
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  useEffect(() => {
    if (!selectedOptions.includes('gaming') && showGamingPerformance) {
      setShowGamingPerformance(false);
    } else if (selectedOptions.includes('gaming') && !showGamingPerformance) {
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
