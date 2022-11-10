import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigation from "./Components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CustomExperiment from "./Components/CustomExperiment";
import ExperimentList from "./Components/ExperimentList";
import Landing from "./Components/Landing";
import SingleExperiment from "./Components/SingleExperiment";
import CationAnalysis from "./Components/CationAnalysis";
import AnionAnalysis from "./Components/AnionAnalysis";
import DisplayCation from './Components/DisplayCation';
import DisplayAnion from './Components/DisplayAnion';
import DisplaySalt from './Components/DisplaySalt';

function App() {
  return (
    <div style = {{backgroundColor: '#ececec', height: '100vh'}}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Landing /> 
          </Route>
          <Route path="/custom_experiment">
            <CustomExperiment/>
          </Route>
          <Route path="/all_experiment">
          <ExperimentList/>
          </Route>
          <Route path="/single_experiment">
          <SingleExperiment stepNum={4}/>
          </Route>
          <Route path="/cation_analysis">
          <CationAnalysis/>
          </Route>
          <Route path="/anion_analysis">
          <AnionAnalysis/>
          </Route>
          <Route path="/display_cation">
          <DisplayCation/>
          </Route>
          <Route path="/display_anion">
          <DisplayAnion/>
          </Route>
          <Route path="/display_salt">
          <DisplaySalt/>
          </Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
