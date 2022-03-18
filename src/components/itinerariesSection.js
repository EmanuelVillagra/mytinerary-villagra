import * as React from "react";
import {connect} from 'react-redux'
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import itinerariesActions from '../redux/actions/itinerariesActions'
import { alignProperty } from "@mui/material/styles/cssUtils";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ItinerariesSection = (props)=> {
  const [expanded, setExpanded] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);

  const { _id } = useParams();

  useEffect(() => {
    props.fetchItineraries()
  },[]);
  const card = props.itineraries.filter((itinerary) => itinerary.city_id === _id);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };
  console.log(card);
  return (
    <div className="itinerariesSection">
      {card.length !== 0 ? (
        card.map(itinerary => (
          <Card sx={{ maxWidth: 1, backgroundColor: "lightgray", marginY: 2 }}>
            <CardHeader
              avatar={
                <Avatar
                  src={`/imagenes/${itinerary.img}`}
                  sx={{ width: 200, height: 200 }}
                />
              }
              title={itinerary.name}
            />
            <CardContent>
              <Typography variant="body2" color="#7daae7">
                {itinerary.hashtags}
              </Typography>
              <Typography variant="body2" color="#7daae7">
                {"💵".repeat(itinerary.money)}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                <Typography>{itinerary.likes}</Typography>
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={
                  itinerary._id === card[0]._id ? expanded : expanded2
                }
                onClick={
                  itinerary._id === card[0]._id
                    ? handleExpandClick
                    : handleExpandClick2
                }
                aria-expanded={
                  itinerary._id === card[0]._id ? expanded : expanded2
                }
                aria-label="show more"
              >
                <ExpandMoreIcon /> 
              </ExpandMore>
            </CardActions>
            <Collapse
              in={itinerary._id === card[0]._id ? expanded : expanded2}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                <Typography paragraph>ERROR 404</Typography>
                <Typography paragraph>
                  CONTENT NOT FOUNDED, PROBABLY IN CONSTRUCTION
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))
      ) : (
        <h2>no itineraries yet</h2>
      )}
    </div>
  );
}
const mapDispatchToProps={
  fetchItineraries: itinerariesActions.fetchItineraries
}
const mapStateToProps = (state)=>{
  return{
    itineraries: state.itinerariesReducer.itineraries,
    auxiliar: state.itinerariesReducer.auxiliar
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItinerariesSection)