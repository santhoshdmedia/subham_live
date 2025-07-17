// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICON_HELPER } from "../../helper/IconHelper";
import { Card } from "antd";
import { cardData } from "../../helper/customer/data-helper";

const Smblogs = () => {

  return (
    <section className="w-full h-auto px-4 md:px-[6vw]">
      <h1 className="text-2xl md:text-3xl font-pri_head font-semibold pb-6 md:pb-10 text-center md:text-left">
        Inspiration, <span className="text-primary">Guides</span>, Stories
      </h1>
      <div className="gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-4">
          {cardData.slice(0, 4).map((card) => (
            <Link to={`/explore-blogs/${card.id}`} key={card.id}>
              <Card
                hoverable
                className="w-full h-auto hover:scale-105 duration-500"
                cover={
                  <div className="relative overflow-hidden">
                    <img alt="example" src={card.imgSrc} className="w-full h-[200px] object-cover transform transition-transform duration-300 ease-in-out hover:-translate-y-2" />
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                    <div className="absolute top-4 left-4 font-pri_para bg-black bg-opacity-50 text-center text-white font-bold rounded-full px-3 py-2 transition-all duration-300 ease-in-out hover:bg-orange-500 hover:text-white">
                      <p className="text-md">{card.date}</p>
                    </div>
                    <p className="text-[11px] font-pri_head">{card.month}</p>
                  </div>
                }
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <p className="text-gray-500 font-pri_para">
                    By, <span className="underline hover:text-primary">{"Subham"}</span>
                  </p>
                  <div className="flex items-center text-gray-500 mt-2 sm:mt-0">
                    <ICON_HELPER.DOT_ICON />
                    <p className="ml-2 hover:text-primary font-pri_para">{card.blog_name}</p>
                  </div>
                </div>
                <h2 className="text-lg font-semibold font-pri_head mt-2 hover:text-primary line-clamp-2">{card.para}</h2>
                <div className="flex items-center justify-between w-full">
                  <button className="text-primary underline py-2 flex items-center gap-2 font-pri_para">
                    View Post
                    <ICON_HELPER.RIGHT_ARROW_ICON />
                  </button>

                  <span className="text-gray-500 flex items-center gap-1 font-pri_para">
                    <ICON_HELPER.FIRE_ICON />
                    {card.readTime}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center py-10">
        <Link to={`/blogs`} className="rounded-full bg-white border border-primary hover:bg-black hover:text-white hover:border-white text-primary font-semibold px-4 py-2">
          See All Blogs
        </Link>
      </div>
    </section>
  );
};

export default Smblogs;
