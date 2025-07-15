import React from "react";
import { Fade } from "react-awesome-reveal";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

function StatSection() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });
  return (
    <div className="bg-gray-100 py-10">
      <div className="custom-container grid grid-cols-2 gap-2 items-center">
        <div className="">
          <div className="text-primary font-bold text-lg">
            <h1>Impact in Numbers</h1>
          </div>
          <div className="font-extralight lowercase my-5">
            <h1 className="lowercase text-5xl">
              See the difference we're making.
            </h1>
            <h2 className="text-xl">one student at a time.</h2>
          </div>

          <button className="btn btn-primary btn-outline rounded-none px-10 mt-5 shadow-sm">
            Learn More
          </button>
        </div>
        <div className="">
          <section className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 gap-6">
            <Fade delay={100}>
              <div className="bg-white rounded-lg shadow-md px-6 py-10 text-center">
                <div className="text-4xl mb-3">🗂</div>
                <h3 className="text-lg font-medium text-gray-700 my-5">
                  Total Scholarships
                </h3>
                <p ref={ref} className="text-7xl font-bold text-gray-900">
                  {inView ? <CountUp start={0} end={795} /> : 0}
                </p>
              </div>
            </Fade>

            <Fade delay={200}>
              <div className="bg-white rounded-lg shadow-md px-6 py-10 text-center">
                <div className="text-4xl mb-3">📇</div>
                <h3 className="text-lg font-medium text-gray-700 my-5">
                  Successfull Admission
                </h3>
                <p ref={ref} className="text-7xl font-bold text-gray-900">
                  {inView ? <CountUp start={0} end={578} /> : 0}
                </p>
              </div>
            </Fade>

            <Fade delay={300}>
              <div className="bg-white rounded-lg shadow-md px-6 py-10 text-center">
                <div className="text-4xl mb-3">🪧</div>
                <h3 className="text-lg font-medium text-gray-700 my-5">
                  Available Scholarship
                </h3>
                <p ref={ref} className="text-7xl font-bold text-gray-900">
                  {inView ? <CountUp start={0} end={648} /> : 0}
                </p>
              </div>
            </Fade>

            <Fade delay={250}>
              <div className="bg-white rounded-lg shadow-md px-6 py-10 text-center">
                <div className="text-4xl mb-3">🧑‍🎓</div>
                <h3 className="text-lg font-medium text-gray-700 my-5">
                  Happy Student
                </h3>
                <p ref={ref} className="text-7xl font-bold text-gray-900">
                  {inView ? <CountUp start={0} end={473} /> : 0}
                </p>
              </div>
            </Fade>
          </section>
        </div>
      </div>
    </div>
  );
}

export default StatSection;
