import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navigation from "./Navbar";

function CustomExperiment() {
    return (
        <div>
        <Navigation />
        <div style = {{width: '40%', marginTop: '10%', marginLeft: '30%', padding: '5%', backgroundColor: 'white'}}>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter Experiment</Form.Label>
           <Form.Control type="textarea"/>
         </Form.Group>
        
         <Button variant="primary" type="submit">
           Submit
         </Button>
       </Form>
      </div>
        </div>
        
    );
  }
  
  export default CustomExperiment;
  