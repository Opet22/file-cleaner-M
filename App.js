import React, { useState } from "react";
import { Home, Search, Shield, Settings } from "lucide-react";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("home");

  // file mencurigakan
  const [threats, setThreats] = useState([
    "malware_sample.exe",
    "suspicious_file.dll",
    "trojan_horse.js",
    "adware_script.bat",
  ]);

  // quarantine list
  const [quarantine, setQuarantine] = useState([]);

  // status
  const [usbDetected, setUsbDetected] = useState(false);
  const [scanning, setScanning] = useState(false);

  // theme
  const [theme, setTheme] = useState("light");

  // ===== ACTION =====

  const scanUSB = () => {
    setScanning(true);

    setTimeout(() => {
      setUsbDetected(true);
      setScanning(false);
      setTab("scan-result");
    }, 2000);
  };

  const quarantineFile = (file) => {
    setQuarantine([...quarantine, file]);
    setThreats(threats.filter((item) => item !== file));
  };

  const deleteFile = (file) => {
    setThreats(threats.filter((item) => item !== file));
  };

  const restoreFile = (file) => {
    setThreats([...threats, file]);
    setQuarantine(quarantine.filter((item) => item !== file));
  };

  const deletePermanent = (file) => {
    setQuarantine(quarantine.filter((item) => item !== file));
  };

  return (
    <div className={`main-wrapper ${theme}`}>
      <div className={`app-container ${theme}`}>
        <div className="header">
          <h2>USB Cleaner Dashboard</h2>
        </div>

        {/* HOME */}
        {tab === "home" && (
          <div className="content fade-in">
            <div className="usb-status">
              <div className="circle scan-circle" onClick={scanUSB}>
                <span>{usbDetected ? "Scan Files" : "USB Ready"}</span>
              </div>

              {scanning && <p style={{ textAlign: "center" }}>🔍 Scanning...</p>}
            </div>

            <div className="recent-threats">
              <h3>Recent Threats</h3>
              {threats.map((item, idx) => (
                <div className="threat-card" key={idx}>
                  <span className="check">⚠</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCAN RESULT */}
        {tab === "scan-result" && (
          <div className="content fade-in">
            <h3>Scan Result</h3>
            {threats.length === 0 && <p>🔒 Aman</p>}
            {threats.map((file, i) => (
              <div className="threat-card" key={i}>
                {file}
                <button className="mini-btn" onClick={() => quarantineFile(file)}>
                  Quarantine
                </button>
                <button className="mini-btn-del" onClick={() => deleteFile(file)}>
                  Delete
                </button>
              </div>
            ))}

            <button className="scan-btn" onClick={() => setTab("home")}>
              Back to Dashboard
            </button>
          </div>
        )}

        {/* QUARANTINE PAGE */}
        {tab === "quarantine" && (
          <div className="content fade-in">
            <h3>Quarantine Folder</h3>
            {quarantine.length === 0 && <p>Tidak ada file terkarantina</p>}
            {quarantine.map((file, i) => (
              <div className="threat-card" key={i}>
                {file}
                <button className="mini-btn" onClick={() => restoreFile(file)}>
                  Restore
                </button>
                <button className="mini-btn-del" onClick={() => deletePermanent(file)}>
                  Delete Permanently
                </button>
              </div>
            ))}
          </div>
        )}

        {/* SETTINGS */}
        {tab === "settings" && (
          <div className="content fade-in">
            <h3>Settings</h3>

            {/* AUTO DETECT */}
            <div className="setting-row">
              <div>
                <strong>Auto Detect File</strong>
                <p className="setting-desc">
                  Automatically scan when file is connected
                </p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={usbDetected}
                  onChange={() => setUsbDetected(!usbDetected)}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <br />

            {/* THEME */}
            <div className="setting-row">
              <div>
                <strong>Theme Mode</strong>
                <p className="setting-desc">Change display brightness</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={() => setTheme(theme === "light" ? "dark" : "light")}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        )}

        {/* BOTTOM NAV */}
        <div className={`bottom-nav ${theme}`}>
          <div className={`nav-item ${tab === "home" ? "active" : ""}`} onClick={() => setTab("home")}>
            <Home size={18} />
            <span>Home</span>
          </div>
          <div className={`nav-item ${tab === "scan-result" ? "active" : ""}`} onClick={() => setTab("scan-result")}>
            <Search size={18} />
            <span>Scan</span>
          </div>
          <div className={`nav-item ${tab === "quarantine" ? "active" : ""}`} onClick={() => setTab("quarantine")}>
            <Shield size={18} />
            <span>Quarantine</span>
          </div>
          <div className={`nav-item ${tab === "settings" ? "active" : ""}`} onClick={() => setTab("settings")}>
            <Settings size={18} />
            <span>Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
}
