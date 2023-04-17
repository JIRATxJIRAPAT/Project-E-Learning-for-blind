import React, { useEffect } from "react";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Button from 'react-bootstrap/Button';
function LandingPage() {

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
                
                <a class="btn btn-cta-primary" href="http://localhost:3000/" >Enter site</a>
                </div>
            </p>
            <div className="container text-center">
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
                            tabIndex={10}
                        >
                    
                            
                </video>
            </div>
            <br></br>

            <ul class="meta list-inline">
                <li class="list-inline-item"><a href="https://github.com/xriley/devAid-Theme" target="_blank" rel='noreferrer'>View on GitHub</a></li>
                <li class="list-inline-item"><a href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/devaid-free-bootstrap-theme-for-developers-side-projects/" target="_blank" rel='noreferrer'>Full Documentation</a></li>
                <li class="list-inline-item">Created by: <a href="https://themes.3rdwavemedia.com/bootstrap-templates/startup/devaid-free-bootstrap-theme-for-developers-side-projects/" target="_blank" rel='noreferrer'>Xiaoying Riley</a></li>
            </ul>
        </div>
        <div class="social-media">
            <div class="social-media-inner container text-center">

            </div>
        </div>
    </section>


    <section id="about" class="about section">
        <div class="container">
            <h2 class="title text-center">What is devAid?</h2>
            <p class="intro text-center">Explain your project in detail. Ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>
            <div class="row">
                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">Designed for developers</h3>
                        <p>Outline a benefit here. Tell users what your plugin/software can do for them. You can change the icon above to any of the 8000+ <a href="https://fontawesome.com/" target="_blank">FontAwesome</a> icons available.</p>
                    </div>
                </div>
                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="fa-solid fa-clock"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">Time saver</h3>
                        <p>Outline a benefit here. Tell users what your plugin/software can do for them. You can change the icon above to any of the 8000+ <a href="https://fontawesome.com/" target="_blank">FontAwesome</a> icons available.</p>
                    </div>
                </div>
                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="fa-solid fa-crosshairs"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">UX-centred</h3>
                        <p>Outline a benefit here. Tell users what your plugin/software can do for them. You can change the icon above to any of the 8000+ <a href="https://fontawesome.com/" target="_blank">FontAwesome</a> icons available.</p>
                    </div>
                </div>       
                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="fa-solid fa-mobile-alt"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">Mobile-friendly</h3>
                        <p>Outline a benefit here. Tell users what your plugin/software can do for them. You can change the icon above to any of the 8000+ <a href="https://fontawesome.com/" target="_blank">FontAwesome</a> icons available.</p>
                    </div>
                </div>             
                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="fa-solid fa-code"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">Easy to customise</h3>
                        <p>Outline a benefit here. Tell users what your plugin/software can do for them. You can change the icon above to any of the 8000+ <a href="https://fontawesome.com/" target="_blank">FontAwesome</a> icons available.</p>
                    </div>
                </div>
                <div class="item col-lg-4 col-md-6 col-12">
                    <div class="icon-holder">
                        <i class="fa-solid fa-coffee"></i>
                    </div>
                    <div class="content">
                        <h3 class="sub-title">SCSS source files included</h3>
                        <p>Outline a benefit here. Tell users what your plugin/software can do for them. You can change the icon above to any of the 8000+ <a href="https://fontawesome.com/" target="_blank">FontAwesome</a> icons available.</p>
                    </div>
                </div>              
            </div>       
        </div>
    </section>
   </>
    )
}

export default LandingPage;