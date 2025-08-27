// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper/modules";

import { Fade } from "react-awesome-reveal";

function HeroSection() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className="h-screen">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={false}
        modules={[Autoplay]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide className="relative">
          <div className="hero-text w-full h-full bg-black absolute top-0">
            <div className="w-[85%] mx-auto text-left">
              <Fade>
                <div className="bg-primary px-2 inline-block">
                  <h1>University of Oxford</h1>
                </div>
              </Fade>
              <Fade delay={300}>
                <div className="bg-[#fb6f92] px-2 inline-block">
                  <p>Wellington Square, United Kingdom</p>
                </div>
              </Fade>
              <Fade delay={350}>
                <button className="btn btn-primary btn-outline rounded-none mt-5 uppercase">Browse Scholarships</button>
              </Fade>
            </div>
          </div>
          <img
            className="object-center h-full w-full"
            src="https://i.ytimg.com/vi/bsjI-BMQb5Q/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFYgZSgsMA8=&rs=AOn4CLCvCXML9neOrXcRTqI2NLCf97hkGw"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="hero-text w-full h-full bg-black absolute top-0">
            <div className="w-[85%] mx-auto text-left">
              <Fade>
                <div className="bg-primary px-2 inline-block">
                  <h1>Harvard University</h1>
                </div>
              </Fade>
              <Fade delay={300}>
                <div className="bg-[#fb6f92] px-2 inline-block">
                  <p>Massachusetts Hall, United States</p>
                </div>
              </Fade>
              <Fade delay={350}>
                <button className="btn btn-primary btn-outline rounded-none mt-5 uppercase">Browse Scholarships</button>
              </Fade>
            </div>
          </div>
          <img
            className="object-cover h-full w-full"
            src="https://www.sott.net/image/s14/282214/full/100411applications_1280x720.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className="relative">
          <div className="hero-text w-full h-full bg-black absolute top-0">
            <div className="w-[85%] mx-auto text-left">
              <Fade>
                <div className="bg-primary px-2 inline-block">
                  <h1>Cambridge University</h1>
                </div>
              </Fade>
              <Fade delay={300}>
                <div className="bg-[#fb6f92] px-2 inline-block">
                  <p>Cambridge CB2 1TN, United Kingdom</p>
                </div>
              </Fade>
              <Fade delay={350}>
                <button className="btn btn-primary btn-outline rounded-none mt-5 uppercase">Browse Scholarships</button>
              </Fade>
            </div>
          </div>
          <img
            className="object-cover h-full w-full"
            src="https://cdnn21.img.ria.ru/images/26124/29/261242934_0:176:2248:1441_1280x0_80_0_0_3fc91640777131b12c1620317126e891.jpg"
            alt=""
          />
        </SwiperSlide>
        <div className="autoplay-progress z-30" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}

export default HeroSection;
