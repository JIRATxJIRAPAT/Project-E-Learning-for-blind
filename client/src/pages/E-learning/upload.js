import React , { useState, useEffect } from "react";
import { storage } from "../../../src/firebase"
import { ref, uploadBytes, getBytes, getDownloadURL,} from "firebase/storage";
import { v4 } from "uuid";
import { getDatabase, set } from "firebase/database";
import axios from "axios";
import { useParams } from 'react-router-dom'



function Firebase_upload() {

    const [imageUpload, setImageUpload] = useState(null);
    const [url,setUrl] = useState("");
    const {id} = useParams();
    const [name, setName] = useState("");
    const [epiname,setEpiName] = useState('');

    const uploadFile = async(e) => {
        e.preventDefault()
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name}`);

        await uploadBytes(imageRef, imageUpload).then(() => {
            alert("File Upload Success")
        })

        await getDownloadURL(imageRef).then((url) => {
          setUrl(url)
          console.log(url)
        }).catch((err)=>{
            console.log(err);
        })


        const formData = new FormData();
        formData.append("url",url)
        formData.append("name", name);
        formData.append("episodeName",epiname)
        await axios.put(`http://localhost:5000/api/chapter/create/${id}`,formData)
        .then((res)=>console.log(res.data))
        .catch((err)=>{
            console.log(err);
        })
    };


  return (


    <>
    <form onSubmit={uploadFile}>
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
                setImageUpload(e.target.files[0]);
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
}

export default Firebase_upload;