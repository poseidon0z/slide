import MainPage from "./components/MainPage.tsx";
import ImageSplitter from "./scripts/ImageSplitter.ts";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import square from "/src/assets/square.avif";
import "./App.css";
import { useState, useEffect } from "react";
import Button from "./components/Button.tsx";
// import TryingReact2 from "./components/TryingReact2.tsx";


function App() {
  const [images, setImages] = useState<string[]>([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const images = await ImageSplitter(square);
      setImages(images);
    }

      fetchData();
  }, [started]);

  return (
    <Router basename="/slide">
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="heading-text">Slide!</h1>
                <Link to="/play">
                  <Button
                    selected="action-btn center"
                    clickHandler={() => setStarted(true)}
                  >
                    Start Slide!
                  </Button>
                </Link>
              </>
            }
          />
          <Route path="/play" element=
           {images.length === 0 ? <h1>Loading...</h1> :
          <MainPage empty={8} dimension={3} images={images} />
           }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;