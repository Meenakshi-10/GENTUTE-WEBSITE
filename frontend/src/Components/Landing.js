import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigation from "./Navbar";
import backroundPic from "./backroundPic.jpg"

function Landing() {
    return (
        <div>
        <Navigation />
        <div style = {{width: '650px', height: '500px', marginLeft: '30%', marginTop: '5%', background: '#212529'}}>
        <img src = {backroundPic} style = {{width: '650px', height: '250px'}}/>
        <h3 style = {{'margin' : '5%', 'text-align': 'center', color: '#d9d9d9', 'font-family': 'Trebuchet MS'}}>
                        Visualise Chemistry Experiments with GENTUTE. Click on custom experiment to 
                        input an experiment text or all experiments to view all available experiments.</h3>
        </div>
        </div>
        
    );
  }
  
  export default Landing;
  