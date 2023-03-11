import { Accessor, createSignal, onCleanup } from "solid-js";
import { appWindow } from "@tauri-apps/api/window";
import { Event } from "@tauri-apps/api/event";

export default function useListener<T>(
  listenereKey: string
): Accessor<Event<T> | undefined> {
  const [data, setData] = createSignal<Event<T> | undefined>(undefined);

  const unsubscribe = appWindow.listen(listenereKey, (data: Event<T>) => {
    setData(data);
  });

  onCleanup(() => unsubscribe.then((u) => u()));

  return data;
}
