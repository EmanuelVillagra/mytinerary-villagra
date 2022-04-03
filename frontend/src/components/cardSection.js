import { TextField } from "@mui/material";
import "../App.css";
import {connect} from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as Linkrouter } from "react-router-dom";
import { useEffect, useState } from "react";

function CardSection(props) {
  const img = require("../images/error404.webp");
  useEffect(() => {
    props.fetchCities()
  }, []);
  return (
    <div className="cardSection">
      <div className="searcher">
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          onKeyUp={(e) => {
            props.filtrar(props.cities,e.target.value)
          }}
        />
      </div>

      <div className="cardCities">
        {props.cities?.length !== 0 ? (
          props.cities.map((City) => {
            return (
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
            );
          })
        ) : (
          <img src={img} />
        )}
      </div>
    </div>
  );
}


const mapDispatchToProps={
  fetchCities: citiesActions.fetchCities,
  filtrar: citiesActions.filtrar
}
const mapStateToProps = (state)=>{
  return{
    cities: state.citiesReducer.cities,
    auxiliar: state.citiesReducer.auxiliar
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardSection)
