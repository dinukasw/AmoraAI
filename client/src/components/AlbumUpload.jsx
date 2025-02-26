import { useState } from "react";
import { Upload } from "lucide-react";

export default function AlbumUpload() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);

    // Simulating upload process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setUploading(false);
    alert(`${files.length} images uploaded successfully!`);
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
            <p className="text-xs text-secondary">PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>
      {uploading && <p className="mt-4 text-center text-secondary">Uploading...</p>}
    </div>
  );
}