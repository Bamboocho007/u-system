use serde::Serialize;
use std::time::Duration;
use sysinfo::{NetworkExt, System, SystemExt};
use tauri::Window;

#[derive(Serialize)]
pub struct NetworkInfo {
    name: String,
    received: u64,
    transmitted: u64,
    total_received: u64,
    total_transmitted: u64,
    mac_address: Vec<u8>,
}

pub fn init_network_usage(window: &Window) {
    let mut sys = System::new_all();
    let window = window.clone();

    std::thread::spawn(move || loop {
        sys.refresh_networks();
        let networks: Vec<NetworkInfo> = sys
            .networks()
            .into_iter()
            .map(|network| NetworkInfo {
                name: network.0.to_string(),
                received: network.1.received(),
                transmitted: network.1.transmitted(),
                total_received: network.1.total_received(),
                total_transmitted: network.1.total_transmitted(),
                mac_address: network.1.mac_address().0.to_vec(),
            })
            .collect();
        window.emit("network-usage", &networks).unwrap();
        std::thread::sleep(Duration::from_secs(1));
    });
}
