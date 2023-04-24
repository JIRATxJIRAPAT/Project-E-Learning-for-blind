import { useEffect, useState,useMemo } from 'react'
import axios from 'axios'
import Navbar1 from '../../components/Navbar'
import AudioCard from './components/AudioCard'
import { Button } from '@mui/material'

import "../../css/audio.css";


function CreateAudioCard(audio,key){
    return(
        <AudioCard key={key} id={audio._id} name={audio.name} category={audio.category} desc={audio.desc} owner_name={audio.owner_name}/>
        
    )
}



const AllAudioBook = () => {

    useEffect(() => {
        document.title = 'All AudioBook page';
      }, []);

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
      
      axios.get("https://e-learning-backends.onrender.com/api/audiobook/")
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
        <div className='box_allaudio'>
            

            <div className='inner_box_allaudio'>
            
                <main id="main-content">

                <section>
                    <Button aria-label='create audio' tabIndex={0} style={{background:"red",color:'white',fontWeight:'bold'}}
                     href={"/audiobook/create"}>Create AudioBook</Button>
                 </section>
                <br></br>
                <section>
                        <select onChange={(e) => filterItems(e.target.value)}>
                            <option value="">All</option>
                            <option value="General">General</option>
                            <option value="Horror">Horror</option>
                            <option value="Tales">Tales</option>
                            <option value="History">History</option>
                        
                        </select> 
                    

                    

                    <section>
                        {filteredItems.map((item) => (
                            <AudioCard key={item.id} id={item._id} name={item.name} category={item.category} 
                                desc={item.desc} owner_name={item.owner_name}></AudioCard>
                        ))}
                    </section>
                </section>
                        
                    
                </main>
                    {/* <section>
                        {allAudio.map((audio,key) => CreateAudioCard(audio,key))}         
                    </section> */}

            </div>

        </div>
    </div>
       
        
    )
}

export default AllAudioBook