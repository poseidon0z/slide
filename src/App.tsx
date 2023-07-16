import Board from "./components/Board";

import ImageSplitter from "./scripts/ImageSplitter.ts";
import square from "/src/assets/square.avif";
import "./App.css";
import { useState } from "react";
import Button from "./components/Button.tsx";

function App() {
  ImageSplitter(square);
  const [started, setStarted] = useState(false);
  if (started) {
    return <Board />;
  } else {
    return (
      <Button
        selected="btn-success"
        clickHandler={() => {
          setStarted(true);
        }}
      >
        Start Slide!
      </Button>
    );
  }
}

export default App;
