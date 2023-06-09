import React, { useState, useEffect } from 'react';
import styles from '../../styles/Builder.module.css';
import { useRouter } from 'next/router';


const ComputerBuilder = () => {
	// State variables
	const [selectedOptions, setSelectedOptions] = useState([]); // Stores the selected options
	const [showGamingPerformance, setShowGamingPerformance] = useState(false); // Controls whether to show the gaming performance options
	const [showGamingOptions, setShowGamingOptions] = useState(false); // Controls whether to show the optional games
	const [showStreamingPerformance, setShowStreamingPerformance] = useState(false); // Controls whether to show the gaming performance options
	const [selectedImages, setSelectedImages] = useState([]); // Stores the selected images
	const [sliderValue, setSliderValue] = useState(1800); // Stores the slider value
	const router = useRouter();


	// Event handler for the "Generate" button click
	const handleGenerateClick = () => {

		if (
			selectedOptions.includes('gaming') &&
			selectedOptions.includes('streaming') &&
			selectedOptions.includes('high-gaming') &&
			selectedOptions.includes('standard-streaming') &&
			sliderValue > 0
		) {
			// CREATE HIGH-gaming + standard streaming build
			router.push('/pcbuilder/generate?key=high-standard-build');
		} else if (
			selectedOptions.includes('gaming') &&
			selectedOptions.includes('streaming') &&
			selectedOptions.includes('medium-gaming') &&
			selectedOptions.includes('standard-streaming') &&
			sliderValue > 0
		) {
			// CREATE MED-gaming + standard streaming build
			router.push('/pcbuilder/generate?key=med-standard-build');
		} else if (
			selectedOptions.includes('gaming') &&
			selectedOptions.includes('streaming') &&
			selectedOptions.includes('low-gaming') &&
			selectedOptions.includes('standard-streaming') &&
			sliderValue > 0
		) {
			// CREATE LOW-gaming + standard streaming build
			router.push('/pcbuilder/generate?key=low-standard-build');
		} else if (
			selectedOptions.includes('gaming') &&
			selectedOptions.includes('streaming') &&
			selectedOptions.includes('low-gaming') &&
			selectedOptions.includes('high-streaming') &&
			sliderValue > 0
		) {
			// CREATE LOW-gaming + high streaming build
			router.push('/pcbuilder/generate?key=low-high-build');
		} else if (
			selectedOptions.includes('gaming') &&
			selectedOptions.includes('streaming') &&
			selectedOptions.includes('low-gaming') &&
			selectedOptions.includes('ultra-streaming') &&
			sliderValue > 0
		) {
			// CREATE low-gaming + ultra streaming build
			router.push('/pcbuilder/generate?key=low-ultra-build');
		} else if (
			selectedOptions.includes('gaming') &&
			selectedOptions.includes('streaming') &&
			selectedOptions.includes('medium-gaming') &&
			selectedOptions.includes('high-streaming') &&
			sliderValue > 0
		) {
			// CREATE MEDIUM-gaming + high streaming build
			router.push('/pcbuilder/generate?key=med-high-build');
		} else if (
			selectedOptions.includes('gaming') &&
			selectedOptions.includes('streaming') &&
			selectedOptions.includes('medium-gaming') &&
			selectedOptions.includes('ultra-streaming') &&
			sliderValue > 0
		) {
			// CREATE MEDIUM-gaming + ultra streaming build
			router.push('/pcbuilder/generate?key=med-ultra-build');
		}
		else if (
			selectedOptions.includes('gaming') &&
			selectedOptions.includes('streaming') &&
			selectedOptions.includes('high-gaming') &&
			selectedOptions.includes('high-streaming') &&
			sliderValue > 4999
		) {
			// CREATE HIGH-gaming + high streaming build
			router.push('/pcbuilder/generate?key=high-high-build');
		} else if (
			selectedOptions.includes('gaming') &&
			selectedOptions.includes('streaming') &&
			selectedOptions.includes('high-gaming') &&
			selectedOptions.includes('ultra-streaming') &&
			sliderValue > 4999
		) {
			// CREATE HIGH-gaming + ultra streaming build
			router.push('/pcbuilder/generate?key=high-ultra-build');
		}
		else if (
			selectedOptions.includes('gaming') &&
			selectedOptions.includes('streaming') &&
			selectedOptions.includes('workstation') &&
			sliderValue > 0
		) {
			// CREATE MED-gaming + standard streaming build
			router.push('/pcbuilder/generate?key=workstation');
		}
		// If "Gaming" is selected
		else if (selectedOptions.includes('gaming')) {
			// If "High-end" is selected, 
			if (selectedOptions.includes('high-gaming')) {
				router.push('/pcbuilder/generate?key=high-gaming');
				// If "Medium" is selected
			} else if (selectedOptions.includes('medium-gaming')) {
				router.push('/pcbuilder/generate?key=medium-gaming');
				// If "Low-end" is selected
			} else if (selectedOptions.includes('low-gaming')) {
				router.push('/pcbuilder/generate?key=low-gaming');
				//if only gaming is selected, pushs template build
			} else {
				router.push('/pcbuilder/generate?key=template-build');

			}
			// If "streaming" is selected, 
		} else if (selectedOptions.includes('streaming')) {
			// If "Ultra streaming" is selected, 
			if (selectedOptions.includes('ultra-streaming')) {
				router.push('/pcbuilder/generate?key=ultra-streaming');
				// If "High streaming" is selected
			} else if (selectedOptions.includes('high-streaming')) {
				router.push('/pcbuilder/generate?key=high-streaming');
				// If "Standard Streaming" is selected
			} else if (selectedOptions.includes('standard-streaming')) {
				router.push('/pcbuilder/generate?key=standard-streaming');
				//if streaming is only selected push template build.
			} else {
				router.push('/pcbuilder/generate?key=template-build');
			}
		}
		else if (selectedOptions.includes('workstation')) {
			// If "workstation" is selected
			router.push('/pcbuilder/generate?key=workstation');
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

	// DO THIS REMINDER::
	// Reset to clear state & refresh page a result. 
	const handleResetClick = () => {
		router.push('/pcbuilder/generate?key=template-build'); ////////////////////DO THIS ERMINDER/////////////////////////////////////////
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
				<input type="checkbox" name="myCheckbox" value="gaming" style={{ width: 25, height: 25, margin: 20 }} onChange={handleOptionChange} />
				Gaming
				<input type="checkbox" name="myCheckbox" value="streaming" style={{ width: 25, height: 25, margin: 20 }} onChange={handleOptionChange} />
				Streaming
				<input type="checkbox" name="myCheckbox" value="workstation" style={{ width: 25, height: 25, margin: 20 }} onChange={handleOptionChange} />
				Workstation
				{/* <input type="checkbox" name="myCheckbox" value="server" style={{ width: 25, height: 25, margin: 20 }} onChange={handleOptionChange} />
        Server Hosting */}
			</p>

			{showGamingPerformance && (
				<>
					<label style={{ fontWeight: 'bold' }}>Select Gaming Performance Level</label>
					<p className={styles.radio} >
						<input type="radio" className={styles.radio} name="gamingPerformance" value="low-gaming" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }} />
						Low Performance
						<input type="radio" className={styles.radio} name="gamingPerformance" value="medium-gaming" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }} />
						Medium Performance
						<input type="radio" className={styles.radio} name="gamingPerformance" value="high-gaming" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }} />
						High Performance

					</p>

					<label style={{ fontWeight: 'bold', }}>Select Your Top Games</label>
					<p>

						<SelectableImage src="/battlefield2042.jpeg" selected={selectedImages.includes("ultra4 ")} onClick={() => handleImageClick("ultra4 ")} />
						<SelectableImage src="/overwatch.jpeg" selected={selectedImages.includes("medium3 ")} onClick={() => handleImageClick("medium3 ")} />
						<SelectableImage src="/rust.webp" selected={selectedImages.includes("high3 ")} onClick={() => handleImageClick("high3 ")} />
						<SelectableImage src="/fortnite.jpeg" selected={selectedImages.includes("low3 ")} onClick={() => handleImageClick("low3 ")} />
						<SelectableImage src="/leagueoflegends.jpg" selected={selectedImages.includes("low1 ")} style={{ fontColour: 'white' }} onClick={() => handleImageClick("low1 ")} />
						<SelectableImage src="/factorio1.jpg" selected={selectedImages.includes("low2 ")} onClick={() => handleImageClick("low2 ")} />
						<SelectableImage src="/csgo1.jpg" selected={selectedImages.includes("medium ")} onClick={() => handleImageClick("medium ")} />
						<SelectableImage src="/gtav.jpg" selected={selectedImages.includes("high ")} onClick={() => handleImageClick("high ")} />
						<SelectableImage src="/witcher3.jpg" selected={selectedImages.includes("ultra ")} onClick={() => handleImageClick("ultra ")} />
						<SelectableImage src="/cyberpunk.jpeg" selected={selectedImages.includes("ultra2 ")} onClick={() => handleImageClick("ultra2 ")} />
						<SelectableImage src="/valorant.jpeg" selected={selectedImages.includes("medium2 ")} onClick={() => handleImageClick("medium2 ")} />
						<SelectableImage src="/warzone.png" selected={selectedImages.includes("high2 ")} onClick={() => handleImageClick("high2 ")} />
						<SelectableImage src="/rainbowsix.jpeg" selected={selectedImages.includes("ultra3 ")} onClick={() => handleImageClick("ultra3 ")} />


					</p>
				</>
			)}

			{showGamingPerformance && (
				<>

				</>
			)}

			{showStreamingPerformance && (
				<>
					<label style={{ fontWeight: 'bold' }}>Select Bitrate Level For Streaming</label>
					<p>
						<input type="radio" className={styles.radio} name="streamingPerformance" value="standard-streaming" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }} />
						Standard Definition (SD, 480p)
						<input type="radio" className={styles.radio} name="streamingPerformance" value="high-streaming" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }} />
						High Definition (HD, 720p)
						<input type="radio" className={styles.radio} name="streamingPerformance" value="ultra-streaming" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 20 }} />
						Ultra High Definition (4K)
					</p>
				</>
			)}


			<label style={{ fontWeight: 'bold' }}>Select Budget Range</label>
			<p style={{ fontSize: 20 }}>
				<input type="range" min="1700" max="10000" value={sliderValue} onChange={handleSliderChange} style={{ width: 700, height: 20, margin: 10 }} />
				${sliderValue}
			</p>

			{/* 
      <label style={{ fontWeight: 'bold' }}>Select Ideal Storage Type</label>
      <p style={{}}>
        <input type="radio" className={styles.radio} name="storage" value="low-storage" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 10 }} />
        Hard Disk Drive (HDD), slowest and cheapest option <br />
        <input type="radio" className={styles.radio} name="storage" value="medium-storage" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 10 }} />
        External Solid State Drive (SSD), portable and faster  <br />
        <input type="radio" className={styles.radio} name="storage" value="high-storage" onChange={handleOptionChange} style={{ width: 25, height: 25, margin: 10 }} />
        Internal Solid Statae Drive (SSD), fastest and most expensive  (Recommended)
      </p> */}





			<button onClick={handleGenerateClick} className={styles.btn} style={{ fontSize: 23, padding: '1rem', width: '100%' }}>
				Generate
			</button>

			<button onClick={handleResetClick} className={styles.btn3} style={{ fontSize: 23, padding: '1rem', width: '100%', marginTop: '1rem' }}>
				CUSTOM BUILDER
			</button>
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
// if they select server give high cpu


//old image setup
//              <button name="gamingOptions" value="high-option" onClick={handleOptionChange} className={styles.btn2}>
//      <Image src={"/witcher3.jpg"} width={150} height={150}></Image></button>