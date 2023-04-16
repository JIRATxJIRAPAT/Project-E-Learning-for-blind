import React, { Fragment, useState } from "react";

import '../../src/css/gpt.css'
import { Button, Checkbox, Form } from 'semantic-ui-react'

//import { useSpeechSynthesis } from 'react-speech-kit';

function Test() {
  const [text,setText] = useState('');
  //const {speak} = useSpeechSynthesis();

  const handleOnClick = () => {
    //speak({text:text})
  }

  return (
    <Fragment>
      	<header>
		<h1>Video Course Title</h1>
		<nav>
			<ul>
				<li><a href="#">Home</a></li>
				<li><a href="#">About</a></li>
				<li><a href="#">Contact</a></li>
			</ul>
		</nav>
	</header>

	<main>
		<section class="video">
			<video controls>
				<source src="video.mp4" type="video/mp4"/>
			</video>
			<h2>Lesson Title</h2>
			<p>Description of lesson.</p>
		</section>
	</main>

	<footer>
		<p>Copyright © 2023</p>
	</footer>


  </Fragment>

  );
}

export default Test;

