import React, { useRef, useState, useEffect } from "react";
import "./surprice.css";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import image_1 from "../../../assets/surprice/slides/image_1.jpg";
import image_2 from "../../../assets/surprice/slides/image_2.jpg";
import image_3 from "../../../assets/surprice/slides/image_3.jpg";
import image_4 from "../../../assets/surprice/slides/image_4.jpg";
import image_5 from "../../../assets/surprice/slides/image_5.jpg";
import { FaInstagram } from "react-icons/fa6";
import { Clock, Eye } from "lucide-react";
import { GiPriceTag } from "react-icons/gi";
import { MdMessage, MdOutlineFeaturedVideo } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const images = [
  {
    src: image_1,
    title: "Introduction to the Nallur Kandaswamy Kovil Annual Festival",
    description:
      "A 25-day spiritual festival starting with flag hoisting (Kodietram) using sacred cloth from Saddanathar Temple. Features Yāgams, Abishekams, and special poojas in the sanctum, inspiring devotees worldwide.",
  },
  {
    src: image_2,
    title: "Key Events and Rituals",
    description: [
      "Manjam: Divine procession",
      "Thirukkarthikai: Night of lamps",
      "Kailasavahanam: Mountain journey",
      "Velvimanam: Spear procession",
      "Peacock feather worship",
      "Silver chariot procession",
      "Ther Thiruvila: Grand chariot festival with devotees pulling together",
    ],
  },
  {
    src: image_3,
    title: "Symbolism and Conclusion",
    description: [
      "Theertham: Water ceremony",
      "Tiru Kalyanam: Symbolic wedding",
      "Kodi irrakkam: Flag lowering",
      "Represents creation, preservation, and destruction",
    ],
  },
  {
    src: image_4,
    title: "Devotional Practices",
    description:
      "Lord Muruga paraded on silver peacock, swan, cobra, and green peacock vehicles to chants of 'Aro Hara', symbolizing unity. Attracts global devotees beyond ethnic and religious boundaries.",
  },
  {
    src: image_5,
    title: "Temple History",
    description:
      "Built in 15th century by Sanpaha Perumal (son of Kotte's king) after conquering Jaffna. Became a symbol of Hindu devotion and Jaffna's heritage.",
  },
];
const travelPackages = [
  {
    name: "BATCH-1 (VAIBAVAM)",
    image: "https://msmwebfiles.s3.amazonaws.com/1752068189731.jpg",
    original_price: 28000,
    discount_price: 22500,
    message_description: "28 July – 31 July (Devotional Yatra) ",
    duration: "3 Nights / 4 Days",
    location: "Jaffna",
    contact: "+91 9087143535",
    description:
      "Nallur Kandhaswamy Temple, located in Jaffna, Sri Lanka, is one of the most revered Hindu temples dedicated to Lord Murugan (Skanda), the god of war and wisdom...",
    route:
      "https://sailsubham.com/destination-explore/686e676356765efca613ddca",
  },
  {
    name: "BATCH-2 (VAIBAVAM)",
    image: "https://msmwebfiles.s3.amazonaws.com/1752210445320.jpg",
    original_price: 30000,
    discount_price: 25000,
    message_description: "15 Aug – 18 Aug (Devotional Yatra) ",
    duration: "3 Nights / 4 Days",
    location: "Jaffna",
    contact: "+91 9087143535",
    description:
      "Nallur Kandhaswamy Temple, located in Jaffna, Sri Lanka, is one of the most revered Hindu temples dedicated to Lord Murugan (Skanda), the god of war and wisdom...",
    route:
      "https://sailsubham.com/destination-explore/686e72af56765efca6141ad6",
  },
  {
    name: "BATCH-3 (VAIBAVAM)",
    image: "https://msmwebfiles.s3.amazonaws.com/1752215724835.jpg",
    original_price: 28000,
    discount_price: 22500,
    message_description: "18 Aug – 21 Aug (Devotional Yatra) ",
    duration: "3 Nights / 4 Days",
    location: "Jaffna",
    contact: "+91 9087143535",
    description:
      "Nallur Kandhaswamy Temple, located in Jaffna, Sri Lanka, is one of the most revered Hindu temples dedicated to Lord Murugan (Skanda), the god of war and wisdom...",
    route:
      "https://sailsubham.com/destination-explore/686f580956765efca6161a4d",
  },
  {
    name: "BATCH-4 (VAIBAVAM)",
    image: "https://msmwebfiles.s3.amazonaws.com/1752215696955.jpg",
    original_price: 28000,
    discount_price: 22500,
    message_description: "22 Aug – 25 Aug (Devotional Yatra) ",
    duration: "3 Nights / 4 Days",
    location: "Jaffna",
    contact: "+91 9087143535",
    description:
      "Nallur Kandhaswamy Temple, located in Jaffna, Sri Lanka, is one of the most revered Hindu temples dedicated to Lord Murugan (Skanda), the god of war and wisdom...",
    route:
      "https://sailsubham.com/destination-explore/686f6b8156765efca61692a5",
  },
];

const instagraminfo = [
  {
    logo: Eye,
    content: "Views",
    count: "1M",
  },
  {
    logo: MdOutlineFeaturedVideo,
    content: "post",
    count: "407",
  },
  {
    logo: CgProfile,
    content: "Followers",
    count: "48.9K",
  },
];

const Vasan = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const containerRef = useRef(null);
  const packagesContainerRef = useRef(null);
  const animationTimeoutRef = useRef(null);

  // Handle smooth scroll to top when image changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);
  useEffect(() => {
    const container = packagesContainerRef.current;

    const handleScroll = () => {
      if (container) {
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollPackages = (scrollOffset) => {
    if (packagesContainerRef.current) {
      packagesContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  const handleWheel = (e) => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (e.deltaY > 0) {
      // Scroll down - next image
      setActiveIndex((prev) => Math.min(prev + 1, images.length - 1));
    } else {
      // Scroll up - previous image
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }

    // Reset animation lock after transition completes
    clearTimeout(animationTimeoutRef.current);
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Match this with your animation duration
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      clearTimeout(animationTimeoutRef.current);
    };
  }, []);

  const handleClick = (id) => {
    // Handle package click if needed
    console.log("Package clicked:", id);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Influencer Content Section - Hidden on mobile */}
      <div className=" md:block fixed top-[1.5rem] right-[-38px] lg:top-[3rem] lg:right-2 w-[200px] h-[80%] !z-20 flex flex-col items-center overflow-hidden">
        {/* Profile container with glow effect */}
        <div className="relative mt-12 mb-6 group">
          <div className="absolute w-[110px] h-[110px] lg:w-[170px] lg:h-[170px] rounded-full z-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 group-hover:bg-white/40 transition-all duration-500"></div>
          <div className="absolute w-[120px] h-[120px] lg:w-[190px] lg:h-[190px] rounded-full z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 group-hover:bg-white/20 transition-all duration-700"></div>
          <div className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] mx-auto rounded-full influenser__profile overflow-hidden !z-10 relative border-4 border-white shadow-lg transform group-hover:scale-105 transition-transform duration-300">
            {/* Profile image would go here */}
          </div>
        </div>
      </div>

      {/* Package info - Responsive layout */}
      <div className="fixed bottom-0 left-0 lg:bottom-4 z-10 w-full px-5">
        {/* Horizontal scroll for both mobile and desktop */}
        <div className="w-full px-4 overflow-x-auto">
          <div
            ref={packagesContainerRef}
            className="flex gap-6 w-max"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              paddingBottom: "10px",
            }}
          >
            {travelPackages.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className="flex-shrink-0 w-[calc(100vw-5rem)] md:w-[32rem] gap-6 relative cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group "
                style={{
                  scrollSnapAlign: "start",
                }}
              >
                {/* Flex row layout */}
                <div className="flex flex-row h-full">
                  {/* Image on left */}
                  <div className="w-[60%]  rounded-l-2xl overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {item.duration && (
                      <div className="absolute bottom-0 right-0 flex items-center bg-white py-1 px-2 rounded-none font-semibold text-gray-500 text-sm gap-1 w-full">
                        <Clock size={14} />
                        <span className="text-xs md:text-sm">
                          {item.duration}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content on right */}
                  <div className="w-[100%] p-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div>
                        <h2 className="text-md md:text-lg font-semibold text-gray-800 line-clamp-1">
                          {item.name}
                        </h2>
                      </div>

                      {item.message_description && (
                        <div className="flex flex-row items-start text-gray-600 text-xs md:text-sm font-semibold gap-1">
                          <div className="mt-1">
                            <MdMessage size={14} className="mt-0.5" />
                          </div>
                          <span className="line-clamp-2">
                            {item.message_description}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <GiPriceTag size={16} className="text-primary" />
                        <div className="flex items-center gap-1 text-primary text-md md:text-lg font-bold">
                          <div className="h-4 w-auto overflow-hidden shadow-sm">
                            <img
                              src="https://cdn.britannica.com/13/4413-050-98188B5C/Flag-Sri-Lanka.jpg"
                              alt="country-flag"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span>I {item.discount_price}</span>
                        </div>
                        <div className="text-xs line-through text-gray-400 font-medium">
                          I {item.original_price}
                        </div>
                      </div>
                    </div>

                    {/* View Button */}
                    <Link to={item.route} className="mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick(index);
                        }}
                        className="w-full py-2 text-xs md:text-sm font-semibold bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition flex items-center justify-center gap-2"
                      >
                        <Eye size={16} /> View Details
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Discount Badge */}
                {item.original_price > item.discount_price && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg font-semibold shadow">
                    {Math.round(
                      ((item.original_price - item.discount_price) /
                        item.original_price) *
                        100
                    )}
                    % OFF
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-4  lg:right-8 top-[16rem] lg:top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-white scale-125" : "bg-white/30"
            }`}
            disabled={isAnimating}
          />
        ))}
      </div>

      {/* Main Gallery Container */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-screen w-full relative snap-start"
          >
            {/* Background Image with parallax effect */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.img
                src={images[activeIndex].src}
                alt={images[activeIndex].name}
                className="w-full h-full object-cover object-center"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>

            {/* Content Overlay */}
            <div className="absolute lg:top-[15rem] top-[8rem] lg:left-[10rem] flex items-center justify-center px-4 md:px-8">
              <motion.div
                className="max-w-4xl w-full "
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left mb-4 md:mb-6 text-[#f5f5f5] drop-shadow"
                  initial={{
                    letterSpacing: "0.5em",
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    letterSpacing: "0.05em",
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                  }}
                >
                  {images[activeIndex].title}
                </motion.h2>

                <motion.div
                  className="text-white/90 text-base md:text-lg lg:text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {Array.isArray(images[activeIndex].description) ? (
                    <ul className="space-y-2 list-disc pl-5">
                      {images[activeIndex].description.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{images[activeIndex].description}</p>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Vasan