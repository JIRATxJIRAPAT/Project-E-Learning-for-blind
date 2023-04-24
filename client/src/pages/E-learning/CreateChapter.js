import React , { useState, useEffect, Fragment } from "react";
import { storage } from "../../firebase"
import { ref, uploadBytes, getBytes, getDownloadURL,} from "firebase/storage";
import { v4 } from "uuid";
import { getDatabase, set } from "firebase/database";
import axios from "axios";
import { useParams,useNavigate} from 'react-router-dom'
import Navbar1 from "../../components/Navbar";



function CreateChapter() {

    useEffect(() => {
        document.title = 'Create Chapter page';
      }, []);

    const [imageUpload, setImageUpload] = useState(null);
    const [url,setUrl] = useState("");
    const {id} = useParams();
    const [name, setName] = useState("");
    const [epiname,setEpiName] = useState('');
    const [role,setRole] = useState('')
    
    const navigate = useNavigate();

    const uploadFile = async(e) => {
        e.preventDefault()
        
        if (imageUpload === null) return;
        const imageRef = ref(storage, `Course/${imageUpload.name}`);

        await uploadBytes(imageRef, imageUpload).then(() => {
            alert("File Upload Success")
        })

        await getDownloadURL(imageRef).then((url) => {
          setUrl(url)
          console.log(url)
          navigate(`/course/${id}`)
        }).catch((err)=>{
            console.log(err);
        })

    };

    useEffect(()=>{
        setRole(localStorage.getItem('role'))
        if(url !== ""){
            console.log("send api")
            const formData = new FormData();
            formData.append("url",`${url}`)
            formData.append("episodeName",epiname)
            axios.put(`https://e-learning-backends.onrender.com/api/chapter/create/${id}`,formData)
            .then((res)=>[
                console.log(res.data),
                
            ])
            .catch((err)=>{
                console.log(err);
            })
        }
    },[url])


    const msg2 = new SpeechSynthesisUtterance() 
    function check_file(){

        if(imageUpload==null){

            console.log("sssssxxxx",epiname,epiname.value,imageUpload)
            if(epiname === ""){
                msg2.text = "please Enter File and chapter name"
            }else{
                msg2.text = "please Enter File"
            }
            window.speechSynthesis.speak(msg2)
        }else{
            if(epiname === ""){
                msg2.text = "please Enter chapter name"
            }else{
                msg2.text = "upload success"
            }
            window.speechSynthesis.speak(msg2)
        }
        
    }


  return (
    <Fragment>
        <Navbar1/>
    <div className='box_course'>
        <div className='inner_box_course'>
            <main id="main-content">
            {role === "teacher" && 
            <form onSubmit={uploadFile}>
                    <div className="form-group">
                        <label htmlFor="name">Chapter Name</label>
                        <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        aria-label='chapter name'
                        placeholder="enter chapter name"
                        onChange={(e) => setEpiName(e.target.value)}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="videos">Upload Videos</label>
                        <input
                        type="file"
                        name="videos"
                        id="videos"
                        multiple
                        required
                        className="form-control"
                        accept=".mp4, .mkv"
                        aria-label='upload video'
                        placeholder="upload video"
                        onChange={(e) => {
                            setImageUpload(e.target.files[0]);
                        }}
                        
                        />
                    </div>
                    <br></br>
                    <button type="submit" onClick={() => check_file()} className="btn btn-primary mt-2">
                        Submit
                    </button>
            </form>
                }
                {role !== "teacher" && 
                    <div className='box_course'>
                        <div tabIndex={0} style={{fontSize:"30px"}}>{role} can't access this page</div>
                    </div>    
                }   
            </main>
        </div>
    </div>
    </Fragment>
  );
}

export default CreateChapter;