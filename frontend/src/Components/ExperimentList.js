import Button from 'react-bootstrap/Button';
import Navigation from "./Navbar";
import SingleExperiment from "./SingleExperiment";
import { Link } from 'react-router-dom';

const mystyle = {
    'object-fit':'contain'
  };
function ExperimentList() {
    return (
        <div>
            <Navigation />
            <div style = {{'display': 'flex', 'flex-direction': 'column', marginTop: '5%', marginLeft: '30%'}}>
            <div style = {{backgroundColor: 'white', width: '70%', height: '20%'}}>
                <div style = {{padding: '2%'}}>
                <h4>Salt Analysis</h4>
                <h2 style = {{fontSize: '20px', color: 'grey', fontFamily: 'arial'}}>An interactive step by step tutorial for performing salt analysis</h2>
                <a href = "/cation_analysis">
                <Button variant="dark">View</Button>
                </a>
                </div>
            </div>
            <div style = {{backgroundColor: 'white', width: '70%', height: '20%', marginTop: '3%'}}>
                <div style = {{padding: '2%'}}>
                <h4>LiCl2 Experiment</h4>
                <a href = "/single_experiment">
                <Button variant="dark">View</Button>
                </a>
                </div>
            </div>
            
                

            </div>
        </div>
        
        
    );
  }
  
  export default ExperimentList;
  