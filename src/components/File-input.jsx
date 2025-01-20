import { useState } from "react";

const FileInput = ({ file, setFile, handleSubmit }) => {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileName(selectedFile ? selectedFile.name : "No file chosen");
    setFile(selectedFile);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={fileName}
        readOnly
        className="flex-1 px-2 py-2 border border-gray-300 rounded"
      />
      {file == null ? (
        <label
          className="upload_btn cursor-pointer bg-blue-700 hover:bg-blue-500 text-white py-2 px-4 rounded"
          htmlFor="file-upload"
        >
          Танлаш
        </label>
      ) : (
        <button
          onClick={handleSubmit}
          className="bg-blue-700 text-white py-2 px-4 rounded cursor-pointer "
        >
          Юбориш
        </button>
      )}
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};


export default FileInput