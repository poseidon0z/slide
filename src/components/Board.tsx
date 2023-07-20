import Tile from "./Tile";
import Button from "./Button";
import transparent from "/src/assets/transparent.png";
import { useState } from "react";

interface Props {
  emp_tile: number;
  images: string[];
}

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

function shuffle(
  dimension: number,
  empty: number,
  imgs: [string, number][]
): [[string, number][], number] {
  const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]; // Up, Down, Left, Right
  // Shuffle the puzzle using Fisher-Yates algorithm
  var emptyRow = Math.floor(empty / 3);
  var emptyCol = empty % 3;
  var numSwaps = 100; // Number of random swaps to perform

  while (numSwaps > 0) {
    const randomDirection = Math.floor(Math.random() * 4); // Randomly select a direction (0: Up, 1: Down, 2: Left, 3: Right)
    const newRow = emptyRow + DIRECTIONS[randomDirection][0];
    const newCol = emptyCol + DIRECTIONS[randomDirection][1];

    if (
      newRow >= 0 &&
      newRow < dimension &&
      newCol >= 0 &&
      newCol < dimension
    ) {
      // console.log(emptyRow, emptyCol);
      // Swap the empty cell with the neighbor
      const temp = imgs[emptyRow * dimension + emptyCol];
      imgs[emptyRow * dimension + emptyCol] = imgs[newRow * dimension + newCol];
      imgs[newRow * dimension + newCol] = temp;

      emptyRow = newRow;
      emptyCol = newCol;
      numSwaps--;
    }
  }
  const emp = emptyCol + emptyRow * 3;
  return [imgs, emp];
}

function Board({ emp_tile, images }: Props) {
  const dimension = 3;
  const [empty, setEmpty] = useState(dimension * dimension - 1);
  const [finished, setFinished] = useState(false);

  var img_orig: [string, number][] = images.map((data, index) => [data, index]);
  img_orig[emp_tile] = [transparent, empty];
  const [img, setImg] = useState<[string, number][]>(img_orig);
  const [count, setCount] = useState(0);
  const onClickStart = () => {
    const [img, e] = shuffle(dimension, empty, img_orig);
    setImg([...img]);
    setEmpty(e);
    // console.log("Empty is:", e);
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
    // console.log("empty is: " + e);
    setEmpty(e);
    setCount(count + 1);
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
        <div className="board-bottom">
          <Button selected="action-btn shuffle-btn" clickHandler={onClickStart}>
            Shuffle!
          </Button>
          <h3>Total moves: {count}</h3>
        </div>
      </>
    );
  } else {
    return <div>Finished in {count} moves!</div>;
  }
}

export default Board;
