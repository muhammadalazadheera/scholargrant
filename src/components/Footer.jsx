import React from "react";

function Footer() {
  return (
    <div className="bg-base-200 border-t border-(--secondary-color)">
      <div className="w-[95%] lg:w-[85%] mx-auto">
        <div className="w-full h-[250px] flex flex-col md:flex-row justify-between items-center">
          <div className="text-center pt-5 md:pt-0">
            <h1 className="logo-text text-3xl font-extrabold">ScholarGrant</h1>
            <p className="text-xl font-light text-(--primary-color) capitalize">
              Gateway To Opportunity.
            </p>
          </div>
          <div className="my-7 md:my-0">
            <ul className="uppercase text-(--primary-color) text-center md:text-left text-lg font-light">
              <li>privacy policy</li>
              <li>terms & condition</li>
              <li>developer resources</li>
            </ul>
          </div>
          <div className="social-links">
            <ul>
              <li><a href="#"><img src="https://img.icons8.com/nolan/64/facebook-new.png" alt="facebook" /></a></li>
              <li><a href="#"><img src="https://img.icons8.com/nolan/64/instagram-new.png" alt="instagram" /></a></li>
              <li><a href="#"><img src="https://img.icons8.com/nolan/64/youtube-play.png" alt="youtube" /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;