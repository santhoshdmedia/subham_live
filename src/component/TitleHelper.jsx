/* eslint-disable react/prop-types */
import { useEffect } from "react";

const TitleHelper = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, []);

  return <div></div>;
};

export default TitleHelper;
