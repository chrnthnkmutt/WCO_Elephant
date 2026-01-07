# Elephant Monitoring & Early Warning System (Mockup)

This is a Streamlit-based interactive prototype for the Elephant Monitoring & Early Warning System.

## Features
- **Real-Time Map:** Visualizes Forest, Buffer, and Community zones with elephant tracking.
- **Simulation Mode:** Trigger different scenarios (Normal, Buffer Breach, Critical Threat) to see how the system responds.
- **Live Sensor Feed:** Mocked terminal log of sensor events.
- **Smart Notification Preview:** A mobile mockup showing LINE Notify alerts sent to villagers.
- **Analytics Dashboard:** Historical data on sightings, incidents, and device status.

## How to Run

1. **Navigate to the app directory:**
   ```bash
   cd ElephantMonitoringApp
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Streamlit app:**
   ```bash
   streamlit run app.py
   ```

## Scenarios for Demo
- **Normal Operations:** Elephant is in the Forest zone. Threat level is LOW.
- **Scenario A: Buffer Breach:** Elephant moves to the Buffer zone. Vibration sensor triggers. Threat level becomes MEDIUM. LINE Notify alert is shown.
- **Scenario B: Critical Threat:** Elephant moves towards the Community. Predicted path is shown on the map. Threat level becomes HIGH.
- **Scenario C: System Health Check:** Simulates a sensor fault/offline status.
