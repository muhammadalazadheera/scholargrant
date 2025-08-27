import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

export default function TestimonialCarousel() {
  return (
    <div className="px-5 md:px-0 py-10 bg-primary">
      <h2 className="text-4xl font-extrabold text-center mb-5 text-white">
        Testimonials
      </h2>
      <div className="w-full md:w-[90%] mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="border border-dashed border-blue-500/20">
              <img src="https://i.ibb.co.com/zHrfDYwK/1.png" alt="Slide 1" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border border-dashed border-blue-500/20">
              <img src="https://i.ibb.co.com/TBzPQM3S/2.png" alt="Slide 2" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border border-dashed border-blue-500/20">
              <img src="https://i.ibb.co.com/q3Z5nBJy/3.png" alt="Slide 3" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border border-dashed border-blue-500/20">
              <img src="https://i.ibb.co.com/5PkppZd/4.png" alt="Slide 4" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border border-dashed border-blue-500/20">
              <img src="https://i.ibb.co.com/Swm8XJcd/5.png" alt="Slide 5" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
