import { For } from "solid-js";
import { Chess, SQUARES } from "chess.js";
import { Square } from "./square";
import { ChessGif } from "~/lib/chess-gif";

export function BoardPreview() {
  const chess = new Chess();

  return (
    <div class="mx-auto grid aspect-square max-h-dvh w-full self-center lg:max-w-3xl">
      <div class="grid grid-cols-8 overflow-clip rounded">
        <For each={SQUARES}>
          {(square) => {
            const { x, y } = ChessGif.squareToCoords(square);
            const piece = chess.board()[y][x];
            return (
              <Square piece={piece} currentColor={ChessGif.squareColor(square)!} />
            );
          }}
        </For>
      </div>
    </div>
  );
}
