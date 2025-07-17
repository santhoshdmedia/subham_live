// eslint-disable-next-line no-unused-vars
import React, { useRef } from "react";
import { IMAGE_HELPER } from "../../helper/Imagehelper";
import { ICON_HELPER } from "../../helper/IconHelper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const Destination = [
  {
    id: 1,
    img: IMAGE_HELPER.place1,
    head: "Keerimalai Sacred Water Springs",
    para: "Discover the Keerimalai Sacred Water Springs init with our special tours",
  },
  {
    id: 2,
    img: IMAGE_HELPER.place2,
    head: "Anuradhapura Buddhist Temple",
    para: "Discover the Anuradhapura Buddhist Temple with our special tours",
  },
  {
    id: 3,
    img: IMAGE_HELPER.place3,
    head: "Talaimannar Lighthouse / Beaches",
    para: "Discover the Talaimannar Lighthouse / Beaches with our special tours",
  },
  {
    id: 4,
    img: IMAGE_HELPER.place4,
    head: "Madhu Matha Church",
    para: "Discover the Madhu Matha Church with our special tours",
  },
  {
    id: 5,
    img: IMAGE_HELPER.place5,
    head: "Thirukoneswaram Kovil, Trincomalee",
    para: "Discover the Thirukoneswaram Kovil, Trincomalee init with our special tours",
  },
  {
    id: 6,
    img: IMAGE_HELPER.place6,
    head: "The War Museum - Mullaitivu",
    para: "Discover the The War Museum - Mullaitivu with our special tours",
  },
  {
    id: 7,
    img: IMAGE_HELPER.place7,
    head: "Sinhalese kingdom",
    para: "Discover the Sinhalese kingdom with our special tours",
  },
  {
    id: 8,
    img: IMAGE_HELPER.place8,
    head: "Cascades of Nuwara Eliya",
    para: "Discover the Cascades of Nuwara Eliya with our special tours",
  },
];

const Smdestination = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="w-full min-h-[500px] px-[4vw] md:px-[6vw] pt-10">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h1 className="text-3xl md:text-3xl text-center lg:text-left font-pri_head font-semibold">
            Top <span className="text-primary">Destination</span> For Your Next Vacation
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

      <div className="flex flex-row justify-between gap-10 pt-8 md:pt-10">
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
          {Destination.map((res) => {
            return (
              <SwiperSlide key={res.id}>
                <div className="relative group rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-black opacity-30"></div>

                  <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[380px] xl:h-[400px] 2xl:h-[420px] overflow-hidden">
                    <img
                      src={res.img}
                      alt={res.head}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="w-full absolute z-20 bg-transparent -bottom-[105px] group-hover:bg-gradient-to-t group-hover:from-black group-hover:bottom-0 transition-all duration-700 ease-in-out overflow-hidden py-5 px-5">
                    <h1 className="text-white text-left text-xl md:text-xl line-clamp-2 font-pri_head font-bold mb-5 group-hover:pb-1 transition-all duration-700 ease-in-out">
                      {res.head}
                    </h1>
                    <p className="text-white text-left text-sm line-clamp-2 font-pri_para mb-3">
                      {res.para}
                    </p>
                    <div className="flex justify-start">
                      <button className="border text-xs border-white rounded-full px-3 py-2 text-white font-pri_para">
                        See All Tours
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="flex justify-center items-center pt-10">
        <Link to={`/destination`} className="rounded-full bg-white border border-primary hover:bg-black hover:text-white hover:border-white text-primary font-semibold px-4 py-2">
          See All Destinations
        </Link>
      </div>
    </section>
  );
};

export default Smdestination;
