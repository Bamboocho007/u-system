import { For, JSX } from "solid-js";
import useListener from "../api/hooks/useListener";
import { NetworkInfo } from "../api/interfaces/networkInfo";

export default function Network(): JSX.Element {
  const network = useListener<NetworkInfo[]>("network-usage");

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Mac address</th>
          <th>Received</th>
          <th>Total received</th>
          <th>Transmitted</th>
          <th>Total transmitted</th>
        </tr>
      </thead>
      <For each={network()?.payload} fallback={<div>Загрузка...</div>}>
        {(n) => (
          <tr>
            <td>{n.name}</td>
            <td>{n.mac_address.join(":")}</td>
            <td>{n.received}</td>
            <td>{n.total_received}</td>
            <td>{n.transmitted}</td>
            <td>{n.total_transmitted}</td>
          </tr>
        )}
      </For>
    </table>
  );
}
