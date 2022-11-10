import React from "react";
import "./SingleObservation.css"
import AnionAnalysis from "./AnionAnalysis";
import Navigation from "./Navbar";
import { Link } from 'react-router-dom';
function DisplayIon(props) {
    console.log(props.cation)
    return (
        
        <div>
        <Navigation></Navigation>
        <div class="row d-flex justify-content-center mt-100">
    <div class="col-md-4">
        <div class="card">
            <div class="card-body text-center">
                <h4 class="card-title">The cation is {props.cation.ion}<sup>{props.cation.sup}</sup></h4>
                <h1 style={{color:"blue", fontSize: "100px", padding: "50px"}}> {props.cation.ion} <sup>{props.cation.sup}</sup></h1>
            </div> 
        </div>  
    </div>   
</div>
{/* <Link to="/anion_analysis"> */}
<Link to={{pathname: "/anion_analysis", state: {cationDetail: props}}}>
<button style = {{marginLeft: "47%", marginTop: "2%"}}>Continue</button>
</Link>


</div>
    );
  }
  
  export default DisplayIon;
  