use serde::ser::{SerializeStruct, Serializer};
use serde::Serialize;
use sysinfo::{LoadAvg, System, SystemExt};

struct InternalLoadAvg(LoadAvg);

impl Serialize for InternalLoadAvg {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_struct("LoadAvg", 3)?;
        state.serialize_field("one", &self.0.one)?;
        state.serialize_field("five", &self.0.five)?;
        state.serialize_field("fifteen", &self.0.fifteen)?;
        state.end()
    }
}

#[derive(Serialize)]
pub struct CommonInfo {
    name: Option<String>,
    long_os_version: Option<String>,
    kernel_version: Option<String>,
    uptime: u64,
    distribution_id: String,
    load_average: InternalLoadAvg,
    boot_time: u64,
    os_version: String,
    total_memory: u64,
    available_memory: u64,
    free_memory: u64,
    used_memory: u64,
    used_swap: u64,
    total_swap: u64,
    free_swap: u64,
}

#[tauri::command]
pub fn get_common_data() -> CommonInfo {
    let mut sys = System::new_all();
    sys.refresh_all();

    CommonInfo {
        name: sys.name(),
        long_os_version: sys.long_os_version(),
        kernel_version: sys.kernel_version(),
        uptime: sys.uptime(),
        distribution_id: sys.distribution_id(),
        load_average: InternalLoadAvg(sys.load_average()),
        boot_time: sys.boot_time(),
        os_version: sys.os_version().unwrap_or(String::from("")),
        total_memory: sys.total_memory(),
        available_memory: sys.available_memory(),
        free_memory: sys.free_memory(),
        used_memory: sys.used_memory(),
        used_swap: sys.used_swap(),
        total_swap: sys.total_swap(),
        free_swap: sys.free_swap(),
    }
}
