// eslint-disable-next-line no-unused-vars
import React, { useRef } from "react";
import { ICON_HELPER } from "../../helper/IconHelper";
import { IMAGE_HELPER } from "../../helper/Imagehelper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Avatar, Rate } from "antd";

const testimonial = [
  {
    id: 1,
    rate: 4,
    date: "October 15, 2024",
    time: "11:00 AM",
    name: "Rajesh Kumar",
    place: "Nagapattinam, Tamil Nadu",
    para: "The journey aboard sailsubham Ferry was extraordinary. It felt amazing to be part of this historic revival of the sea route to Sri Lanka.",
  },
  {
    id: 2,
    rate: 5,
    date: "September 20, 2024",
    time: "2:30 PM",
    name: "Anjali Sharma",
    place: "Chennai, Tamil Nadu",
    para: "A perfect blend of comfort and heritage! The Siva Ganga ferry made our trip to Kankesanthurai unforgettable. Highly recommended!",
  },
  {
    id: 3,
    rate: 5,
    date: "August 1, 2024",
    time: "9:00 AM",
    name: "Michael Fernando",
    place: "Jaffna, Sri Lanka",
    para: "A great initiative to connect two beautiful cultures. The journey was smooth, though there’s room for improvement in onboard services.",
  },
  {
    id: 4,
    rate: 4.5,
    date: "September 5, 2024",
    time: "5:45 PM",
    name: "Divya Patel",
    place: "Madurai, Tamil Nadu",
    para: "sailsubham Ferry exceeded my expectations. The onboard experience was delightful, and the scenic views were breathtaking.",
  },
  {
    id: 5,
    rate: 4.5,
    date: "August 10, 2024",
    time: "4:15 PM",
    name: "Arun Balakrishnan",
    place: "Colombo, Sri Lanka",
    para: "The ferry was punctual and well-maintained. A fantastic way to foster cultural connections across the sea.",
  },
  {
    id: 6,
    rate: 5,
    date: "October 18, 2024",
    time: "10:30 AM",
    name: "Sujatha Ramesh",
    place: "Trichy, Tamil Nadu",
    para: "This ferry service is a game-changer for Tamil Nadu and Sri Lanka. A journey I’ll always cherish!",
  },
  {
    id: 7,
    rate: 4.5,
    date: "August 22, 2024",
    time: "6:00 PM",
    name: "Ganesh Prabhu",
    place: "Batticaloa, Sri Lanka",
    para: "The route is historic, but some operational challenges need to be addressed for a better experience.",
  },
  {
    id: 8,
    rate: 4,
    date: "September 28, 2024",
    time: "8:30 AM",
    name: "Meena Pillai",
    place: "Coimbatore, Tamil Nadu",
    para: "Loved the serene ferry journey. The onboard amenities were decent, and the staff were very courteous.",
  },
];

const Testimonial = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="w-full bg-gray-100 h-auto px-[6vw] py-10">
      <p className="font-title text-center text-primary pb-3">Testimonial</p>
      <h1 className="text-3xl font-pri_head font-semibold text-center">
        Regards <span className="text-primary">From</span> Travelers
      </h1>

      <div className="relative flex items-center">
        <div
          ref={prevRef}
          className="absolute left-0 z-20 cursor-pointer -ml-3"
        >
          <ICON_HELPER.ROUNDED_OUTLINE_LEFTARROW className="text-[40px] text-gray-600 hover:text-black transition duration-300" />
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          loop={true}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Navigation]}
          className="mySwiper w-full"
        >
          {testimonial
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((res) => {
              return (
                <SwiperSlide key={res.id}>
                  <div className="flex flex-col items-center w-full h-auto px-2 bg-gray-100 py-10">
                    <div className="relative shadow-md rounded-lg bg-white border mb-5 p-5 w-full">
                      <p className="text-center text-para font-pri_para mb-4">
                        <q className="italic">{res.para}</q>
                      </p>

                      <div className="flex flex-row justify-between items-center">
                        <div>
                          <Rate allowHalf defaultValue={res.rate} />
                        </div>
                        <div className="w-auto h-[20px] opacity-30">
                          <img
                            src={IMAGE_HELPER.testimoniallogo}
                            alt=""
                            className="w-full h-full"
                          />
                        </div>

                        <div className="text-left py-2">
                          <p className="text-sm font-pri_head">{res.date}</p>
                          <p className="text-xs text-para font-pri_head">
                            {res.time}
                          </p>
                        </div>
                      </div>
                      <div className="w-0 h-0 absolute -bottom-2 shadow-2xl border-l-[40px] border-r-[40px] border-b-[30px] rotate-90 border-transparent border-b-white"></div>
                    </div>

                    <div className="flex p-2 rounded-lg flex-row gap-3">
                      <div className="w-[50px] h-[50px]">
                        <Avatar
                          src={res.img}
                          size={50}
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          {res.name.charAt(0)}
                        </Avatar>
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold">{res.name}</h3>
                        <p className="text-sm text-gray-500">{res.place}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>

        <div
          ref={nextRef}
          className="absolute right-0 z-20 cursor-pointer -mr-3"
        >
          <ICON_HELPER.ROUNDED_OUTLINE_RIGHTARROW className="text-[40px] text-gray-600 hover:text-black transition duration-300" />
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
