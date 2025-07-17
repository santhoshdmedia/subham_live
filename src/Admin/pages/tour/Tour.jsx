// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import AddTour from "./AddTour";
import DefaultHeader from "../customComponents/DeafaultHeader";
import { ICON_HELPER } from "../../../helper/IconHelper";
import { Badge, Card, Form, Image, Spin } from "antd";
import { deleteTour, getTour } from "../../../api";
import {
  ERROR_NOTIFICATION,
  SUCCESS_NOTIFICATION,
} from "../../../helper/admin/notification_helper";
import _ from "lodash";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Tour = () => {
  const navigate = useNavigate();
  const [addStatus, setAddStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [search, setSearch] = useState("");
  const [tour, setTour] = useState([]);
 
  
   const role = useSelector((state) => state.role.value.role);
 
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getTour(search);
      setTour(_.get(result, "data.data", []));
    } catch (err) {
      ERROR_NOTIFICATION(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tourId) => {
    try {
      const result = await deleteTour(tourId);
      SUCCESS_NOTIFICATION(result);
      fetchData();
    } catch (err) {
      ERROR_NOTIFICATION(err);
    }
  };

  const handleUpdate = (tourId) => {
     setId(tourId);
     setAddStatus(true); 
   };

  const handleCancel = () => {
    setAddStatus(false);
    setId(null);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <>
      <Spin spinning={loading}>
        <div className="p-6">
          <DefaultHeader
            pageName={"Tour"}
            icon={<ICON_HELPER.TOUR_ICON />}
            add={true}
            text="Add Tour"
            model={true}
            setAddStatus={setAddStatus}
            setSearch={setSearch}
          />

          {addStatus ? (
            <div className="relative">
              <AddTour
                setAddStatus={setAddStatus}
                setLoading={setLoading}
                fetchData={fetchData}
                id={id}
                setId={setId}
                tour={tour}
              />
              <button
                onClick={handleCancel}
                className="absolute right-0 mt-4 mr-4 bg-gradient-to-r bg-secondary text-white text-center items-center justify-center flex rounded-full px-4 py-2 shadow-lg"
              >
                Go Back
              </button>
            </div>
          ) : (
            <div className="bg-white shadow grid  lg:grid-cols-4 gap-y-4 justify-start gap-x-4 p-2 min-h-screen w-full">
              {tour.map((res, index) => (
                <Badge.Ribbon
                  className="!bg-primary !text-white !text-sm"
                  text={<span className="!text-[12px]">{_.get(res, "invoice_number", "")}</span>}
                  key={index}
                  placement="start"
                >
                  <Card
                    className="!h-fit"
                    hoverable
                    actions={role === "super_admin" ? [
                      <div className="text-primary" onClick={() => handleUpdate(res)}>Update</div>,
                      <div onClick={() => navigate(`/tour-details/${res._id}`)}>View More</div>,
                      <div className="text-secondary" onClick={() => handleDelete(res._id)}>Delete</div>
                    ] : [
                     ]}
                    cover={<Image src={_.get(res, "packages_details[0].package_image", "")} className="!w-[320px] !h-[200px] !object-cover" />}
                  >
                    <Card.Meta
                      title={_.get(res, "packages_details[0].package_name", "")}
                      description={
                        <span className="text-gray-500 text-sm font-semibold">
                          {`Tour from ${moment(res.from_date).format("DD MMM YYYY")} to ${moment(res.to_date).format("DD MMM YYYY")}`}
                        </span>
                      }
                    />
                  </Card>
                </Badge.Ribbon>
              ))}
            </div>
          )}
        </div>
      </Spin>
    </>
  );
};

export default Tour;
