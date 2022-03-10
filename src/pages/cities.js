import "../App.css";
import CardSection from "../components/cardSection";
import Footerr from "../components/footer";
import NavBar from "../components/NavBar";

function Cities() {
  return (
    <div>
      <div className="citiesHeader">
      <NavBar/>
      </div>
      <CardSection/>
      <Footerr />
    </div>
  );
}

export default Cities;
