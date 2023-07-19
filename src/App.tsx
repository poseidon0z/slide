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
    return <Board emp_tile={8} />;
  } else {
    return (
      <Button
        selected="action-btn"
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
