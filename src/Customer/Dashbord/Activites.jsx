// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { Rate } from "antd";
import { Link } from "react-router-dom";
import { getAllpackages } from "../../api";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { TravelpackagesData } from "../../helper/customer/data-helper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ICON_HELPER } from "../../helper/IconHelper";

const Activites = () => {

  const review = 4.5;

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="w-full min-h-[500px] px-[4vw] md:px-[6vw] pt-10">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h1 className="text-3xl md:text-3xl text-center lg:text-left font-pri_head font-semibold">
            Explore The Top Vacation Packages In{" "}
            <span className="text-primary">Sri Lanka</span> Today.
          </h1>
        </div>
        <div className="flex flex-row pr-5 pt-4 md:pt-0">
          <div ref={prevRef} className="center_div cursor-pointer">
            <ICON_HELPER.LEFTFILLED_ARROW className="text-[30px]" />
          </div>
          <div ref={nextRef} className="center_div cursor-pointer">
            <ICON_HELPER.RIGHTFILLED_ARROW className="text-[30px] text-primary" />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-10 pt-8 md:pt-8">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {TravelpackagesData.map((res) => {
            return (
              <SwiperSlide key={res.id}>
                <div className="group py-3">
                  <div className="flex flex-col w-full relative rounded-xl group-hover:shadow-md group-hover:scale-105 duration-500 border bg-white">
                    <div className="p-3">
                      <div className="w-full h-[250px] rounded-lg overflow-hidden">
                        <img
                          src={_.get(res, "package_image.[0].images", [])}
                          alt={_.get(res, "package_image.[0].name", [])}
                          className="w-full h-full group-hover:scale-110 duration-300 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="absolute top-5 -left-[0px]">
                      <span className="bg-black font-pri_para px-4 py-1 text-white">
                        {res.night} Nights / {res.days} Days
                      </span>
                    </div>
                    <div className="absolute transform translate-y-14">
                      <span className="bg-white font-pri_para px-4 py-1 border text-black">
                        {res.location}
                      </span>
                    </div>
                    <div className="px-3 pb-3">
                      <h1 className="font-pri_head line-clamp-1">
                        {res.package_address}
                      </h1>
                      <div className="py-2">
                        <Rate
                          allowHalf
                          defaultValue={review}
                          className="text-primary"
                        />
                      </div>
                      <hr />
                      <div className="flex justify-between pt-3">
                        <div>
                          <p className="text-xs font-pri_para text-red-500 font-semibold">
                            <strike> ₹{res.original_amount-3}/- </strike>
                          </p>
                          <p className="text-para font-pri_head">
                            From{" "}
                            <span className="text-black font-pri_para font-bold">
                              ₹{res.discounted_amount-3}/-
                            </span>
                          </p>
                        </div>
                        <div className="pt-1">
                          <Link
                            to={`/destination-explore/${res._id}`}
                            className="bg-black text-white font-pri_para font-semibold cursor-pointer px-3 py-2 rounded"
                          >
                            View <span className="text-primary">M</span>ore
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="flex justify-center items-center py-10">
        <Link
          to={`/destination`}
          className="rounded-full bg-white border border-primary hover:bg-black hover:text-white hover:border-white text-primary font-semibold px-4 py-2"
        >
          See All Destinations
        </Link>
      </div>
    </section>
  );
};

export default Activites;
