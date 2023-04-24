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
        player.src(`https://firebasestorage.googleapis.com/v0/b/e-learning-for-the-blind-d7398.appspot.com/o/Course%2Fdemo-project1.mp4?alt=media&token=3f9965ab-9021-4ee0-8b14-1121bf4c3695`);
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