interface Props {
  n: number;
  val: number;
  id: string;
  img: string;
  onClick: (id: string) => void;
}

function Tile({ n, val, id, img, onClick }: Props) {
  return (
    <div
      className="tile"
      style={{
        width: (80 - n / 2 + 0.5) / n + 'vmin',
        height: (80 - n / 2 + 0.5) / n + 'vmin',
      }}
    >
      <div>
        <img
          className="tile-image"
          src={img}
          onClick={() => {
            onClick(id);
          }}
        />
      </div>
      <p className="val">{val + 1}</p>
    </div>
  );
}

export default Tile;
