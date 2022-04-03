import "../App.css";
import { Link as Linkrouter } from "react-router-dom";
import { Button } from "@mui/material";

function Footerr() {
  return (
    <div className="footer">
      <h3>All Rights Reserved to &copy;MyTinerary</h3>
      <img src="https://www.pngplay.com/wp-content/uploads/8/Summer-PNG-HD-Quality.png"className="pngFooter"/>
      <div className="navFooter">
<Button>
<Linkrouter to="/" className="buttonFooter">
  Home
</Linkrouter>
  </Button>
<Button>
<Linkrouter to="/cities" className="buttonFooter">
  Cities

</Linkrouter>
</Button>
      </div>
    </div>
  );
}

export default Footerr;
