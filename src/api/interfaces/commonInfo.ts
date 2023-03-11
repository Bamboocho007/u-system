export interface InternalLoadAvg {
  one: number;
  five: number;
  fifteen: number;
}

export interface CommonInfo {
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
