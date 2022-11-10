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
        <div style = {{width: '40%', marginTop: '10%', marginLeft: '30%', padding: '5%', backgroundColor: 'white'}}>
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