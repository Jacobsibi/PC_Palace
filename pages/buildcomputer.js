const handleClick = () => {
    console.log('Button clicked!');
  };

const ComputerBuilder = () => { return (
    

<div style={{ textAlign: 'Left', marginLeft :300, marginRight : 300  }}>
    <h1>Computer Builder</h1>   
    <p>To get started answer a few simple questions to help us unnderstand what type of computer best fits you!</p> <br  /> 

    <form>

        <label style={{ fontWeight: 'bold' }}> What will you be using the computer for? <br  />   {/* CPU and GPU */}
        </label >

            <p style={{ fontSize : 23 }}><input type="checkbox" name="myCheckbox" style={{ width : 25, height : 25, margin: 20 }}/>Gaming    {/* high gpu and med cpu, ask what type of games next */}
            <input type="checkbox" name="myCheckbox" style={{ width : 25, height : 25, margin: 20 }}/>Image Editing or Rendering</p> {/* high cpu,  ask what type of editing */}
            <p style={{ fontSize : 23 }}><input type="checkbox" name="myCheckbox" style={{ width : 25, height : 25, margin: 20 }}/>Crypto Mining</p>
            <p style={{ fontSize : 23 }}><input type="checkbox" name="myCheckbox" style={{ width : 25, height : 25, margin: 20 }}/>Web Browsing</p>

            <button type="submit" value="Submit" onClick={handleClick} style={{ fontSize: 23, padding: '1rem', width : '45rem' }}>Submit</button>

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
how much were you looking to spend on this PC?   Slider
not alot ($500-$1000 NZD)
regular amount ($1000-$2000 NZD)
large amount ($2000-$5000 NZD)

*/