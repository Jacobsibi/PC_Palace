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
                <p>workstation boring bruh</p>
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

        {renderQuestion()} {/* Render the current question */}
    
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