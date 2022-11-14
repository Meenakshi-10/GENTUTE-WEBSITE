import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigation from "./Navbar";
import axios from "axios";
import SingleExperiment from "./SingleExperiment"

function CustomExperiment() {
  const [exp, setExp] = useState({
    text: ""
  });

  const [count,setCount] = useState(0);
  const [processExp, setProcessExp] = useState({
    flag: 0,
    steps: "",
    urls: ""
  })
  const handleChange = (e) => {
    setExp({
      text: e.target.value,
    });
  }

  const submit = async () => {
    try {
      setCount(count+1);
      fetch("http://127.0.0.1:5000/process-experiment/",{
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(exp)
      })
      .then(res => res.json())
      .then(data => {
        setProcessExp({
          flag: 1,
          steps: data["steps"],
          urls: data["urls"]
        })
        setExp({
          text: ""
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  const isFormSubmitted = () => {
    if(processExp.flag==1){
      return <SingleExperiment steps ={processExp.steps}  urls = {processExp.urls}/>
    }else{
      return (
        <div>
        <Navigation />
        <div style = {{width: '45%', marginTop: '10%', marginLeft: '30%', padding: '5%', backgroundColor: 'white'}}>
          <h2>Recognized Reagents and Actions</h2><br/><br/>
          <h4>Salts</h4>
          <p>CuSO4, KCl, FeSO4, NH4SO4, NaHCO3, All salts having cation as Na, Ba, Zn, Mg, Li and anion as 
            C, N, O, F, P, S, Cl, Br</p><br/>
          <h4>Solutions</h4>
          <p>NaOH, KOH, K2C2O4, C2H4, C2H6, C3H6, C3H8, C2H5OH, CH3OH, CH3CHO, C2H5OH, H2O, CH3COOH, HCl, H2SO4, 
            CuSO4, FeCl3, Br2, (NH4)2SO4, FeSO4, KMnO4, milky Ca(OH)2</p><br/>
          <h4>Bare Metals</h4>
          <p>Cu, Zn, Fe, Al</p><br/>
          <h4>Complexes</h4>
          <p>K3[Fe(C2O4)3].3H2O(Mohr's Salt), (NH4)2Fe(SO4)2(H2O)6 (Ferric Ammonium Nitrate)</p><br/>
          <h4>Flames</h4>
          <p>Red, Violet, Yellow, Green</p><br/>
          <h4>Litmus Papers</h4>
          <p>Red and Blue</p><br/>
          <h4>Actions</h4>
          <p>Heating, Mixing, Filtering</p><br/>
          <h5 style = {{color: 'grey'}}>Can refer to previous yields</h5><br/><br/>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter Experiment</Form.Label>
           <Form.Control type="textarea" value = {exp.text} onChange = {handleChange}/>
         </Form.Group>
        
         <Button variant="primary" type="button" onClick={submit}>
           Submit
         </Button>
       </Form>
       </div>
       </div>
      )
    }
  }
    return (
      <div>
        {isFormSubmitted()}
      </div>  
    );
  }

  export default CustomExperiment;