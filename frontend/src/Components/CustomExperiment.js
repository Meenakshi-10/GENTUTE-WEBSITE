import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigation from "./Navbar";
import axios from "axios";

function CustomExperiment() {
  const [exp, setExp] = useState({
    text: ""
  });
  const handleChange = (e) => {
    setExp({
      text: e.target.value,
    });
  }
    const submit = () => {
      console.log(exp);
      if (exp) {
        axios({
          method: "POST",
          url: "http://localhost:5000/process_experiment",
          data: exp,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((res,error) => {
          console.log("Problem submitting experiment", error);
          window.location.reload()
          setExp(() => "");
        });
    }
  }
    return (
        <div>
        <Navigation />
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
        </div>
        
    );
  }

  export default CustomExperiment;