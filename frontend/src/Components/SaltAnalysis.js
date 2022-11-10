import React, { useState } from "react";
import "./SingleObservation.css"
import Navigation from "./Navbar";
import DisplayIon from "./DisplayIon";

function SaltAnalysis(){
  const [cation,setCation] = useState("")
  const [isCation,setIsCation] = useState(false)

  const isCationFound = () => {
    if(isCation){
      return <h1>{cation}</h1>
    }
    else{
      return <button>Find the Cation</button>
    }
  }
  return(
    <div>
      <Navigation></Navigation>
      <div class="row d-flex justify-content-center mt-100">
        <div class="col-md-4">
            <div class="card">
                <div class="card-body text-center">
                    <h2 class="card-title">Cation Analysis</h2>
                    {isCationFound()}
                </div> 
            </div> 
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-body text-center">
                    <h2 class="card-title">Anion Analysis</h2>
                </div> 
            </div> 
        </div>     
      </div>
    </div>
  );
}
  
  export default SaltAnalysis;
  