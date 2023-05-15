const ComputerBuilder = () => { return (

<div style={{ textAlign: 'center' }}>
    <h2>PC Builder</h2> <br />
    <p>Welcome to the computer builder! To get started answer a few simple questions to help us unnderstand what type of computer best fits you!</p> <br/>

    <form>
        
        <label> What kind of work will you be doing? <br  />   {/* CPU and GPU */}

            <p>Image Editing and Rendering <input type="checkbox" name="myCheckbox"/></p>
            <p>Low end gaming Gaming  <input type="checkbox" name="myCheckbox"/></p>
            <p>Web Browsing <input type="checkbox" name="myCheckbox"/></p>
            <p>Crypto Currency Mining <input type="checkbox" name="myCheckbox"/></p>


        </label>

        <button type="submit" value="Submit" />
    </form>
    </div> )
}

export default ComputerBuilder;

/* 


CASE
how important to you is style and aestetics?
not very important
somewhat important
very important?


maybe later bc too complex
LOW MID HIGH TIER FILTER (depending on what they put for this could filter the parts that are low end or high end)
how much were you looking to spend on this PC?
not alot ($500-$1000 NZD)
regular amount ($1000-$2000 NZD)
large amount ($2000-$5000 NZD)

*/