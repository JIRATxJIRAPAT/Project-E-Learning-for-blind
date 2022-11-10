import React from "react";
import {motion} from "framer-motion"

function Music() {
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{background:"green",height:1000}}> THIS IS THE HOME PAGE</motion.div>;
}

export default Music;