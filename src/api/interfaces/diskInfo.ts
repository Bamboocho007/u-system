export enum InnerDiskType {
  HDD = "HDD",
  SSD = "SSD",
  Unknown = "Unknown",
}

export interface DiskInfo {
  available_space: number;
  file_system: string;
  is_removable: boolean;
  mount_point: string;
  name: string;
  total_space: number;
  type_: InnerDiskType;
}
