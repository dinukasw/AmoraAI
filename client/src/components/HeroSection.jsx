import { useEffect, useState } from "react";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1519741497674-611481863552"
        alt="Wedding couple"
        className="object-cover w-full h-full  opacity-50"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />
      <div className="absolute inset-0  bg-opacity-30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="text-5xl md:text-7xl font-serif text-secondary text-center leading-tight"
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
        >
          Capturing Your
          <br />
          Perfect Moments
        </h1>
      </div>
    </div>
  );
}