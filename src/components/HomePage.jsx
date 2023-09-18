import { FileUpload } from "primereact/fileupload";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    const url = process.env.REACT_APP_URL;
    console.log(url);
  }, []);
  return;
};
export default HomePage;
