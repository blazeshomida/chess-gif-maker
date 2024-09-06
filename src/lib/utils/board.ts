import type { Square } from "chess.js";

type CreateBoardOptions = {
  resolution: number;
  colors: {
    light: string;
    dark: string;
  };
};

export function createBoard({
  resolution,
  colors: { light, dark },
}: CreateBoardOptions) {
  const board = new OffscreenCanvas(resolution, resolution);
  const context = board.getContext("2d");
  const squareSize = resolution / 8;

  if (context) {
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        context.fillStyle =
          (Math.abs(rank - 8 + 1) + file) % 2 === 0 ? dark : light;
        context.fillRect(
          file * squareSize,
          rank * squareSize,
          squareSize,
          squareSize,
        );
      }
    }
  }

  return board;
}

export function squareToCoords(square: Square) {
  const [file, rank] = square;
  const x = file.charCodeAt(0) - "a".charCodeAt(0);
  const y = 8 - parseInt(rank);
  return { x, y };
}

export function coordsToSquare({ x, y }: { x: number; y: number }): Square {
  const file = String.fromCharCode(x + "a".charCodeAt(0));
  const rank = (8 - y).toString();
  return `${file}${rank}` as Square;
}
