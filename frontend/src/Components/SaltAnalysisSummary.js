import Navigation from "./Navbar";
import SummaryRow from "./SummaryRow";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function SaltAnalysisSummary()
{
    const [cationSummary,setCationSummary] = useState([]);
    const [anionSummary,setAnionSummary] = useState([]);
    const loc = useLocation()
    const cation = loc.state?.cation
    const anion = loc.state?.anion
    const cationSequence = loc.state?.cationSequence
    const anionSequence = loc.state?.anionSequence

    const cationSequenceLength = cationSequence.length
    const anionSequenceLength = anionSequence.length

    useEffect(()=>{
        const generateCationSummary = async() => {
            let c = 0
            let summaryItems = []
            while(c<cationSequenceLength-1){
                let currentExperiment = cationSequence[c]
                let nextExperiment = cationSequence[c+1]
                let summaryItem={}
                const response = await fetch(`http://127.0.0.1:5000/cation-analysis/get-experiment?eid=${currentExperiment}`,{
                    method: 'GET',
                    mode: 'cors'
                })

                const fetchedItems1 = await response.json(response)
                console.log(fetchedItems1)

                let payload = {
                    eid: currentExperiment,
                    nextEid: nextExperiment
                } 

                const ans = await fetch("http://127.0.0.1:5000/cation-summary",{
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(payload)
                })

                const fetchedItems2 = await ans.json(ans)
                console.log(fetchedItems2)

                summaryItem = {
                    test: fetchedItems1["OBS"],
                    obs: fetchedItems2["option"],
                    inf: fetchedItems2["inf"]
                }
                summaryItems.push(summaryItem)
                c=c+1
            }
            setCationSummary(summaryItems)
        }

        const generateAnionSummary = async() => {
            let a = 0
            let summaryItems = []
            while(a<anionSequenceLength-1){
                let currentExperiment = anionSequence[a]
                let nextExperiment = anionSequence[a+1]
                let summaryItem={}
                const response = await fetch(`http://127.0.0.1:5000/anion-analysis/get-experiment?eid=${currentExperiment}`,{
                    method: 'GET',
                    mode: 'cors'
                })

                const fetchedItems1 = await response.json(response)
                console.log(fetchedItems1)

                let payload = {
                    eid: currentExperiment,
                    nextEid: nextExperiment
                } 

                const ans = await fetch("http://127.0.0.1:5000/anion-summary",{
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(payload)
                })

                const fetchedItems2 = await ans.json(ans)
                console.log(fetchedItems2)

                summaryItem = {
                    test: fetchedItems1["OBS"],
                    obs: fetchedItems2["option"],
                    inf: fetchedItems2["inf"]
                }
                summaryItems.push(summaryItem)
                a=a+1
            }
            setAnionSummary(summaryItems)
        }
        generateCationSummary().then(generateAnionSummary());
    },[])

    return (
        <div>
        <Navigation></Navigation>
        {console.log(anionSummary)}
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
                                <div>
                                    <SummaryRow test = {step.test} obs = {step.obs} inf = {step.inf}></SummaryRow>
                                    <br/>
                                </div>
                            )
                        ))
                    }
                    {
                        anionSummary.map(step => (
                            (
                                <div>
                                    <SummaryRow test = {step.test} obs = {step.obs} inf = {step.inf}></SummaryRow>
                                    <br/>
                                </div>
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

    