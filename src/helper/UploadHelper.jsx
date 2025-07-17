import React, { useState } from "react";
import { uploadImage } from "../api";
import { message, Skeleton, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ICON_HELPER } from "./IconHelper";
import _ from "lodash";

const UploadHelper = (props) => {
  const { setImagepath, multiple, max, image_path, field_key } = props;
  const [loading, setLoading] = useState(false);

  const ImageValidation = {
    beforeUpload: (file) => {
      setLoading(true);
      const isImage = ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type);
      if (!isImage) {
        message.warning(`${file.name} is not supported`);
        setLoading(false);
      }
      return isImage || Upload.LIST_IGNORE;
    },
    onChange: async (info) => {
     
      setLoading(false);
      try {
        if (_.get(info, "file.status", "") === "uploading") {
          let formData = new FormData();
         
          formData.append("image", info.file.originFileObj);

          const result = await uploadImage(formData);

          if (Number(field_key)) {
            setImagepath([
              ...image_path,
              {
                key: image_path?.length + 1,
                path: _.get(result, "data.data.url", ""),

                field_key: field_key,
              },
            ]);
          } else {
            multiple
              ? setImagepath([
                  ...image_path,
                  {
                    key: image_path?.length + 1,
                    path: _.get(result, "data.data.url", ""),
                  },
                ])
              : setImagepath(_.get(result, "data.data.url", ""));
          }
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    },
  };

  return (
    <>
      <Skeleton loading={loading} active className="flex flex-row !rounded-full justify-center items-center">
        <Upload {...ImageValidation} maxCount={max || 1} type="drag" style={{ width: 100, background: "white" }} showUploadList={false}>
          <div className="!w-full !h-[60px] !center_div">
            <ICON_HELPER.UploadIcon />
          </div>
        </Upload>
      </Skeleton>
    </>
  );
};

export default UploadHelper;
