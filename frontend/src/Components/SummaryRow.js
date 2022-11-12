import Navigation from "./Navbar";
function SummaryRow(props)
{
    return (
    <div style = {{display: "flex", flexDirection: "row"}}>
        <div style = {{backgroundColor: "#FFDFD3", padding: "2%", flex: "1 1 auto"}}>
        <h6 style = {{textDecoration: "underline"}}>TEST</h6>
        <div style = {{backgroundColor: "#FEEDE2", padding: "2%"}}>
        <p>{props.test}</p>
        </div>
        </div>

        <div style = {{backgroundColor: "#FFDFD3", marginLeft: "4%", padding: "2%", flex: "1 1 auto"}}>
        <h6 style = {{textDecoration: "underline"}}>OBSERVATION</h6>
        <div style = {{backgroundColor: "#FEEDE2", padding: "2%"}}>
        <p>{props.obs}</p>
        </div>
        </div>
        
        <div style = {{backgroundColor: "#FFDFD3", marginLeft: "4%", padding: "2%", flex: "1 1 auto"}}>
        <h6 style = {{textDecoration: "underline"}}>INFERENCE</h6>
        <div style = {{backgroundColor: "#FEEDE2", padding: "2%"}}>
        <p>{props.inf}</p>
        </div>
        </div>
        
    </div>
    );

}
export default SummaryRow;

    