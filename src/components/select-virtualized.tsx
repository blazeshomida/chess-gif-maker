import { Select } from "@kobalte/core/select";
import { createVirtualizer } from "@tanstack/solid-virtual";
import { cn } from "~/lib/utils/cn";

interface Item<T> {
  value: T;
  label: string;
  disabled: boolean;
}

export function VirtualizedSelectContent<T extends Item<string>>(props: {
  options: T[];
  class?: Partial<{
    content: string;
    item: string;
  }>;
}) {
  let listboxRef: HTMLUListElement | undefined;
  const virtualizer = createVirtualizer({
    count: props.options.length,
    getScrollElement: () => listboxRef as HTMLUListElement | null,
    getItemKey: (index: number) => props.options[index].value,
    estimateSize: () => 64,
    overscan: 3,
  });
  return (
    <Select.Content
      class={cn(
        "relative z-50 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
        props.class?.content,
      )}
    >
      <Select.Listbox
        ref={listboxRef}
        scrollToItem={(key) =>
          virtualizer.scrollToIndex(
            props.options.findIndex((option) => option.value === key),
          )
        }
        class="m-0 p-1"
        style={{ height: "200px", width: "100%", overflow: "auto" }}
      />
    </Select.Content>
  );
}
