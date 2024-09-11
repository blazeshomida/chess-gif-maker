import type { Piece } from "chess.js";
import { Show } from "solid-js";
import { queryPieceSVG } from "~/lib/utils/board";
import { useSettings } from "./settings-provider";

export function Square(props: {
  piece: Piece | null;
  currentColor: "light" | "dark";
}) {
  const { state } = useSettings();
  const query = queryPieceSVG({ piece: props.piece });

  return (
    <div
      class="grid aspect-square size-full place-content-center"
      style={{
        "background-color": state.colors[props.currentColor],
      }}
    >
      <Show when={query.isSuccess}>
        <span
          class="opacity-0"
          style={{
            animation: "fade 150ms ease-in-out forwards",
          }}
          innerHTML={query.data}
        />
      </Show>
    </div>
  );
}
