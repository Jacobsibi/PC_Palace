import React, { useState } from 'react';
import { useHistory } from 'react-router';

const ComputerBuilder = () => { //const history = useHistory();
    const [answers, setAnswers] = useState([]); // State to store the answers

    const handleAnswer = (answer) => {
        setAnswers([...answers, answer]); // Add the selected answer to the answers array
        history.push('/question/' + (answers.length + 2)); // Navigate to the next question based on the number of answers given
    };

    const renderQuestion = () => {
        switch (answers.length) {
            case 0:
                return (
                    <div>
                        <h2>Question 1:</h2>
                        <p>What is your budget?</p>
                        <button style= {{margin:10}} onClick={() => handleAnswer('budget1')}>Less than $1000</button>
                        <button style= {{margin:10}} onClick={() => handleAnswer('budget2')}>$1000 - $1500</button>
                        <button style= {{margin:10}} onClick={() => handleAnswer('budget3')}>$1500 - $2000</button>
                    </div>
                );
        case 1:
            return (
                <div>
                    <h2>Question 2:</h2>
                    <p>What is your primary use for the PC?</p>
                    <button onClick={() => handleAnswer('use1')}>Gaming</button>
                    <button onClick={() => handleAnswer('use2')}>Video editing</button>
                    <button onClick={() => handleAnswer('use3')}>Graphic design</button>
                    <button onClick={() => handleAnswer('use3')}>Crypto Mining</button>
                </div>
            );
      
      // Add more cases for additional questions
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
    
    <div style={{ textAlign: 'center', marginLeft :300, marginRight : 300  }}>
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