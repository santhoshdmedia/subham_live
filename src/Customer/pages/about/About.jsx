// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IMAGE_HELPER } from "../../../helper/Imagehelper";
import { ICON_HELPER } from "../../../helper/IconHelper";
import News from "../../newsLetter/News";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="relative w-full h-[300px] md:h-[400px]">
        <img src={IMAGE_HELPER.BannerBgImage} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center space-y-2 px-4 md:px-8">
            <p className="flex items-center gap-2 font-pri_para text-white justify-start">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
              {<ICON_HELPER.RIGHT_ARROW />}
              <span className="font-title text-sky-500">About Us</span>
            </p>

            <h1 className="text-2xl sm:text-3xl text-left text-white font-bold font-pri_head">About Us</h1>

            <p className="text-sm text-left sm:text-base md:text-lg text-primary font-pri_para">Let&apos;s explore what we do!</p>
          </div>
        </div>
      </div>

      <div className="px-[6vw] pt-10 pb-20">
        <div className="max-w-screen-lg mx-auto">
          <div className="py-20 space-y-3 text-center">
            <h1 className="text-3xl sm:text-5xl font-pri_head font-bold">
              Provide the <span className="text-primary">best travel</span> experience for you
            </h1>
            <p className="text-primary font-bold">We understand that every journey has unique needs. Therefore, we offer customized travel packages designed according to your preferences and budget.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-around gap-5">
          <div className="flex-1 px-10 py-10 rounded-3xl space-y-3 bg-primary">
            <ICON_HELPER.GLOBE_ICON size={50} className="mb-2 text-white" />
            <h1 className="text-2xl font-pri_head font-bold pb-3">Our Vision</h1>
            <p className="text-white font-pri_para">Our vision is to be a premier travel agency that offers exceptional services and inspires our customers to explore the world.</p>
          </div>
          <div className="flex-1 px-10 py-10 rounded-3xl space-y-3 bg-primary">
            <ICON_HELPER.ROCKET_ICON size={50} className="mb-2 text-white" />
            <h1 className="text-2xl font-pri_head font-bold pb-3">Our Mission</h1>
            <p className="text-white font-pri_para">Our mission is to deliver exceptional travel experiences by offering personalized services, expert guidance, and inspiration, ensuring every journey is memorable for our customers.</p>
          </div>
        </div>
      </div>

      <div className="px-[6vw] py-20 bg-black">
        <div className="w-full flex flex-col md:flex-row justify-between gap-10">
          <div className="center_div">
            <div className="space-y-10">
              <h1 className="text-3xl md:text-5xl font-head font-bold text-white">
                Finding your <span className="text-primary">dream destination</span> is our priority
              </h1>
              <p className="text-white font-pri_para">With a collection of destinations that include stunning natural landscapes, vibrant cosmopolitan cities, and enchanting tropical islands, we take you to the world&apos;s most stunning places.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-3xl p-5 flex flex-col space-y-2">
              <ICON_HELPER.CHOICES_ICON size={30} className="mr-3" />
              <h1 className="text-xl md:text-2xl font-pri_head font-semibold">Lots of Choices</h1>
              <p className="text-para font-pri_para">Thousands of the best destinations are ready to spoil your eyes.</p>
            </div>
            <div className="bg-white rounded-3xl p-5 flex flex-col space-y-2">
              <ICON_HELPER.BOOKING_ICON size={30} className="mr-3" />
              <h1 className="text-xl md:text-2xl font-pri_head font-semibold">Easy Booking</h1>
              <p className="text-para font-pri_para">No need to be complicated in ordering tickets, order now with a few taps.</p>
            </div>
            <div className="bg-white rounded-3xl p-5 flex flex-col space-y-2">
              <ICON_HELPER.ACCOMMODATION_ICON size={30} className="mr-3" />
              <h1 className="text-xl md:text-2xl font-pri_head font-semibold">Accommodation</h1>
              <p className="text-para font-pri_para">There are many choices of interesting destinations to make stories on your trip.</p>
            </div>
            <div className="bg-white rounded-3xl p-5 flex flex-col space-y-2">
              <ICON_HELPER.GUIDE_ICON size={30} className="mr-3" />
              <h1 className="text-xl md:text-2xl font-pri_head font-semibold">Best Tour Guide</h1>
              <p className="text-para font-pri_para">Don&apos;t worry about traveling anywhere, our tour guide is ready to guide you anytime.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[6vw] py-20">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <img src={IMAGE_HELPER.GetReadyImg} alt="" className="w-full h-auto rounded-3xl object-cover" />
          </div>
          <div className="flex-1 center_div">
            <div className="space-y-10">
              <h1 className="text-3xl md:text-5xl font-pri_head font-semibold">
                Enjoy exclusive <span className="text-primary">personalized</span> service and an unforgettable experience
              </h1>
              <p className="text-para font-pri_para">We are a team of professionals with a deep passion for travel. We believe that travel is a window to adventure, cultural discovery and personal growth.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
