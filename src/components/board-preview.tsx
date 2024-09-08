import { For, Show } from "solid-js";
import { getPieceSVG, queryPieceSVG, squareToCoords } from "~/lib/utils/board";
import { useSettings } from "./settings-provider";
import { Chess, SQUARES, type Piece, type Square } from "chess.js";
import { createQuery } from "@tanstack/solid-query";

export function BoardPreview() {
  const chess = new Chess();

  return (
    <div class="mx-auto grid aspect-square max-h-dvh w-full self-center lg:max-w-3xl">
      <div class="grid grid-cols-8 overflow-clip rounded">
        <For each={SQUARES}>
          {(square) => {
            const { x, y } = squareToCoords(square);
            const piece = chess.board()[y][x];
            return (
              <Square
                piece={piece}
                square={square}
                currentColor={chess.squareColor(square)!}
              />
            );
          }}
        </For>
      </div>
    </div>
  );
}

function Square(props: {
  square: Square;
  piece: Piece | null;
  currentColor: "light" | "dark";
}) {
  const { state } = useSettings();
  const query = queryPieceSVG({ piece: props.piece });

  return (
    <div
      class="grid aspect-square size-full place-content-center p-1"
      style={{
        "background-color": state.colors[props.currentColor],
      }}
    >
      <Show when={query.isSuccess}>
        <span innerHTML={query.data} />
      </Show>
    </div>
  );
}
