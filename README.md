# Elephant Monitoring & Early Warning System (Prototype)

![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=Streamlit&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Folium](https://img.shields.io/badge/Folium-77B829?style=for-the-badge&logo=Leaflet&logoColor=white)

## Features
- **Real-Time Map:** Visualizes Forest, Buffer, and Community zones with elephant tracking.
- **Simulation Mode:** Trigger different scenarios (Normal, Buffer Breach, Critical Threat) to see how the system responds.
- **Live Sensor Feed:** Mocked terminal log of sensor events.
- **Line Notification Bridge:** Automated LINE alerts with real-time distance calculation and interactive features.
- **Location Interaction:** Dynamic Quick Reply buttons for users to share their live location and Google Maps direction links for emergency response.
- **Analytics Dashboard:** Historical data on sightings, incidents, and device status.
An interactive Streamlit-based prototype for an **Elephant Monitoring & Early Warning System**. This application demonstrates how real-time sensor data, CCTV analytics, and automated notification systems can help mitigate human-elephant conflict (HEC).

## 🌟 Key Features

1. **Setup Environment:**
   Create a `.env` file in the root directory:
   ```env
   LINE_CHANNEL_ACCESS_TOKEN=your_token
   MY_LINE_USER_ID=your_user_id

### 1. Live Dashboard (`Map_Dashboard.py`)
- **Interactive Tracking Map:** Built with Folium, displaying Forest, Buffer, and Community zones.
- **Real-Time Sensor Integration:** Visualizes the status and location of vibration sensors, CCTV cameras, and radio gateways.
- **Simulation Engine:** Trigger various scenarios (Normal, Buffer Breach, Critical Threat) to observe system response.
- **Live Event Log:** A terminal-style feed showing real-time system alerts and sensor triggers.
- **Smart Notification Preview:** A mobile mockup showing LINE Notify alerts sent to local villagers.

### 2. Analytics & CCTV (`pages/1_Analytics_&_CCTV.py`)
- **Historical Data Visualization:** Monthly sightings and incident reports using Plotly.
- **Threat Distribution:** Statistical breakdown of threat levels over the last 30 days.
- **Mock CCTV Feed:** Simulated "night vision" camera feed with AI-powered object detection status.

### 3. System Control Center (`pages/2_System_Control.py`)
- **Device Management:** Interactive table showing device health, battery levels, and connectivity status.
- **Diagnostic Tools:** Quick actions for system scans, node reboots, and log exports.
- **Network Health:** Real-time monitoring of network uptime, signal strength, and packet loss.

## 🛠️ Tech Stack
- **Frontend/App Framework:** [Streamlit](https://streamlit.io/)
- **Mapping:** [Folium](https://python-visualization.github.io/folium/) & [streamlit-folium](https://github.com/randyzwitch/streamlit-folium)
- **Data Visualization:** [Plotly](https://plotly.com/python/) & Pandas
- **Styling:** Custom CSS with Google Sans integration.

## 📁 Project Structure
```text
.
├── Map_Dashboard.py          # Main entry point & Real-time map
├── pages/                    # Multi-page Streamlit directory
│   ├── 1_Analytics_&_CCTV.py # Data viz & Camera feeds
│   └── 2_System_Control.py   # Device management & diagnostics
├── shared_state.py           # Centralized session state & simulation logic
├── requirements.txt          # Project dependencies
└── README.md                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/WCO_Elephant.git
   cd WCO_Elephant
   ```

2. **Install dependencies:**
```bash
pip install -r requirements.txt

```


3. **Run the system (Use two terminals):**
* **Terminal 1 (Dashboard):**
```bash
streamlit run Map_Dashboard.py

```


* **Terminal 2 (Noti Bridge):**
```bash
python bridge.py

```




3. **Run the application:**
   ```bash
   streamlit run Map_Dashboard.py
   ```

## 🎮 Demo Scenarios
Use the sidebar on the main dashboard to test these scenarios:
- **Normal Operations:** Elephant herd is safely within the Forest zone.
- **Scenario A: Buffer Breach:** Elephant moves to the Buffer zone; vibration sensors trigger alerts.
- **Scenario B: Critical Threat:** Elephant approaches community areas; predicted paths are displayed, and high-priority alerts are issued.
- **Scenario C: System Health Check:** Simulates hardware/network issues for maintenance testing.

---
*Developed for the Wildlife Conservation Office (Mockup Prototype).*
