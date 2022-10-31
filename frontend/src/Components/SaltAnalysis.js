import React, { useState } from "react";
import "./SingleObservation.css"
import Navigation from "./Navbar";

function SaltAnalysis() {
  const [obs, setobs] = useState({
    EID: 1,
    IMG: "1",
    OBS: "Dip a rod in conc. HCl then dip it in the salt and expose it to the flame. Observe the color of the flame.",
    OPTIONS : ["Crimson red", "Brick red", "Green", "No color"]
  });

  const changeHandler = () => {}
  
    return (
        <div>
        <Navigation></Navigation>
        <div class="row d-flex justify-content-center mt-100">
    <div class="col-md-4">
        <div class="card">
            <div class="card-body text-center">
                <h4 class="card-title">{obs.OBS}</h4>
                <p class="card-description">Select from the options below</p>
                <img src = {"https://res.cloudinary.com/dn7jk2swt/image/upload/v1667240302/salt-analysis/" + obs.IMG + ".jpg"}/>
                <hr class="mb-30"/>
                  
                  {
                      obs.OPTIONS.map(option => (( <label class="check">
				                                           <input type="checkbox"/>
				                                           <span>{option}</span>
				                                           </label>
                                                  ) ))
                  }
            </div> 
        </div>  
    </div>   
</div>
<button style = {{marginLeft: "47%", marginTop: "2%"}} onChange = {changeHandler}>Continue</button>
</div>
    );
  }
  
  export default SaltAnalysis;
  