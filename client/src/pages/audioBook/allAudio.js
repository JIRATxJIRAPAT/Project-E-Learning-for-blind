import { useEffect, useState,useMemo } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar1 from '../../components/Navbar'

import Card2 from '../../components/Card2'
import AudioCard from './components/AudioCard'
import "../../css/audio.css";
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

        <div>
        <Navbar1 />
        {allAudio.map((audio,key) => CreateAudioCard(audio,key))}
*/

function CreateAudioCard(audio,key){
    return(
        <AudioCard key={key} id={audio._id} name={audio.name} category={audio.category} desc={audio.desc} owner_name={audio.owner_name}/>
        
    )
}



const AllAudioBook = () => {
    //Data
    const [allAudio,setAllAudio] = useState([])
    const [items, setItem] = useState([]);

    const [filteredItems, setFilteredItems] = useState([])



    const category = [
        'General',
        'Horror',
        'Comedy',
        'Novel',
        'Tales',
        'History'
    ];
    
    useEffect(() => {
      
      axios.get("http://https://e-learning-backends.onrender.com/api/audiobook/")
      .then(res => [
            setAllAudio(res.data),
            setItem(res.data),
            setFilteredItems(res.data)
        ])
      .catch(error => console.log(error));
      
      
    },[]);



    
    const filterItems = (category) => {
        if(category===""){
            setFilteredItems(allAudio)
        }else{
            const filtered = items.filter((item) => item.category === category);
            setFilteredItems(filtered);
        }

    };


    return(
    <div>
        

        
      

        <Navbar1 />
        <div className='box'>
            

            <div className='inner_box'>
            
            <section>
                <select onChange={(e) => filterItems(e.target.value)}>
                    <option value="">All</option>
                    <option value="Horror,Comedy">Horror,Comedy</option>
                    <option value="Horror">Horror</option>
                    <option value="books">Books</option>
                </select> 

                <section>
                    {filteredItems.map((item) => (
                        <AudioCard key={item.id} id={item._id} name={item.name} category={item.category} 
                            desc={item.desc} owner_name={item.owner_name}></AudioCard>
                    ))}
                </section>
                
            </section>
            
            {/* <section>
                {allAudio.map((audio,key) => CreateAudioCard(audio,key))}         
            </section> */}

            </div>

        </div>
    </div>
       
        
    )
}

export default AllAudioBook