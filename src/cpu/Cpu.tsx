import { For, JSX, Show } from "solid-js";
import { CpuInfo, CpuUsege } from "../api/interfaces/cpuInfo";
import useListener from "../api/hooks/useListener";
import useFetchData from "../api/hooks/useFetchData";

export function Cpu(): JSX.Element {
  const { data } = useFetchData<CpuInfo>("get_cpu_info");
  const cpuUsage = useListener<CpuUsege[]>("cpu-usage");

  return (
    <>
      <Show when={data()} keyed>
        {(info) => (
          <div>
            <p class="row">
              <span class="row-label">Name</span>
              <span class="row-value">{info.name}</span>
            </p>
            <p class="row">
              <span class="row-label">Brand</span>
              <span class="row-value">{info.brand}</span>
            </p>
            <p class="row">
              <span class="row-label">Core count</span>
              <span class="row-value">{info.core_count}</span>
            </p>
            <p class="row">
              <span class="row-label">Frequency</span>
              <span class="row-value">{info.frequency}</span>
            </p>
            <p class="row">
              <span class="row-label">Vendor id</span>
              <span class="row-value">{info.vendor_id}</span>
            </p>
          </div>
        )}
      </Show>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Usage</th>
          </tr>
        </thead>
        <For each={cpuUsage()?.payload} fallback={<div>Загрузка...</div>}>
          {(c) => (
            <tr>
              <td>{c.name}</td>
              <td>{c.usage}</td>
            </tr>
          )}
        </For>
      </table>
    </>
  );
}
