const main = document.querySelector("div.page");
const mouse_text = document.querySelector("div.mouse .text");

function exec() {
  main.innerText = "";
  Object.keys(window)
    .filter((k) => typeof window[k] === "string" || typeof window[k] === "number")
    .map((k) => ({ k, v: window[k] }))
    .map(({ k, v }) => {
      const d = document.createElement("div");
      d.classList.add("item", "page", "flex");
      const key = document.createElement("div");
      key.innerText = k;
      const val = document.createElement("div");
      val.innerText = v;
      d.appendChild(key);
      d.appendChild(val);
      main.appendChild(d);
    });
}

function printMouse(e) {
  mouse_text.innerText = "";
  for (const x in e) {
    const keys = ["altKey", "ctrlKey", "metaKey", "shiftKey", "x", "y"];
    if (keys.includes(x)) {
      const d = document.createElement("div");
      d.classList.add("item", "mouse", "flex");
      const key = document.createElement("div");
      key.innerText = x;
      const val = document.createElement("div");
      val.innerText = e[x];
      d.appendChild(key);
      d.appendChild(val);
      mouse_text.appendChild(d);
    }
  }
}

function keydownHandler(event) {
  // Prevent repeating actions if key is held down
  if (event.repeat) return;

  switch (event.key) {
    case "Shift":
      document.querySelector('.key[data-key="SHIFT"]').classList.add("pressed");
      break;
    case "Control":
      document.querySelector('.key[data-key="CONTROL"]').classList.add("pressed");
      break;
    case "Alt":
      document.querySelector('.key[data-key="ALT"]').classList.add("pressed");
      break;
    case "Meta":
      document.querySelector('.key[data-key="META"]').classList.add("pressed");
      break;
    case "Backspace":
      document.querySelector('.key[data-key="BACKSPACE"]').classList.add("pressed");
      break;
    case "Enter":
      document.querySelector('.key[data-key="ENTER"]').classList.add("pressed");
      break;
    case " ":
      document.querySelector('.key[data-key="SPACE"]').classList.add("pressed");
      break;
    case "Escape":
      document.querySelector('.key[data-key="ESCAPE"]').classList.add("pressed");
      break;
    default:
      const keyElement = document.querySelector(`.key[data-key="${event.key.toUpperCase()}"]`);
      if (keyElement) keyElement.classList.add("pressed");
      return;
  }
}

function keyupHandler() {
  const pressedKey = document.querySelector(".key.pressed");
  if (pressedKey) pressedKey.classList.remove("pressed");
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", keydownHandler);
  document.addEventListener("keyup", keyupHandler);
});

window.addEventListener("resize", exec);
window.addEventListener("mousemove", printMouse);

function checkNetworkLatency() {
  const start = performance.now();
  fetch("https://www.google.com", { mode: "no-cors" }).finally(() => {
    const end = performance.now();
    document.getElementById("latency").textContent = (end - start).toFixed(2);
  });
}

function checkWebRTC() {
  document.getElementById("webrtc-status").textContent = window.RTCPeerConnection ? "Supported" : "Not Supported";
}

function getDeviceInfo() {
  const info = `${navigator.userAgent} | Screen: ${screen.width}x${screen.height}`;
  document.getElementById("device-info").textContent = info;
}

function checkBatteryStatus() {
  if (navigator.getBattery) {
    navigator.getBattery().then((battery) => {
      document.getElementById("battery-status").textContent = `${(battery.level * 100).toFixed(0)}% ${
        battery.charging ? "(Charging)" : "(Not Charging)"
      }`;
    });
  } else {
    document.getElementById("battery-status").textContent = "Not Supported";
  }
}

function checkPermissions() {
  const permissions = ["geolocation", "notifications"];

  const permissionPromises = permissions.map((p) =>
    navigator.permissions.query({ name: p }).then((result) => `${p}: ${result.state}`)
  );

  const mediaPermissions = [
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => "camera: granted")
      .catch(() => "camera: denied"),
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => "microphone: granted")
      .catch(() => "microphone: denied"),
  ];

  Promise.all([...permissionPromises, ...mediaPermissions]).then((results) => {
    document.getElementById("permissions-status").textContent = results.join("; ");
  });
}

function checkStorageQuota() {
  if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate().then(({ usage, quota }) => {
      document.getElementById("storage-quota").textContent = `Used: ${(usage / 1024 / 1024).toFixed(2)} MB / ${(
        quota /
        1024 /
        1024
      ).toFixed(2)} MB`;
    });
  } else {
    document.getElementById("storage-quota").textContent = "Not Supported";
  }
}

function checkDNSResolution() {
  const startTime = performance.now();
  fetch("https://example.com", { mode: "no-cors" }).finally(() => {
    const endTime = performance.now();
    document.getElementById("dns-time").textContent = (endTime - startTime).toFixed(2);
  });
}

function trackWebSocket() {
  //   const ws = new WebSocket("wss://echo.websocket.org");
  const ws = new WebSocket("wss://ws.postman-echo.com/raw"); // Alternative WebSocket echo server

  const wsStateElem = document.getElementById("ws-state");

  ws.onopen = () => (wsStateElem.textContent = "Connected");
  ws.onclose = () => (wsStateElem.textContent = "Closed");
  ws.onerror = () => (wsStateElem.textContent = "Error");
}

function checkWebAPIs() {
  const apis = ["geolocation", "localStorage", "indexedDB", "Notification", "serviceWorker"];
  const results = apis.map((api) => `${api in navigator || api in window ? "✓" : "x"} ${api}`);
  document.getElementById("web-api-status").innerText = results.join("\n");
}

function getPublicIP() {
  fetch("https://api64.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("public-ip").textContent = data.ip;
      getGeoLocation(data.ip);
    })
    .catch(() => (document.getElementById("public-ip").textContent = "Error fetching IP"));
}

function getGeoLocation(ip) {
  fetch(`https://ipapi.co/${ip}/json/`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("geo-location").textContent = `${data.city}, ${data.region}, ${data.country_name}`;
    })
    .catch(() => (document.getElementById("geo-location").textContent = "Error fetching location"));
}

function checkDNSLeak() {
  const rtc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
  rtc.createDataChannel("");
  rtc
    .createOffer()
    .then((o) => rtc.setLocalDescription(o))
    .catch(() => {});
  rtc.onicecandidate = (event) => {
    if (event && event.candidate && event.candidate.candidate) {
      const ipMatch = event.candidate.candidate.match(/([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/);
      if (ipMatch) {
        document.getElementById("dns-leak").textContent =
          ipMatch[1].startsWith("192.168") || ipMatch[1].startsWith("10.") ? "No Leak" : `Leak Detected: ${ipMatch[1]}`;
      }
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  checkNetworkLatency();
  checkWebRTC();
  getDeviceInfo();
  checkBatteryStatus();
  checkPermissions();
  checkStorageQuota();
  checkDNSResolution();
  trackWebSocket();
  checkWebAPIs();
  getPublicIP();
  checkDNSLeak();
});
