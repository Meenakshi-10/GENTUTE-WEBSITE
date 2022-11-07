import React from "react";
import "./SingleObservation.css"
import Navigation from "./Navbar";
function DisplayIon(props) {
    console.log(props.cation)
    return (
        
        <div>
        <Navigation></Navigation>
        <div class="row d-flex justify-content-center mt-100">
    <div class="col-md-4">
        <div class="card">
            <div class="card-body text-center">
                <h4 class="card-title">The cation is {props.cation}</h4>
                <h1 style={{color:"blue", fontSize: "100px", padding: "50px"}}> {props.cation}</h1>
            </div> 
        </div>  
    </div>   
</div>
<button style = {{marginLeft: "47%", marginTop: "2%"}}>Continue</button>
</div>
    );
  }
  
  export default DisplayIon;
  