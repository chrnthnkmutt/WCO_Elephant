import streamlit as st
import pandas as pd
import shared_state

# Page Configuration
st.set_page_config(
    page_title="System Control - Elephant Monitoring",
    page_icon="🐘",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Initialize Shared State
shared_state.initialize_state()

# Custom CSS
shared_state.apply_custom_css()

st.title("⚙️ System Control Center")

st.markdown("### Device Status Overview")

device_data = pd.DataFrame({
    "Device ID": ["S-20", "S-21", "CCTV-04", "Node-4", "S-22", "CCTV-05", "GW-01", "GW-02"],
    "Type": ["Vibration", "Vibration", "Camera", "Radio Gateway", "Vibration", "Camera", "Gateway", "Gateway"],
    "Location": ["Zone 2", "Zone 2", "Zone 3", "Zone 1", "Zone 2", "Zone 3", "Zone 1", "Zone 3"],
    "Status": ["Online", "Online", "Online", "Online", "Online", "Online", "Online", "Online"],
    "Battery": ["85%", "92%", "100% (Solar)", "15%", "77%", "100% (Solar)", "98%", "99%"],
    "Last Ping": ["1 min ago", "2 mins ago", "Live", "5 mins ago", "1 min ago", "Live", "30 secs ago", "45 secs ago"]
})

# Inject some simulated issues based on global state if needed, 
# but for now we keep it simple or based on the 'System Health Check' scenario if we want to share that state across pages fully.
# Since sim_mode is local to the sidebar on the main page, we might want to store it in session state if we want it to persist.
# For now, let's just display the table.

def highlight_status(val):
    color = 'green' if val == 'Online' else 'red'
    return f'color: {color}'

st.dataframe(device_data.style.map(highlight_status, subset=['Status']), use_container_width=True)

st.divider()

col1, col2 = st.columns(2)

with col1:
    st.markdown("### System Diagnostics")
    st.button("Run Full System Scan")
    st.button("Reboot Offline Nodes")
    st.button("Export System Logs")

with col2:
    st.markdown("### Network Health")
    st.progress(95, text="Network Uptime (24h)")
    st.progress(88, text="Signal Strength (Avg)")
    st.progress(12, text="Packet Loss (Last Hour)")

st.divider()
st.markdown("### Maintenance Schedule")
st.info("Next scheduled maintenance: Jan 15, 2026 (Sector B Sensors)")
