import { Button, Drawer, Spin } from "antd";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import DefaultHeader from "../customComponents/DeafaultHeader";
import AddBlogs from "./AddBlogs";
import { deleteblogs, getblogs } from "../../../api";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../../helper/admin/notification_helper";
import _ from "lodash";
import moment from "moment";
import TitleHelper from "../../../component/TitleHelper";
import { ICON_HELPER } from "../../../helper/IconHelper";

const Blogs = () => {
  const [addStatus, setAddStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getblogs(search);
      const blogs = _.get(result, "data.data", []);
      setBlogData(blogs);
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      const result = await deleteblogs(blogId);
      SUCCESS_NOTIFICATION(result);
      fetchData();
    } catch (err) {
      ERROR_NOTIFICATION(err);
    }
  };

  const handleUpdate = (blogId) => {
    setId(blogId);
    setAddStatus(true);
  };

  const handleCancel = () => {
    setAddStatus(false);
    setId(null);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <div className="p-6">
        <TitleHelper title={"Blogs"} />

        <DefaultHeader icon={<ICON_HELPER.BLOGS_ICON />} add={true} model={true} setAddStatus={setAddStatus} addStatus={addStatus} setSearch={setSearch} text="Add Blogs" pageName="Blogs" />

        <Drawer onClose={handleCancel} width={"100%"} open={addStatus} title={`${id ? "Update" : "Add"} Blog`}>
          <AddBlogs setAddStatus={setAddStatus} setLoading={setLoading} fetchData={fetchData} id={id} blogData={blogData} setId={setId} />
        </Drawer>

        <Spin spinning={loading}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogData.length > 0 ? (
              blogData.map((blog) => (
                <div key={blog._id} className="bg-white rounded-lg shadow-lg  overflow-hidden">
                  <img src={blog.blog_image} alt={blog.blog_name} className="w-full h-48 object-cover" />

                  <div className="p-4">
                    <p className="text-right text-gray-400 text-sm mb-2">{moment(blog.createdAt).format("MMM Do YY")}</p>

                    <h3 className="text-primary inline-block text-sm font-bold uppercase bg-secondary px-3 py-1 rounded-full ">{blog.blog_name}</h3>

                    <p className="text-gray-700 mt-2 line-clamp-3">{blog.blog_short_description}</p>
                    <p className="text-secondary font-bold text-sm p-2 text-right">By {blog.blog_author_name}</p>

                    <div className="mt-4 flex justify-between">
                      <Button className="!bg-green-600 text-white hover:bg-green-700" onClick={() => handleUpdate(blog)}>
                        Edit
                      </Button>

                      <Button className="border border-red-600 text-red-600 hover:bg-green-600 hover:text-white" onClick={() => handleDelete(blog._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No blogs found.</p>
            )}
          </div>
        </Spin>
      </div>
    </>
  );
};

export default Blogs;
