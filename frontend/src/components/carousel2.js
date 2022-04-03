import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react"
import "../App.css";
import {connect} from 'react-redux'
import activitiesActions from '../redux/actions/activitiesActions'
import { Pagination, Navigation } from "swiper";

function Carousel2(props) {
  useEffect(() => {
    props.fetchactivities();
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={0}
        slidesPerGroup={4}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {props.activities?.map((activity) => (
          <SwiperSlide key={activity._id}>
              <div className="cardCarousel">
                <img
                  className="imagenesCar"
                  src={process.env.PUBLIC_URL + `./imagenes/${activity.img}`}
                  alt={process.env.PUBLIC_URL + `${activity.name}`}
                />
                <p>{process.env.PUBLIC_URL + `${activity.name}`}</p>
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
const mapDispatchToProps = {
  fetchActivities: activitiesActions.fetchActivities,
};
const mapStateToProps = (state) => {
  return {
    activities: state.activitiesReducer.activities,
    auxiliar: state.activitiesReducer.auxiliar,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Carousel2);
