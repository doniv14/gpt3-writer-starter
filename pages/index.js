import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import cookSavvyLogo from '../assets/cookSavvyLogo.png';
import { useState } from 'react';


const Home = () => {
  const [userInput,setUserInput] = useState('');
  const [userInput1,setUserInput1] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  
  const response = await fetch('/api/generate', {    
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({userInput,userInput1}),
  });
  console.log(JSON.stringify({ userInput }));
  console.log(JSON.stringify({ userInput1 }));
  console.log(response);

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  }

  const onUserChangedText1 = (event) => {
    setUserInput1(event.target.value);
  }
  return (
    <div className="root">
      <Head>
        <title>Meal Idea Generator</title>
        
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <div className="logo">
              <a href="https://www.youtube.com/@CookSavvy/videos" target="_blank">
                <Image src={cookSavvyLogo} alt="CookSavvy logo" />
              </a>
              </div>
            <h1>Meal Idea Generator</h1>
            
          </div>
          <div className="header-subtitle">
            <h2>Not sure what to cook? </h2>
            <h2>We've got you covered! </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
          placeholder="Ingredients: Tomatoes, onions, cilantro"
          className="prompt-box"
          value = {userInput}
          onChange={onUserChangedText} 
          />
          <textarea 
          placeholder="Cuisine: Italian"
          className="prompt-box"
          value = {userInput1}
          onChange={onUserChangedText1} 
          />

          {/* New code I added here */}
          <div className="prompt-buttons"> 
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
              >
                <div className="generate">
                  {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                </div>
              </a>
         </div>
        {apiOutput && (
              <div className="output">
                <div className="output-header-container">
                  <div className="output-header">
                    <h3>Here are some Recipe Suggestions:</h3>
                  </div>
                </div>
                <div className="output-content">
                  <p>{apiOutput}</p>
                </div>
              </div>
            )}
        </div>
      </div>
      
    </div>
  );
};

export default Home;
