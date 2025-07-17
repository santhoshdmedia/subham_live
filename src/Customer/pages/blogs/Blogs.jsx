import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Pagination } from "antd";
import { IMAGE_HELPER } from "../../../helper/Imagehelper";
import { ICON_HELPER } from "../../../helper/IconHelper";
import News from "../../newsLetter/News";
import _ from "lodash";
import { cardData } from "../../../helper/customer/data-helper";

const Blogs = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  },[]);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // const result = await getAllblogs();
        // eslint-disable-next-line no-undef
        const fetchedBlogs = _.get(result, "data.data", []);
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCards = cardData.slice(indexOfFirstItem, indexOfLastItem) || [];

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="relative w-full h-[300px] md:h-[400px]">
        <img src={IMAGE_HELPER.BlogsBgImage} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-center space-y-2 px-4 md:px-8">
            <p className="flex items-center gap-2 font-pri_para text-white justify-center">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
              {<ICON_HELPER.RIGHT_ARROW />}
              <span className="font-title text-sky-500">Blogs</span>
            </p>
            <h1 className="text-2xl sm:text-3xl text-center text-white font-bold font-pri_head">Blogs</h1>
            <p className="text-sm text-center sm:text-base md:text-lg text-primary font-pri_para">For your next adventure!</p>
          </div>
        </div>
      </div>

      <div className="px-[6vw] py-10">
        <h1 className="text-2xl md:text-3xl font-pri_head font-semibold pb-6 md:pb-10 text-center md:text-left">
          Inspiration, <span className="text-primary">Guides</span>, Stories
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-4">
          {currentCards.map((card) => (
            <Link to={`/explore-blogs/${card.id}`} key={card.id}>
              <Card
                hoverable
                className="w-full h-auto"
                cover={
                  <div className="relative overflow-hidden">
                    <img alt="example" src={card.imgSrc} className="w-full h-[200px] object-cover transform transition-transform duration-300 ease-in-out hover:-translate-y-2" />
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                    <div className="absolute top-4 left-4 font-pri_para bg-black bg-opacity-50 text-center text-white font-bold rounded-full px-3 py-2 transition-all duration-300 ease-in-out hover:bg-orange-500 hover:text-white">
                      <p className="text-md">{card.date}</p>
                    </div>
                    {/* <p className="text-[11px] font-pri_head">{card.month}</p> */}
                  </div>
                }
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <p className="text-gray-500 font-pri_para">
                    By, <span className="underline hover:text-primary">SailSubham Team</span>
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
        <div className="flex justify-center mt-10 "></div>
        <Pagination current={currentPage} pageSize={itemsPerPage} total={blogs.length} onChange={handleChangePage} showSizeChanger={false} className="flex justify-center my-10 " />
      </div>
    </div>
  );
};

export default Blogs;
