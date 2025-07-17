// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { ICON_HELPER } from "../../../helper/IconHelper";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_HELPER } from "../../../helper/Imagehelper";
import { get_srilanka_packages } from "../../../api";
import _ from "lodash";
import { Clock, Eye } from "lucide-react";
import { GiPriceTag } from "react-icons/gi";
import { MdMessage } from "react-icons/md";
const Destination_india = () => {
  const [travelPackages, setTravelPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const result = await get_srilanka_packages();
        const fetchedPackages = _.get(result, "data.data", []);
        setTravelPackages(fetchedPackages);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setTravelPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = (id) => {
    navigation(`/destination-explore/${id}`);
  };

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="bg-gray-50">
      {/* Banner */}
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px]">
        <img src={IMAGE_HELPER.srilanka} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center px-6 sm:px-12 lg:px-24">
          <div className="text-white space-y-2">
            <p className="flex items-center gap-2 text-sm sm:text-base">
              <Link to="/" className="hover:text-primary ">
                Home
              </Link>
              <ICON_HELPER.RIGHT_ARROW />
              <span className="text-sky-400 font-semibold">Sri Lanka Packages</span>
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold font-pri_head">Sri Lanka Packages</h1>
            <p className="text-sm sm:text-base text-primary font-pri_para">Choose Your Travel Packages!</p>
          </div>
        </div>
      </div>

      {/* Package Section */}
      <section className="w-full px-4 py-8 sm:px-[6vw] lg:py-14">
        {travelPackages.length === 0 ? (
          <div className="w-full h-[400px] flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-pri_head mb-6">
              COMING S<span className="text-primary">OO</span>N
            </h1>
            <Link to="/" className="bg-primary hover:bg-primary/90 transition text-white text-base sm:text-xl px-6 py-3 rounded-lg shadow-md">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {travelPackages.map((item) => (
              <div key={item._id} onClick={() => handleClick(item._id)} className="relative cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden">
                {/* Image */}
                <div className="h-48 overflow-hidden relative">
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
                    <div
                      className="flex flex-row items-start
                              text-gray-600 text-sm font-semibold gap-1"
                    >
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
                        <img src={item.country === "india" ? "https://cdn.britannica.com/13/4413-050-98188B5C/Flag-Sri-Lanka.jpg" : "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/330px-Flag_of_India.svg.png"} alt="country-flag" className="w-full h-full object-cover" />
                      </div>
                      <span>
                        {item.country === "india" ? "LKR" : "INR"} {item.discount_price}
                      </span>
                    </div>
                    <div className="text-xs line-through text-gray-400 font-medium">
                      {item.country === "india" ? "LKR" : "INR"} {item.original_price}
                    </div>
                  </div>

                  {/* View Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(item._id);
                    }}
                    className="w-full mt-2 py-2 text-sm font-semibold bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition flex items-center justify-center gap-2"
                  >
                    <Eye size={16} /> View Details
                  </button>
                </div>

                {/* Discount Badge */}
                {item.original_price > item.discount_price && <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg font-semibold shadow">{Math.round(((item.original_price - item.discount_price) / item.original_price) * 100)}% OFF</div>}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Destination_india;
