interface Props {
  id: string;
  img: string;
  onClick: (id: string) => void;
}

function Tile({ id, img, onClick }: Props) {
  return (
    <img
      className="tile"
      id={id}
      src={img}
      onClick={() => {
        onClick(id);
      }}
    ></img>
  );
}

export default Tile;
