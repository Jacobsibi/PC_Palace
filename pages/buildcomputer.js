import { ClientReferenceManifestPlugin } from "next/dist/build/webpack/plugins/flight-manifest-plugin";
import { MiddlewareNotFoundError } from "next/dist/shared/lib/utils";

const ComputerBuilder = () => { return (

<div style={{ textAlign: 'Left', marginLeft :300  }}>
    <h1>Computer Builder</h1>   
    <p>Welcome to the computer builder! To get started answer a few simple questions to help us unnderstand what type of computer best fits you!</p> 

    <form>

        <label style={{ fontWeight: 'bold' }}> What will you be using the computer for? <br  />   {/* CPU and GPU */}
        </label>

            <p style={{ textAlign: "center" }}><input type="checkbox" name="myCheckbox" style={{ width : 25, height : 25, margin: 20 }}/>Gaming</p>    {/* ask what type of games next */}
            <p>Web Browsing <input type="checkbox" name="myCheckbox"/></p>      {/* irrelevant */}
            <p>Image Editing and Rendering <input type="checkbox" name="myCheckbox"/></p>  {/* ask what type of editing */}
            <p>Crypto Currency Mining <input type="checkbox" name="myCheckbox"/></p>     {/* ask */}



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
how much were you looking to spend on this PC?   Slider
not alot ($500-$1000 NZD)
regular amount ($1000-$2000 NZD)
large amount ($2000-$5000 NZD)

*/