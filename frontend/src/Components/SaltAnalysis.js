import React, { useState } from "react";
import "./SingleObservation.css"
import Navigation from "./Navbar";
import { Button } from "react-bootstrap";

function SaltAnalysis() {
  const [obs, setObs] = useState({
    EID: 1,
    IMG: "1",
    OBS: "Dip a rod in conc. HCl then dip it in the salt and expose it to the flame. Observe the color of the flame.",
    OPTIONS : [{name:"Crimson red",isObserved:false}, {name:"Brick red",isObserved:false},{name:"Green",isObserved:false},{name:"No Colour",isObserved:false}]
  });

  const changeHandler = (item) => {
    const name = item.target.name
    const isChecked = item.target.checked
    const currentObservations=obs.OPTIONS
    for (let observation of currentObservations){
      if(observation.name===name){
        observation.isObserved=isChecked
        break
      }
    }
    setObs((prevState) => ({
      ... prevState,
      OPTIONS : currentObservations
    }))
  }
  
  const nextObservation = () => {
    
  }
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
                      obs.OPTIONS.map(option => (
                        (
                          <label class="check">
                            <input type="checkbox" name={option.name} checked={option.isObserved} onChange={changeHandler} />
                            <span>{option.name}</span>
				                  </label>
                        )
                      ))
                  }
            </div> 
        </div>  
    </div>   
</div>
<button style = {{marginLeft: "47%", marginTop: "2%"}} onClick = {nextObservation} >Continue</button>
</div>
    );
  }
  
  export default SaltAnalysis;
  