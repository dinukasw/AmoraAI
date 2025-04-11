import { useState, useEffect } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Backend API URL
  const BASE_URL = "http://localhost:3000";

  // 🔹 Fetch categorized images from backend
  const fetchImages = async () => {
    setLoading(true);
    setError(""); // Reset error before fetching

    try {
      const categoryEndpoint =
        selectedCategory === "All"
          ? `${BASE_URL}/api/images`
          : `${BASE_URL}/api/images/${selectedCategory.toLowerCase()}`; // Ensure category matches backend

      const response = await fetch(categoryEndpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Error loading images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch images on component mount & when category changes
  useEffect(() => {
    fetchImages();
  }, [selectedCategory]);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Wedding Gallery</h2>

      {/* 🔹 Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["All", "bride", "groom", "Couples"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === category
                ? "bg-secondary text-black"
                : "border-secondary border text-secondary hover:bg-gray-300"
            } transition-colors duration-200`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 🔹 Show Loading Indicator */}
      {loading && <p className="text-center text-secondary">Loading images...</p>}

      {/* 🔹 Show Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* 🔹 Display Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image._id} className="relative aspect-square group overflow-hidden rounded-lg shadow-md">
              <img
                src={`${BASE_URL}${image.filepath}`} // Corrected file path
                alt={`Wedding photo - ${image.category}`}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300" />
              <div className="absolute bottom-2 left-2 bg-opacity-75 px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 text-white">
                {image.category}
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No images available.</p>
        )}
      </div>
    </div>
  );
}
