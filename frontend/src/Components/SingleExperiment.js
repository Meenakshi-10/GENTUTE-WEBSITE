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

function SingleExperiment() {
    return (
        
        <div style = {{backgroundColor: '#ececec', height: '100vh'}}>
        <Navigation />
        <div style = {{width: '35%', height: '35%', marginLeft: '32%', marginTop: '5%'}}>
        <Carousel showThumbs = {false} showArrows={true}>
                <div>
                <img src={step1}style = {mystyle} />
                <div style = {pstyle}>
                <p className="legend">Dip a rod in conc. HCl</p>
                </div>
                
                </div>
                <div>
                    <img src={step2} style = {mystyle} />
                    <p className="legend">Now dip the rod in LiCl2 salt</p>
                </div>
                <div>
                    <img src={step3} style = {mystyle}/>
                    <p className="legend">Expose the rod to a bunsen burner</p>
                </div>
                <div>
                    <img src={step4} style = {mystyle} />
                    <p className="legend">A red flame is observed</p>
                </div>
            </Carousel>
            </div>
        </div>
        
    );
  }
  
  export default SingleExperiment;
  