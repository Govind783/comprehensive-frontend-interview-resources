import React, { useRef, useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setISDragging] = useState(false);
  const fileRef = useRef();

  const acceptFileHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div
        className={`w-full max-w-xl h-96 border-dashed border border-gray-600 rounded-md flex justify-center items-center
            ${isDragging ? "bg-green-700" : "bg-transparent"}
            ${file && "border-green-600"}
            `}
        onDragEnter={(e) => {
          setISDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragLeave={() => {
          setISDragging(false);
        }}
        onClick={() => {
          fileRef.current.click();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
          }
          setISDragging(false);
        }}
      >
        <input
          type="file"
          className="hidden"
          ref={fileRef}
          onChange={(e) => {
            acceptFileHandler(e);
          }}
        />
        <p> {file ? file.name : "Upload file"} </p>
      </div>
    </div>
  );
};

export default FileUpload;

//  file upload
// the main div
// - on drag enter, true
// - on drag leave, false
// - odarg over, preventDefault and stop prop
// - on drop, prev defaukt , set and false