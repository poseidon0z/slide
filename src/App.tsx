import MainPage from "./components/MainPage.tsx";
import ImageSplitter from "./scripts/ImageSplitter.ts";
import square from "/src/assets/square.avif";
import "./App.css";
import { useState, useEffect } from "react";
import Button from "./components/Button.tsx";

function App() {
  const [images, setImages] = useState<string[]>([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      console.log("Called fetch");
      const images = await ImageSplitter(square);
      setImages(images);
    }
    if (started) {
      fetchData();
    }
  }, [started]);

  if (started) {
    if (images.length === 0) {
      return <h1>Loading...</h1>;
    } else {
      return <MainPage empty={8} dimension={3} images={images} />;
    }
  } else {
    return (
      <>
        <h1 className="game-name">Slide!</h1>
        <Button
          selected="action-btn"
          clickHandler={() => {
            setStarted(true);
          }}
        >
          Start Slide!
        </Button>
      </>
    );
  }
}

export default App;
