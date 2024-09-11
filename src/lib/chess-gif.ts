import type { Piece, Square } from "chess.js";

export class ChessGif {
  constructor() {}

  static squareToCoords(square: Square) {
    const [file, rank] = square;
    const x = file.charCodeAt(0) - "a".charCodeAt(0);
    const y = 8 - parseInt(rank);
    return { x, y };
  }

  static coordsToSquare({ x, y }: { x: number; y: number }): Square {
    const file = String.fromCharCode(x + "a".charCodeAt(0));
    const rank = (8 - y).toString();
    return `${file}${rank}` as Square;
  }

  static squareColor(square: Square) {
    const { x: file, y: rank } = ChessGif.squareToCoords(square);
    return (Math.abs(rank - 8 + 1) + file) % 2 === 0 ? "dark" : "light";
  }

  static getPieceSymbol(pieceSet: string, piece: Piece) {
    switch (pieceSet) {
      case "mono":
        return `${piece.type.toUpperCase()}`;
      case "disguised":
        return `${piece.color}`;
      default:
        return `${piece.color}${piece.type.toUpperCase()}`;
    }
  }
}
