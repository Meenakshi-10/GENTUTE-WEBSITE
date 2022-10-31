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
    
    return (
        <div style = {{backgroundColor: '#ececec', height: '100vh'}}>
        <Navigation />
        <div style = {{width: '35%', height: '35%', marginLeft: '32%', marginTop: '5%'}}>
        <Carousel showThumbs = {false} showArrows={true}>
                {
                    steps.map((step,index) => (
                        (
                            <div>
                                <img src={"https://res.cloudinary.com/dn7jk2swt/image/upload/v1666801851/steps/"+(index+1).toString()+".png"} style = {mystyle}/>
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
  