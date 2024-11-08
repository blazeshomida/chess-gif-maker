import type { Piece } from "chess.js";
import { Show } from "solid-js";
import { useSettings } from "./settings-provider";
import { getPieceImg } from "~/lib/utils/board";

export function Square(props: {
  piece: Piece | null;
  currentColor: "light" | "dark";
}) {
  const { state } = useSettings();
  const path = () =>
    props.piece
      ? getPieceImg({
          piece: props.piece,
          pieceSet: state.pieceSet,
        })
      : null;

  return (
    <div
      class="grid aspect-square size-full place-content-center"
      style={{
        "background-color": state.colors[props.currentColor],
      }}
    >
      <Show when={path()}>
        {(path) => <img src={path()} alt="Piece" class="size-full" />}
      </Show>
    </div>
  );
}
