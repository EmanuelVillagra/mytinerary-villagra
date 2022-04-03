import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import activitiesActions from "../redux/actions/activitiesActions";
import { Swiper, SwiperSlide } from "swiper/react";
import '../App.css'
import "swiper/css";

import "swiper/css/pagination";

import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";

export const Activities = (props) => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    props
      .fetchActivitiesByItineraryId(props.itineraryID)
      .then((res) => setActivities(res.response));
  }, []);
  return (
    <div>
      {
        <>
          <Swiper
            slidesPerView={3}
            spaceBetween={0}
            slidesPerGroup={1}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper2"
          >
            {activities?.map((activity) => (
              <SwiperSlide key={activity._id}>
                <div className="cardCarousel ">
                  <img
                    className="imagenesCar"
                    src={`/${activity.img}`}
                    alt={activity.name}
                  />
                  <p>{activity.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      }
    </div>
  );
};

const mapDispatchToProps = {
    fetchActivitiesByItineraryId: activitiesActions.fetchActivitiesByItineraryId,
};

export default connect(null, mapDispatchToProps)(Activities);
