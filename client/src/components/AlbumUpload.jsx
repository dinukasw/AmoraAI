import { useState } from "react";
import { Upload } from "lucide-react";

export default function AlbumUpload() {
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState([]); // To store categorized images

  const handleUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    // Create FormData to send images to backend
    const formData = new FormData();
    for (const file of files) {
      formData.append("images", file);
    }

    try {
      // Send images to the backend for classification
      const response = await fetch("http://localhost:3000/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload images");
      }

      // Get categorized images from backend response
      const data = await response.json();
      setResults(data.results); // Update state with categorized images
      alert("Images uploaded and categorized successfully!");
      console.log(results);
      
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error uploading images");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="my-8 p-6 py-8 bg-gray-100 rounded-lg text-secondary">
      <h2 className="text-2xl font-semibold mb-4">Upload Wedding Album</h2>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-secondary">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-secondary">PNG, JPG, or JPEG (MAX 5MB)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Show uploading status */}
      {uploading && <p className="mt-4 text-center text-secondary">Uploading...</p>}

      {/* Display Categorization Results */}
      {/* {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Categorized Images</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((result, index) => (
              <div key={index} className="relative aspect-square group overflow-hidden rounded-lg shadow-md">
                <img
                  src={`http://localhost:3000${result.filepath}`} // Display categorized image from backend
                  alt={`Wedding photo - ${result.category}`}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-2 left-2 bg-opacity-75 px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 text-white">
                  {result.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
