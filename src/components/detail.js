import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import { getAllCities } from "../apiCall";
import { Link as Linkrouter } from "react-router-dom";

export default function DetailedCard() {
  const { _id } = useParams();
  const [Cities, setCities] = useState([]);

useEffect(()=>{
    getAllCities()
    .then(response=>setCities(response.data.response.cities))
  },[])
  const card = (Cities.filter((city) => city._id == _id));
  console.log(_id)
  console.log(Cities.filter((city) => city._id == _id))

  return (
    <div className="cardCities">
      {card.map((City) => (
        <Card sx={{ width: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={process.env.PUBLIC_URL + `../../imagenes/${City.img}`}alt={process.env.PUBLIC_URL + `${City.name}`}
            />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {City.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
{City.description}
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
      ))}
    </div>
  );
}
