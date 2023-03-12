export enum ThreadStatus {
  /// Thread is running normally.
  Running = "Running",
  /// Thread is stopped.
  Stopped = "Stopped",
  /// Thread is waiting normally.
  Waiting = "Waiting",
  /// Thread is in an uninterruptible wait
  Uninterruptible = "Uninterruptible",
  /// Thread is halted at a clean point.
  Halted = "Halted",
  /// Unknown.
  Unknown = "Unknown",
}

export enum ProcessStatus {
  Dead = "Dead",
  Idle = "Idle",
  LockBlocked = "LockBlocked",
  Parked = "Parked",
  Run = "Run",
  Sleep = "Sleep",
  Stop = "Stop",
  Tracing = "Tracing",
  UninterruptibleDiskSleep = "UninterruptibleDiskSleep",
  Unknown = "Unknown",
  Wakekill = "Wakekill",
  Waking = "Waking",
  Zombie = "Zombie",
}

export interface ProcessInfo {
  pid: string;
  memory: number;
  run_time: number;
  start_time: number;
  virtual_memory: number;
  cmd: string[];
  cpu_usage: number;
  cwd: string;
  disk_usage: DiskUsage;
  environ: string[];
  exe: string;
  group_id?: string;
  name: string;
  root: string;
  session_id?: string;
  thread_status: ThreadStatus;
  status: ProcessStatus;
}

export interface DiskUsage {
  /// Total number of written bytes.
  total_written_bytes: number;
  /// Number of written bytes since the last refresh.
  written_bytes: number;
  /// Total number of read bytes.
  total_read_bytes: number;
  /// Number of read bytes since the last refresh.
  read_bytes: number;
}
