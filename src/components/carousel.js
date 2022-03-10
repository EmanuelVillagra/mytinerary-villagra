import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect} from "react";
import { getAllCities } from "../apiCall";
import "../App.css";

// import required modules
import { Pagination, Navigation } from "swiper";



export default function Carousell() {
  const [Cities, setCities] = useState([]);
  console.log(Cities)

useEffect(()=>{
    getAllCities()
    .then(response=>setCities(response.data.response.cities))
  },[])

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
        {Cities?.map(City=>
          <SwiperSlide key={City._id}>
            <a href={`cities/detail/${City._id}`}>
            <div className="cardCarousel">

            <img className="imagenesCar" src={process.env.PUBLIC_URL + `./imagenes/${City.img}`}alt={process.env.PUBLIC_URL + `${City.name}`} />
            <p>{process.env.PUBLIC_URL + `${City.name}`}</p>
          </div>
          </a>
        </SwiperSlide>)}

      </Swiper>
    </>
  );
}
