import { ChessGifMaker } from "~/lib/chess-gif-maker";
import { Colors } from "./colors";
import { Delay } from "./delay";
import { Pgn } from "./pgn";
import { PieceSet } from "./piece-set";
import { Resolution } from "./resolution";
import { useSettings } from "./settings-provider";
import { SidePicker } from "./side-picker";
import { Button } from "./ui/button";

export function SettingsPanel() {
  return (
    <div class="grid grid-rows-[auto_1fr_auto] overflow-y-auto border-t bg-popover p-8 lg:max-h-dvh lg:border-l lg:border-t-0">
      <header>
        <h1 class="text-4xl font-semibold">Chess Gif Maker</h1>
      </header>
      <div class="flex flex-col gap-4 py-4">
        <Pgn />
        <SidePicker />
        <Delay />
        <Resolution />
        <Colors />
        <PieceSet />
      </div>
      <footer>
        <GenerateButton />
      </footer>
    </div>
  );
}

function GenerateButton() {
  const { state } = useSettings();
  return (
    <Button
      class="w-full"
      onClick={async () => {
        const gifMaker = new ChessGifMaker({
          pgn: state.pgn,
          resolution: state.resolution,
          colors: state.colors,
          delay: state.delay,
          pieceSet: state.pieceSet,
          side: state.side,
        });

        await gifMaker.generateGif();
      }}
    >
      Generate Gif
    </Button>
  );
}
