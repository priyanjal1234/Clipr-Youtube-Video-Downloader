import sys
import os
import time
import yt_dlp

if len(sys.argv) < 4:
    print("Usage: script.py <video_url> <output_path> <format>")
    sys.exit(1)

video_url = sys.argv[1]
output_path = sys.argv[2]
video_format = sys.argv[3]

ffmpeg_path = 'C:\\ffmpeg\\bin'

base_opts = {
    'ffmpeg_location': ffmpeg_path,
    'outtmpl': os.path.join(output_path, '%(id)s.%(ext)s'),
    'merge_output_format': 'mp4',
}

if video_format == "mp3":
    ydl_opts = {
        **base_opts,
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }
elif video_format in ["360", "720", "1080"]:
    height = video_format
    ydl_opts = {
        **base_opts,
        'format': f'bestvideo[height<={height}]+bestaudio/best',
    }
else:
    ydl_opts = {
        **base_opts,
        'format': 'bestvideo+bestaudio/best',
    }

with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info(video_url, download=True)

    # Get downloaded file(s)
    downloaded_files = []

    if 'requested_downloads' in info:
        for item in info['requested_downloads']:
            path = item.get('filepath')
            if path:
                downloaded_files.append(path)
    elif '_filename' in info:
        downloaded_files.append(info['_filename'])

    # Wait and check if file appears (5 seconds max)
    found = False
    for file in downloaded_files:
        for attempt in range(5):  # Try for 5 seconds
            if os.path.exists(file):
                print("Download successful:", file)
                found = True
                break
            else:
                time.sleep(1)  # wait 1 second before retrying

        if not found:
            print("File not found after download (still missing):", file)

    if not found:
        print("All expected files not found. Something went wrong.")
