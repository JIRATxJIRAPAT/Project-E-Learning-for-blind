import React, { useState } from "react";
import BasicExample from "../components/CourseCard";
import '../../src/css/card.css'
import { Button, Checkbox, Form } from 'semantic-ui-react'

//import { useSpeechSynthesis } from 'react-speech-kit';

function Test() {
  const [text,setText] = useState('');
  //const {speak} = useSpeechSynthesis();

  const handleOnClick = () => {
    //speak({text:text})
  }

  return (
    
    <div>
        <label tabIndex="0">First Name
            <input placeholder='First Name' />
        </label>
        <Form>
          <Form.Field>
            <label >First Name</label>
            <input placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' />
          </Form.Field>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
  </Form>
    </div>



  );
}

export default Test;

