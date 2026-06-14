import { useState } from "react";
import { AudioProvider } from "./context/AudioContext";
import Preloader from "./components/Preloader";
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GeminiFunnel from "./components/GeminiFunnel";
import GeminiTestimonials from "./components/GeminiTestimonials";

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    // AudioProvider wraps the entire app so every component can
    // access the single shared audio instance via useAudio()
    <AudioProvider>
      {/* The Awwwards-style Enter Experience Overlay */}
      {!hasEntered && <Preloader onComplete={() => setHasEntered(true)} />}

      <main
        className="relative min-h-screen w-screen overflow-x-hidden"
        style={{ background: "#080808" }}
      >
        <NavBar />
        <Hero />
        <GeminiFunnel />
        <About />
        <Features />
        <Story />
        <Contact />
        <GeminiTestimonials />
        <Footer />
      </main>
    </AudioProvider>
  );
}

export default App;
