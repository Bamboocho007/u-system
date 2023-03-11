// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod componets;
use componets::{
    common::get_common_data,
    cpu::{get_cpu_info, init_cpu_usege},
    temperatures::init_temperatures_info,
};

fn main() {
    tauri::Builder::default()
        .on_page_load(|window, _payload| {
            init_temperatures_info(&window);
            init_cpu_usege(&window);
        })
        .invoke_handler(tauri::generate_handler![get_cpu_info, get_common_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
