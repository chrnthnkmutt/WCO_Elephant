import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import shared_state
from PIL import Image
import numpy as np
from pathlib import Path

try:
    from ultralytics import YOLO
except Exception:
    YOLO = None

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

MODEL_PATH = Path(__file__).parent.parent / "model" / "V12img10" / "best.pt"
SAMPLE_IMAGE_PATH = Path(__file__).parent.parent / "dataset" / "wild-elephant-dataset_0002.jpg"

@st.cache_resource
def load_yolo_model(model_path: Path):
    if YOLO is None:
        return None
    return YOLO(str(model_path))

def run_detection(model, image_array):
    results = model.predict(source=image_array, verbose=False, conf=0.50, save=False)
    annotated = results[0].plot()
    annotated = annotated[:, :, ::-1]
    return annotated, results[0]

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

    feed_container = st.container()
    detected_labels = []
    uploaded_image = feed_container.file_uploader(
        "Upload image for detection",
        type=["jpg", "jpeg", "png"],
        accept_multiple_files=False
    )

    if YOLO is None:
        feed_container.warning("Ultralytics not installed. Run: pip install ultralytics")
    elif not MODEL_PATH.exists():
        feed_container.error(f"Model not found at: {MODEL_PATH}")
    elif uploaded_image is None and not SAMPLE_IMAGE_PATH.exists():
        feed_container.error(f"Sample image not found at: {SAMPLE_IMAGE_PATH}")
    else:
        run_inference = feed_container.checkbox("Run YOLO v12 on sample feed", value=True)
        if run_inference:
            model = load_yolo_model(MODEL_PATH)
            if uploaded_image is not None:
                source_image = np.array(Image.open(uploaded_image).convert("RGB"))
            else:
                source_image = np.array(Image.open(SAMPLE_IMAGE_PATH).convert("RGB"))
            annotated, result = run_detection(model, source_image)
            feed_container.image(annotated, caption="Live Feed - CAM 04 - [Signal: Strong]", use_column_width=True)

            boxes = result.boxes
            if boxes is not None and len(boxes) > 0:
                names = result.names or {}
                for cls, conf in zip(boxes.cls.tolist(), boxes.conf.tolist()):
                    class_name = names.get(int(cls), str(int(cls))) if isinstance(names, dict) else str(int(cls))
                    detected_labels.append(f"{class_name} ({conf:.2f})")
        else:
            img = np.zeros((400, 600, 3), dtype=np.uint8)
            img[:, :, 1] = 50
            feed_container.image(img, caption="Live Feed - CAM 04 - [Signal: Strong]", use_column_width=True)
    
    st.markdown("#### Detected Objects")
    if detected_labels:
        st.warning("Detected: " + ", ".join(detected_labels))
    else:
        st.success("No threats detected.")

    st.markdown("#### Camera Controls")
    c1, c2, c3 = st.columns(3)
    c1.button("Pan Left")
    c2.button("Zoom In")
    c3.button("Pan Right")
