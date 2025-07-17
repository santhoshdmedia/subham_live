import { Select, Button } from "antd";
import React, { useState, useEffect } from "react";
import { getresetdays, resetdays } from "../../../api";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../../helper/admin/notification_helper";
import _ from "lodash";

const Settings = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [selectDay, setSelectDay] = useState(null);

  useEffect(() => {
    const fetchResetDay = async () => {
      try {
        const result = await getresetdays();

        const day = _.get(result, "data.data[0]", null);
        setSelectDay(day);
      } catch (err) {
        console.error("Error fetching reset day:", err);
      }
    };

    fetchResetDay();
  }, []);
  const handleChange = (value) => {
    setSelectDay(value);
  };

  const toggleEdit = async () => {
    if (isEditable) {
      if (selectDay === null) {
        ERROR_NOTIFICATION("Please select a day before saving.");
        return;
      }

      try {
        const result = await resetdays({ day: selectDay });

        SUCCESS_NOTIFICATION(result);
      } catch (err) {
        ERROR_NOTIFICATION("Failed to update rest day.");
      }
    }

    setIsEditable((prev) => !prev);
  };

  return (
    <div className="p-5">
      <h1 className="text-lg font-semibold font-pri_head pb-3">Settings :</h1>
      <div className="pl-10">
        <p className="font-pri_para pb-2">Which day do you want to rest?</p>
        <div>
          <Select
            style={{ width: 200 }}
            onChange={handleChange}
            allowClear
            className="settings-select"
            value={selectDay}
            options={[
              { value: 0, label: "Sunday" },
              { value: 1, label: "Monday" },
              { value: 2, label: "Tuesday" },
              { value: 3, label: "Wednesday" },
              { value: 4, label: "Thursday" },
              { value: 5, label: "Friday" },
              { value: 6, label: "Saturday" },
            ]}
            placeholder="Choose your rest day"
            disabled={!isEditable}
          />
        </div>
        <div className="pt-4">
          <Button type="primary" onClick={toggleEdit}>
            {isEditable ? "Save" : "Edit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
