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
  
  const nextObservationFunction = () => {
    let observation = ""
    for(let i of obs.OPTIONS){
      if(i.isObserved){
        observation = i.name
        break
      }
    }
    let currentObservation = {
      eid: obs.EID,
      obs: observation
    }
    let nextObservation=""
    fetch("http://127.0.0.1:5000/salt-analysis/next-observation",{
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(currentObservation)
    })
    .then(res => res.json())
    .then(data => {
      nextObservation =data["next_obs"]
      fetch(`http://127.0.0.1:5000/salt-analysis/get-experiment?eid=${nextObservation}`,{
      method: 'GET',
      mode: 'cors'
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setObs((prevState) => ({
         ... prevState,
         EID: nextObservation,
         OBS: data["OBS"]
        }))
        console.log(obs)
      })
    })
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
<button style = {{marginLeft: "47%", marginTop: "2%"}} onClick = {nextObservationFunction} >Continue</button>
</div>
    );
  }
  
  export default SaltAnalysis;
  