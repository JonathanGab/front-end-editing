import React, { useRef, useState } from 'react';
import './Upload.css';
export default function Upload(props) {
  const [img, setImg] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef(null);
  const handleFile = (file) => {
    //you can carry out any file validations here...
    setImg(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    let imageFile = e.dataTransfer.files[0];
    handleFile(imageFile);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      props.setFiles(e.dataTransfer.files[0]);
    }
  };

  // triggers when file is selected with click
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      props.setFiles(e.target.files[0]);
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewUrl(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? 'drag-active' : ''}
        >
          <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>
              Upload a file
            </button>
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => {
              handleDrop(e);
            }}
          ></div>
        )}
      </form>
      {previewUrl && (
        <div className="upload_img_box">
          <img src={previewUrl} alt="" id="img" className="img" />
          <p>{props.files?.name}</p>
        </div>
      )}
    </div>
  );
}
