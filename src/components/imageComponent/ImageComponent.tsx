import React, { useState } from 'react';

const  ImageComponent:React.FC<{src:string,classes:string,alt:string}> = ({ src ,classes,alt}) =>{
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <img
        src={src}
        alt={alt}
        style={{ objectFit: 'contain', visibility: imageLoaded ? 'visible' : 'hidden' }}
        onLoad={handleImageLoad}
        className={classes}
      />
  );
}

export default ImageComponent;
