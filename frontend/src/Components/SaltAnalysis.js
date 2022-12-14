import React, { useState } from "react";
import "./SingleObservation.css"
import Navigation from "./Navbar";
import DisplayIon from "./DisplayIon";

function CationAnalysis() {
  const [obs, setObs] = useState({
    EID: 1,
    IMG: "1",
    OBS: "Dip a rod in conc. HCl then dip it in the salt and expose it to the flame. Observe the color of the flame.",
    OPTIONS : [{name:"Crimson red",isObserved:false}, {name:"Brick red",isObserved:false},{name:"Green",isObserved:false},{name:"No Colour",isObserved:false}]
  });
  const [ion, setIon] = useState({end: 0, sequence: ""})

  const function_ion = () =>
  {
  
  if(ion.end === 1)
   {
    const sequence_map = {
      "12" : "Ba2+"
    };
    console.log(ion.sequence)
    console.log(sequence_map[ion.sequence])
    return <DisplayIon cation = {sequence_map[ion.sequence]}/>
   }
   else
   {
    return (
      <div>
      <Navigation></Navigation>
      <div class="row d-flex justify-content-center mt-100">
  <div class="col-md-4">
      <div class="card">
          <div class="card-body text-center">
              <h4 class="card-title">{obs.OBS}</h4>
              <p class="card-description">Select from the options below</p>
              <img src = {"https://res.cloudinary.com/dn7jk2swt/image/upload/v1667240302/salt-analysis/" + obs.IMG + ".png"} width = '50%' height= '50%'/>
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

  }
  
  
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
    let observation = "";
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
    fetch("http://127.0.0.1:5000/cation-analysis/next-observation",{
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(currentObservation)
    })
    .then(res => res.json())
    .then(data => {
      nextObservation =data["next_obs"]
      if(nextObservation == 0)
      {
       // console.log("sequence:", sequence_map[sequence]);
        setIon((prevState) => ({end: 1, sequence: prevState.sequence}));
        
      }
      else
      fetch(`http://127.0.0.1:5000/cation-analysis/get-experiment?eid=${nextObservation}`,{
      method: 'GET',
      mode: 'cors'
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        let arr = []
        for(let i of data['OPTIONS'])
        {
          arr.push({name: i, isObserved: false});
        }
        setObs((prevState) => ({
         ... prevState,
         EID: nextObservation,
         OBS: data["OBS"],
         IMG: data["IMG"],
         OPTIONS: arr
        }))
        console.log(obs)
      })
    })
    setIon((prevState) => ({end: prevState.end, sequence: prevState.sequence + String(obs.EID)}));
  }
   return (
    <div>
      {function_ion()}
    </div>
    
   )
    
  }
  
  export default CationAnalysis;
  