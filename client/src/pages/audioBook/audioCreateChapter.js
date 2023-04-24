import React , { useState, useEffect } from "react";
import { storage } from "../../firebase"
import { ref, uploadBytes, getBytes, getDownloadURL,} from "firebase/storage";
import { getDatabase, set } from "firebase/database";
import axios from "axios";
import { useParams,useNavigate } from 'react-router-dom'
import Translation from "../Dataset/Data_upload_form.json"
import "../../css/audio.css";
import Navbar1 from '../../components/Navbar'
import Button from 'react-bootstrap/Button'




function CreateAudioChapter() {

    useEffect(() => {
        document.title = 'Upload Audio page';
      }, []);

    const [imageUpload, setImageUpload] = useState(null);
    const [url,setUrl] = useState("");
    const {id} = useParams();

    const [epiname,setEpiName] = useState('');

    const [content,setContent]=useState({})
    
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("lang")==="english"){
            setContent(Translation.english)
        }else if(localStorage.getItem("lang")==="thai"){
            setContent(Translation.thai)
        }

    },[]);
    
    useEffect(()=>{
        
        if(url !== ""){
            
            const formData = new FormData();
            formData.append("url",url)
            formData.append("episodeName",epiname)
            axios.put(`https://e-learning-backends.onrender.com/api/audiobook/chapter/create/${id}`,formData)
            .then((res)=>[
                console.log(res.data),
                
            ])
            .catch((err)=>{
                console.log(err);
            })
        }
    },[url])
       



    const uploadFile = async(e) => {
        e.preventDefault()
        if (imageUpload == null) return;
        const imageRef = ref(storage, `AudioBook/${imageUpload.name}`);

        await uploadBytes(imageRef, imageUpload).then(() => {
            alert("File Upload Success")
        })

        await getDownloadURL(imageRef).then((url) => {
          setUrl(url)
          console.log(url)
          navigate(`/audiobook/${id}`)
        }).catch((err)=>{
            console.log(err);
        })
    
        
    };

    const msg2 = new SpeechSynthesisUtterance() 
    function check_file(){

        if(imageUpload==null){

            console.log("sssssxxxx",epiname,epiname.value,imageUpload)
            if(epiname === ""){
                msg2.text = "please Enter File and title name"
            }else{
                msg2.text = "please Enter File"
            }
            window.speechSynthesis.speak(msg2)
        }else{
            if(epiname === ""){
                msg2.text = "please Enter title name"
            }else{
                msg2.text = "upload success"
            }
            window.speechSynthesis.speak(msg2)
        }
        
    }

  return (
    <div>

    <Navbar1/>  
    <div className="box" >
        <main id="main-content">
            <form className="inner_box_create" onSubmit={uploadFile}>
                <div className="form-group" style={{width: '500px', alignItems: 'center', height: '50px'}}>
                    <label htmlFor="name" >{content.value2}</label>
                    <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter title"
                    className="form-control"
                    aria-label='title name'
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
                    aria-label='upload audio'
                    placeholder="upload audio form"
                    required
                    className="form-control"
                    accept=".mp3"
                    onChange={(e) => {
                        setImageUpload(e.target.files[0]);
                    }}
                    />
                </div>
                <br></br> 
                <button type="submit" onClick={() => check_file()} className="btn btn-success" >
                {content.value3}
                </button>

                <br></br><br></br><br></br><br></br><br></br>
                Go to Record Audio<br></br>
                <div>
                <label aria-label='record audio'></label>
                <Button variant="danger" size="md" href={`/audiobook/record/`} >Record Audio</Button>
                </div>
            </form>
        </main>
    </div>
    </div>
    
  );
}

export default CreateAudioChapter;