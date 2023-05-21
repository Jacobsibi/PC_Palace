import React, { useState, useEffect } from 'react';
import styles from '../styles/Builder.module.css';
import Image from "next/image";

const ComputerBuilder = () => {
  // State variables
  const [selectedOptions, setSelectedOptions] = useState([]); // Stores the selected options
  const [showGamingPerformance, setShowGamingPerformance] = useState(false); // Controls whether to show the gaming performance options
  const [showGamingOptions, setShowGamingOptions] = useState(false); // Controls whether to show the optional games
  const [showStreamingPerformance, setShowStreamingPerformance] = useState(false); // Controls whether to show the gaming performance options
  const [generatedNumber, setGeneratedNumber] = useState(null); // Stores the generated number

  // Event handler for the "Generate" button click
  const handleGenerateClick = () => {
    if (selectedOptions.includes('gaming')) {
      // If "Gaming" is selected
      if (selectedOptions.includes('high-end')) {
        // If "High-end" is selected, set the generated number to 3500
        setGeneratedNumber(3500);
      } else if (selectedOptions.includes('medium')) {
        // If "Medium" is selected, set the generated number to 2500
        setGeneratedNumber(2500);
      } else if (selectedOptions.includes('low-end')) {
        // If "Low-end" is selected, set the generated number to 1500
        setGeneratedNumber(1500);
      } else {
        // If no gaming performance option is selected, reset the generated number
        setGeneratedNumber(null);
      }
    } else {
      // If "Gaming" is not selected, reset the generated number
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

  // Reset to clear state & refresh page a result. 
  const handleResetClick = () => {
    setSelectedOptions([]);
    setShowGamingPerformance(false);
    setGeneratedNumber(null);
    window.location.reload();
  };

  // Effect hook to handle changes in selectedOptions and showGamingPerformance
  useEffect(() => {
    if (!selectedOptions.includes('gaming') && showGamingPerformance) {
      // If "Gaming" is not selected and showGamingPerformance is true, hide the gaming performance options
      setShowGamingPerformance(false);
      setShowGamingOptions(false);
      //reset selectedOptions
      setSelectedOptions([]);

    } else if (selectedOptions.includes('gaming') && !showGamingPerformance) {
      // If "Gaming" is selected and showGamingPerformance is false, show the gaming performance options
      setShowGamingPerformance(true);
    }

    if (!selectedOptions.includes('unsure') && showGamingOptions ) {
      setShowGamingOptions(false);
    } else if (selectedOptions.includes('unsure') && !showGamingOptions && selectedOptions.includes('gaming')) {
      setShowGamingOptions(true);
    }

    if (!selectedOptions.includes('streaming') && showStreamingPerformance) {
      // If "Streaming" is not selected and showStreamingPerformance is true, hide the gaming performance options
      setShowStreamingPerformance(false);
    } else if (selectedOptions.includes('streaming') && !showStreamingPerformance) {
      // If "Gaming" is selected and showStreamingPerformance is false, show the gaming performance options
      setShowStreamingPerformance(true);
    }
  }, [selectedOptions, showGamingPerformance, showGamingOptions, showStreamingPerformance]);

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
        Image Editing
      </p>

      {showGamingPerformance && (
        <>
          <label style={{ fontWeight: 'bold' }}>What is the desired gaming performance?</label>
          <p>
            <input type="radio" className={styles.radio} name="gamingPerformance" value="low-end" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }} />
            Low-end
            <input type="radio" className={styles.radio} name="gamingPerformance" value="medium" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }} />
            Medium
            <input type="radio" className={styles.radio}name="gamingPerformance" value="high-end" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }} />
            High-end 
            <input type="radio" className={styles.radio}name="gamingPerformance" value="unsure" onChange={handleOptionChange} />
            I dont know
          </p>
        </>
      )}

      {showGamingOptions && (
        <>
          <label style={{ fontWeight: 'bold' }}>which of these games will you likely play?</label>
          <p>
            <input type="radio" name="gamingOptions" value="low-end-gaming" onChange={handleOptionChange} />
            <button onClick={handleOptionChange}> 
            <Image src={"/leagueoflegends.jpg"} width={150} height={150}></Image></button>

            <input type="radio" name="gamingOptions" value="high-end-gaming" onChange={handleOptionChange} />
            High-end 
            <input type="radio" name="gamingOptions" value="unsure" onChange={handleOptionChange} />
            I'm not sure 
          </p>
        </>
      )}

      {showStreamingPerformance && (
        <>
          <label style={{ fontWeight: 'bold' }}>What bitrate will you want to use when streaming?</label>
          <p>
            <input type="radio" name="streamingPerformance" value="low-end-streaming" onChange={handleOptionChange} />
            Standard Definition (SD, 480p)
            <input type="radio" name="streamingPerformance" value="medium-streaming" onChange={handleOptionChange} />
            High Definition (HD, 720p)
            <input type="radio" name="streamingPerformance" value="high-end-streaming" onChange={handleOptionChange} />
            Ultra High Definition (UHD or 4K, 2160p)
          </p>
        </>
      )}

      <button onClick={handleGenerateClick} className={styles.btn} style={{ fontSize: 23, padding: '1rem', width: '45rem' }}>
        Generate
      </button>

      <button onClick={handleResetClick} style={{ fontSize: 23, padding: '1rem', width: '100%', marginTop: '1rem' }}>
        Reset
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








/*   old button case method

import React, { useState } from 'react';
import styles from '../styles/Builder.module.css';

const ComputerBuilder = () => {
    const [answers, setAnswers] = useState([]); // State to store the answers

    const handleAnswer = (answer) => {
        setAnswers([...answers, answer]); // Add the selected answer to the answers array
    };

    const renderQuestion = () => {
        switch (answers.length) {
            case 0:
                return (
                    <div>
                        <h2>Question 1:</h2>
                        <p>What is your primary use for the PC?</p>
                        <button className={styles.btn} onClick={() => handleAnswer('use1')}>Gaming</button>
                        <button className={styles.btn} onClick={() => handleAnswer('use2')}>Streaming </button>
                        <button className={styles.btn} onClick={() => handleAnswer('use3')}>Workstation</button>
                    </div>
                );
        case 1:
            if (answers[0] == 'use1') return (
                <div>
                        <h2>Question 2:</h2>
                        <p>Which of these games are you looking to play?</p>
                        <button className={styles.btn} onClick={() => handleAnswer('use1')}>CS:GO (low end)</button>
                        <button className={styles.btn} onClick={() => handleAnswer('use2')}>Apex Legneds mid </button>
                        <button className={styles.btn} onClick={() => handleAnswer('use3')}>Rust high</button>
                    </div>
            ); else if (answers[0] == 'use2') return (
                <div>
                    <h2>Question 2:</h2>
                    <p>What is your primary use for the PC?</p>
                    <button className={styles.btn} onClick={() => handleAnswer('use1')}>Gaming</button>
                    <button className={styles.btn} onClick={() => handleAnswer('use2')}>Streaming </button>
                    <button className={styles.btn} onClick={() => handleAnswer('use3')}>Workstation</button>
                </div>
            ); else return (
                <p>workstation boring bruh  </p>
            );
        case 2:
            return (
                <div>
                    <h2>Question 3:</h2>
                    <p>What is your primary use for the PC?</p>
                    <button className={styles.btn} onClick={() => handleAnswer('use1')}>Gaming</button>
                    <button className={styles.btn} onClick={() => handleAnswer('use2')}>Streaming </button>
                    <button className={styles.btn} onClick={() => handleAnswer('use3')}>Workstation</button>
                </div>
            );
        case 3:
            return (
                <div>
                    <h2>Question 4:</h2>
                    <p>What is your primary use for the PC?</p>
                    <button className={styles.btn} onClick={() => handleAnswer('use1')}>Gaming</button>
                    <button className={styles.btn} onClick={() => handleAnswer('use2')}>Streaming </button>
                    <button className={styles.btn} onClick={() => handleAnswer('use3')}>Workstation</button>
                </div>
            );
        case 4:
            return (
                <div>
                    <h2>Question 1:</h2>
                    <p>What is your budget?</p>
                    <button className={styles.btn} onClick={() => handleAnswer('budget1')}>Less than $1000</button>
                    <button className={styles.btn} onClick={() => handleAnswer('budget2')}>$1000 - $1500</button>
                    <button className={styles.btn} onClick={() => handleAnswer('budget3')}>$1500 - $2000</button>
                    <p>Note: lowering your budget may result in your PC being garbage. <br/>To prevent this, make sure to select the third option.</p>
                </div>
            );
        case 5:
            return (
                <div>
                    <h2>Question 6:</h2>
                    <p>What is your primary use for the PC?</p>
                    <button className={styles.btn} onClick={() => handleAnswer('use1')}>Gaming</button>
                    <button className={styles.btn} onClick={() => handleAnswer('use2')}>Streaming </button>
                    <button className={styles.btn} onClick={() => handleAnswer('use3')}>Workstation</button>
                </div>
            );
        case 6:
            return (
                <div>
                    <h2>Question 7:</h2>
                    <p>What is your primary use for the PC?</p>
                    <button className={styles.btn} onClick={() => handleAnswer('use1')}>Gaming</button>
                    <button className={styles.btn} onClick={() => handleAnswer('use2')}>Streaming </button>
                    <button className={styles.btn} onClick={() => handleAnswer('use3')}>Workstation</button>
                </div>
            );
      
      default:
        return (
          <div>
            <h2>Question {answers.length + 1}:</h2>
            <p>Placeholder question</p>
            <button onClick={() => handleAnswer('placeholder')}>Placeholder option 1</button>
            <button onClick={() => handleAnswer('placeholder')}>Placeholder option 2</button>
            <button onClick={() => handleAnswer('placeholder')}>Placeholder option 3</button>
          </div>
        );
    }
  };

  return (
    <div style={{ textAlign: 'center', marginLeft :300, marginRight : 300}}>
        <h1>Computer Builder</h1>   
        <p>To get started answer a few simple questions to help us unnderstand what type of computer best fits you!</p> <br     /> 

        {renderQuestion()} 
    
    </div>

  );
};


export default ComputerBuilder;

/* 


Storage
How much storage will you require


CASE
how important to you is style and aestetics?
not very important
somewhat important
very important?


maybe later bc too complex
LOW MID HIGH TIER FILTER (depending on what they put for this could filter the parts that are low end or high end)
how much were you looking to spend on this PC?   Slider
not alot ($500-$1000 NZD)
regular amount ($1000-$2000 NZD)
large amount ($2000-$5000 NZD)



        <button className="big-button">Begin AI Builder</button>
        <button className="big-button">Custom Build</button>



*/