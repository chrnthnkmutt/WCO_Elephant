import streamlit as st
import pandas as pd
import shared_state
import folium
from streamlit_folium import st_folium

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

@st.dialog("Device Location")
def show_device_location(device_id, coords_str):
    try:
        lat, lon = map(float, coords_str.split(","))
        st.write(f"**Device:** {device_id}")
        st.write(f"**Coordinates:** {lat}, {lon}")
        
        m = folium.Map(location=[lat, lon], zoom_start=15, tiles="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", attr="Google Maps")
        folium.Marker([lat, lon], popup=device_id, icon=folium.Icon(color="blue", icon="info-sign")).add_to(m)
        st_folium(m, width=500, height=400, key=f"map_{device_id}")
    except Exception as e:
        st.error(f"Error parsing coordinates: {e}")

st.title("⚙️ System Control Center")

st.markdown("### Device Status Overview")

device_data = pd.DataFrame(st.session_state.device_data)

# Inject some simulated issues based on global state if needed, 
# but for now we keep it simple or based on the 'System Health Check' scenario if we want to share that state across pages fully.
# Since sim_mode is local to the sidebar on the main page, we might want to store it in session state if we want it to persist.
# For now, let's just display the table.

def highlight_status(val):
    color = 'green' if val == 'Online' else 'red'
    return f'color: {color}'

# Display Dataframe with Selection
event = st.dataframe(
    device_data.style.map(highlight_status, subset=['Status']), 
    use_container_width=True,
    on_select="rerun",
    selection_mode="single-row"
)

if len(event.selection.rows) > 0:
    selected_index = event.selection.rows[0]
    selected_device = device_data.iloc[selected_index]
    show_device_location(selected_device["Device ID"], selected_device["Coordinates"])

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
