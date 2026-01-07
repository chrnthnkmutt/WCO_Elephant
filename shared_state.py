import streamlit as st
import time

def initialize_state():
    if 'elephant_pos' not in st.session_state:
        st.session_state.elephant_pos = [14.32, 101.40] # Start in Zone 1
    if 'status_bar' not in st.session_state:
        st.session_state.status_bar = "Normal Operations"
    if 'threat_level' not in st.session_state:
        st.session_state.threat_level = "LOW"
    if 'feed_logs' not in st.session_state:
        st.session_state.feed_logs = ["[09:00:00] System started."]
    if 'show_mobile' not in st.session_state:
        st.session_state.show_mobile = False

def trigger_scenario(scenario):
    if scenario == "Normal Operations":
        st.session_state.elephant_pos = [14.32, 101.40]
        st.session_state.status_bar = "Safe - Wildlife in Forest"
        st.session_state.threat_level = "LOW"
        st.session_state.feed_logs.insert(0, f"[{time.strftime('%H:%M:%S')}] INFO: Elephant herd spotted in Sector A (Forest).")
        st.session_state.show_mobile = False
    elif scenario == "Scenario A: Buffer Breach":
        st.session_state.elephant_pos = [14.30, 101.42] # Move to Buffer
        st.session_state.status_bar = "WARNING - Buffer Zone Breach"
        st.session_state.threat_level = "MEDIUM"
        st.session_state.feed_logs.insert(0, f"[{time.strftime('%H:%M:%S')}] ALERT: Vibration Sensor S-20 triggered in Buffer Zone.")
        st.session_state.show_mobile = True
    elif scenario == "Scenario B: Critical Threat":
        st.session_state.elephant_pos = [14.28, 101.44] # Move to Community
        st.session_state.status_bar = "CRITICAL - Community Entry Imminent"
        st.session_state.threat_level = "HIGH"
        st.session_state.feed_logs.insert(0, f"[{time.strftime('%H:%M:%S')}] CRITICAL: CCTV 04 - Elephant herd detected moving towards Village C.")
        st.session_state.show_mobile = True
    elif scenario == "Scenario C: System Health Check":
        st.session_state.status_bar = "System Maintenance Required"
        st.session_state.feed_logs.insert(0, f"[{time.strftime('%H:%M:%S')}] ERR: Low Frequency Radio signal lost on Node 4.")

def apply_custom_css():
    # Display DNP Logo at the top of the sidebar using st.logo (Streamlit 1.35+)
    st.logo("https://portal.dnp.go.th/assets/img/logo.png")
    
    st.markdown("""
        <style>
        @import url('https://cdn.jsdelivr.net/gh/mortezaom/google-sans-cdn@master/fonts.css');
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

        html, body, [class*="css"], [class*="st-"], .stMarkdown, h1, h2, h3, h4, h5, h6, p, div, span {
            font-family: 'Google Sans', 'Roboto', sans-serif !important;
        }

        /* Increase st.logo size */
        img[data-testid="stLogo"] {
            height: 80px !important;
            width: auto !important;
        }

        .main {
            background-color: #ffffff;
            color: #000000;
        }
        .stSidebar {
            background-color: #f0f2f6;
        }
        </style>
        """, unsafe_allow_html=True)
