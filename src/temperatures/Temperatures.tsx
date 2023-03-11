import { createSignal, For, onCleanup } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { appWindow } from "@tauri-apps/api/window";
import { Event } from "@tauri-apps/api/event";

interface ComponentTemperature {
  max: number;
  critical: number | null;
  temperature: number;
  label: string;
}

export default function Temperatures(): JSX.Element {
  const [components, setComponents] = createSignal<
    ComponentTemperature[] | undefined
  >(undefined);

  const unsubscribe = appWindow.listen(
    "components-temperature",
    (data: Event<ComponentTemperature[]>) => {
      setComponents(data.payload);
    }
  );

  onCleanup(() => unsubscribe.then((u) => u()));

  return (
    <table>
      <thead>
        <tr>
          <th>label</th>
          <th>Temperature</th>
          <th>Max</th>
          <th>Critical</th>
        </tr>
      </thead>
      <For each={components()} fallback={<div>Загрузка...</div>}>
        {(c) => (
          <tr>
            <td>{c.label}</td>
            <td>{c.temperature}</td>
            <td>{c.max}</td>
            <td>{c.critical || "N/A"}</td>
          </tr>
        )}
      </For>
    </table>
  );
}
