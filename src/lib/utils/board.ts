import { SQUARES, type Chess, type Color, type PieceSymbol } from "chess.js";
import { ChessGif } from "../chess-gif";

type BoardArray = ReturnType<(typeof Chess)["prototype"]["board"]>;
type Piece = {
  type: PieceSymbol;
  color: Color;
};

type CreateBoardOptions = {
  resolution: number;
  colors: {
    light: string;
    dark: string;
  };
  boardArray: BoardArray;
};

export async function createBoard({
  resolution,
  colors: { light, dark },
  boardArray,
}: CreateBoardOptions) {
  const canvas = new OffscreenCanvas(resolution, resolution);
  const context = canvas.getContext("2d");
  const squareSize = resolution / 8;

  if (context) {
    await Promise.all(
      SQUARES.map(async (square) => {
        const { x: file, y: rank } = ChessGif.squareToCoords(square);
        const piece = boardArray[rank][file];
        drawSquare({
          context,
          file,
          rank,
          colors: { light, dark },
          squareSize,
        });
        if (piece) {
          await drawPiece({
            context,
            file,
            rank,
            squareSize,
            piece: {
              type: piece.type,
              color: piece.color,
            },
            pieceSet: "alpha",
          });
        }
      }),
    );
  }

  const blob = await canvas.convertToBlob();
  const url = URL.createObjectURL(blob);
  window.open(url);
}

function drawSquare({
  context,
  file,
  rank,
  squareSize,
  colors: { light, dark },
}: {
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  file: number;
  rank: number;
  colors: {
    light: string;
    dark: string;
  };
  squareSize: number;
}) {
  context.fillStyle = (Math.abs(rank - 8 + 1) + file) % 2 === 0 ? dark : light;
  console.log(dark);
  context.fillRect(
    file * squareSize,
    rank * squareSize,
    squareSize,
    squareSize,
  );
}

export function getPieceImg({
  pieceSet,
  piece,
}: {
  pieceSet: string;
  piece: Piece;
}) {
  const pieceSymbol = piece ? ChessGif.getPieceSymbol(pieceSet, piece) : null;
  const path = `/assets/pieces/${pieceSet}/pngs/${pieceSymbol}.png`;
  return path;
}

async function drawPiece({
  context,
  file,
  rank,
  squareSize,
  pieceSet,
  piece,
}: {
  context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  file: number;
  rank: number;
  squareSize: number;
  pieceSet: string;
  piece: Piece;
}) {
  const path = getPieceImg({ pieceSet, piece });
  if (!path) return;

  const img = new Image(squareSize, squareSize);
  img.src = path;

  return new Promise((resolve, reject) => {
    img.onload = () => {
      context.drawImage(
        img,
        file * squareSize,
        rank * squareSize,
        squareSize,
        squareSize,
      );
      resolve(img);
    };

    img.onerror = (err) => {
      reject(err);
    };
  });
}
