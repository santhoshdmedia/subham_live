// eslint-disable-next-line no-unused-vars
import React from "react";
import { IMAGE_HELPER } from "../../helper/Imagehelper"; 

const Explore = [
  {
    id: 1,
    img: IMAGE_HELPER.event1,
    head: "Discover the possibilities",
    para: "With nearly half a million attractions, hotels & more, you're sure to find joy."
  },
  {
    id: 2,
    img: IMAGE_HELPER.event2,
    head: "Enjoy deals & delights",
    para: "Quality activities. Great prices. Plus, earn credits to save more."
  },
  {
    id: 3,
    img: IMAGE_HELPER.event3,
    head: "Exploring made easy",
    para: "Book last minute, skip lines & get free cancellation for easier exploring."
  },
  {
    id: 4,
    img: IMAGE_HELPER.event4,
    head: "Travel you can trust",
    para: "Read reviews & get reliable customer support. We're with you at every step."
  },
];

const Event = () => {
  return (
    <section className="w-full min-h-[300px] center_div px-5 md:px-[6vw] py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {Explore.map((res) => {
          return (
            <div key={res.id} className="flex flex-col items-center">
              <div className="center_div pb-5">
                <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]">
                  <img src={res.img} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <h1 className="text-lg font-pri_head text-center font-semibold pb-2">{res.head}</h1>
              <p className="font-pri_para text-center text-para">{res.para}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Event;
