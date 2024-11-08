import {
  Chess,
  SQUARES,
  type Color,
  type PieceSymbol,
  type Square,
} from "chess.js";

// @ts-ignore
import GIF from "gif.js.optimized";

type ChessGifOptions = {
  resolution: number;
  delay: number;
  pgn: string;
  pieceSet: string;
  colors: {
    light: string;
    dark: string;
  };
  side: Color;
  loop?: number; // Optional: number of times to loop the animation (-1 for no repeat, 0 for infinite)
};

export class ChessGifMaker {
  private options: ChessGifOptions;
  private squareSize: number;
  private pieceImages: Record<Color, Record<PieceSymbol, ImageBitmap | null>> =
    {
      w: { p: null, n: null, b: null, r: null, q: null, k: null },
      b: { p: null, n: null, b: null, r: null, q: null, k: null },
    };
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private boardBitmap: ImageBitmap | null = null;

  constructor(options: ChessGifOptions) {
    this.options = options;
    this.squareSize = options.resolution / 8;
    this.canvas = document.createElement("canvas");
    this.canvas.width = options.resolution;
    this.canvas.height = options.resolution;
    this.context = this.canvas.getContext("2d", {
      willReadFrequently: true,
    })!;
  }

  private async init() {
    await this.loadPieceImages();
    await this.cacheBoard(); // Cache the board once after loading images
  }

  private async loadPieceImages() {
    const promises = (["w", "b"] as Color[]).flatMap((color) =>
      (["p", "n", "b", "r", "q", "k"] as PieceSymbol[]).map(async (type) => {
        const { filename } = getPieceInfo({
          type,
          color,
        });
        const response = await fetch(
          `/assets/pieces/${this.options.pieceSet}/pngs/${filename}.png`,
        );
        const blob = await response.blob();
        const imageBitmap = await createImageBitmap(blob);
        this.pieceImages[color][type] = imageBitmap;
      }),
    );
    await Promise.all(promises);
  }

  private async cacheBoard() {
    (this.options.side === "w" ? SQUARES : SQUARES.reverse()).forEach(
      (square) => this.drawSquare(square),
    );
    this.boardBitmap = await createImageBitmap(this.canvas);
    this.context.clearRect(
      0,
      0,
      this.options.resolution,
      this.options.resolution,
    );
  }

  private drawSquare(square: Square) {
    const [rank, file] = this.getSquareCoords(square);
    const color = this.getSquareColor(square);
    this.context.fillStyle = this.options.colors[color];
    this.context.fillRect(
      file * this.squareSize,
      rank * this.squareSize,
      this.squareSize,
      this.squareSize,
    );
  }

  private drawPiece(
    square: Square,
    { type, color }: { type: PieceSymbol; color: Color },
  ) {
    const [rank, file] = this.getSquareCoords(square);
    const pieceImg = this.pieceImages[color][type];
    if (pieceImg) {
      this.context.drawImage(
        pieceImg,
        file * this.squareSize,
        rank * this.squareSize,
        this.squareSize,
        this.squareSize,
      );
    }
  }

  private getSquareColor(square: Square): "light" | "dark" {
    const file = square.charCodeAt(0) - "a".charCodeAt(0);
    const rank = parseInt(square[1]!, 10) - 1;
    const isDark = (file + rank) % 2 === 1;

    return isDark ? "light" : "dark";
  }

  private getSquareCoords(square: Square): [number, number] {
    const file = square.charCodeAt(0) - "a".charCodeAt(0);
    const rank = 8 - parseInt(square[1]!, 10);

    return this.options.side === "b" ? [7 - rank, 7 - file] : [rank, file];
  }

  private renderFrame(fen: string) {
    this.context.clearRect(
      0,
      0,
      this.options.resolution,
      this.options.resolution,
    );

    if (this.boardBitmap) {
      this.context.drawImage(this.boardBitmap, 0, 0);
    }

    const chess = new Chess(fen);
    chess.board().forEach((row) =>
      row.forEach((piece) => {
        if (piece) {
          this.drawPiece(piece.square, piece);
        }
      }),
    );
  }

  async generateGif() {
    await this.init();

    const gif = new GIF({
      workers: 4,
      quality: 10,
      delay: this.options.delay,
      width: this.options.resolution,
      height: this.options.resolution,
      repeat: this.options.loop ?? 0, // Looping: 0 for infinite
    });

    const chess = new Chess();
    chess.loadPgn(this.options.pgn);
    const history = chess.history({ verbose: true });

    for (let i = 0; i <= history.length; i++) {
      const fen =
        i === history.length ? history.at(-1)!.after : history.at(i)!.before;
      this.renderFrame(fen);
      console.log("rendering frame", i);
      gif.addFrame(this.context, { delay: this.options.delay, copy: true });
    }

    gif.on("finished", (blob: Blob) => {
      window.open(URL.createObjectURL(blob));
    });

    gif.render();
  }
}

// Helper function to get piece image info
function getPieceInfo(piece: { type: PieceSymbol; color: Color }) {
  const filename = `${piece.color}${piece.type}`;
  return { filename };
}
