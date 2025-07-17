/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { getSingle_booking } from '../../../api';
import _ from 'lodash';

const Mybooking = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const [bookingdata, setbookingdata] = useState([]);

    const fetchBookingData = async () => {
        try {
          const result = await getSingle_booking();
          const bookingDatas = _.get(result, "data.data");
          setbookingdata(bookingDatas);
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        fetchBookingData();
      }, []);
  return (
    <div className='p-5'>
           <div className="overflow-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg">
            <thead className="bg-primary text-white">
              <tr>
                <th className="border border-gray-300 p-4">Booking Date</th>
                <th className="border border-gray-300 p-4">Package Name</th>
                <th className="border border-gray-300 p-4">Duration</th>
                <th className="border border-gray-300 p-4">Package Address</th>
                <th className="border border-gray-300 p-4">Total Travelers</th>
                <th className="border border-gray-300 p-4">Total Price</th>
              </tr>
            </thead>
            <tbody>
            {bookingdata.map((res, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="border border-gray-300 p-4">
                    {new Date(_.get(res, "createdAt", "")).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "numeric",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {_.get(res, "packges_details[0].package_name", "")}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {_.get(res, "packges_details[0].night", 0)} Night /{" "}
                    {_.get(res, "packges_details[0].days", 0)} Days
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="line-clamp-2 ">
                      {_.get(res, "packges_details[0].package_address", "")}
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    {_.get(res, "total_count", 0)}
                  </td>
                  <td className="border border-gray-300 p-4">
                    ₹{(_.get(res, "total_price", 0) || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Mybooking