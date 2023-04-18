import React , { useState, useEffect } from "react";
import { storage } from "../../firebase"
import { ref, uploadBytes, getBytes, getDownloadURL,} from "firebase/storage";
import { getDatabase, set } from "firebase/database";
import axios from "axios";
import { useParams } from 'react-router-dom'
import Translation from "../Dataset/Data_upload_form.json"
import "../../css/audio.css";
import Navbar1 from '../../components/Navbar'




function CreateAudioChapter() {

    const [imageUpload, setImageUpload] = useState(null);
    const [url,setUrl] = useState("");
    const {id} = useParams();

    const [epiname,setEpiName] = useState('');

    const [content,setContent]=useState({})
    

    useEffect(() => {
        if(localStorage.getItem("lang")==="english"){
            setContent(Translation.english)
        }else if(localStorage.getItem("lang")==="thai"){
            setContent(Translation.thai)
        }

      },[]);
    console.log(localStorage.getItem("lang"))

       



    const uploadFile = async(e) => {
        e.preventDefault()
        if (imageUpload == null) return;
        const imageRef = ref(storage, `mp3file/${imageUpload.name}`);

        await uploadBytes(imageRef, imageUpload).then(() => {
            alert("File Upload Success")
        })

        await getDownloadURL(imageRef).then((url) => {
          setUrl(url)
          console.log(url)
        }).catch((err)=>{
            console.log(err);
        })
        //background-color: #9268a1;
        

        
    };

  return (
    <div>

    <Navbar1/>  
    <div className="box">
        <form className="inner_box_create">
        <div className="form-group" style={{width: '500px', alignItems: 'center', height: '50px'}}>
            <label htmlFor="name" >{content.value2}</label>
            <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            onChange={(e) => setEpiName(e.target.value)}
            />
        </div>
        <br></br><br></br>
        
        <div className="form-group" style={{width: '500px', alignItems: 'center', height: '50px'}}>
            <label htmlFor="videos">{content.value1}</label>
            <input
            type="file"
            name="videos"
            id="videos"
            multiple
            className="form-control"
            accept=".mp3"
            onChange={(e) => {
                setImageUpload(e.target.files[0]);
            }}
            />
        </div>
        <br></br> 
        <button type="submit" className="btn btn-success" >
        {content.value3}
        </button>
        </form>
        
    </div>
    </div>
    
  );
}

export default CreateAudioChapter;