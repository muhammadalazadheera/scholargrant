import Marquee from "react-fast-marquee";

const PartnerMarquee = () => (
  <div className="bg-base-300 py-10">
    <h2 className="text-4xl font-extrabold text-center mb-5 text-primary">
      Collaborative Partners
    </h2>

    <Marquee>
      <div className="mx-5 w-28">
        <img src="/images/var-logos/1.png" alt="" />
      </div>
      <div className="mx-5 w-28">
        <img src="/images/var-logos/2.png" alt="" />
      </div>
      <div className="mx-5 w-28">
        <img
          src="/images/var-logos/3.png"
          alt=""
        />
      </div>
      <div className="mx-5 w-28">
        <img
          src="/images/var-logos/4.png"
          alt=""
        />
      </div>
      <div className="mx-5 w-28">
        <img src="/images/var-logos/5.png" alt="" />
      </div>
      <div className="mx-5 w-28">
        <img
          src="/images/var-logos/6.png"
          alt=""
        />
      </div>
      <div className="mx-5 w-28">
        <img src="/images/var-logos/7.png" alt="" />
      </div>
      <div className="mx-5 w-28">
        <img src="/images/var-logos/8.png" alt="" />
      </div>
      <div className="mx-5 w-28">
        <img src="/images/var-logos/9.png" alt="" />
      </div>
      <div className="mx-5 w-28">
        <img src="/images/var-logos/10.png" alt="" />
      </div>
    </Marquee>
  </div>
);

export default PartnerMarquee;
