import React from "react";
import "./SingleObservation.css"
import Navigation from "./Navbar";
import img1 from "./sa1.JPG"
function SingleObservation() {
    return (
        <div>
        <Navigation></Navigation>
        <div class="row d-flex justify-content-center mt-100">
    <div class="col-md-4">
        <div class="card">
            <div class="card-body text-center">
                <h4 class="card-title">Observe the color of the salt</h4>
                <p class="card-description">Select from the options below</p>
                <img src = {img1}/>
                <hr class="mb-30"/>

                <label class="check">
				  <input type="checkbox"/>
				  <span>Blue</span>
				</label>
				<label class="check">
				  <input type="checkbox"/>
				  <span>Green</span>
				</label>

				<label class="check">
				  <input type="checkbox"/>
				  <span>Pink</span>
				</label>

				<label class="check">
				  <input type="checkbox"/>
				  <span>Colorless</span>
				</label>
            </div> 
        </div>  
    </div>   
</div>
<button style = {{marginLeft: "47%", marginTop: "2%"}}>Continue</button>
</div>
    );
  }
  
  export default SingleObservation;
  