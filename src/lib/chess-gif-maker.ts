import type { Square } from "chess.js";

export class ChessGifMaker {
  #canvas;
  #context;
  #squareSize;
  #resolution;
  #colors;

  constructor(options: {
    resolution: number;
    colors: {
      light: string;
      dark: string;
    };
  }) {
    const { resolution, colors } = options;
    this.#resolution = resolution;
    this.#colors = colors;
    this.#squareSize = resolution / 8;
    this.#canvas = new OffscreenCanvas(resolution, resolution);
    this.#context = this.#canvas.getContext("2d");
  }

  #squareToCoords(square: Square) {
    const [file, rank] = square;
    const x = (file.charCodeAt(0) - "a".charCodeAt(0)) * this.#squareSize;
    const y = (8 - parseInt(rank)) * this.#squareSize;
    return { x, y };
  }
}
