import { createEffect, createSignal, onCleanup, Show } from "solid-js";
import { createBoard } from "~/lib/utils/board";
import { useSettings } from "./settings-provider";
import { Skeleton } from "./ui/skeleton";
import { cn } from "~/lib/utils/cn";

export function BoardPreview() {
  let canvas: HTMLCanvasElement | undefined;
  const { state } = useSettings();
  const size = () => state.resolution;

  /* Set to true to include loading delay to avoid sudden flash */
  const [loading, setLoading] = createSignal(true);
  let loadingDelay = setTimeout(() => {
    if (loading()) setLoading(false);
  }, 500);

  onCleanup(() => {
    clearTimeout(loadingDelay);
  });

  createEffect(() => {
    const board = createBoard({
      resolution: size(),
      colors: { light: state.colors.light, dark: state.colors.dark },
    });
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        context.reset();
        context.drawImage(board, 0, 0);
      }
    }
  });

  return (
    <div class="mx-auto grid aspect-square max-h-dvh w-full self-center lg:max-w-3xl">
      <Show when={loading()}>
        <Skeleton class="aspect-square size-full" radius={4} />
      </Show>
      <canvas
        class={cn("aspect-square size-full", loading() && "hidden")}
        ref={canvas}
        width={size()}
        height={size()}
      ></canvas>
    </div>
  );
}
