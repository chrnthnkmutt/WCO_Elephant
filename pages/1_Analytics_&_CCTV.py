import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import shared_state
from PIL import Image
import numpy as np

# Page Configuration
st.set_page_config(
    page_title="Analytics & CCTV - Elephant Monitoring",
    page_icon="🐘",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Initialize Shared State
shared_state.initialize_state()

# Custom CSS
shared_state.apply_custom_css()

st.title("📊 Analytics & CCTV Feed")

col1, col2 = st.columns([1, 1])

with col1:
    st.markdown("### Historical Data Analysis")
    months = ["July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    sightings = [12, 19, 15, 25, 32, 28]
    incidents = [2, 4, 3, 8, 12, 10]
    
    chart_df = pd.DataFrame({
        "Month": months,
        "Sightings": sightings,
        "Incidents": incidents
    }).set_index("Month")
    
    st.bar_chart(chart_df)
    
    st.markdown("### Threat Level Distribution (Last 30 Days)")
    labels = ['Low', 'Medium', 'High']
    values = [70, 20, 10]
    
    fig = go.Figure(data=[go.Pie(labels=labels, values=values, hole=.3)])
    fig.update_layout(margin=dict(t=0, b=0, l=0, r=0), height=300)
    st.plotly_chart(fig, use_container_width=True)

with col2:
    st.markdown("### Live CCTV Feed")
    
    # Placeholder for CCTV Feed
    # In a real app, this would be a video stream or periodically updated images
    st.info("Displaying feed from Camera 04 (Sector B)")
    
    # Create a placeholder image
    # Generate a random noise image to simulate a camera feed or just a black box with text
    img = np.zeros((400, 600, 3), dtype=np.uint8)
    
    # Draw some "night vision" green tint
    img[:, :, 1] = 50 
    
    # Add timestamp (simulated by just showing the image)
    st.image(img, caption="Live Feed - CAM 04 - [Signal: Strong]", use_column_width=True)
    
    st.markdown("#### Detected Objects")
    if st.session_state.threat_level == "HIGH":
        st.warning("⚠️ Elephant Herd Detected (Confidence: 98%)")
    else:
        st.success("No threats detected.")

    st.markdown("#### Camera Controls")
    c1, c2, c3 = st.columns(3)
    c1.button("Pan Left")
    c2.button("Zoom In")
    c3.button("Pan Right")
