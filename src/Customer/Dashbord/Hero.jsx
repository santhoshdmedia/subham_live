// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "jquery.ripples";
import { Link, useNavigate } from "react-router-dom";
import { ICON_HELPER } from "../../helper/IconHelper";
import { Modal } from "antd";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import _ from "lodash";
import { get_background_image, get_pop_message, getAllpackages } from "../../api";
import { MdMessage } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";

const Hero = () => {
  const ripplesRef = useRef();
  const [image, setImage] = useState([]);
  const [popData, setPopData] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [open, setOpen] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [travelPackages, setTravelPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    if (!("ontouchstart" in window || /iP(hone|ad|od)/.test(navigator.userAgent))) {
      try {
        $(ripplesRef.current).ripples({ resolution: 256, perturbance: 0.01 });
      } catch (error) {
        console.error("Ripples effect failed to initialize:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [imgResult, popResult, pkgResult] = await Promise.all([get_background_image(), get_pop_message(), getAllpackages()]);

        setImage(_.get(imgResult, "data.data", []));
        const popDataFetched = _.get(popResult, "data.data", []);

        setPopData(popDataFetched);
        setTravelPackages(_.get(pkgResult, "data.data", []));
        const isPopupEnabled = _.get(popDataFetched, "[0].pop_status", false);
        if (isPopupEnabled) {
          setTimeout(() => setOpen(true), 2000);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
    window.scrollTo(0, 0);
  }, []);

  const handleClick = (id) => navigation(`/destination-explore/${id}`);

  if (loading) return <div className="w-full h-screen flex items-center justify-center text-xl font-semibold">Loading...</div>;

  return (
    <div className="w-screen min-h-[800px] relative bg-cover  bg-top bg-no-repeat lg:px-20 flex items-center justify-center" style={{ backgroundImage: `url(${_.get(image, "[0].background_image")})` }} ref={ripplesRef}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
      <div className="z-20 flex flex-col items-center gap-y-4 lg:py-24 py-12 px-4 w-full text-center">
        <h1 className="lg:text-6xl text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">Waves of Wonder</h1>
        <p className="lg:text-2xl text-base text-white font-medium opacity-90">Book Your Scenic Ferry Adventure!</p>
        <Link to="https://booking.sailsubham.com/home" className="mt-4 font-bold text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary py-3 px-6 rounded-full shadow-lg flex items-center gap-x-2">
          <ICON_HELPER.ACCOMMODATION_ICON className="text-xl bg-white/20 p-1 rounded-full" />
          Book Ferry Ticket
        </Link>
        <div className="w-full h-auto px-6 mt-52">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
            <h2 className="text-white text-xl lg:text-2xl font-semibold">
              Explore The Top Vacation Packages In <span className="text-primary font-bold">Sri Lanka</span> And <span className="text-primary font-bold">India</span> Today.
            </h2>
            <div className="flex gap-2 mt-4 lg:mt-0">
              <div ref={prevRef} className="cursor-pointer">
                <ICON_HELPER.LEFTFILLED_ARROW className="text-3xl text-white" />
              </div>
              <div ref={nextRef} className="cursor-pointer">
                <ICON_HELPER.RIGHTFILLED_ARROW className="text-3xl text-primary" />
              </div>
              <Link to="/destination" className="bg-white text-primary font-semibold px-3 py-1 rounded hover:bg-black hover:text-white">
                More
              </Link>
            </div>
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={15}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1440: { slidesPerView: 5 },
            }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            loop
            modules={[Navigation]}
            className="mySwiper"
          >
            {travelPackages.map((item) => (
              <SwiperSlide key={item._id} className="bg-transparent group">
                <div onClick={() => handleClick(item._id)} className="relative h-[310px] overflow-hidden bg-cover bg-center cursor-pointer group-hover:scale-105  transition-transform" style={{ backgroundImage: `url(${item.image})` }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent" />
                  <div className="absolute w-full h-auto top-6 left-1/2 -translate-x-1/2 text-center px-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">{item.name}</h3>
                    <div className="w-20 h-[2px] bg-primary mx-auto mb-2" />
                    {item.message_description && (
                      <div className="flex items-start sm:items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                        <MdMessage size={20} className="text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                        <span className="text-sm sm:text-xs font-medium text-gray-800 leading-snug line-clamp-2">{item.message_description}</span>
                      </div>
                    )}
                    <div className="text-xl font-bold text-black flex items-center justify-center gap-3 mt-2">
                      <div className="h-4 w-auto overflow-hidden shadow-sm">
                        <img src={item.country === "india" ? "https://cdn.britannica.com/13/4413-050-98188B5C/Flag-Sri-Lanka.jpg" : "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/330px-Flag_of_India.svg.png"} alt="country-flag" className="w-full h-full object-cover" />
                      </div>
                      <span>
                        {item.country === "india" ? "LKR" : "INR"} {item.discount_price}
                      </span>
                      <div className="h-4 w-auto overflow-hidden shadow-sm">
                        <img src={item.country === "india" ? "https://cdn.britannica.com/13/4413-050-98188B5C/Flag-Sri-Lanka.jpg" : "https://img.freepik.com/premium-vector/flag-india-rectangle-icon-illustration-india-flag-rectangular-flag-standard-size_833685-3618.jpg?semt=ais_hybrid&w=740"} alt="country-flag" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute w-full h-auto bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(item._id);
                      }}
                      className="py-2 px-6 flex items-center gap-1 text-sm font-bold bg-primary group-hover:bg-black text-white rounded-full hover:bg-primary/90 shadow"
                    >
                      View Details <FaChevronRight className="text-sm" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {selectedPackage && (
        <Modal title={`Package Details: ${selectedPackage.package_address}`} open={!!selectedPackage} onCancel={() => setSelectedPackage(null)} footer={null}>
          <div className="space-y-2">
            <p>
              <strong>8+ Persons:</strong> ₹{_.get(selectedPackage, "amount.[0].sevenabove")} / person
            </p>
            <p>
              <strong>4–7 Persons:</strong> ₹{_.get(selectedPackage, "amount.[0].threeabove")} / person
            </p>
            {_.get(selectedPackage, "amount.[0].perperson") && (
              <p>
                <strong>2–3 Persons:</strong> ₹{_.get(selectedPackage, "amount.[0].perperson")} / person
              </p>
            )}
          </div>
        </Modal>
      )}

      <Modal open={open} onCancel={() => setOpen(false)} className="lg:!w-[50%] popup !rounded-none !relative" footer={null} closable={false}>
        <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-8 text-white shadow-2xl space-y-4">
          <h1 className="text-2xl  text-center" dangerouslySetInnerHTML={{ __html: _.get(popData, "[0].pop_message", "No message available") }} />
          <div className="flex justify-between items-center pt-4">
            <div>
              Need Help?{" "}
              <Link to="/contact" className="text-white underline">
                Contact Us
              </Link>
            </div>
            <div className="hidden lg:flex gap-2">
              <button onClick={() => setOpen(false)} className="border border-white py-1 px-4 rounded hover:bg-primary transition">
                Close
              </button>
            </div>
          </div>
        </div>
        <div onClick={() => setOpen(false)} className="absolute top-2 right-2 size-8 bg-primary rounded-full flex items-center justify-center text-white lg:hidden cursor-pointer">
          <ICON_HELPER.CROSS_ICON />
        </div>
      </Modal>
    </div>
  );
};

export default Hero;
