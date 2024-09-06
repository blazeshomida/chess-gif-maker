import type { JSX, JSXElement, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as SelectPrimitive from "@kobalte/core/select";
import { cn } from "~/lib/utils/cn";
import { Separator } from "@kobalte/core/separator";
import { createVirtualizer, type Virtualizer } from "@tanstack/solid-virtual";
import { createSignal, For } from "solid-js";

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectHiddenSelect = SelectPrimitive.HiddenSelect;

type SelectTriggerProps<T extends ValidComponent = "button"> =
  SelectPrimitive.SelectTriggerProps<T> & {
    class?: string | undefined;
    children?: JSX.Element;
  };

const SelectTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, SelectTriggerProps<T>>,
) => {
  const [local, others] = splitProps(props as SelectTriggerProps, [
    "class",
    "children",
  ]);
  return (
    <SelectPrimitive.Trigger
      class={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      {...others}
    >
      {local.children}
      <SelectPrimitive.Icon
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-4 opacity-50"
      >
        <path d="M8 9l4 -4l4 4" />
        <path d="M16 15l-4 4l-4 -4" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

type SelectContentProps<T extends ValidComponent = "div"> =
  SelectPrimitive.SelectContentProps<T> & { class?: string | undefined };

const SelectContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SelectContentProps<T>>,
) => {
  const [local, others] = splitProps(props as SelectContentProps, ["class"]);
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        class={cn(
          "relative z-50 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
          local.class,
        )}
        {...others}
      >
        <SelectPrimitive.Listbox class="m-0 p-1" />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

type SelectItemProps<T extends ValidComponent = "li"> =
  SelectPrimitive.SelectItemProps<T> & {
    class?: string | undefined;
    children?: JSX.Element;
  };

const SelectItem = <T extends ValidComponent = "li">(
  props: PolymorphicProps<T, SelectItemProps<T>>,
) => {
  const [local, others] = splitProps(props as SelectItemProps, [
    "class",
    "children",
  ]);
  return (
    <SelectPrimitive.Item
      class={cn(
        "relative mt-0 flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class,
      )}
      {...others}
    >
      <SelectPrimitive.ItemIndicator class="absolute right-2 flex size-3.5 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l5 5l10 -10" />
        </svg>
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemLabel>{local.children}</SelectPrimitive.ItemLabel>
    </SelectPrimitive.Item>
  );
};

type SelectSectionProps = {
  children: JSXElement;
};

const SelectSection = (props: SelectSectionProps) => {
  return (
    <div class="py-2">
      <SelectPrimitive.Section class="mb-2 px-2 font-medium">
        {props.children}
      </SelectPrimitive.Section>
      <Separator class="border-neutral-700" />
    </div>
  );
};

const SelectDescription = (props: { children: JSXElement }) => {
  return (
    <SelectPrimitive.Description class="text-sm text-neutral-500">
      {props.children}
    </SelectPrimitive.Description>
  );
};

interface Item<T> {
  value: T;
  label: string;
  disabled: boolean;
}

export function SelectContentVirtualized<T extends Item<string>>(props: {
  options: T[];
  class?: Partial<{
    content: string;
    item: string;
  }>;
}) {
  const [virtualizer, setVirtualizer] =
    createSignal<Virtualizer<HTMLUListElement, Element>>();
  return (
    <SelectPrimitive.Content
      class={cn(
        "relative z-50 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
        props.class?.content,
      )}
    >
      <SelectPrimitive.Listbox
        ref={(el) => {
          setVirtualizer(
            createVirtualizer({
              count: props.options.length,
              getScrollElement: () => el,
              getItemKey: (index: number) => props.options[index].value,
              estimateSize: () => 32,
              scrollPaddingStart: 8,
              scrollPaddingEnd: 8,
              overscan: 5,
            }),
          );
        }}
        scrollToItem={(key) =>
          virtualizer()?.scrollToIndex(
            props.options.findIndex((option) => option.value === key),
          )
        }
        class="m-0 p-1"
        style={{ height: "200px", width: "100%", overflow: "auto" }}
      >
        {(items) => (
          <div
            style={{
              height: `${virtualizer()?.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            <For each={virtualizer()?.getVirtualItems()}>
              {(virtualRow) => {
                const item = items().getItem(String(virtualRow.key));
                if (item) {
                  return (
                    <SelectItem
                      item={item}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <SelectPrimitive.ItemLabel>
                        {item.rawValue.label}
                      </SelectPrimitive.ItemLabel>
                    </SelectItem>
                  );
                }
              }}
            </For>
          </div>
        )}
      </SelectPrimitive.Listbox>
    </SelectPrimitive.Content>
  );
}

export {
  Select,
  SelectValue,
  SelectHiddenSelect,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSection,
  SelectDescription,
};
