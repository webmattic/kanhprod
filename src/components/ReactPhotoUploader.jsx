import React from 'react';

const ReactPhotoUploader = ({ onUpload }) => {
  const handleChange = (event) => {
    // Handle the input as a file path string
    const filePath = event.target.value;
    onUpload(filePath); // Pass the file path back to the parent component
  };

  return (
    <div>
      <label className="block text-gray-700">Enter Image Path</label>
      <input
        type="text"
        onChange={handleChange}
        placeholder="/public/image/image2.jpg"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default ReactPhotoUploader;
