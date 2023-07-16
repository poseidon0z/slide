import Board from "./components/Board";

import ImageSplitter from "./scripts/ImageSplitter.ts";
import square from "/src/assets/square.avif";
import "./App.css";

function App() {
  ImageSplitter(square);
  return <Board />;
}

export default App;
