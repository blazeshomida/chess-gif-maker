import { Select as _Select } from "@kobalte/core/select";
import { SettingsProvider } from "~/components/settings-provider";
import { SettingsPanel } from "~/components/settings-panel";
import { BoardPreview } from "~/components/board-preview";

export default function Home() {
  return (
    <SettingsProvider>
      <main class="grid min-h-dvh lg:grid-cols-[2fr_1fr]">
        <BoardPreview />
        <SettingsPanel />
      </main>
    </SettingsProvider>
  );
}
