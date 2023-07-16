import Tile from "./Tile";
import Button from "./Button";
import { useState } from "react";

function move(
  clicked: number,
  dimension: number,
  empty: number,
  imgs: [string, number][]
): [[string, number][], number] {
  if (clicked == empty) {
    return [imgs, empty];
  }

  const cx = clicked % dimension;
  const cy = Math.floor(clicked / dimension);
  const ex = empty % dimension;
  const ey = Math.floor(empty / dimension);

  //console.log(cx, cy, ex, ey);

  if (cx != ex && cy != ey) {
    return [imgs, empty];
  }

  if (cy == ey) {
    if (cx > ex) {
      const eTile = imgs[empty];
      for (let i = empty; i < clicked; i++) {
        imgs[i] = imgs[i + 1];
      }
      imgs[clicked] = eTile;
    }

    if (cx < ex) {
      const eTile = imgs[empty];
      for (let i = empty; i > clicked; i--) {
        imgs[i] = imgs[i - 1];
      }
      imgs[clicked] = eTile;
    }
  }

  if (cx == ex) {
    if (cy > ey) {
      const eTile = imgs[empty];
      for (let i = empty; i < clicked; i += dimension) {
        imgs[i] = imgs[i + dimension];
      }
      imgs[clicked] = eTile;
    }

    if (cy < ey) {
      const eTile = imgs[empty];
      for (let i = empty; i > clicked; i -= dimension) {
        imgs[i] = imgs[i - dimension];
      }
      imgs[clicked] = eTile;
    }
  }

  return [imgs, clicked];
}

function Board() {
  const dimension = 3;
  const [empty, setEmpty] = useState(dimension * dimension - 1);
  const [img, setImg] = useState<[string, number][]>([]);
  const [finished, setFinished] = useState(false);

  var img_orig: [string, number][] = [];
  for (let i = 0; i < dimension * dimension; i++) {
    let data = sessionStorage.getItem("img" + i);
    if (data === null) {
      data = "src/assets/square.jpg";
    }
    img_orig[i] = [data, i];
  }
  img_orig[empty] = ["src/assets/transparent.png", empty];

  const onClickStart = () => {
    setImg([...img_orig]);
  };

  function checkFinished() {
    var flag = true;
    for (let i = 0; i < 9; i++) {
      if (img[i][1] != i) {
        flag = false;
      }
    }
    if (flag == true) {
      setFinished(true);
    }
  }

  const onClick = (id: string) => {
    //console.log("Clicked position  " + id + " with id " + img[Number(id)][1]);

    const [imgs, e] = move(Number(id), dimension, empty, img);

    setImg([...imgs]);

    // img.forEach((i) => {
    //   console.log(i[1]);
    // });

    setEmpty(e);
    checkFinished();
  };

  if (!finished) {
    return (
      <>
        <div className="board">
          {img.map((data, index) => (
            <Tile
              key={"" + index}
              id={"" + index}
              img={data[0]}
              onClick={onClick}
            ></Tile>
          ))}
        </div>
        <Button selected="start-btn" clickHandler={onClickStart}>
          Start
        </Button>
      </>
    );
  } else {
    return <div>Finished...</div>;
  }
}

export default Board;
