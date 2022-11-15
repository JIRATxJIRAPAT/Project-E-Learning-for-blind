import React from "react";
import { Route,Routes,useLocation} from 'react-router-dom'
import Audiobook from "./Audiobook";
import Music from "./Music";
import {AnimatePresence} from 'framer-motion';
import Test from "./Test";
import Test2 from "./test2";
import Test3 from "./test3";

function AnimatedRoutes() {
    const location = useLocation();
    return (
      <div>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/audiobook" element={<Audiobook />} />
            <Route path="/music" element={<Music />} />
            <Route path="/test" element={<Test />} />
            <Route path="/test2" element={<Test2 />} />
            <Route path="/test3" element={<Test3 />} />
          </Routes>
        </AnimatePresence>
      </div>
    )
    
}
export default AnimatedRoutes;