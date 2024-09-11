import { Colors } from "./colors";
import { Delay } from "./delay";
import { Pgn } from "./pgn";
import { PieceSet } from "./piece-set";
import { Resolution } from "./resolution";
import { Button } from "./ui/button";

export function SettingsPanel() {
  return (
    <div class="grid grid-rows-[auto_1fr_auto] overflow-y-auto border-t bg-popover p-8 lg:max-h-dvh lg:border-l lg:border-t-0">
      <header>
        <h1 class="text-4xl font-semibold">Chess Gif Maker</h1>
      </header>
      <div class="flex flex-col gap-4 py-4">
        <Pgn />
        <Delay />
        <Resolution />
        <Colors />
        <PieceSet />
      </div>
      <footer>
        <Button class="w-full">Generate Gif</Button>
      </footer>
    </div>
  );
}
