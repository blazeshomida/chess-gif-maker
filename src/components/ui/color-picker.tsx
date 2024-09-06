import { splitProps, type ComponentProps, type ValidComponent } from "solid-js";
import { cn } from "~/lib/utils/cn";

type MergeProps<TComponent extends ValidComponent, TProps> = Omit<
  ComponentProps<TComponent>,
  keyof TProps
> &
  TProps;

type ColorPickerProps = MergeProps<
  "input",
  {
    label: string;
    class?: Partial<{
      input: string;
      label: string;
    }>;
  }
>;

export function ColorPicker(props: ColorPickerProps) {
  const [customProps, inputProps] = splitProps(props, ["label", "class"]);
  return (
    <div class="border-border grid h-10 w-full items-stretch overflow-clip rounded border">
      <input
        class={cn(
          "size-full cursor-pointer [grid-area:1/1]",
          customProps.class?.input,
        )}
        type="color"
        {...inputProps}
      />
      <div
        class="pointer-events-none flex size-full items-center justify-center gap-4 [grid-area:1/1]"
        style={{
          background:
            typeof inputProps.value === "string" ? inputProps.value : "initial",
        }}
      >
        <label
          class={cn("font-medium tracking-wide", customProps.class?.label)}
        >
          {customProps.label}
        </label>
      </div>
    </div>
  );
}
