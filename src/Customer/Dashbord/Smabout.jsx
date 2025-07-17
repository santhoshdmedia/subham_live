// eslint-disable-next-line no-unused-vars
import React from "react";
import { IMAGE_HELPER } from "../../helper/Imagehelper";

const Smabout = () => {
  return (
    <section className="w-full min-h-[550px] px-[5vw] lg:px-[8vw] bg-cover bg-no-repeat flex flex-col lg:flex-row items-center justify-center py-10 lg:py-0" style={{ backgroundImage: `url(${IMAGE_HELPER.smoke})` }}>
      <div className="flex flex-col lg:flex-row items-center justify-around gap-y-10 gap-x-10 lg:gap-x-20 w-full h-full px-5 lg:px-0">
        {/* Image Section */}
        <div className="flex-shrink-0 border-2 border-gray-500 p-2">
          <img src={IMAGE_HELPER.subhamship} alt="Ferry image representing our services" className="w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] lg:w-[300px] lg:h-[300px] xl:w-[400px] xl:h-[400px]  object-cover shadow-lg" />
        </div>

        {/* Text Section */}
        <div className="text-center lg:text-left max-w-full lg:max-w-[50%] px-4 lg:px-0">
          <h2 className="text-base sm:text-lg lg:text-xl font-bold">We Make</h2>
          <p className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold pb-4">
            <span className="text-primary">Ferry</span> Trip Awesome
          </p>
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg leading-relaxed" style={{ wordSpacing: "4px" }}>
            Your gateway to coastal connections, linking shores and souls. Book your ferry ticket online with us, and enjoy a smooth journey!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Smabout;
