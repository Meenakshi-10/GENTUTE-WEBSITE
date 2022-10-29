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

  const [processExp, setProcessExp] = useState({
    flag: false,
    steps: ""
  })
  const handleChange = (e) => {
    setExp({
      text: e.target.value,
    });
  }

  const postExperiment = async () => {
    return await axios.post("http://127.0.0.1:5000/process-experiment/",exp)
  }
    const submit = () => {
       postExperiment.then((response) => {
        console.log(response.data.message)
        setProcessExp({
        flag: true,
        steps: response.data.message['steps']
       })
       })
  }
    return (
        <div>
        <Navigation />
        {processExp.flag ? (
          <SingleExperiment steps={["hi","hello"]} />
        ):(
        <div style = {{width: '40%', marginTop: '10%', marginLeft: '30%', padding: '5%', backgroundColor: 'white'}}>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter Experiment</Form.Label>
           <Form.Control type="textarea" value = {exp.text} onChange = {handleChange}/>
         </Form.Group>
        
         <Button variant="primary" type="submit" onClick={submit}>
           Submit
         </Button>
       </Form>
      </div>
        )}
        </div>
        
    );
  }

  export default CustomExperiment;