# download.py
import sys
import yt_dlp

def download_video(url):
    try:
        print("Received URL:", url)

        ydl_opts = {
            'format': 'best',
            'outtmpl': 'downloads/video.%(ext)s',  # Save as downloads/video.mp4 or .webm
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        print("Download successful")

    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python download.py <video_url>")
    else:
        download_video(sys.argv[1])
