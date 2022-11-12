import React from "react";
import "./SingleObservation.css"
import Navigation from "./Navbar";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
function DisplaySalt() {
    const loc = useLocation()
    const cation = loc.state?.cation
    const anion = loc.state?.anion
    console.log("Anion sub:",anion.sup[0])
    let valency1 = anion.sup[0]
    let valency2 = cation.sup[0]
    if(valency1 === valency2)
    {
        valency1 = ""
        valency2 = ""
    }
    // else
    // {
    //     valency1 = String(valency1)
    //     valency2 = String(valency2)
    // }
    console.log("Cation1:", cation)
    return (
        
        <div>
        <Navigation></Navigation>
        <div class="row d-flex justify-content-center mt-100">
    <div class="col-md-4">
        <div class="card">
            <div class="card-body text-center">
                <h4 class="card-title">The salt is {cation.ion}<sub>{valency1}</sub>{anion.ion}<sub>{valency2}</sub></h4>
                <h1 style={{color:"blue", fontSize: "100px", padding: "50px"}}>{cation.ion}<sub>{valency1}</sub>{anion.ion}<sub>{anion.sub}</sub><sub>{valency2}</sub></h1>
            </div> 
        </div>  
    </div>   
</div>
<Link to={{pathname: "/salt_analysis_summary"}}>
<button style = {{marginLeft: "47%", marginTop: "2%"}}>Continue</button>
</Link>
</div>
    );
  }
  
  export default DisplaySalt;
  