import { invoke } from "@tauri-apps/api";
import { createSignal, JSX, onMount, Show } from "solid-js";

interface CpuInfo {
  core_count: number;
  brand: string;
  frequency: number;
  name: string;
  vendor_id: string;
}

export function Cpu(): JSX.Element {
  const [cpuInfo, setCpuInfo] = createSignal<CpuInfo | undefined>(undefined);

  onMount(async () => {
    setCpuInfo(await invoke<CpuInfo>("get_cpu_info"));
  });

  return (
    <Show when={cpuInfo()} keyed>
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
  );
}
