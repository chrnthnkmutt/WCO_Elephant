# Elephant Monitoring & Early Warning System (Mockup)

This is a Streamlit-based interactive prototype for the Elephant Monitoring & Early Warning System.

## Features
- **Real-Time Map:** Visualizes Forest, Buffer, and Community zones with elephant tracking.
- **Simulation Mode:** Trigger different scenarios (Normal, Buffer Breach, Critical Threat) to see how the system responds.
- **Live Sensor Feed:** Mocked terminal log of sensor events.
- **Line Notification Bridge:** Automated LINE alerts with real-time distance calculation and interactive features.
- **Location Interaction:** Dynamic Quick Reply buttons for users to share their live location and Google Maps direction links for emergency response.
- **Analytics Dashboard:** Historical data on sightings, incidents, and device status.

## How to Run

1. **Setup Environment:**
   Create a `.env` file in the root directory:
   ```env
   LINE_CHANNEL_ACCESS_TOKEN=your_token
   MY_LINE_USER_ID=your_user_id


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





## Scenarios for Demo

* **Normal Operations:** Elephant is in the Forest zone. Threat level is LOW.
* **Scenario A: Buffer Breach:** Elephant moves to the Buffer zone. Threat level becomes MEDIUM. System sends a LINE alert with a "Share Location" button to get user's precise coordinates.
* **Scenario B: Critical Threat:** Elephant moves towards the Community. Threat level becomes HIGH. System sends an emergency alert with a "Google Maps Direction" link from the user to the elephant.
* **Scenario C: System Health Check:** Simulates a sensor fault/offline status.

