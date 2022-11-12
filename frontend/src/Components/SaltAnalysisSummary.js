import Navigation from "./Navbar";
import SummaryRow from "./SummaryRow";
function SaltAnalysisSummary()
{
    return (
        <div>
        <Navigation></Navigation>
        <div class="row d-flex justify-content-center mt-100">
    <div class="col-md-4" style = {{width: "70%"}}>
        <div class="card">
            <div class="card-body text-center">
                <h4 class="card-title">Salt Analysis Summary</h4>
                <p class="card-description"></p>
                <hr class="mb-30"/>  
                <div style = {{display: "flex", flexDirection: "column"}}>
                <SummaryRow test = "Add salt to dil. H2SO4 . Heat the test tube. Observe the colour and smell of gas" 
                obs = "Colorless and odorless gas" inf = "The anion may be carbonate"></SummaryRow>
                <br/>
                <SummaryRow test = "Add salt to dil. H2SO4 . Pass gas to limewater. Observe the colour of limewater"
                obs = "Lime water turns milky" inf = "The anion is carbonate"></SummaryRow>
                </div>
                 
            </div> 
        </div>  
    </div>   
  </div>
  </div>
    );

}
export default SaltAnalysisSummary;

    