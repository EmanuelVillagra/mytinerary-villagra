import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import { Link as Linkrouter } from "react-router-dom";
import {connect} from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'

const DetailedCard = (props)=> {
  console.log(props)
  const { _id } = useParams();

  useEffect(() => {
    props.findCity(_id)
  },[]);
  
  if(!props.city){return <h1>loading</h1>}
  return (
    <div className="cardCities">
     
        <Card sx={{ width: 1 }}>
          <CardMedia
            component="img"
            height="300"
            image={process.env.PUBLIC_URL + `../../imagenes/${props.city.img}`} alt={process.env.PUBLIC_URL + `${props.city.name}`}
            />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.city.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
{props.city.description}
            </Typography>
          </CardContent>
        </Card>

    </div>
  );
}
const mapDispatchToProps={
  findCity: citiesActions.findCity
}
const mapStateToProps = (state)=>{
  return{
    city: state.citiesReducer.city,
    auxiliar: state.citiesReducer.auxiliar
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailedCard)