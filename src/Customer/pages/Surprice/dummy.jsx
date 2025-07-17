import React, { useRef, useState, useEffect } from "react";
import "./surprice.css";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import image_1 from "../../../assets/surprice/New folder/kandhasamy temple.jpg";
import image_2 from "../../../assets/surprice/New folder/img_2.webp";
import image_3 from "../../../assets/surprice/New folder/img_3.webp";
import image_4 from "../../../assets/surprice/New folder/img_4.webp";
import image_5 from "../../../assets/surprice/New folder/img_5.webp";
import vasan from "../../../assets/surprice/New folder/vasan/vasan.webp";
import { FaInstagram } from "react-icons/fa6";
import { Clock, Eye } from "lucide-react";
import { GiPriceTag } from "react-icons/gi";
import { MdMessage,MdOutlineFeaturedVideo } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const images = [
  {
    src: image_1,
    name: "The Humble Beginnings (948 AD)",
    description:
      "Long ago, in the year 948 AD, a sacred temple was first built in Nallur, a land that would one day become the heart of the Jaffna Kingdom. Though small at first, this temple carried the blessings of the divine.",
      
  },
  {
    src: image_2,
    name: "The Rise to Glory (13th Century)",
    description:
      "Centuries passed, and the temple grew in fame when Minister Puvaneka Vaahu, a loyal servant of King Kalinga Maha of Jaffna, rebuilt it into a grand structure. But destiny had more in store—later, Prince Sapumal Kumaraya, the adopted son of the King of Kotte, rebuilt it once more, turning Nallur into a mighty capital city.",
      

  },
  {
    src: image_3,
    name: "The Fortress of Faith (Jaffna Kingdom Era)",
    description:
      "Nallur was no ordinary city—it was a fortress of devotion and power. Nallur was a special city - both holy and strong. It had four big gates with temples. Outside, markets bustled with people. Inside, nobles lived near the grand temple. The temple had tall towers and sacred spaces where priests prayed, people washed in holy water, and the main shrine shone with god's power.",
      
  },
  {
    src: image_4,
    name: " The Fall and Destruction (1624 AD)",
    description:
      "But darkness came when Portuguese invaders stormed Nallur in 1624 AD. They burned the temple, crushing its sacred idols, and built churches over its ruins. The original temple’s location was lost beneath St. James Church, and even its last remaining Sivalingam was destroyed in later wars.",
  },
  {
    src: image_5,
    name: "The Rebirth and Golden Age (1734 AD - Present)",
    description:
      "Yet, faith cannot be erased. In 1734 AD, a man named Don Juan rebuilt the temple once more. But its true revival came in the 1890s, when Arulmuga Maapaana Mudaliyar took charge. He restored its glory, bringing back its golden splendor.",
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
    description: "Nallur Kandhaswamy Temple, located in Jaffna, Sri Lanka, is one of the most revered Hindu temples dedicated to Lord Murugan (Skanda), the god of war and wisdom...",
    route:"https://sailsubham.com/destination-explore/686e676356765efca613ddca"
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
    description: "Nallur Kandhaswamy Temple, located in Jaffna, Sri Lanka, is one of the most revered Hindu temples dedicated to Lord Murugan (Skanda), the god of war and wisdom...",
    route:"https://sailsubham.com/destination-explore/686e72af56765efca6141ad6"
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
    description: "Nallur Kandhaswamy Temple, located in Jaffna, Sri Lanka, is one of the most revered Hindu temples dedicated to Lord Murugan (Skanda), the god of war and wisdom...",
    route:"https://sailsubham.com/destination-explore/686f580956765efca6161a4d"

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
    description: "Nallur Kandhaswamy Temple, located in Jaffna, Sri Lanka, is one of the most revered Hindu temples dedicated to Lord Murugan (Skanda), the god of war and wisdom...",
    route:"https://sailsubham.com/destination-explore/686f6b8156765efca61692a5"
  }
];

const instagraminfo=[
  {
  logo:Eye,
  content:"Views",
  count:"1M"
},
  {
  logo:MdOutlineFeaturedVideo,
  content:"post",
  count:"407"
},
  {
  logo:CgProfile,
  content:"Followers",
  count:"48.9K"
},
]

export const ImageGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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
      <div className="fixed bottom-0 left-0 lg:bottom-4  z-10 w-full px-5 ">
        {/* Mobile view - horizontal scroll */}
        <div className="md:hidden w-full  px-4 overflow-x-auto">
          <div 
            ref={packagesContainerRef}
            className="flex gap-6 w-max"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: '10px',
            }}
          >
            {travelPackages.map((item, index) => (
              <div 
                key={index} 
                onClick={() => handleClick(index)}
                className="flex-shrink-0 w-[calc(100vw-5rem)] gap-6 relative cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group mx-5"
                style={{
                  scrollSnapAlign: 'start',
                }}
              >
                {/* Image */}
                <div className="lg:h-48 rounded-tr-2xl rounded-tl-2xl  h-32 overflow-hidden relative ">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  {item.duration && (
                    <div className="absolute bottom-2 right-2 flex items-center bg-white py-1 px-2 rounded font-semibold text-gray-500 text-sm gap-1">
                      <Clock size={14} />
                      <span className="text-md lg:text-lg">{item.duration}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="">
                    <h2 className="lg:text-lg text-md  font-semibold text-gray-800 line-clamp-1">{item.name}</h2>
                  </div>

                  {item.message_description && (
                    <div className="flex flex-row items-start text-gray-600 text-sm font-semibold gap-1 ">
                      <div className="mt-1">
                        <MdMessage size={14} className="mt-0.5" />
                      </div>
                      <span>{item.message_description}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <GiPriceTag size={16} className="text-primary" />
                    <div className="flex items-center gap-1 text-primary lg:text-lg text-md font-bold">
                      <div className="h-4 w-auto overflow-hidden shadow-sm">
                        <img src="https://cdn.britannica.com/13/4413-050-98188B5C/Flag-Sri-Lanka.jpg" alt="country-flag" className="w-full h-full object-cover" />
                      </div>
                      <span>I {item.discount_price}</span>
                    </div>
                    <div className="text-xs line-through text-gray-400 font-medium">
                      I {item.original_price}
                    </div>
                  </div>

                  {/* View Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(index);
                    }}
                    className="w-full mt-2 py-2 text-xs lg:text-sm font-semibold bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition flex items-center justify-center gap-2"
                  >
                    <Eye size={16} /> View Details
                  </button>
                </div>

                {/* Discount Badge */}
                {item.original_price > item.discount_price && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg font-semibold shadow">
                    {Math.round(((item.original_price - item.discount_price) / item.original_price) * 100)}% OFF
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop view - normal grid */}
        <div className="hidden md:grid grid-cols-4 gap-6 w-full">
          {travelPackages.map((item, index) => (
            <div 
              key={index} 
              onClick={() => handleClick(index)}
              className="relative cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden relative rounded-tr-2xl rounded-tl-2xl">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                {item.duration && (
                  <div className="absolute bottom-2 right-2 flex items-center bg-white py-1 px-2 rounded font-semibold text-gray-500 text-sm gap-1">
                    <Clock size={14} />
                    <span>{item.duration}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <div className="">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.name}</h2>
                </div>

                {item.message_description && (
                  <div className="flex flex-row items-start text-gray-600 text-sm font-semibold gap-1">
                    <div className="mt-1">
                      <MdMessage size={14} className="mt-0.5" />
                    </div>
                    <span>{item.message_description}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <GiPriceTag size={16} className="text-primary" />
                  <div className="flex items-center gap-1 text-primary text-lg font-bold">
                    <div className="h-4 w-auto overflow-hidden shadow-sm">
                      <img src="https://cdn.britannica.com/13/4413-050-98188B5C/Flag-Sri-Lanka.jpg" alt="country-flag" className="w-full h-full object-cover" />
                    </div>
                    <span>I {item.discount_price}</span>
                  </div>
                  <div className="text-xs line-through text-gray-400 font-medium">
                    I {item.original_price}
                  </div>
                </div>

                {/* View Button */}
                <Link to={item.route}>
                <button
                  
                  className="w-full mt-2 py-2 text-sm font-semibold bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition flex items-center justify-center gap-2"
                >
                  <Eye size={16} /> View Details
                </button>
                </Link>
              </div>

              {/* Discount Badge */}
              {item.original_price > item.discount_price && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg font-semibold shadow">
                  {Math.round(((item.original_price - item.discount_price) / item.original_price) * 100)}% OFF
                </div>
              )}
            </div>
          ))}
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

            {/* Content Overlay - Adjusted for mobile */}
            <div className="absolute top-[7rem] lg:top-[10vh] md:top-[35rem] left-8   md:left-auto flex items-center justify-center">
              <motion.div
                className=" px-0 md:px-8 mr-6 lg:mr-0 "
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.h2
                  className="text-3xl  lg:text-4xl font-bold text-[#f0f0f0] text-center lg:text-left  lg:max-w-[750px] max-w-fit mb-4 md:mb-6"
                  initial={{ letterSpacing: "0.5em", opacity: 0 }}
                  animate={{ letterSpacing: "0.1em", opacity: 1 }}
                  transition={{ duration: 1.2 }}
                >
                  {images[activeIndex].name}
                </motion.h2>
                <motion.p
                  className=" md:text-xl text-center lg:text-left lg:text-xl text-white/90 max-w-[750px] mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {images[activeIndex].description}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};