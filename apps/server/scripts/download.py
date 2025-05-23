import sys
import yt_dlp
import random
import string

def generate_random_string(length=8):
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for _ in range(length))

def download_video(url):
    try:
        print("Received URL:", url)
        
        random_filename = generate_random_string()
        
        ydl_opts = {
            'format': 'best',
            'outtmpl': f'downloads/{random_filename}.%(ext)s',  # Random filename
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        print(f"Download successful: downloads/{random_filename}")

    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python download.py <video_url>")
    else:
        download_video(sys.argv[1])
