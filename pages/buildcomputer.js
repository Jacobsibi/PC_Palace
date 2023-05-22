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
  const [selectedImages, setSelectedImages] = useState([]); // Stores the selected images
  const [sliderValue, setSliderValue] = useState(1800); // Stores the slider value

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

  function SelectableImage({ src, selected, onClick }) {
    return (
      <img
        src={src}
        className={`${styles.selectableImage}  ${selected ? styles.selected : ''}`}
        onClick={onClick}
        alt="Selectable Image"
        width={150} height={150}
        
      />
    );
  }

  const handleImageClick = (imageSrc) => {                         //when a gaming option image is clicked...
    const isImageSelected = selectedImages.includes(imageSrc);
    if (isImageSelected) {
      setSelectedImages(selectedImages.filter((src) => src !== imageSrc)); // Remove the image from the selected images
    } else {
      setSelectedImages([...selectedImages, imageSrc]); // Add the image to the selected images
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
      
  const handleSliderChange = (event) => { // Slider for budget
    setSliderValue(event.target.value);
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

    } else if (selectedOptions.includes('gaming') && !showGamingPerformance) {
      // If "Gaming" is selected and showGamingPerformance is false, show the gaming performance options
      setShowGamingPerformance(true);
    }

    if (!selectedOptions.includes('gaming') && showGamingOptions) {
      // If "Gaming" is not selected and showGamingOptions is true, hide the gaming performance options
      setShowGamingOptions(false);
    }

    if (!selectedOptions.includes('unsure') && showGamingOptions ) {    
      // If "Gaming" is not selected and showGamingOptions is true, hide the gaming performance options
      setShowGamingOptions(false);
    } else if (selectedOptions.includes('unsure') && !showGamingOptions && selectedOptions.includes('gaming')) {  
      // If "Gaming" is selected and showGamingOptions is false, show the gaming performance options
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
      <p>To get started, answer a few simple questions to help us understand what type of computer best fits you!</p> {selectedImages}
      <br />

      <label style={{ fontWeight: 'bold' }}>What will you be using the computer for?</label>
      <br />

      <p style={{ fontSize: 23 }}>
        <input type="checkbox" name="myCheckbox" value="gaming" style={{ width: 25, height: 25, margin: 20 }} onChange={handleOptionChange} />
        Gaming
        <input type="checkbox" name="myCheckbox" value="streaming" style={{ width: 25, height: 25, margin: 20 }} onChange={handleOptionChange} />
        Streaming
        <input type="checkbox" name="myCheckbox" value="workstation" style={{ width: 25, height: 25, margin: 20 }} onChange={handleOptionChange} />
        Workstation
        <input type="checkbox" name="myCheckbox" value="imageEditing" style={{ width: 25, height: 25, margin: 20 }} onChange={handleOptionChange} />
        Image Editing
      </p>

      {showGamingPerformance && (
        <>
          <label style={{ fontWeight: 'bold' }}>What is the desired gaming performance?</label>
          <p className={styles.radio} >
            <input type="radio" className={styles.radio}  name="gamingPerformance" value="low-end-gaming" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }}  />
            Low-end 
            <input type="radio" className={styles.radio} name="gamingPerformance" value="medium-gaming" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }}  />
            Medium
            <input type="radio" className={styles.radio}name="gamingPerformance" value="high-end-gaming" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }} />
            High-end 
            <input type="radio" className={styles.radio}name="gamingPerformance" value="unsure" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }} />
            I dont know
          </p>
        </> 
      )}

      {showGamingOptions && (
        <>
          <label style={{ fontWeight: 'bold', }}>which of these games will you likely play?</label>
          <p> 

          <SelectableImage src="/leagueoflegends.jpg" selected={selectedImages.includes("low1 ")} onClick={() => handleImageClick("low1 ")}/>
          <SelectableImage src="/factorio1.jpg" selected={selectedImages.includes("low2 ")} onClick={() => handleImageClick("low2 ")}/>
          <SelectableImage src="/csgo1.jpg" selected={selectedImages.includes("medium ")} onClick={() => handleImageClick("medium ")}/>
          <SelectableImage src="/gtav.jpg" selected={selectedImages.includes("high ")} onClick={() => handleImageClick("high ")}/>
          <SelectableImage src="/witcher3.jpg" selected={selectedImages.includes("ultra ")} onClick={() => handleImageClick("ultra ")}/>
          
          </p>
        </>
      )}

      {showStreamingPerformance && (
        <>
          <label style={{ fontWeight: 'bold' }}>What bitrate will you want to use when streaming?</label>
          <p>
            <input type="radio" className={styles.radio} name="streamingPerformance" value="low-end-streaming" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }}/>
            Standard Definition (SD, 480p)
            <input type="radio" className={styles.radio} name="streamingPerformance" value="medium-streaming" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }}/>
            High Definition (HD, 720p)
            <input type="radio" className={styles.radio} name="streamingPerformance" value="high-end-streaming" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }}/>
            Ultra High Definition (4K)
          </p>
        </>
      )}

      <label style={{ fontWeight: 'bold' }}>What is your desired budget?</label>
      <p style={{ fontSize: 20 }}>
      <input type="range" min="1700" max="3000" value={sliderValue} onChange={handleSliderChange} style={{ width: 700, height: 20, margin: 10}} />
      ${sliderValue}
      </p>
        
      <label style={{ fontWeight: 'bold' }}>What type of storage do you want for this pc?</label>
          <p style={{  }}>
            <input type="radio" className={styles.radio} name="storage" value="low-storage" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 10 }}/>
            Hard Disk Drive (HDD), slowest and cheapest option <br   />
            <input type="radio" className={styles.radio} name="storage" value="medium-storage" onChange={handleOptionChange} style={{ width: 25, height: 25, margin:10 }}/>
            External Solid State Drive (SSD), portable and faster  <br  />
            <input type="radio" className={styles.radio} name="storage" value="high-storage" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 10 }}/>
            Internal Solid Statae Drive (SSD), fastest and most expensive  (Recommended)
          </p>


          


      <button onClick={handleGenerateClick} className={styles.btn} style={{ fontSize: 23, padding: '1rem', width: '100%' }}>
        Generate
      </button>

      <button onClick={handleResetClick} className={styles.btn3} style={{ fontSize: 23, padding: '1rem', width: '100%', marginTop: '1rem' }}>
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

// notes 
// ram, powersupply, motherboard, cpu and gpu can be derrived from which level of gaming or streaming they chose.

// you could use extra money left to choose the case because its less important than the other components
// or alternativly you can just set a low,med,high case and give them one based on the gaming performance they choose.

// if they set the budget too low its easier to just tell them to change it than to try to change parts till it fits what they gave.

// if they select workstation give medium cpu and cheapest case
// if they select image editing give high cpu


//old image setup
//              <button name="gamingOptions" value="high-option" onClick={handleOptionChange} className={styles.btn2}>
//      <Image src={"/witcher3.jpg"} width={150} height={150}></Image></button>