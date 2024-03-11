import Board from './Board.tsx';
import Button from './Button.tsx';

import transparent from '/src/assets/transparent.png';

import { useState, useEffect } from 'react';

interface Props {
  images: string[];
  empty: number;
  dimension: number;
}

function move(
  clicked: number,
  dimension: number,
  empty: number,
  state: [string, number][]
): [[string, number][], number] {
  if (clicked == empty) {
    return [state, empty];
  }

  const cx = clicked % dimension;
  const cy = Math.floor(clicked / dimension);
  const ex = empty % dimension;
  const ey = Math.floor(empty / dimension);

  if (cx != ex && cy != ey) {
    return [state, empty];
  }

  if (cy == ey) {
    if (cx > ex) {
      const eTile = state[empty];
      for (let i = empty; i < clicked; i++) {
        state[i] = state[i + 1];
      }
      state[clicked] = eTile;
    }

    if (cx < ex) {
      const eTile = state[empty];
      for (let i = empty; i > clicked; i--) {
        state[i] = state[i - 1];
      }
      state[clicked] = eTile;
    }
  }

  if (cx == ex) {
    if (cy > ey) {
      const eTile = state[empty];
      for (let i = empty; i < clicked; i += dimension) {
        state[i] = state[i + dimension];
      }
      state[clicked] = eTile;
    }

    if (cy < ey) {
      const eTile = state[empty];
      for (let i = empty; i > clicked; i -= dimension) {
        state[i] = state[i - dimension];
      }
      state[clicked] = eTile;
    }
  }

  return [state, clicked];
}

function shuffle(
  dimension: number,
  empty: number,
  state: [string, number][]
): [[string, number][], number] {
  const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]; // Up, Down, Left, Right

  var emptyRow = Math.floor(empty / dimension);
  var emptyCol = empty % dimension;
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
      const emptyIndex = emptyRow * dimension + emptyCol;
      const newIndex = newRow * dimension + newCol;

      const temp = state[emptyIndex];
      state[emptyIndex] = state[newIndex];
      state[newIndex] = temp;

      emptyRow = newRow;
      emptyCol = newCol;
      numSwaps--;
    }
  }

  const newEmpty = emptyCol + emptyRow * dimension;
  return [state, newEmpty];
}

function MainPage({ images, empty, dimension }: Props) {
  const [currentEmpty, setEmpty] = useState(empty);
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const handleArrow = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          if (event.shiftKey) {
            onClick(
              (
                (currentEmpty % dimension) +
                dimension * (dimension - 1)
              ).toString()
            );
            console.log(
              (
                (currentEmpty % dimension) +
                dimension * (dimension - 1)
              ).toString()
            );
          } else if (currentEmpty < dimension * dimension - dimension) {
            onClick(
              ((currentEmpty + dimension) % (dimension * dimension)).toString()
            );
          }
          break;
        case 'ArrowDown':
          if (event.shiftKey) {
            onClick((currentEmpty % dimension).toString());
          } else if (currentEmpty > dimension - 1) {
            onClick(
              ((currentEmpty - dimension) % (dimension * dimension)).toString()
            );
          }
          break;
        case 'ArrowLeft':
          if (event.shiftKey) {
            onClick(
              (
                Math.floor(currentEmpty / dimension) * dimension +
                dimension -
                1
              ).toString()
            );
          } else if ((currentEmpty + 1) % dimension != 0) {
            onClick(
              (
                Math.floor(currentEmpty / dimension) * dimension +
                ((currentEmpty + 1) % dimension)
              ).toString()
            );
          }
          break;
        case 'ArrowRight':
          if (event.shiftKey) {
            onClick(
              (Math.floor(currentEmpty / dimension) * dimension).toString()
            );
          } else if (currentEmpty % dimension != 0) {
            onClick(
              (
                Math.floor(currentEmpty / dimension) * dimension +
                ((currentEmpty - 1) % dimension)
              ).toString()
            );
          }
          break;
      }
    };
    window.addEventListener('keydown', handleArrow);

    return () => {
      window.removeEventListener('keydown', handleArrow);
    };
  }, [currentEmpty]);

  const solution: [string, number][] = images.map((data, index) => {
    return index == empty ? [transparent, index] : [data, index];
  });

  const [state, setState] = useState(solution);

  const checkSolved = (state: [string, number][]) => {
    var flag = true;
    for (let i = 0; i < dimension * dimension; i++) {
      if (state[i][1] != i) {
        flag = false;
        break;
      }
    }
    setSolved(flag);
  };

  const onClickShuffle = () => {
    const [shuffledState, newEmpty] = shuffle(dimension, currentEmpty, state);
    setState(shuffledState);
    setEmpty(newEmpty);
    setSolved(false);
    setMoves(0);
  };

  const onClick = (id: string) => {
    const [newState, newEmpty] = move(
      Number(id),
      dimension,
      currentEmpty,
      state
    );
    setState(newState);
    setEmpty(newEmpty);
    setMoves(moves + 1);
    checkSolved(newState);
  };

  if (solved) {
    return (
      <>
        <h1 className="heading-text">
          Congrats!
          <br />
          You finished in <span className="blue">{moves}</span> moves.
        </h1>
        <div className="board-bottom">
          <Button
            selected="action-btn shuffle-btn"
            clickHandler={onClickShuffle}
          >
            Shuffle again!
          </Button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Board images={state} onClick={onClick}></Board>
        <div className="board-bottom">
          <Button
            selected="action-btn shuffle-btn"
            clickHandler={onClickShuffle}
          >
            Shuffle!
          </Button>
          <h3>Total moves: {moves}</h3>
        </div>
      </>
    );
  }
}

export default MainPage;
