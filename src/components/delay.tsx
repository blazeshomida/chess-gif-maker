import {
  Slider,
  SliderLabel,
  SliderValueLabel,
  SliderTrack,
  SliderFill,
  SliderThumb,
} from "./ui/slider";
import { useSettings } from "./settings-provider";

export function Delay() {
  const { state, setState } = useSettings();
  const step = () => (state.delay < 1000 ? 50 : 100);
  return (
    <div class="grid gap-4">
      <Slider
        minValue={100}
        maxValue={5_000}
        step={step()}
        value={[state.delay]}
        onChange={([value]) => {
          if (value) setState("delay", value);
        }}
        class="grid gap-4"
        getValueLabel={(params) => {
          const isSeconds = params.values[0] >= 1000;
          return `${isSeconds ? params.values[0] / 1000 : params.values[0]} ${isSeconds ? "sec" : "ms"}`;
        }}
      >
        <div class="flex w-full items-center justify-between">
          <SliderLabel class="text-lg font-medium">Delay:</SliderLabel>
          <SliderValueLabel class="text-muted-foreground" />
        </div>
        <SliderTrack>
          <SliderFill />
          <SliderThumb />
        </SliderTrack>
      </Slider>
      <p class="text-sm text-neutral-500">Choose a delay between gif frames.</p>
    </div>
  );
}
