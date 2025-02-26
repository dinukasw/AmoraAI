import { useState } from "react";

const mockImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1546804784-896d0dca3805", category: "Bride" },
  { id: 2, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a", category: "Groom" },
  { id: 3, src: "https://images.unsplash.com/photo-1519741497674-611481863552", category: "Couple Photos" },
  { id: 4, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc", category: "Group Photos" },
  { id: 5, src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6", category: "Ceremony" },
  { id: 6, src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff", category: "Bride" },
  { id: 8, src: "https://images.unsplash.com/photo-1529636798458-92182e662485", category: "Couple Photos" },
  { id: 9, src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed", category: "Group Photos" },
  { id: 10, src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a", category: "Ceremony" },
];

const categories = ["All", "Bride", "Groom", "Couple Photos", "Group Photos", "Ceremony"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages =
    selectedCategory === "All" ? mockImages : mockImages.filter((img) => img.category === selectedCategory);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Wedding Gallery</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === category ? "bg-secondary text-black" : "border-secondary border text-secondary hover:bg-gray-300"
            } transition-colors duration-200`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <div key={image.id} className="relative aspect-square group overflow-hidden rounded-lg shadow-md">
            <img
              src={image.src || "/placeholder.svg"}
              alt={`Wedding photo - ${image.category}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300" />
            <div className="absolute bottom-2 left-2  bg-opacity-75 px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {image.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}