import { IMAGE_HELPER } from "../helper/Imagehelper";

const CustomBackground = () => {
  return (
    <>
      <img src={IMAGE_HELPER.ShipImage} alt="Background" className="absolute w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black opacity-60"></div>
    </>
  );
};

export default CustomBackground;
