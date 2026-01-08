import os
from dotenv import load_dotenv
from linebot import LineBotApi, WebhookHandler
from linebot.models import TextSendMessage, LocationSendMessage, QuickReply, QuickReplyButton, LocationAction

# Load credentials from .env file
load_dotenv()

LINE_CHANNEL_ACCESS_TOKEN = os.getenv('LINE_CHANNEL_ACCESS_TOKEN')
LINE_CHANNEL_SECRET = os.getenv('LINE_CHANNEL_SECRET')

# Initialize LINE API objects
line_bot_api = LineBotApi(LINE_CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(LINE_CHANNEL_SECRET)

def send_notification(user_id, message):
    """Sends a push text message to a specific user"""
    try:
        line_bot_api.push_message(user_id, TextSendMessage(text=message))
        print(f"✅ Notification pushed: {message[:20]}...")
        return True
    except Exception as e:
        print(f"❌ Push Error: {e}")
        return False

def send_location_alert(user_id, title, address, lat, lng):
    """Sends a native LINE map pin to a specific user"""
    try:
        location_msg = LocationSendMessage(
            title=title,
            address=address,
            latitude=lat,
            longitude=lng
        )
        line_bot_api.push_message(user_id, location_msg)
        print("✅ Location pin pushed.")
        return True
    except Exception as e:
        print(f"❌ Location Error: {e}")
        return False
    
def send_location_request(user_id, message_text):
    """Sends a Quick Reply message to request user's location"""
    try:
        # Create Quick Reply with Location Action
        location_prompt = QuickReply(items=[
            QuickReplyButton(action=LocationAction(label="แชร์พิกัดปัจจุบัน"))
        ])
        
        message = TextSendMessage(
            text=message_text,
            quick_reply=location_prompt
        )
        
        line_bot_api.push_message(user_id, message)
        return True
    except Exception as e:
        print(f"Quick Reply Error: {e}")
        return False