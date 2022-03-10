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
<Linkrouter to="/">
  Home
</Linkrouter>
  </Button>
<Button>
<Linkrouter to="/cities">
  Cities

</Linkrouter>
</Button>
<Button>
<Linkrouter to="/user">
  User

</Linkrouter>
</Button>
      </div>
    </div>
  );
}

export default Footerr;
