import Tile from './Tile';

interface Props {
  images: [string, number][];
  onClick: (id: string) => void;
  dimension: number;
}
function Board({ images, onClick, dimension }: Props) {
  return (
    <div
      className="board"
      style={{ gridTemplateColumns: 'repeat(' + dimension + ', 1fr)' }}
    >
      {images.map((data, index) => (
        <Tile
          n={dimension}
          val={data[1]}
          key={'' + index}
          id={'' + index}
          img={data[0]}
          onClick={onClick}
        ></Tile>
      ))}
    </div>
  );
}

export default Board;
