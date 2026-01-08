import streamlit as st
import folium
from streamlit_folium import st_folium
import time
import shared_state

# Page Configuration
st.set_page_config(
    page_title="Map Dashboard - Elephant Monitoring",
    page_icon="🐘",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Initialize Shared State
shared_state.initialize_state()

# Custom CSS
shared_state.apply_custom_css()

# Sidebar - Simulation Controls
st.sidebar.header("Simulation Controls")
sim_mode = st.sidebar.selectbox("Select Scenario", 
    ["Normal Operations", "Scenario A: Buffer Breach", "Scenario B: Critical Threat", "Scenario C: System Health Check"])

if st.sidebar.button("Run Simulation"):
    shared_state.trigger_scenario(sim_mode)

st.sidebar.divider()
st.sidebar.subheader("System Status")
color = "green" if st.session_state.threat_level == "LOW" else "orange" if st.session_state.threat_level == "MEDIUM" else "red"
st.sidebar.markdown(f"**Status:** {st.session_state.status_bar}")
st.sidebar.markdown(f"**Threat Level:** :{color}[{st.session_state.threat_level}]")

# Main Content
st.title("🐘 Live Dashboard")
st.markdown("### Real-Time Monitoring & Early Warning System")

# Layout: 2 Columns (Map & Feed)
col1, col2 = st.columns([3, 1])

with col1:
    st.subheader("Real-Time Tracking Map")
    m = folium.Map(
        location=[14.3, 101.4], 
        zoom_start=13, 
        tiles="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", 
        attr="Google Maps"
    )
    
    # Zones
    # Zone 1: Forest
    folium.Polygon(
        locations=[[14.31, 101.35], [14.35, 101.35], [14.35, 101.45], [14.31, 101.45]],
        color="green", fill=True, fill_opacity=0.2, popup="Zone 1: Forest"
    ).add_to(m)
    # Zone 2: Buffer
    folium.Polygon(
        locations=[[14.29, 101.35], [14.31, 101.35], [14.31, 101.45], [14.29, 101.45]],
        color="orange", fill=True, fill_opacity=0.2, popup="Zone 2: Buffer"
    ).add_to(m)
    # Zone 3: Community
    folium.Polygon(
        locations=[[14.25, 101.35], [14.29, 101.35], [14.29, 101.45], [14.25, 101.45]],
        color="red", fill=True, fill_opacity=0.2, popup="Zone 3: Community"
    ).add_to(m)

    # Decorative Road
    folium.PolyLine(
        locations=[[14.27, 101.35], [14.27, 101.45]],
        color="gray", weight=4, opacity=0.5, popup="Main Road"
    ).add_to(m)

    # Residential Houses
    folium.Marker([14.26, 101.38], popup="House A", icon=folium.Icon(color='blue', icon='home')).add_to(m)
    folium.Marker([14.265, 101.42], popup="House B", icon=folium.Icon(color='blue', icon='home')).add_to(m)

    # Sensors (Static for visualization)
    folium.CircleMarker([14.305, 101.38], radius=6, color="#28a745", fill=True, fill_opacity=0.7, popup="Sensor S-01 (Online)").add_to(m)
    folium.CircleMarker([14.305, 101.42], radius=6, color="#ffc107", fill=True, fill_opacity=0.7, popup="Sensor S-02 (Warning)").add_to(m)

    # Elephant Marker
    folium.Marker(
        st.session_state.elephant_pos,
        popup="Elephant Herd",
        icon=folium.Icon(color='red' if st.session_state.threat_level == "HIGH" else 'orange' if st.session_state.threat_level == "MEDIUM" else 'green', icon='info-sign')
    ).add_to(m)

    # Predicted Path (Scenario B)
    if sim_mode == "Scenario B: Critical Threat":
        folium.PolyLine(
            locations=[st.session_state.elephant_pos, [14.26, 101.46]],
            color="red", weight=5, dash_array='10', opacity=0.8
        ).add_to(m)
    
    st_folium(m, use_container_width=True, height=500, key="main_map")

    # Map Legend
    st.markdown("""
        <div style="
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 10px;
            border: 1px solid #ddd;
            margin-top: 10px;
        ">
            <h4 style="margin-top: 0; margin-bottom: 15px; color: #333; font-size: 1.1rem; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Map Legend</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                <div style="display: flex; align-items: center; color: #333; font-size: 0.9rem;">
                    <span style="font-size: 1.2rem; margin-right: 10px;">🏠</span> Residential House
                </div>
                <div style="display: flex; align-items: center; color: #333; font-size: 0.9rem;">
                    <span style="font-size: 1.2rem; margin-right: 10px;">🐘</span> Elephant
                </div>
                <div style="display: flex; align-items: center; color: #333; font-size: 0.9rem;">
                    <div style="width: 18px; height: 18px; background-color: rgba(34, 139, 34, 0.4); border: 2px solid green; margin-right: 10px;"></div> Elephant Herd area
                </div>
                <div style="display: flex; align-items: center; color: #333; font-size: 0.9rem;">
                    <span style="color: #28a745; font-size: 1.5rem; margin-right: 10px; line-height: 0;">●</span> Sensor (Online)
                </div>
                <div style="display: flex; align-items: center; color: #333; font-size: 0.9rem;">
                    <span style="color: #ffc107; font-size: 1.5rem; margin-right: 10px; line-height: 0;">●</span> Sensor (Warning)
                </div>
                <div style="display: flex; align-items: center; color: #333; font-size: 0.9rem;">
                    <div style="border-top: 2px dashed #ff4b4b; width: 25px; margin-right: 10px;"></div> Predicted Path
                </div>
                <div style="display: flex; align-items: center; color: #333; font-size: 0.9rem;">
                    <div style="width: 25px; height: 6px; background-color: #666; margin-right: 10px;"></div> Road
                </div>
            </div>
        </div>
    """, unsafe_allow_html=True)

with col2:
    st.subheader("Live Sensor Feed")
    # Use a container for the feed to make it look like a terminal
    st.markdown("""
        <div style="background-color: #000; color: #0f0; padding: 10px; border-radius: 5px; height: 450px; overflow-y: scroll; font-family: monospace; font-size: 0.8em;">
            {}
        </div>
    """.format("<br>".join(st.session_state.feed_logs)), unsafe_allow_html=True)

# Villager View (Mobile Mockup)
if st.session_state.show_mobile:
    st.divider()
    st.subheader("Smart Notification Preview (Villager View)")
    m_col1, m_col2 = st.columns([1, 2])
    with m_col1:
        # Mocking a phone screen with CSS
        st.markdown(f"""
            <div style="width: 250px; max-width: 100%; height: 500px; border: 16px solid #333; border-top-width: 60px; border-bottom-width: 60px; border-radius: 36px; background: white; position: relative; margin: auto;">
                <div style="padding: 20px; color: black; font-family: sans-serif;">
                    <div style="background: #00c300; color: white; padding: 10px; border-radius: 10px; margin-bottom: 10px; font-size: 0.8em;">
                        <b>LINE Notify</b><br>
                        ⚠️ Warning: Elephant activity detected near your location. Please stay indoors.
                    </div>
                    <div style="font-size: 0.6em; color: gray;">Just now</div>
                </div>
            </div>
        """, unsafe_allow_html=True)
    with m_col2:
        st.info("This is what villagers see on their mobile phones via LINE Notify when a breach occurs.")
        if st.session_state.threat_level == "HIGH":
            st.error("ACTION REQUIRED: Ranger Team Alpha dispatched to Village C.")