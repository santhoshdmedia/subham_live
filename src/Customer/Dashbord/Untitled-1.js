// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Modal, Rate, Select, Spin } from "antd";
import { IMAGE_HELPER } from "../../helper/Imagehelper";
import { ICON_HELPER } from "../../helper/IconHelper";
import $ from "jquery";
import "jquery.ripples";
import { AntDesignOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Space } from "antd";
import { createStyles } from "antd-style";
import { Link } from "react-router-dom";
import { TravelpackagesData } from "../../helper/customer/data-helper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import _ from "lodash";

const Hero = () => {
  const ripplesRef = useRef();

  useEffect(() => {
    $(ripplesRef.current).ripples({
      resolution: 256,
      perturbance: 0.01,
    });
  }, []);

  const review = 4.5;

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative hero center_div w-screen min-h-screen bg-no-repeat bg-cover !select-none" style={{ backgroundImage: `url(${IMAGE_HELPER.hero})` }} ref={ripplesRef}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="lg:absolute static w-full h-full justify-center items-center transfom translate-y-36 md:translate-y-14 lg:translate-y-20">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl pb-1 md:pb-3 font-bold font-pri_head text-white">Waves of Wonder</h1>
          <p id="searchbox" className="text-xs lg:text-xl font-bold font-pri_para text-white">
            Book Your Scenic Ferry Adventure!
          </p>
        </div>

        <Link to="https://booking.sailsubham.com/home" className="w-[80%] md:w-[40%]  px-10 mx-auto left-9 md:left-56 lg:left-72 xl:right-72 absolute flex justify-center items-center top-24 lg:top-32 !h-[65px] lg:text-2xl !font-primary_font gap-x-5  shadow-2xl rounded-lg !z-50 cursor-pointer bg-white ">
          <ICON_HELPER.ACCOMMODATION_ICON className="!text-primary" />
          Book Ferry Ticket
        </Link>

        <section className="w-full min-h-[500px] px-[4vw] md:px-[6vw] absolute top-52 lg:top-64">
          <div className="flex flex-col items-start md:flex-row justify-between lg:px-5">
            <div>
              <h1 className="text-lg md:text-3xl text-center text-white lg:text-left font-pri_head font-semibold">
                Explore The Top Vacation Packages In <span className="text-primary">Sri Lanka</span> Today.
              </h1>
            </div>
            <div className="flex flex-row items-start pr-5 pt-2 md:pt-0">
              <div ref={prevRef} className="center_div cursor-pointer">
                <ICON_HELPER.LEFTFILLED_ARROW className="text-[30px]" />
              </div>
              <div ref={nextRef} className="center_div cursor-pointer">
                <ICON_HELPER.RIGHTFILLED_ARROW className="text-[30px] text-primary" />
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between gap-10 pt-2 md:pt-4">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
                1440: {
                  slidesPerView: 4,
                  spaceBetween: 0,
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
                  <SwiperSlide key={res.id} className="p-4 !bg-transparent">
                    <div className="group">
                      <div className="flex flex-col w-full relative rounded-xl group-hover:shadow-md group-hover:scale-105 duration-500 border bg-white">
                        <div className="p-3">
                          <div className="w-full h-[250px] rounded-lg overflow-hidden">
                            <img src={_.get(res, "package_image.[0]", [])} alt={res.package_address} className="w-full h-full group-hover:scale-110 duration-300 ease-in-out" />
                          </div>
                        </div>
                        <div className="absolute top-6 -left-[0px]">
                          <span className="bg-black font-pri_para px-4 py-1 text-white">
                            {res.night} Nights / {res.days} Days
                          </span>
                        </div>
                        <div className="absolute transform translate-y-16">
                          <span className="bg-white font-pri_para px-4 py-1 border text-black">{res.location}</span>
                        </div>
                        <div className="px-3 pb-3">
                          <h1 className="font-pri_head line-clamp-1">{res.package_address}</h1>
                          <div className="py-2">
                            <Rate allowHalf defaultValue={review} className="text-primary" />
                          </div>
                          <hr />
                          <div className="flex justify-between pt-3">
                            <div>
                              <p className="text-xs font-pri_para text-red-500 font-semibold">
                                <strike> ₹{res.original_amount}/- </strike>
                              </p>
                              <p className="text-para text-sm md:text-base font-pri_head">
                                From <span className="text-black font-pri_para font-bold">₹{res.discounted_amount}/-</span>
                              </p>
                            </div>
                            <div className="pt-1">
                              <Link to={`/destination-explore/${res._id}`} className="bg-black text-white font-pri_para md:text-base text-xs font-semibold cursor-pointer px-3 py-2 rounded">
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
            <Link to={`/destination`} className="rounded-full bg-white border border-primary hover:bg-black hover:text-white hover:border-white text-primary font-semibold px-4 py-2">
              See All Destinations
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Hero;
