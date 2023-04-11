import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'

import Card2 from '../../components/Card2'
import AudioCard from './components/AudioCard'
/*

        {courses.map((course,key) => (
            <div className='container' key={key}>
                <Link to={{pathname:`/course/${course._id}`} }>
                <h2>{`${course.name}` }</h2>
                <img src={`/uploads/images/${course.img}` } width="20%" height="10%" alt={`${course.name}`}/>
                
                </Link>

            </div>
            
        ))}
<Link to={{pathname:`/course/edit/${course._id}`}}>
                    <button className="example" tabIndex="0">edit</button>
                </Link>
*/

function CreateAudioCard(audio,key){
    return(
        <AudioCard name={audio.name} category={audio.category} desc={audio.desc} owner_name={audio.owner_name}/>
        
    )
}

const AllAudioBook = () => {
    //Data
    const [allAudio,setAllAudio] = useState([])
    //Handler
    const [selectedCategory, setSelectedCategory] = useState();
    
    useEffect(() => {
      
      axios.get("http://localhost:5000/api/audiobook/")
      .then(res => setAllAudio(res.data))
      .catch(error => console.log(error));
    },[]);
    

    return(
        <div>
        <Navbar1 />
        {allAudio.map((audio,key) => CreateAudioCard(audio,key))}
       
        </div>
    )
}

export default AllAudioBook