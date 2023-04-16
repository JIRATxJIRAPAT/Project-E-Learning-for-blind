import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import UploadForm from "./components/UploadForm";
import UploadsList from "./components/UploadsList";
import { BACKEND_URI } from "./config/constants";
import  { BottomNavigation, BottomNavigationAction} from "@mui/material"
import CastForEducationIcon from '@mui/icons-material/CastForEducation';

const UploadVideo = () => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    getAllMedias();
  }, []);

  const getAllMedias = () => {
    axios
      .get(`${BACKEND_URI}/api/v1/media/all`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error happened!");
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div
            className="card"
            style={{
              height: "auto",
              width: "800px",
              margin: "40px",
              border: "1px solid black",
            }}
          >
            <div className="card-body">
              <UploadForm  getAllMedias={getAllMedias} /> 
              <h1 icon={CastForEducationIcon} >kkkk</h1>
        
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default UploadVideo;
