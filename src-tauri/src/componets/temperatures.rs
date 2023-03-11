use std::{
    sync::{Arc, Mutex},
    time::Duration,
};

use serde::Serialize;
use sysinfo::{ComponentExt, System, SystemExt};
use tauri::Window;

#[derive(Serialize)]
pub struct ComponentTemperature {
    max: i32,
    critical: Option<i32>,
    temperature: i32,
    label: String,
}

pub fn init_temperatures_info(window: &Window) {
    let sys = Arc::new(Mutex::new(System::new_all()));
    let window = window.clone();

    std::thread::spawn(move || loop {
        let cloned_system = sys.clone();
        let mut system = cloned_system.lock().unwrap();
        system.refresh_components();
        let components = system.components();
        let component_temperatures: Vec<ComponentTemperature> = components
            .iter()
            .map(|c| ComponentTemperature {
                max: c.max() as i32,
                critical: c.critical().map(|t| t as i32),
                temperature: c.temperature() as i32,
                label: String::from(c.label()),
            })
            .collect();

        window
            .emit("components-temperature", &component_temperatures)
            .unwrap();
        std::thread::sleep(Duration::from_millis(2000));
    });
}
