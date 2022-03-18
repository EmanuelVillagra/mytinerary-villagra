import "../App.css";
import DetailedCard from "../components/detail";
import ItinerariesSection from "../components/itinerariesSection";
import NavBar from "../components/NavBar"

function DetailPage() {
  return (
    <div>
        <NavBar/>
<DetailedCard/>
<ItinerariesSection/>
    </div>
  );
}

export default DetailPage;