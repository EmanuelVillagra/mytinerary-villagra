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
import citiesActions from '../redux/actions/citiesActions'
import { Pagination, Navigation } from "swiper";

function Carousell(props) {
  useEffect(() => {
    props.fetchCities();
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
        {props.cities?.map((City) => (
          <SwiperSlide key={City._id}>
              <div className="cardCarousel">
                <img
                  className="imagenesCar"
                  src={process.env.PUBLIC_URL + `./imagenes/${City.img}`}
                  alt={process.env.PUBLIC_URL + `${City.name}`}
                />
                <p>{process.env.PUBLIC_URL + `${City.name}`}</p>
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
const mapDispatchToProps = {
  fetchCities: citiesActions.fetchCities,
};
const mapStateToProps = (state) => {
  return {
    cities: state.citiesReducer.cities,
    auxiliar: state.citiesReducer.auxiliar,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Carousell);
