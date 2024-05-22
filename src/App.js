import React, {useState} from "react";
import UserInput from "./components/UserInput";
import Canvas from "./components/Canvas";
import './App.css';

function App() {
  const [adImage, setAdImage] = useState(null);
  const [bgColor, setBgColor] = useState('#0369A1');
  const [contentText, setContentText] = useState('');
  const [CTA, setCTA] = useState('');

  return (
      <div className="Container">
        <Canvas adImage={adImage} bgColor={bgColor} contentText={contentText} CTA={CTA}/>
        <UserInput
          onImageChange={setAdImage}
          onBgColorChange={setBgColor}
          onTextChange={setContentText}
          onCTAChange={setCTA}
        />
    </div>
  );
}

export default App;
