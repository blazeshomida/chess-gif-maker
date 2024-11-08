import { Chess } from "chess.js";
import { BoardPreview } from "~/components/board-preview";
import { SettingsPanel } from "~/components/settings-panel";
import { SettingsProvider } from "~/components/settings-provider";

export default function Home() {
  const chess = new Chess();

  return (
    <SettingsProvider>
      <main class="grid min-h-dvh lg:grid-cols-[2fr_1fr]">
        <BoardPreview />
        <SettingsPanel />
      </main>
    </SettingsProvider>
  );
}
