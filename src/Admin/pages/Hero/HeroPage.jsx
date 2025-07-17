import React, { useEffect, useState } from "react";
import DefaultHeader from "../customComponents/DeafaultHeader";
import { ICON_HELPER } from "../../../helper/IconHelper";
import { Card, Collapse, Modal, Popconfirm, Button, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import _ from "lodash";
import { DeleteOutlined } from "@ant-design/icons";
import { ERROR_NOTIFICATION, SUCCESS_NOTIFICATION } from "../../../helper/admin/notification_helper";
import AddHero from "./AddHero";
import { delete_background_image, delete_pop_message, get_background_image, get_pop_message, update_pop_status } from "../../../api";

const { Panel } = Collapse;

const HeroPage = () => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPopModal, setShowPopModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heroData, setHeroData] = useState([]);
  const [switchPop, setSwitchPop] = useState(true);

  const [popData, setpopData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await get_background_image();
      const data = _.get(result, "data.data", []);
      setHeroData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchpopData = async () => {
    try {
      const result = await get_pop_message();

      const data = _.get(result, "data.data", []);

      setpopData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBackground = async (id) => {
    try {
      const result = await delete_background_image(id);
      SUCCESS_NOTIFICATION(result);
      fetchData();
    } catch (err) {
      console.error(err);
      ERROR_NOTIFICATION(err);
    }
  };

  const handleDeletePopMessage = async (id) => {
    try {
      const result = await delete_pop_message(id);
      SUCCESS_NOTIFICATION(result);
      fetchpopData();
    } catch (err) {
      console.error(err);
      ERROR_NOTIFICATION(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchpopData();
  }, []);

  const onchange = async (checked) => {
    setSwitchPop(checked);
    try {
      const popId = _.get(popData, "[0]._id", null);
      if (!popId) return;

      const result = await update_pop_status(popId, checked);
      SUCCESS_NOTIFICATION(result);
      fetchpopData();
    } catch (err) {
      console.log(err);
      ERROR_NOTIFICATION(err);
    }
  };

  return (
    <div>
      <div className="p-6">
        <DefaultHeader text="Hero Page" icon={<ICON_HELPER.BLOGS_ICON />} pageName="Hero Page" setAddStatus={() => {}} add={false} model={false} search={false} />
      </div>

      <div className="px-6">
        <Collapse accordion className="px-6">
          <Panel
            header={
              <div className="flex justify-between items-center">
                <span>Hero Page Background Image</span>
                <Button type="primary" size="small" className="bg-secondary p-3 font-bold" onClick={() => setShowImageModal(true)}>
                  Edit Image
                </Button>
              </div>
            }
            key="1"
          >
            <Card
              title="Background Image"
              cover={_.get(heroData, "[0].background_image") ? <img alt="background" src={_.get(heroData, "[0].background_image")} className="object-center h-screen" /> : null}
              actions={[
                <Popconfirm title="Delete background image?" onConfirm={() => handleDeleteBackground(heroData[0]?._id)} okText="Yes" cancelText="No">
                  <DeleteOutlined style={{ color: "red" }} />
                </Popconfirm>,
              ]}
            />
          </Panel>

          <Panel
            header={
              <div className="flex justify-between items-center">
                <span>Pop Message</span>
                <div className=" flex gap-3 justify-center items-center text-center">
                  <Switch checked={switchPop} onChange={onchange} title="on/off" className="text-primary" />

                  <Button type="primary" size="small" className="bg-secondary p-3 font-bold" onClick={() => setShowPopModal(true)}>
                    Edit Message
                  </Button>
                </div>
              </div>
            }
            key="2"
          >
            <Card
              title="Pop Message"
              actions={[
                <Popconfirm title="Delete pop message?" onConfirm={() => handleDeletePopMessage(popData[0]?._id)} okText="Yes" cancelText="No">
                  <DeleteOutlined style={{ color: "red" }} />
                </Popconfirm>,
              ]}
            >
              <p dangerouslySetInnerHTML={{ __html: _.get(popData, "[0].pop_message", "No message available") }} />
            </Card>
          </Panel>
        </Collapse>
      </div>

      <Modal open={showImageModal} title="Edit Background Image" onCancel={() => setShowImageModal(false)} footer={null}>
        <AddHero setAddStatus={setShowImageModal} setLoading={setLoading} fetchCallback={fetchData} id={heroData[0]?._id} packageData={{ type: "image" }} />
      </Modal>

      <Modal open={showPopModal} title="Edit Pop Message" onCancel={() => setShowPopModal(false)} footer={null}>
        <AddHero setAddStatus={setShowPopModal} setLoading={setLoading} fetchCallback={fetchpopData} id={heroData[0]?._id} packageData={{ type: "pop", message: heroData[0]?.pop_message, pop_status: switchPop }} />
      </Modal>
    </div>
  );
};

export default HeroPage;
