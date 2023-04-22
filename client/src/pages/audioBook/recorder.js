import React , { useState, useEffect } from "react";
import { storage } from "../../firebase"
import { ref, uploadBytes, getBytes, getDownloadURL,} from "firebase/storage";
import { getDatabase, set } from "firebase/database";
import axios from "axios";
import { useParams } from 'react-router-dom'
import { render } from "react-dom";
import vmsg from "vmsg";
import Navbar1 from "../../components/Navbar";
import "../../css/audio.css";
import Button from "react-bootstrap/esm/Button";
import DocumentTitle from "react-document-title"




const recorder = new vmsg.Recorder({
    wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"

  });

class Recorder extends React.Component {

    state = {
      isLoading: false,
      isRecording: false,
      recordings: []
    };

    record = async () => {
      this.setState({ isLoading: true });
      if (this.state.isRecording) {
        const blob = await recorder.stopRecording();
        this.setState({
          isLoading: false,
          isRecording: false,
          recordings: this.state.recordings.concat(URL.createObjectURL(blob))
        });
        
      } else {
        try {
          await recorder.initAudio();
          await recorder.initWorker();
          recorder.startRecording();
          this.setState({ isLoading: false, isRecording: true });
          document.getElementById("btn").focus();
        } catch (e) {
          console.error(e);
          this.setState({ isLoading: false });
        }
      }
      
      
};
    render() {
      const { isLoading, isRecording, recordings } = this.state;
      
      return (
        <DocumentTitle title="Audio Record">
        <React.Fragment>
          <Navbar1/>
          <div className="box">
            <div className="inner_box_create">
                <br></br><br></br><br></br><br></br>
              <main id="main-content">
                <h2 id='btn' tabIndex={0}>Press record button and press tab and enter again to stop.</h2>
                <Button id='btn2' variant="danger" disabled={isLoading} onClick={this.record} >
                  {isRecording ? "Stop" : "Record"}
                </Button>
              </main>
              <br></br><br></br>
              
              <ul style={{ listStyle: "none", padding: 0 }}>
              
                {recordings.map(url => (
                  <li key={url}>
                    <audio src={url} controls />
                    <br></br><br></br>
                    Please download record file to upload
                    {console.log(url)}
                    <br></br><br></br>
                    <Button variant="success" size="lg" href="/audiobook" >Return to AudioPage </Button>
                  </li>
                ))}
              </ul>
            </div>
            
          
          </div>
        </React.Fragment>
        </DocumentTitle>
      );
    }
  }
   
  //render(<Mp3Upload />, document.getElementById("root"));
  
  export default Recorder;

