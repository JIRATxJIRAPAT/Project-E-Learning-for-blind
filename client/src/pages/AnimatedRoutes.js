import React from "react";
import { Route,Routes,useLocation} from 'react-router-dom'
import Audiobook from "./Audiobook";
import Music from "./Music";
import {AnimatePresence} from 'framer-motion';

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <div>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/audiobook" element={<Audiobook />} />
            <Route path="/music" element={<Music />} />
          </Routes>
        </AnimatePresence>
        </div>
    )
    
}
export default AnimatedRoutes;