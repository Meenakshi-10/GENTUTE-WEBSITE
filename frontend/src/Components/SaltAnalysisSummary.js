import Navigation from "./Navbar";
import SummaryRow from "./SummaryRow";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function SaltAnalysisSummary()
{
    const [cationSummary,setCationSummary] = useState([])
    const loc = useLocation()
    const cation = loc.state?.cation
    const anion = loc.state?.anion
    const cationSequence = loc.state?.cationSequence
    const anionSequence = loc.state?.anionSequence

    const cationSequenceLength = cationSequence.length

    useEffect(()=>{
        const generateCationSummary = async() => {
            let c = 0
            let summaryItems = []
            while(c<cationSequenceLength-1){
                let currentExperiment = cationSequence[c]
                let nextExperiment = cationSequence[c+1]
                let test = ""
                let obs = ""
                let inf = ""
                let summaryItem={}
                await fetch(`http://127.0.0.1:5000/cation-analysis/get-experiment?eid=${currentExperiment}`,{
                method: 'GET',
                mode: 'cors'
                })
                .then(res => res.json())
                .then(data => {
                    test = data["OBS"]
                    console.log("NEXT EXPERIMENT = "+ nextExperiment)
                    let payload = {
                        eid: currentExperiment,
                        nextEid: nextExperiment
                    }
                    fetch("http://127.0.0.1:5000/cation-summary",{
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(payload)
                    })
                    .then(res => res.json())
                    .then(data => {
                        obs = data['option']
                        inf = data['inf']
                        summaryItem = {
                            test: test,
                            obs: obs,
                            inf: inf
                        }
        
                        summaryItems.push(summaryItem)
                    })
                })
                c=c+1;
            }
        //console.log(summaryItems)
        return summaryItems;
        }
        generateCationSummary().then(res => setCationSummary(res));
    },[])

    const anionSequenceLength = anionSequence.length
    
    return (
        <div>
        <Navigation></Navigation>
        {console.log(cationSummary)}
        <div class="row d-flex justify-content-center mt-100">
    <div class="col-md-4" style = {{width: "70%"}}>
        <div class="card">
            <div class="card-body text-center">
                <h4 class="card-title">Salt Analysis Summary</h4>
                <p class="card-description"></p>
                <hr class="mb-30"/> 
                <div style = {{display: "flex", flexDirection: "column"}}>
                    {
                        cationSummary.map(step => (
                            (
                                <SummaryRow test = {step.test} obs = {step.obs} inf = {step.inf}></SummaryRow>
                            )
                        ))
                    }
                </div>
                 
            </div> 
        </div>  
    </div>   
  </div>
  </div>
    );

}
export default SaltAnalysisSummary;

    