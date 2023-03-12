use serde::ser::SerializeStruct;
use serde::Serialize;
use std::time::Duration;
use sysinfo::{DiskUsage, ProcessExt, ProcessStatus, System, SystemExt};
use tauri::Window;

#[derive(Serialize)]
pub enum ThreadStatus {
    /// Thread is running normally.
    Running,
    /// Thread is stopped.
    Stopped,
    /// Thread is waiting normally.
    Waiting,
    /// Thread is in an uninterruptible wait
    Uninterruptible,
    /// Thread is halted at a clean point.
    Halted,
    /// Unknown.
    Unknown,
}

impl From<&str> for ThreadStatus {
    fn from(status: &str) -> ThreadStatus {
        match status {
            "Running" => ThreadStatus::Running,
            "Stopped" => ThreadStatus::Stopped,
            "Waiting" => ThreadStatus::Waiting,
            "Uninterruptible" => ThreadStatus::Uninterruptible,
            "Halted" => ThreadStatus::Halted,
            _ => ThreadStatus::Unknown,
        }
    }
}

impl ThreadStatus {
    /// Used to display `ThreadStatus`.
    pub fn to_string(&self) -> &str {
        match *self {
            ThreadStatus::Running => "Running",
            ThreadStatus::Stopped => "Stopped",
            ThreadStatus::Waiting => "Waiting",
            ThreadStatus::Uninterruptible => "Uninterruptible",
            ThreadStatus::Halted => "Halted",
            ThreadStatus::Unknown => "Unknown",
        }
    }
}

pub struct InternalDiskUsage(DiskUsage);

impl Serialize for InternalDiskUsage {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_struct("DiskUsage", 4)?;
        state.serialize_field("read_bytes", &self.0.read_bytes)?;
        state.serialize_field("total_read_bytes", &self.0.total_read_bytes)?;
        state.serialize_field("total_written_bytes", &self.0.total_written_bytes)?;
        state.serialize_field("written_bytes", &self.0.written_bytes)?;
        state.end()
    }
}

pub struct InternalProcessStatus(ProcessStatus);

impl Serialize for InternalProcessStatus {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        match self.0 {
            ProcessStatus::Dead => serializer.serialize_unit_variant("ProcessStatus", 0, "Dead"),
            ProcessStatus::Idle => serializer.serialize_unit_variant("ProcessStatus", 0, "Idle"),
            ProcessStatus::LockBlocked => {
                serializer.serialize_unit_variant("ProcessStatus", 0, "LockBlocked")
            }
            ProcessStatus::Parked => {
                serializer.serialize_unit_variant("ProcessStatus", 0, "Parked")
            }
            ProcessStatus::Run => serializer.serialize_unit_variant("ProcessStatus", 0, "Run"),
            ProcessStatus::Sleep => serializer.serialize_unit_variant("ProcessStatus", 0, "Sleep"),
            ProcessStatus::Stop => serializer.serialize_unit_variant("ProcessStatus", 0, "Stop"),
            ProcessStatus::Tracing => {
                serializer.serialize_unit_variant("ProcessStatus", 0, "Tracing")
            }
            ProcessStatus::UninterruptibleDiskSleep => {
                serializer.serialize_unit_variant("ProcessStatus", 0, "UninterruptibleDiskSleep")
            }
            ProcessStatus::Unknown(i) => {
                serializer.serialize_unit_variant("ProcessStatus", 0, "Unknown")
            }
            ProcessStatus::Wakekill => {
                serializer.serialize_unit_variant("ProcessStatus", 0, "Wakekill")
            }
            ProcessStatus::Waking => {
                serializer.serialize_unit_variant("ProcessStatus", 0, "Waking")
            }
            ProcessStatus::Zombie => {
                serializer.serialize_unit_variant("ProcessStatus", 0, "Zombie")
            }
        }
    }
}

#[derive(Serialize)]
pub struct ProcessInfo {
    pid: String,
    memory: u64,
    run_time: u64,
    start_time: u64,
    virtual_memory: u64,
    cmd: Vec<String>,
    cpu_usage: f32,
    cwd: String,
    disk_usage: InternalDiskUsage,
    environ: Vec<String>,
    exe: String,
    group_id: Option<String>,
    name: String,
    root: String,
    session_id: Option<String>,
    thread_status: ThreadStatus,
    status: InternalProcessStatus,
}

pub fn init_processes(window: &Window) {
    let mut sys = System::new_all();
    let window = window.clone();

    std::thread::spawn(move || loop {
        sys.refresh_processes();
        let processes: Vec<ProcessInfo> = sys
            .processes()
            .into_iter()
            .map(|p| ProcessInfo {
                pid: p.1.pid().to_string(),
                memory: p.1.memory(),
                run_time: p.1.run_time(),
                start_time: p.1.start_time(),
                virtual_memory: p.1.virtual_memory(),
                cmd: p.1.cmd().to_vec(),
                cpu_usage: p.1.cpu_usage(),
                cwd: p.1.cwd().to_string_lossy().to_string(),
                disk_usage: InternalDiskUsage(p.1.disk_usage()),
                environ: p.1.environ().to_vec(),
                exe: p.1.exe().to_string_lossy().to_string(),
                group_id: p.1.group_id().map(|id| id.to_string()),
                name: p.1.name().to_string(),
                root: p.1.root().to_string_lossy().to_string(),
                session_id: p.1.session_id().map(|pid| pid.to_string()),
                thread_status: p
                    .1
                    .status
                    .as_ref()
                    .map(|s| ThreadStatus::from(s.to_string()))
                    .unwrap_or(ThreadStatus::Unknown),
                status: InternalProcessStatus(p.1.status()),
            })
            .collect();
        window.emit("processes-usage", &processes).unwrap();
        std::thread::sleep(Duration::from_secs(1));
    });
}
