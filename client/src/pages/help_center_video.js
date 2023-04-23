import "../css/help_center.css"
import Navbar1 from '../components/Navbar'
import { useState,useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';



function HelpCenterVideo() {

    useEffect(() => {
        document.title = 'Help Center NVDA page';
      }, []);

    window.addEventListener('load', (event) => {
      
        if( localStorage.getItem("lang") === "undefined"){

            localStorage.setItem("lang","thai")

        }else if(localStorage.getItem("lang") === "english"){

            localStorage.setItem("lang","thai")
        }
      
    });

    

    useEffect(() => {
        var player = videojs('testvideo');
        player.src("https://firebasestorage.googleapis.com/v0/b/e-learning-for-the-blind-d7398.appspot.com/o/help_center%2Fhelpcenter.mp4?alt=media&token=6ad81901-046e-4030-ba7d-70ec3ee90be3");
        //player.autoplay('true')

        var player2 = videojs('testvideo2');
        player2.src("https://firebasestorage.googleapis.com/v0/b/e-learning-for-the-blind-d7398.appspot.com/o/help_center%2Fnvda_setting.mp4?alt=media&token=d27feb49-020c-4b7d-ac68-0980af452448");
        //player2.autoplay('true')

    },[])

    return(
        <div>
            <Navbar1/>
            <div className='box_video'>
                <div className='inner_box_video'>
                <main id="main-content">
                <br></br>
                <Button variant="success">คลิปสอนการดาวน์โหลดและติดตั้ง</Button>
                <br></br>
                
                
                <video
                            id="testvideo"
                            class="video-js"
                            controls
                            preload='metadata'
                            width='400' 
                            height="240"
                            type="video/mp4"
                            style={{display: "block",margin: "0 auto"}}
                            
                        >
                </video>

                <br></br>
                <Button variant="success">คลิปสอนการตั้งค่าและใช้งาน</Button>
                <br></br>
                <video
                            id="testvideo2"
                            class="video-js"
                            controls
                            preload='metadata'
                            width='400' 
                            height="240"
                            type="video/mp4"
                            style={{display: "block",margin: "0 auto"}}
                            
                        >
                </video>
                </main>
                </div>
            </div>
        </div>
        )

}

export default HelpCenterVideo;