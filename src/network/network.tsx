import { For, JSX } from "solid-js";
import useListener from "../api/hooks/useListener";
import { NetworkInfo } from "../api/interfaces/networkInfo";
import S from "./NetworkStyles.module.scss";

export default function Network(): JSX.Element {
  const network = useListener<NetworkInfo[]>("network-usage");

  return (
    <table class={S["network-table"]}>
      <thead>
        <tr class={S["head"]}>
          <th class={S["cell"]}>Name</th>
          <th class={S["cell"]}>Mac address</th>
          <th class={S["cell"]}>Received</th>
          <th class={S["cell"]}>Total received</th>
          <th class={S["cell"]}>Transmitted</th>
          <th class={S["cell"]}>Total transmitted</th>
        </tr>
      </thead>
      <tbody>
        <For each={network()?.payload} fallback={<div>Загрузка...</div>}>
          {(n, i) => (
            <tr class={i() % 2 === 0 ? S["odd"] : S["even"]}>
              <td class={S["cell"]}>{n.name}</td>
              <td class={S["cell"]}>{n.mac_address.join(":")}</td>
              <td class={S["cell"]}>{n.received}</td>
              <td class={S["cell"]}>{n.total_received}</td>
              <td class={S["cell"]}>{n.transmitted}</td>
              <td class={S["cell"]}>{n.total_transmitted}</td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
}
