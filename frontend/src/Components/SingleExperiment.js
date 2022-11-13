import Navigation from "./Navbar";
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import step1 from "./step1.jpg"
import step2 from "./step2.png"
import step3 from "./step3.jpg"
import step4 from "./step4.png"


const mystyle = {
    width : '400px', height: '400px'
  };

const pstyle = {
    marginTop: '15%'
};

function SingleExperiment(props) {
    console.log(props.steps)
    const steps= props.steps
    const urls = props.urls
    
    return (
        <div style = {{backgroundColor: '#ececec', height: '100vh'}}>
        <Navigation />
        <div style = {{width: '35%', height: '35%', marginLeft: '32%', marginTop: '5%'}}>
        <Carousel showThumbs = {false} showArrows={true}>
                {
                    steps.map((step,index) => (
                        (
                            <div>
                                <div style = {{backgroundColor: 'white'}}>
                                <img src={urls[index]} style = {mystyle}/>
                                </div>
                               <br/><br/>
                               <br/><br/>
                               <p style = {pstyle} className="legend">{step}</p>
                               
                            </div>
                        )
                    ))
                }
            </Carousel>
            </div>
        </div>
        
    );
  }
  
  export default SingleExperiment;
  