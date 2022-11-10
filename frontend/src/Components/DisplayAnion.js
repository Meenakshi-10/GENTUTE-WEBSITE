import React from "react";
import "./SingleObservation.css"
import Navigation from "./Navbar";
import { Link } from 'react-router-dom';
function DisplayIon(props) {
    console.log(props.anion)
    console.log("Cation2:", props.cationDetail)
    return (
        
        <div>
        <Navigation></Navigation>
        <div class="row d-flex justify-content-center mt-100">
    <div class="col-md-4">
        <div class="card">
            <div class="card-body text-center">
                <h4 class="card-title">The anion is {props.anion.ion}<sub>{props.anion.sub}</sub><sup>{props.anion.sup}</sup></h4>
                <h1 style={{color:"blue", fontSize: "100px", padding: "50px"}}>{props.anion.ion}<sub>{props.anion.sub}</sub><sup>{props.anion.sup}</sup></h1>
            </div> 
        </div>  
    </div>   
</div>
<Link to={{pathname: "/display_salt", state: {cation: props.cationDetail, anion: props.anion}}}>
<button style = {{marginLeft: "47%", marginTop: "2%"}}>Continue</button>
</Link>
</div>
    );
  }
  
  export default DisplayIon;
  