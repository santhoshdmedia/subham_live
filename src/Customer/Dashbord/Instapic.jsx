// eslint-disable-next-line no-unused-vars
import React from "react";
import { IMAGE_HELPER } from "../../helper/Imagehelper";

const Insta = [
  {
    id: 1,
    img: IMAGE_HELPER.instapic4,
  },
  {
    id: 2,
    img: IMAGE_HELPER.instapic5,
  },
  {
    id: 3,
    img: IMAGE_HELPER.instapic1,
  },
  {
    id: 4,
    img: IMAGE_HELPER.instapic2,
  },
  {
    id: 5,
    img: IMAGE_HELPER.instapic3,
  },
  {
    id: 6,
    img: IMAGE_HELPER.instapic6,
  },
];

const Instapic = () => {
  return (
    <section className="w-full min-h-[350px] py-20 flex justify-center items-center">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-0">
        {Insta.map((res) => {
          return (
            <div key={res.id} className="relative group">
              <div className="relative w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px]">
                <img src={res.img} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:z-50 group-hover:scale-110" style={{ transformOrigin: "center" }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Instapic;
