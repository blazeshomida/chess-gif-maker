import type { JSXElement } from "solid-js";

export function SettingsSectionLayout(props: {
  children: JSXElement;
  title: string;
}) {
  return (
    <div class="relative grid w-full gap-2">
      <span class="text-lg font-medium">{props.title}:</span>
      {props.children}
    </div>
  );
}
