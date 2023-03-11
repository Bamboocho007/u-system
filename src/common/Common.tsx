import { createSignal, onMount, Show } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";

interface InternalLoadAvg {
  one: number;
  five: number;
  fifteen: number;
}

interface CommonInfo {
  name?: string;
  long_os_version?: string;
  kernel_version?: string;
  uptime: number;
  distribution_id: string;
  load_average: InternalLoadAvg;
  boot_time: number;
  os_version: string;
  total_memory: number;
  available_memory: number;
  free_memory: number;
  used_memory: number;
  used_swap: number;
  total_swap: number;
  free_swap: number;
}

export default function Common() {
  const [commonInfo, setCommonInfo] = createSignal<CommonInfo | undefined>(
    undefined
  );

  onMount(async () =>
    setCommonInfo(await invoke<CommonInfo>("get_common_data"))
  );

  return (
    <div class="container">
      <div class="row">
        <img src="/" alt="processor" />
        <Show when={commonInfo()} keyed fallback={<div>Загрузка...</div>}>
          {(info) => (
            <div>
              <p class="row">
                <span class="row-label">Name</span>
                <span class="row-value">{info.name}</span>
              </p>
              <p class="row">
                <span class="row-label">Long os version</span>
                <span class="row-value">{info.long_os_version}</span>
              </p>
              <p class="row">
                <span class="row-label">Kernel version</span>
                <span class="row-value">{info.kernel_version}</span>
              </p>
              <p class="row">
                <span class="row-label">Uptime</span>
                <span class="row-value">{info.uptime}</span>
              </p>
              <p class="row">
                <span class="row-label">Distribution id</span>
                <span class="row-value">{info.distribution_id}</span>
              </p>
              <p class="row">
                <span class="row-label">Load average</span>
                <span class="row-value">
                  one {info.load_average.one}, five {info.load_average.five},
                  fifteen {info.load_average.fifteen},
                </span>
              </p>
              <p class="row">
                <span class="row-label">Boot time</span>
                <span class="row-value">{info.boot_time}</span>
              </p>
              <p class="row">
                <span class="row-label">Os version</span>
                <span class="row-value">{info.os_version}</span>
              </p>
              <p class="row">
                <span class="row-label">Total memory</span>
                <span class="row-value">{info.total_memory}</span>
              </p>
              <p class="row">
                <span class="row-label">Available memory</span>
                <span class="row-value">{info.available_memory}</span>
              </p>
              <p class="row">
                <span class="row-label">Free memory</span>
                <span class="row-value">{info.free_memory}</span>
              </p>
              <p class="row">
                <span class="row-label">Used_memory</span>
                <span class="row-value">{info.used_memory}</span>
              </p>
              <p class="row">
                <span class="row-label">Used swap</span>
                <span class="row-value">{info.used_swap}</span>
              </p>
              <p class="row">
                <span class="row-label">Total swap</span>
                <span class="row-value">{info.total_swap}</span>
              </p>
              <p class="row">
                <span class="row-label">Free swap</span>
                <span class="row-value">{info.free_swap}</span>
              </p>
            </div>
          )}
        </Show>
      </div>
    </div>
  );
}
