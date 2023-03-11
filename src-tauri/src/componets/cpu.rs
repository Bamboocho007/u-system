use serde::Serialize;
use std::time::Duration;
use sysinfo::{CpuExt, System, SystemExt};
use tauri::Window;

#[derive(Serialize)]
pub struct CpuInfo {
    core_count: usize,
    brand: String,
    frequency: u64,
    name: String,
    vendor_id: String,
}

#[derive(Serialize)]
pub struct CpuUsege {
    name: String,
    usage: f32,
}

#[tauri::command]
pub fn get_cpu_info() -> CpuInfo {
    let mut sys = System::new_all();
    sys.refresh_cpu();

    let global_cpu_info = sys.global_cpu_info();

    CpuInfo {
        core_count: sys.physical_core_count().unwrap_or(0),
        brand: global_cpu_info.brand().to_string(),
        frequency: global_cpu_info.frequency(),
        name: global_cpu_info.name().to_string(),
        vendor_id: global_cpu_info.vendor_id().to_string(),
    }
}

pub fn init_cpu_usege(window: &Window) {
    let mut sys = System::new_all();
    let window = window.clone();

    std::thread::spawn(move || loop {
        sys.refresh_cpu();
        let cpu_usage: Vec<CpuUsege> = sys
            .cpus()
            .iter()
            .map(|c| CpuUsege {
                name: c.name().to_string(),
                usage: c.cpu_usage(),
            })
            .collect();
        window.emit("cpu-usage", &cpu_usage).unwrap();
        std::thread::sleep(Duration::from_secs(1));
    });
}
