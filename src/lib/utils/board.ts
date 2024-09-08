import {
  SQUARES,
  type Chess,
  type Color,
  type PieceSymbol,
  type Square,
} from "chess.js";
import { PIECE_SET_SVGS } from "../constants";
import { createQuery } from "@tanstack/solid-query";
import { useSettings } from "~/components/settings-provider";

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
  canvas: HTMLCanvasElement | OffscreenCanvas;
};

export function createBoard({
  resolution,
  colors: { light, dark },
  boardArray,
}: CreateBoardOptions) {
  const canvas = new OffscreenCanvas(resolution, resolution);
  const context = canvas.getContext("2d");
  const squareSize = resolution / 8;

  if (context) {
    SQUARES.forEach((square) => {
      const { x: file, y: rank } = squareToCoords(square);
      const piece = boardArray[rank][file];
      drawSquare({ context, file, rank, colors: { light, dark }, squareSize });
      if (piece) {
        drawPiece({
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
    });
  }

  return canvas;
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
  context.fillRect(
    file * squareSize,
    rank * squareSize,
    squareSize,
    squareSize,
  );
}

export function getPieceSymbol(pieceSet: string, piece: Piece) {
  return pieceSet === "mono"
    ? `${piece.type.toUpperCase()}`
    : `${piece.color}${piece.type.toUpperCase()}`;
}

export async function getPieceSVG({
  pieceSet,
  piece,
}: {
  pieceSet: string;
  piece: Piece;
}) {
  const pieceSymbol = piece ? getPieceSymbol(pieceSet, piece) : null;
  const path = `/src/assets/pieces/${pieceSet}/${pieceSymbol}.svg`;
  const content = (await PIECE_SET_SVGS[path]()) as string;
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "image/svg+xml");
  const svg = doc.querySelector("svg");
  if (!svg) {
    throw new Error(`SVG not found for ${path}`);
  }
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  const serializer = new XMLSerializer();
  return serializer.serializeToString(svg);
}

export function queryPieceSVG({ piece }: { piece: Piece | null }) {
  const { state } = useSettings();
  return createQuery(() => ({
    queryKey: ["piece", state.pieceSet, piece],
    queryFn: () => getPieceSVG({ pieceSet: state.pieceSet, piece: piece! }),
    enabled: !!piece,
  }));
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
  const svgContent = await getPieceSVG({ pieceSet, piece });
  if (!svgContent) return;

  // Convert SVG content to Blob and URL
  const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image(squareSize, squareSize);
  img.src = url;

  img.onload = () => {
    context.drawImage(
      img,
      file * squareSize,
      rank * squareSize,
      squareSize,
      squareSize,
    );
    URL.revokeObjectURL(url); // Clean up
  };

  img.onerror = (err) => {
    console.error("Error loading SVG:", err);
  };
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
