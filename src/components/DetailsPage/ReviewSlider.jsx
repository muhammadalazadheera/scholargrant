import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

export default function ReviewSlider({reviews}) {
    console.log(reviews)
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={5}
        pagination={{
          clickable: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
            reviews.map(review => {
                return(
                    <SwiperSlide>
                        <div className="review-slide border border-black/20 rounded-sm p-5">
                            <img className='rounded-full w-[100px] mx-auto mb-2' src={review.userImage} alt="" />
                            <p className='text-primary'>{review.userName}</p>
                            <p>{review.date}</p>
                            <br></br>
                            <p><i className="fas fa-star text-orange-400"></i> {review.rating}/5</p>
                            <p className='text-blue-500'>{review.comment}</p>
                        </div>
                    </SwiperSlide>
                )
            })
        }
        
      </Swiper>
    </>
  );
}
