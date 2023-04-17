import styles from './App.module.css';
import React , {useEffect,useState} from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import AnimatedRoutes from './pages/AnimatedRoutes';

function App() {
  
  return (
    <div className={styles.App}>
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;
