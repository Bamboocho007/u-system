import { For, JSX } from "solid-js";
import useListener from "../api/hooks/useListener";
import { ProcessInfo } from "../api/interfaces/processes";

export function Processes(): JSX.Element {
  const processes = useListener<ProcessInfo[]>("processes-usage");

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Pid</th>
          <th>Group id</th>
          <th>Session id</th>
          <th>Memory</th>
          <th>Cpu usage</th>
          <th>Run time</th>
          <th>Start time</th>
          <th>Cmd</th>
          <th>Cwd</th>
          <th>Environ</th>
          <th>Exe</th>
          <th>Root</th>
          <th>Disk usage(r/r total/w/w total)</th>
          <th>Thread status</th>
          <th>Status</th>
        </tr>
      </thead>
      <For each={processes()?.payload} fallback={<div>Загрузка...</div>}>
        {(p) => (
          <tr>
            <td>{p.name}</td>
            <td>{p.pid}</td>
            <td>{p.group_id}</td>
            <td>{p.session_id}</td>
            <td>{p.memory}</td>
            <td>{p.cpu_usage}</td>
            <td>{p.run_time}</td>
            <td>{p.start_time}</td>
            <td>{p.cmd.join("/")}</td>
            <td>{p.cwd}</td>
            <td>{p.environ.join("??")}</td>
            <td>{p.exe}</td>
            <td>{p.root}</td>
            <td>
              <span>{p.disk_usage.read_bytes}</span>
              <span>{p.disk_usage.total_read_bytes}</span>
              <span>{p.disk_usage.written_bytes}</span>
              <span>{p.disk_usage.total_written_bytes}</span>
            </td>
            <td>{p.thread_status}</td>
            <td>{p.status}</td>
          </tr>
        )}
      </For>
    </table>
  );
}
