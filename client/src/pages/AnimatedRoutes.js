import React, {useEffect, useState } from "react";
import { Route,Routes,useLocation} from 'react-router-dom'
import Music from "./Music";
import {AnimatePresence} from 'framer-motion';
import Test from "./Test";
import Test2 from "./test2";
import Test3 from "./test3";
import Tutorial from "./Tutorial";
import Setting from "./Setting";
import Register from "../Auth/register";
import Login from "../Auth/Login";
import Spotify_page from "../spotify_music/spotify_page"
import CreateCourse from "./E-learning/createCourse";
import AllCourse from "./E-learning/allCourse";
import Course from "./E-learning/course";
import EditCourse from "./E-learning/editCourse";
import Chapter from "./E-learning/chapter";

import CreateQuiz from "./E-learning/createQuiz";
import UploadVideo from "../video_upload/test_upload";
import Quiz from "./E-learning/quiz";
import Profile from "./User/profile";
import BasicExample from "./audioBook/createAudio";
import AllAudioBook from "./audioBook/allAudio";
import CreateChapter from "./E-learning/CreateChapter";
import Mp3Upload from "./audioBook/recorder";
import Mp3_upload from "./audioBook/audioCreateChapter";
import VideoJS from "./E-learning/video";
import VideoPlayer from "./E-learning/video";
import AudioBook from "./audioBook/playAudio";
import Recorder from "./audioBook/recorder";
import Quiz2 from "./E-learning/quiz2";

import Radio from "../spotify_music/radio";
import FM93 from "../RadioFM/fm93";
import LandingPage from "./landing";

function AnimatedRoutes() {
    const location = useLocation();
    const [courses,setCourse] = useState([])
    //<Route path="/course/chapter/create/:id" element={<CreateChapter/>} />
    //<Route path="/course/chapter/create/:id" element={<UploadVideo/>} />
    /*
    useEffect(() => {
      
      axios.get("http://localhost:5000/api/course/")
      .then(res => setCourse(res.data))
      .catch(error => console.log(error));
    });
    */
    
    return (
      <div>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            
            <Route path="/music" element={<Music />} />
            <Route path="/test" element={<Test />} />
            <Route path="/test2" element={<Test2 />} />
            <Route path="/test3" element={<Test3 />} />
            <Route path="/" element={<AllCourse/>} />
            <Route path="/setting" element={<Setting/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/spotifypage" element={<Spotify_page/>} />
            <Route path="/course/create" element={<CreateCourse/>} />
            <Route path="/course" element={<AllCourse/>} />
            <Route path="/course/:id" element={<Course/>} />
            <Route path="/course/edit/:id" element={<EditCourse/>} />
            <Route path="/course/chapter/:id" element={<Chapter/>} />
            <Route path="/course/quiz/create/:id" element={<CreateQuiz/>} />
            <Route path="/course/quiz/:id" element={<Quiz/>} />
            <Route path="/course/quiz2/:id" element={<Quiz2/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/course/chapter/create/:id" element={<CreateChapter />} />
            <Route path="/audiobook" element={<AllAudioBook />} />
            <Route path="/audiobook/:id" element={<AudioBook />} />
            <Route path="/audiobook/create" element={<BasicExample/>} />
            <Route path="/audiobook/record" element={<Recorder/>} />
            <Route path="/audiobook/chapter/create/:id" element={<Mp3_upload/>} />
            <Route path="/video" element={<VideoPlayer/>} />
            {/* <Route path="/audiobook/create" element={<BasicExample/>} /> */}
            <Route path="/audiobook/create/:id" element={<Mp3Upload/>} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/uploadvdo" element={<UploadVideo />} />
            <Route path="/radio" element={<Radio />} />
            <Route path="/radioFM" element={<FM93 />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route exact path="/radio2.html" render={() => {window.location.href="http://localhost:3000/radio2.html"}} />
          </Routes>
        </AnimatePresence>
      </div>
    )
    
}
export default AnimatedRoutes;