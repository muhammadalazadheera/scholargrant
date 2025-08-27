import React from "react";

function AboutUs() {
  return (
    <div className="custom-container grid grid-cols-1 p-6 md:py-10 md:grid-cols-2 gap-25 py-10">
      <div className="">
        <div className="text-primary font-bold text-lg">
          <h1>About Us</h1>
        </div>
        <div className="font-extralight lowercase my-5">
          <h2 className="text-3xl">we are </h2>
          <h1 className="text-primary lowercase text-5xl">Scholar Grant</h1>
          <h2 className="text-xl">Your global scholarship gateway</h2>
        </div>
        <div className="text-gray-500 font-light">
          <p>
            At Scholar Grants, our goal is to empower students worldwide by
            simplifying the complex journey of finding and securing scholarships
            at renowned universities across the globe. We aim to be your premier
            global scholarship gateway, providing a comprehensive and intuitive
            platform where you can easily discover, explore, and apply for
            funding opportunities that match your academic aspirations. We
            believe that financial barriers shouldn't limit educational dreams,
            and we're committed to connecting talented individuals with the
            resources they need to achieve their full potential.
          </p>
        </div>

        <button className="btn btn-primary btn-outline rounded-none px-10 mt-5 shadow-sm">
          Learn More
        </button>
      </div>
      <div className="">
        <div className="collage">
          <div className="img-wrapper">
            <img
              src="https://yandex-images.clstorage.net/5qQd0g232/3cc0bcRp2p/gNviuIBr9Q3ah4VL2avEaaj45_fMMOvsrKo6rWAIS2uRjWh6v1e3EO8NhuHy6p9E-4O_Ly1GfV03PuBRKFGB_M6O9fTKLO9ZjMycH9GowWu1paTm0GrvsbboaaBhAnUM6fseFJRgmmCTcpzjqbibCeLR6HITemsLN3bVY04xxpyOzvOBgFWsE9i94WLwnOVLvoHI8NFu952Nh0DMGV58NcDyOAiTVbpWjXO9x6CVpgWj4sx1NE4uHQtsxkh1CPaLmNv9trlOmCPKl8ZxzIDOdqSvzNb1R8a6jZlX8gRlWAPM3ws9i0q2d5JMrvq2lK4crvjOdRVALgo-ZPZTTyv5mI_RzrWwcqgl1prda_an11iGnvvk7EzQnJ-lb_g9RUEA_90pAqpDkEWQf5XRrauJIILT_WcYYCIHIkvqRXwR9JiXzfSyl06_Nsqsx1HNk8ZVmZfKw_tI57aJt0vbBntbB_77HhOVWLVpjE6H86GkqAOt-u91A2YDIAJqz0ZwCtCJj8Dmt7NwuiH5vsJT97HGXpqP8NzzbMqctqJK_DJ9UiLD_zA5vVuHaIpuk-yopIg6lOTtWThjJyE0X_JraQX4q7ng946qaJE61qbeY-6E0nqAk8_Az1jno5-dQ-oadUwU0ckfO4xUsm-vXqLDlZ6uFprc6VgFSAE7NXHwYEk4_KOm0dePvE21MMa273bogNB_g7zm-u9277qJjGbYBUNiBevOCQOLcZ5qnmmQ8oKTiRum1fNZLXYtNjtR3mRaP8OtosjRk4J5jTrzu8xr9o3HaqOD0MD7b_Cxrb1r1RpYaSrH_yoEnEuHb7lmkeOhhpM1vdj_RgJRBjQDVdVkSBjjqpne9K2EVI8RzZ7sYPyKxmSWgt3973fjuoq3avIRR2s77u4vCJlhmmqzVq7YvbiwAYHwzkkFYAAYH2jQQXsby5uv6NCRlnacKdqR7lbIrOFFoZTE_PNOzIatnUL1CHY"
              alt="Image 1"
            />
          </div>
          <div className="img-wrapper">
            <img
              src="https://avatars.mds.yandex.net/i?id=e569725ee82687d6d52264e278416e97-4879412-images-thumbs&n=13"
              alt="Image 2"
            />
          </div>
          <div className="img-wrapper">
            <img
              src="https://yandex-images.clstorage.net/5qQd0g232/3cc0bcRp2p/gNviuIBr9Q3ah4VL2avEaaj45_fMMOvsrKo6pDEGHzKf224uugW3FL9a1ub37MlI_NDmenhGfVw1Y7VWJ12H_5eO9PTKLOJXjsGcH9GowWu1paTm0GrvsbboaaBhAnUM6fseFJRgmmCTcpzjqbibCeLR6HITemsLN3bVY04xxpyOzvOBgFWsE9i94WLwnOVLvoHI8NFu952Nh0DMGV58NcDyOAiTVbpWjXO9x6CVpgWj4sx1NE4uHQtsxkh1CPaLmNv9trlOmCPKl8ZxzIDOdqSvzNb1R8a6jZlX8gRlWAPM3ws9i0q2d5JMrvq2lK4crvjOdRVALgo-ZPZTTyv5mI_RzrWwcqgl1prda_an11iGnvvk7EzQnJ-lb_g9RUEA_90pAqpDkEWQf5XRrauJIILT_WcYYCIHIkvqRXwR9JiXzfSyl06_Nsqsx1HNk8ZVmZfKw_tI57aJt0vbBntbB_77HhOVWLVpjE6H86GkqAOt-u91A2YDIAJqz0ZwCtCJj8Dmt7NwuiH5vsJT97HGXpqP8NzzbMqctqJK_DJ9UiLD_zA5vVuHaIpuk-yopIg6lOTtWThjJyE0X_JraQX4q7ng946qaJE61qbeY-6E0nqAk8_Az1jno5-dQ-oadUwU0ckfO4xUsm-vXqLDlZ6uFprc6VgFSAE7NXHwYEk4_KOm0dePvE21MMa273bogNB_g7zm-u9277qJjGbYBUNiBevOCQOLcZ5qnmmQ8oKTiRum1fNZLXYtNjtR3mRaP8OtosjRk4J5jTrzu8xr9o3HaqOD0MD7b_Cxrb1r1RpYaSrH_yoEnEuHb7lmkeOhhpM1vdj_RgJRBjQDVdVkSBjjqpne9K2EVI8RzZ7sYPyKxmSWgt3973fjuoq3avIRR2s77u4vCJlhmmqzVq7YvbiwAYHwzkkFYAAYH2jQQXsby5uv6NCRlnacKdqR7lbIrOFFoZTE_PNOzIatnUL1CHY"
              alt="Image 3"
            />
          </div>
          <div className="img-wrapper">
            <img
              src="https://avatars.mds.yandex.net/i?id=ccdbce9940beff099b2170bbc290349cd7330bb6f263d071-7683610-images-thumbs&n=13"
              alt="Image 4"
            />
          </div>
          <div className="img-wrapper">
            <img
              src="https://avatars.mds.yandex.net/i?id=de41f547d82740831bbc7533b4cc702627426199-12502489-images-thumbs&n=13"
              alt="Image 5"
            />
          </div>
          <div className="img-wrapper">
            <img
              src="https://avatars.mds.yandex.net/i?id=05b4efaa08dc7f140caed257a87d8b0f1150c43802ca2482-9835753-images-thumbs&n=13"
              alt="Image 6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
