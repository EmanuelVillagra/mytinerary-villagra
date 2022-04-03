import React from "react";
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import userActions from "../redux/actions/userActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const Likes = (props) => {
  async function likeDislike() {
      await props.likeDislike(props.id);
      props.setReload(!props.reload);
  }
  console.log(props)
  return (
    <div>
      {" "}
      {props.user ? (
        <IconButton aria-label="Like" onClick={likeDislike}>
          {props.likes.includes(props.user._id) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}

          <Typography>{props.likes.length}</Typography>
        </IconButton>
      ) : (
        <IconButton aria-label="Like">
          <FavoriteBorderIcon />
          <Typography>{props.likes.length}</Typography>
        </IconButton>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = {
  likeDislike: itinerariesActions.likeDislike,
};

export default connect(mapStateToProps, mapDispatchToProps)(Likes);
