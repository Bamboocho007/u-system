import { For, JSX } from "solid-js";
import useFetchData from "../api/hooks/useFetchData";
import { DiskInfo } from "../api/interfaces/diskInfo";

export function Disks(): JSX.Element {
  const { data } = useFetchData<DiskInfo[]>("get_disks_info");

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Available space</th>
          <th>File system</th>
          <th>Is removable</th>
          <th>Mount point</th>
          <th>Total space</th>
          <th>Type</th>
        </tr>
      </thead>
      <For each={data()} fallback={<div>Загрузка...</div>}>
        {(d) => (
          <tr>
            <td>{d.name}</td>
            <td>{d.available_space}</td>
            <td>{d.file_system}</td>
            <td>{d.is_removable ? "Yes" : "No"}</td>
            <td>{d.mount_point}</td>
            <td>{d.total_space}</td>
            <td>{d.type_}</td>
          </tr>
        )}
      </For>
    </table>
  );
}
