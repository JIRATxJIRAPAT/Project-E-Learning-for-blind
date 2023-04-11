import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";
import { useParams } from 'react-router-dom'

const UploadForm = ({ getAllMedias }) => {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);
  const [epiname,setEpiName] = useState('');
  const {id} = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    for (let key in videos) {
      formdata.append("videos", videos[key]);
    }

    formdata.append("name", name);
    formdata.append("episodeName",epiname)

    axios
      .post(`${BACKEND_URI}/api/v1/media/create/${id}`, formdata)
      .then((success) => {
        getAllMedias();
        alert("Submitted successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Error happened!");
      });
  };

  return (
    <>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="videos">Upload Videos</label>
          <input
            type="file"
            name="videos"
            id="videos"
            multiple
            className="form-control"
            accept=".mp4, .mkv"
            onChange={(e) => {
              setVideos(e.target.files);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Chapter Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            onChange={(e) => setEpiName(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </>
  );
};

export default UploadForm;
