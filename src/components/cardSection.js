import { TextField } from "@mui/material";
import "../App.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as Linkrouter } from "react-router-dom";
import { useEffect, useState} from "react";
import { getAllCities } from "../apiCall";

function CardSection() {
  const [inputSearch, setSearch] = useState('')
  const [cities, setCities] = useState([]);
  const [reload, setReload] = useState(false)
  const filteredCities = [];
  const img = require("../images/error404.webp") 
  useEffect(()=>{
    getAllCities()
    .then(response=>setCities(response.data.response.cities))
  },[reload])

  {
    filteredCities.push(
      cities.filter((val) => {
        if (inputSearch === "") {
          return val;
        } else if (
          val.name.toLowerCase().startsWith(inputSearch.toLowerCase().trim())
        ) {
          return val;
        }
      })
    );
  }
  return (
    <div className="cardSection">
      <div className="searcher">
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          onKeyUp={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className="cardCities">
        {filteredCities[0].length!==0 ?
        filteredCities[0].map((City) =>{ return (
          <Card key={City._id} sx={{ width: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={process.env.PUBLIC_URL + `./imagenes/${City.img}`}
              alt={process.env.PUBLIC_URL + `${City.name}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {City.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Favorites</Button>
                <Button size="small">
              <Linkrouter to={`detail/${City._id}`}>
                  Learn More
              </Linkrouter>
                </Button>
            </CardActions>
          </Card>
        )}
      )
      :
        (<img src={img}/>)}
      </div>
    </div>
  );
}

export default CardSection;
