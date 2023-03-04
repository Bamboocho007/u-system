// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sysinfo::{
    ComponentExt, CpuExt, CpuRefreshKind, NetworkExt, NetworksExt, ProcessExt, RefreshKind, System,
    SystemExt,
};

#[tauri::command]
fn sys_info() -> String {
    // let mut sys = System::new_all();
    let mut sys =
        System::new_with_specifics(RefreshKind::new().with_cpu(CpuRefreshKind::everything()));
    sys.refresh_all();
    sys.refresh_cpu();

    let core_count = sys.physical_core_count();
    let used_swap = sys.used_swap();
    let used_memory = sys.used_memory();
    let total_swap = sys.total_swap();
    let os_version = sys.os_version();

    let global_cpu_info = sys.global_cpu_info();
    let cpu_brand = global_cpu_info.brand();
    let cpu_frequency = global_cpu_info.frequency();
    let cpu_name = global_cpu_info.name();

    // to get components temperature
    let components = sys.components();

    format!(
        "total memory = {}, used_memory = {}, sys name = {}",
        sys.total_memory(),
        sys.used_memory(),
        sys.name().unwrap()
    )
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![sys_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
