use serde::Serialize;
use std::str;
use sysinfo::{DiskExt, DiskType, System, SystemExt};

struct InnerDiskType(DiskType);

impl Serialize for InnerDiskType {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self.0 {
            DiskType::HDD => serializer.serialize_unit_variant("DiskType", 0, "HDD"),
            DiskType::SSD => serializer.serialize_unit_variant("DiskType", 0, "SSD"),
            DiskType::Unknown(_) => serializer.serialize_unit_variant("DiskType", 0, "Unknown"),
        }
    }
}

#[derive(Serialize)]
pub struct DiskInfo {
    available_space: u64,
    file_system: String,
    is_removable: bool,
    mount_point: String,
    name: String,
    total_space: u64,
    type_: InnerDiskType,
}

#[tauri::command]
pub fn get_disks_info() -> Vec<DiskInfo> {
    let mut sys = System::new_all();
    sys.refresh_disks();

    sys.disks()
        .iter()
        .map(|d| DiskInfo {
            available_space: d.available_space(),
            file_system: str::from_utf8(d.file_system()).unwrap_or("").to_string(),
            is_removable: d.is_removable(),
            mount_point: d.mount_point().clone().to_str().unwrap_or("").to_string(),
            name: d.name().clone().to_str().unwrap_or("").to_string(),
            total_space: d.total_space(),
            type_: InnerDiskType(d.type_()),
        })
        .collect()
}
