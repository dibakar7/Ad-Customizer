import React, {useState}from 'react'
import '../style/UserInput.css'
import uploadIcon from '../assets/image.png';
import addIcon from '../assets/add-icon.png';
import { SketchPicker } from 'react-color';

const UserInput = ({onImageChange, onBgColorChange, onTextChange, onCTAChange}) => {

  const [colors, setColors] = useState([]);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleAdImageChange = (e) => {
    const file = e.target.files[0];
    onImageChange(file);
  };

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChangeComplete = (color) => {
    setColors([...colors, color.hex]);
    handleClose();
  };

  return (
    <div className='UserInputContainer'>
      <div className='title'><span>Ad customization</span></div>
      <div className="subtitle" style={{color: "grey", fontSize:'medium', fontWeight: '400'}}>Customize your ad and and get the templates accordingly</div>
      <div className="imageInput">
        <input type="file" id="fileUpload" accept="image/*" style={{display: 'none'}} onChange={handleAdImageChange}/>
        <img src={uploadIcon} alt="upload-icon" style={{width:'25px'}}/>
        <span style={{color: "grey", fontSize:'medium', fontWeight: '400'}}>Change the ad creative image.</span>
        <label htmlFor="fileUpload" className="btn">select file</label>
      </div>
      <div className="innerMargin" style={{color: "grey", fontSize:'medium', fontWeight: '400'}}><span>Edit contents</span></div>
      <div className="adContentBoundary">
        <div className="adContentText" style={{color: "grey", fontSize:'medium', fontWeight: '400'}}>Ad content</div>
        <input type="text" style={{border:'none', outline: 'none', width: '90%', padding:'5px', background: '#fff9d8'}} onChange={(e) => onTextChange(e.target.value)}/>
      </div>
      <div className="ctaBoundary">
        <div className="ctaText" style={{color: "grey", fontSize:'medium', fontWeight: '400'}}>CTA</div>
        <input type="text" style={{border:'none', outline: 'none', width: '90%', padding:'5px', background: '#fff9d8'}} onChange={(e) => onCTAChange(e.target.value)}/>
      </div>
      <div className="bgColor">
        <div className="bgColorText" style={{color: "grey", fontSize:'medium', fontWeight: '400', marginBottom: '10px'}}>Choose your color</div>
        <div className="colorArray">
          {colors.slice(-5).map((color, index) => (
            <button key={index} className='circularButton' variant="contained" style={{ width: '20px', height: '20px', borderRadius: '50%', border: 'None', backgroundColor: color, marginLeft: '10px'}} onClick={() => onBgColorChange(color)} />
          ))}
          <button className='circularButtonAdd' variant="contained" style={{border: 'none', backgroundColor: 'transparent'}} onClick={handleClick}><img src={addIcon} alt="addIcon" style={{width:'25px'}}/></button>
          {displayColorPicker ? (
            <div className='colorPickerContainer'>
              <div onClick={handleClose} />
              <SketchPicker color={colors[colors.length - 1]} onChangeComplete={handleChangeComplete} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default UserInput