import React, { useEffect, useRef } from 'react';
import '../style/Canvas.css';
import maskStroke from '../assets/mask_stroke.png'

const Canvas = ({ adImage, bgColor, contentText, CTA }) => {
  const canvasRef = useRef(null);

  function wrapText(context, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let line = '';
  
    words.forEach(word => {
      const testLine = line + word + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && line !== '') {
        lines.push(line);
        line = word + ' ';
      } else {
        line = testLine;
      }
    });
  
    lines.push(line);
    return lines;
  }
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const data = {
      "caption": {
        "position": {"x":50,"y":90},
        "max_characters_per_line":31,
        "font_size":44,
        "alignment":"left",
        "text_color":"#FFFFFF",
        "lineHeight": 60
      },
      "cta": {
        "position": {"x":50,"y":200},
        "text_color":bgColor,
        "background_color":"#ffffff",
        "width": 200,
        "height": 90,
        "borderRadius": 15,
        "padding": 10
      },
      "image_mask": {
        "x":50,
        "y":442,
        "width":970,
        "height":600,
        "mask-stroke": maskStroke
      },
      "backgroundLayer":{
        "x":0,
        "y":0,
        "width":canvas.width,
        "height":2*canvas.height/3
      }
    };

    // Draw background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(data.backgroundLayer.x, data.backgroundLayer.y, data.backgroundLayer.width, data.backgroundLayer.height);


    // Draw ad image
    if (adImage) {
      const img = new Image();
      img.src = URL.createObjectURL(adImage);
      img.onload = () => {
        ctx.drawImage(img, data.image_mask.x, data.image_mask.y, data.image_mask.width, data.image_mask.height);

        const maskStrokeImg = new Image();
        maskStrokeImg.src = data.image_mask['mask-stroke'];
        maskStrokeImg.onload = () => {
          ctx.drawImage(maskStrokeImg, data.image_mask.x-50, data.image_mask.y-449, data.image_mask.width+100, data.image_mask.height+495);
        };
      };
    }


    // Draw content text
    if (contentText) {
      ctx.fillStyle = data.caption.text_color;
      ctx.font = `${data.caption.font_size}px Arial`;
      ctx.textAlign = data.caption.alignment;
      const lines = wrapText(ctx, contentText, canvas.width-data.caption.position.x);
      lines.forEach((line, index)=>{
        ctx.fillText(line, data.caption.position.x, data.caption.position.y + data.caption.lineHeight*index);
      });
    }

    // Draw CTA
    if (CTA) {
      const x = data.cta.position.x; 
      const y = data.cta.position.y; 
      const width = data.cta.width; 
      const height = data.cta.height; 
      const padding = data.cta.padding; 
      const borderRadius = data.cta.borderRadius; 
      
      // Draw the text box
      ctx.beginPath();
      ctx.moveTo(x + borderRadius, y);
      ctx.lineTo(x + width - borderRadius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
      ctx.lineTo(x + width, y + height - borderRadius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
      ctx.lineTo(x + borderRadius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
      ctx.lineTo(x, y + borderRadius);
      ctx.quadraticCurveTo(x, y, x + borderRadius, y);
      ctx.closePath();
      
      // Fill the text box
      ctx.fillStyle = data.cta.background_color;
      ctx.fill();
      
      // Draw the text
      ctx.fillStyle = bgColor; // Set text color
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';  // Horizontally align the text in the middle
      ctx.fontWeight = '30px' // Center the text
      ctx.textBaseline = 'middle'; // Vertically align the text in the middle
      const lineHeight = 35;
      const lines = wrapText(ctx, CTA, width);
      const textHeight = lineHeight * lines.length;
      const textTop = y + (height - textHeight) / 2;
      lines.forEach((line, index) => {
        ctx.fillText(line, x + padding + width/2, textTop + lineHeight * index + 2*padding);
      });
    }
  }, [adImage, bgColor, contentText, CTA]);

  return (
    <div className="CanvasContainer">
      <canvas ref={canvasRef} width={1080} height={1080} style={{ width: 400, height: 400, border: "1px dashed black"}} />
    </div>
  );
};

export default Canvas;
