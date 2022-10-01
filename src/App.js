import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigation from "./Components/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CustomExperiment from "./Components/CustomExperiment";
import Landing from "./Components/Landing";

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
          <Route path="/custom_experiment">
          <CustomExperiment/>
          </Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
