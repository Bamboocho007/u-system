import { For } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { ComponentTemperature } from "../api/interfaces/componentTemperature";
import useListener from "../api/hooks/useListener";

export default function Temperatures(): JSX.Element {
  const components = useListener<ComponentTemperature[]>(
    "components-temperature"
  );

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
      <For each={components()?.payload} fallback={<div>Загрузка...</div>}>
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
