import React, { useEffect,useState } from "react";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Button from 'react-bootstrap/Button';
import Translation from './Dataset/Data_setting.json';
function LandingPage() {

    useEffect(() => {
        document.title = 'Landing page';
      }, []);

    const [language,setLanguage]=useState("")
    const [content,setContent]=useState({})

    useEffect(() => {
        var player = videojs('my-video');
        player.src(`https://firebasestorage.googleapis.com/v0/b/e-learning-for-the-blind-d7398.appspot.com/o/images%2F4_5_6210612633_%E0%B8%88%E0%B8%B4%E0%B8%A3%E0%B8%B1%E0%B8%8F%E0%B8%90%E0%B9%8C.mp4?alt=media&token=87ac22d5-e21f-42e8-bff6-705995656855`);
        player.autoplay('true')

        
    },[])

    function playDemo(){
        var player = videojs('my-video');
        player.play()
    }
    return(
        <>
        <section id="promo" class="promo section offset-header">
        <div className="container text-center">

            <p className="intro">
                <h2 className="title" style={{textAlign:"center"}}>E-Learning for <span class="highlight" style={{textAlign:"center"}}>the blind</span></h2>
                Learning Platform with accessibility
                            
                <div class="btns">
                <Button variant="success" onClick={playDemo} size="lg">
                    Play Demo
                </Button>
                
                <a class="btn btn-cta-primary" href="http://e-learningforblind.netlify.app/course" >Enter site</a>
                </div>
            </p>
            <div  aria-label="tutorial video" className="container text-center">
            <video
                            id="my-video"
                            class="video-js"
                            controls
                            preload='metadata'
                            width='400' 
                            height="240"
                            autoplay
                            
                            data-setup="{}"
                            style={{display: "block",margin: "0 auto"}}
                            tabIndex={0}
                        >
                    
                            
                </video>
            </div>
            <br></br>

            <ul class="meta list-inline">
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <div class="social-media">
            <div class="social-media-inner container text-center">

            </div>
        </div>
    </section>


    
   </>
    )
}

export default LandingPage;