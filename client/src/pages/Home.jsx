import AlbumUpload from '../components/AlbumUpload';
import Gallery from '../components/Gallery';
import HeroSection from '../components/HeroSection';

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-secondary uppercase">
                Amora AI - Wedding Gallery
            </h1>
            <HeroSection />
            <AlbumUpload />
            <Gallery />
        </div>
    );
};

export default Home;
