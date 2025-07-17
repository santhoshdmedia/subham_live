// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { IMAGE_HELPER } from "../../helper/Imagehelper";
import { ICON_HELPER } from "../../helper/IconHelper";
import { subscribe } from "../../api";
import {
  ERROR_NOTIFICATION,
  SUCCESS_NOTIFICATION,
} from "../../helper/admin/notification_helper";

const News = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const values = { email };
      const result = await subscribe(values);

      SUCCESS_NOTIFICATION(result);
      setEmail("");
    } catch (error) {
      ERROR_NOTIFICATION(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetchData();
  };

  return (
    <div className="relative center_div">
      <section className="absolute z-10 w-[85%] h-[300px] bg-primary flex flex-col lg:flex-row rounded-2xl overflow-hidden justify-center shadow-lg mx-auto p-5">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${IMAGE_HELPER.news})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="flex flex-col justify-center items-center w-full text-center px-5 relative z-10">
          <h1 className="text-4xl md:text-5xl font-pri_head font-bold mb-2 text-white">
            Join The Newsletter
          </h1>
          <p className="text-sm md:text-base font-pri_head mb-4 text-white">
            To receive our best monthly deals
          </p>

          <form onSubmit={handleSubscribe} className="flex w-full max-w-[450px] mx-auto">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow p-3 border border-primary rounded-l-lg focus:outline-none text-sm sm:text-base"
              disabled={loading}
              required
            />
            <button
              type="submit" // Ensure the button submits the form
              className={`bg-primary px-4 flex items-center justify-center rounded-r-lg text-sm sm:text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? <span>Loading...</span> : <ICON_HELPER.BUTTON_RIGHTARROW className="text-[24px] text-white" />}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default News;
