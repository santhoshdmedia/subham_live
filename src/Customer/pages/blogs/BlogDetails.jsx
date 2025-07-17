import { IMAGE_HELPER } from "../../../helper/Imagehelper";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { cardData } from "../../../helper/customer/data-helper";
import _ from "lodash";
import { Avatar, Button, Checkbox, Form, Input } from "antd";
import { ICON_HELPER } from "../../../helper/IconHelper";
import News from "../../newsLetter/News";

const BlogDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tags = ["Adventure", "City Tour", "Cruise", "Cultural", "Nature Excursion", "Photography", "Road Trip", "Tourism", "Wildlife"];

  const search = useParams();
  const [singleBlog, setSingleBlog] = useState([]);

  const prepareSingleBlog = () => {
    try {
      setSingleBlog(cardData.filter((res) => res.id === Number(search.id)));
    } catch {
      (" ");
    }
  };

  useEffect(() => {
    prepareSingleBlog();
  }, [search.id]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <>
      <div>
        <div className="relative w-full h-[300px] md:h-[400px]">
          <img src={IMAGE_HELPER.BannerBgImage} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="text-center space-y-2 px-4 md:px-8">
              <p className="flex items-center gap-2 font-pri_para text-white justify-center">
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
                {<ICON_HELPER.RIGHT_ARROW />}
                <span className="font-title text-sky-500"> Blog Details</span>
              </p>
              <h1 className="text-2xl sm:text-3xl text-center text-white font-bold font-pri_head"> {_.get(singleBlog, "[0].title", "")}</h1>
              <p className="text-sm text-center sm:text-base md:text-lg text-primary font-pri_para">For your next adventure!</p>
            </div>
          </div>
        </div>

        <div className="w-full min-h-screen p-4 md:p-20 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[60%]">
            <img className="w-[800px] h-96" src={_.get(singleBlog, "[0].imgSrc", "")} alt="" />
            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center">
                <Avatar size={32} icon={<ICON_HELPER.AVATAR_ICON />} />
                <div className="px-2 font-pri_para flex items-center gap-2">
                  By,
                  <h1 className="font-pri_head text-primary underline">{_.get(singleBlog, "[0].author", "")}</h1>
                </div>
              </div>

              <div className="flex items-center">
                <ul className="flex space-x-4">
                  <li>
                    <span className="flex items-center gap-1 font-pri_para">
                      <ICON_HELPER.FIRE_ICON /> 320 Views |
                    </span>
                  </li>
                  <li>
                    <span className="flex items-center gap-2 font-pri_para">
                      <ICON_HELPER.CLOCK_ICON /> 1 Min Read |
                    </span>
                  </li>
                  <li>
                    <span className="flex items-center gap-2 font-pri_para">
                      <ICON_HELPER.COMMENT_ICON /> (0) Comment
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="leading-loose font-pri_para text-[#787878] pt-2">{_.get(singleBlog, "[0].firstPara", "")}</p>

            <p className="leading-loose font-pri_para text-[#787878]">{_.get(singleBlog, "[0].secondPara", "")}</p>

            <div className="p-4 bg-[#FAF8FB] my-6">
              <div>
                <div className="text-[#FAF8FB] mr-4">
                  <ICON_HELPER.QUOTE_ICON className="p-2 text-5xl border bg-primary rounded-full" />
                </div>
                <div>
                  <p className="leading-loose font-pri_para text-[#787878] pt-1">{_.get(singleBlog, "[0].quotePara", "")}</p>

                  <div className="flex items-center pt-4">
                    <div className="w-12 border-t-2 border-primary mr-3"></div>
                    <p className="text-black font-bold font-pri_head">
                      <p className="font-pri_head">{_.get(singleBlog, "[0].personName", "")}</p>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="font-font-pri_para text-[#787878] leading-loose">{_.get(singleBlog, "[0].thirdPara", "")}</p>

            <img className="pt-10" src={_.get(singleBlog, "[0].imgSrc1", "")} alt="" />

            <div className="">
              <h1 className="text-[32px] font-pri_head font-bold">{_.get(singleBlog, "[0].title2", "")}</h1>
              <p className="pt-6 text-[#787878] font-pri_para leading-loose">{_.get(singleBlog, "[0].para2", "")}</p>
            </div>

            <div className="container mx-auto py-6">
              <div className="flex justify-between items-center border-gray-300 pb-4">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-primary transition-all ease-in-out hover:text-white font-pri_para rounded-lg">Cruise</button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-primary transition-all ease-in-out hover:text-white font-pri_para rounded-lg">Cultural</button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-primary transition-all ease-in-out hover:text-white font-pri_para rounded-lg">Tourism</button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-primary transition-all ease-in-out hover:text-white font-pri_para rounded-lg">Wildlife</button>
                </div>

                <div className="flex items-center space-x-6">
                  <span className="text-gray-600">Share On:</span>
                  <Link to="/" className="text-gray-600 hover:text-prim">
                    <ICON_HELPER.FACEBOOK_ICON />
                  </Link>
                  <Link to="/" className="text-gray-600 hover:text-prim">
                    <ICON_HELPER.TWITTER_ICON />
                  </Link>
                  <Link to="/" className="text-gray-600 hover:text-prim">
                    <ICON_HELPER.PINTEREST_ICON />
                  </Link>
                  <Link to="/" className="text-gray-600 hover:text-prim">
                    <ICON_HELPER.INSTAGRAM_ICON />
                  </Link>
                </div>
              </div>

              {/* <div className="flex items-center pt-4">
                <button className="border p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="pl-2">
                  <span className="block text-gray-500 font-pri_para">Prev Post</span>
                  <Link to={_.get(singleBlog, "[0].title","")} className="text-black hover:text-gray-700 font-pri_head">
                    Wine Country Escapes: Vineyard Tours for Connoisseurs
                  </Link>
                </div>
              </div>
              <div className="pt-6">
                <h1 className="text-[30px] font-pri_head">Leave a comment:</h1>
              </div>
              <div className="p-6 bg-gray-200 shadow-lg rounded">
                <p className="text-sm text-[#787878] font-pri_para py-4">Your email address will not be published.</p>
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <Form.Item className="font-bold" label={<span style={{ fontFamily: "Rubik, sans-serif" }}>Your Name</span>} name="name" rules={[{ required: true, message: "Please enter your name" }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item className="font-bold" label={<span style={{ fontFamily: "Rubik, sans-serif" }}>Your Email</span>} name="email" rules={[{ required: true, message: "Please enter your email" }]}>
                    <Input type="email" />
                  </Form.Item>
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>
                      <p className="text-sm text-[#787878] font-pri_para">Save my name, email, and website in this browser for the next time I comment.</p>
                    </Checkbox>
                  </Form.Item>
                  <Form.Item className="font-bold" label={<span style={{ fontFamily: "Rubik, sans-serif" }}>Your Message</span>} name="message" rules={[{ required: true, message: "Please enter your message" }]}>
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item>
                    <Button type="bg-primary" className="bg-primary text-white hover:bg-white hover:text-black transition-all delay-300 ease-in-out px-5 py-5 text-base font-pri_head font-semibold" htmlType="submit">
                      Post Comment
                    </Button>
                  </Form.Item>
                </Form>
              </div> */}
            </div>
          </div>

          <div className="w-full md:w-[40%] min-h-screen shadow-md px-4">
            <h1 className="pt-16 text-xl font-semibold underline underline-offset-4 font-pri_head">Search Here</h1>

            <div className="pt-6">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <input type="text" placeholder="Search Here" className="px-4 py-2 w-full focus:outline-none" />
                <button className="bg-primary px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.9-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                  </svg>
                </button>
              </div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold pt-4 underline underline-offset-4 font-pri_head">Categories</h2>
                <ul className="pt-4">
                  {[
                    { name: "Adventure Safari", count: 3 },
                    { name: "City Discovery", count: 3 },
                    { name: "Cruise Voyage", count: 5 },
                    { name: "Cultural Exploration", count: 4 },
                    { name: "Educational Journey", count: 5 },
                    { name: "Luxury Retreat", count: 7 },
                    { name: "Nature Excursion", count: 7 },
                    { name: "Photography Expedition", count: 2 },
                  ].map((category) => (
                    <li key={category.name} className="flex justify-between items-center py-1">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="category" className="form-radio" />
                        <span className="font-pri_head">{category.name}</span>
                      </label>
                      <span>({category.count})</span>
                    </li>
                  ))}
                </ul>
              </div>
              <h2 className="text-xl font-pri_head font-semibold underline underline-offset-4 mb-4 pt-6">Recent Post</h2>

              <ul>
                {cardData.map((post, index) => (
                  <li key={index} className="flex mb-4">
                    <img src={post.imgSrc} className="w-20 h-20 object-cover rounded-md mr-4" />

                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-gray-500 leading-loose">{post.date}</p>
                      <Link to={`/explore-blogs/${post.id}`} className="w-52 text-base font-medium font-pri_head text-gray-900 leading-tight hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <h2 className="text-xl font-semibold underline underline-offset-4 mb-4 pt-6 font-pri_head">Tags</h2>

            <div className="flex flex-wrap gap-3 w-56">
              {tags.map((tag, index) => (
                <button key={index} className="font-pri_para border border-gray-300 rounded-md px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
