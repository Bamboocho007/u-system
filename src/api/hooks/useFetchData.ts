import { invoke } from "@tauri-apps/api/tauri";
import { Accessor, createSignal, onMount } from "solid-js";

export default function useFetchData<T>(fetchKey: string): {
  data: Accessor<T | undefined>;
  refetch: () => Promise<void>;
} {
  const [data, setData] = createSignal<T | undefined>(undefined);
  const refetch = async () => {
    const awaited = await invoke<T>(fetchKey);
    setData(() => awaited);
  };

  onMount(() => refetch());

  return { data, refetch };
}
