import React, { useRef, useState, useEffect } from "react";
import "./surprice.css";
import { motion, AnimatePresence } from "framer-motion";
import image_1 from "../../assets/surprice/slides/image_1.jpg";
import image_2 from "../../assets/surprice/slides/image_2.jpg";
import image_3 from "../../assets/surprice/slides/image_3.jpg";
import image_4 from "../../assets/surprice/slides/image_4.jpg";
import image_5 from "../../assets/surprice/slides/image_5.jpg";
import { FaInstagram } from "react-icons/fa6";
import { Clock, Eye, ChevronLeft, ChevronRight } from "lucide-react";
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

const Vasan = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const packagesContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showPackageNav, setShowPackageNav] = useState(true);

  // Handle scroll position for package navigation
  const handleScroll = () => {
    if (packagesContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = packagesContainerRef.current;
      setScrollPosition(scrollLeft);
    }
  };

  // Check if we can scroll left or right
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = () => {
    if (!packagesContainerRef.current) return false;
    const { scrollLeft, scrollWidth, clientWidth } = packagesContainerRef.current;
    return scrollLeft < scrollWidth - clientWidth - 1;
  };

  // Scroll packages horizontally
  const scrollPackages = (direction) => {
    if (!packagesContainerRef.current) return;
    
    const container = packagesContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Auto-hide package navigation after inactivity
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowPackageNav(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [scrollPosition]);

  // Handle wheel navigation for main images
  const handleWheel = (e) => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (e.deltaY > 0) {
      setActiveIndex(prev => Math.min(prev + 1, images.length - 1));
    } else {
      setActiveIndex(prev => Math.max(prev - 1, 0));
    }

    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
    
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
      {/* Main Gallery Container */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="h-screen w-full relative snap-start"
          >
            {/* Background Image */}
            <motion.div className="absolute inset-0 overflow-hidden">
              <motion.img
                src={images[activeIndex].src}
                alt=""
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
              />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            {/* Content */}
            <div className="absolute top-[8rem] lg:top-[15rem] left-0 right-0 px-4 md:px-8 lg:left-[10rem]">
              <motion.div
                className="max-w-4xl"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                  {images[activeIndex].title}
                </motion.h2>
                <motion.div className="text-white/90 text-base md:text-lg lg:text-xl">
                  {Array.isArray(images[activeIndex].description) ? (
                    <ul className="space-y-2 list-disc pl-5">
                      {images[activeIndex].description.map((item, i) => (
                        <li key={i}>{item}</li>
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

      {/* Package Navigation */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-[990] px-1"
        onMouseEnter={() => setShowPackageNav(true)}
        // onMouseLeave={() => setShowPackageNav(false)}
      >
        <div className="relative">
          {/* Navigation Arrows */}
          <div className={`flex justify-between absolute -top-[-80px] left-[-0px] right-0 transition-opacity duration-300 ${showPackageNav ? 'opacity-100' : 'opacity-0'} z-[999]`}>
            <button
              onClick={() => scrollPackages('left')}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full bg-white shadow-lg hover:bg-white transition ${
                !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" />
            </button>
            <button
              onClick={() => scrollPackages('right')}
              disabled={!canScrollRight()}
              className={`p-2 rounded-full bg-white shadow-lg hover:bg-white transition ${
                !canScrollRight() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ChevronRight className="h-5 w-5 text-gray-800" />
            </button>
          </div>

          {/* Packages Carousel */}
          <div
            ref={packagesContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 packages-container"
          >
            {travelPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex-shrink-0 w-[calc(100vw-5rem)] md:w-[32rem] bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="w-full md:w-1/2 h-48 md:h-auto relative">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <div className="flex items-center text-white text-sm">
                        <Clock className="mr-1" size={14} />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{pkg.name}</h3>
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <MdMessage className="mr-1" size={14} />
                        <span>{pkg.message_description}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center gap-2">
                        <GiPriceTag className="text-primary" size={16} />
                        <span className="text-primary font-bold">
                          I {pkg.discount_price}
                        </span>
                        <span className="text-xs line-through text-gray-400">
                          I {pkg.original_price}
                        </span>
                      </div>
                      <Link to={pkg.route} className="block mt-3">
                        <button className="w-full py-2 bg-primary text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1">
                          <Eye size={16} /> View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Navigation Dots */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10 flex flex-col space-y-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === activeIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Vasan;