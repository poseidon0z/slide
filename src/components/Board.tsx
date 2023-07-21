import Tile from "./Tile";

interface Props {
  images: [string, number][];
  onClick: (id: string) => void;
}
function Board({ images, onClick }: Props) {
  return (
    <div className="board">
      {images.map((data, index) => (
        <Tile
          key={"" + index}
          id={"" + index}
          img={data[0]}
          onClick={onClick}
        ></Tile>
      ))}
    </div>
  );
}

export default Board;
