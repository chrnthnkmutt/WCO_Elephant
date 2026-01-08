import time
import json
import os
import math
from line_handler import send_notification, send_location_alert
from dotenv import load_dotenv

load_dotenv()
TARGET_USER_ID = os.getenv("MY_LINE_USER_ID")

# --- [MOCK] User location ---
USER_LAT = 14.2650
USER_LNG = 101.4200

def calculate_distance(lat1, lon1, lat2, lon2):
    """Calculates distance between two points in KM using Haversine formula"""
    R = 6371 
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    a = (math.sin(d_lat / 2)**2 + 
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(d_lon / 2)**2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

def monitor_threats():
    last_processed_time = 0.0
    print(f"🚀 Bridge Active: Monitoring distance to User ({USER_LAT}, {USER_LNG})")
    
    while True:
        try:
            if os.path.exists("shared_data.json"):
                with open("shared_data.json", "r", encoding="utf-8") as f:
                    data = json.load(f)
                
                current_time = data.get("timestamp", 0.0)
                
                if current_time > last_processed_time:
                    current_level = data.get("threat_level", "LOW")
                    dashboard_text = data.get("status_bar", "")
                    # get elephant position
                    e_lat, e_lng = data.get("elephant_pos", [0, 0])
                    
                    # calculate distance to user
                    km_dist = calculate_distance(e_lat, e_lng, USER_LAT, USER_LNG)
                    dist_info = f"Distance to you: {km_dist:.2f} km"
                    
                    # send alerts based on threat level
                    if current_level in ["HIGH", "MEDIUM"]:
                        icon = "🔴 EMERGENCY" if current_level == "HIGH" else "🟡 CAUTION"
                        msg = f"{icon}: {dashboard_text}\n({dist_info})"
                        
                        # send text notification
                        send_notification(TARGET_USER_ID, msg)
                        
                        # send location pin
                        send_location_alert(
                            TARGET_USER_ID, 
                            title=f"Elephant Spotted ({current_level})",
                            address=f"{dist_info} from your home",
                            lat=e_lat, 
                            lng=e_lng
                        )

                    last_processed_time = current_time
                    
        except Exception as e:
            print(f"Error: {e}")
        time.sleep(1)

if __name__ == "__main__":
    monitor_threats()