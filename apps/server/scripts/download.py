import sys
import os
import yt_dlp
import random
import string
from pathlib import Path

def generate_random_string(length=8):
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for _ in range(length))

def download_video(url, output_dir="downloads"):
    try:
        # Ensure output directory exists
        Path(output_dir).mkdir(parents=True, exist_ok=True)

        # Generate a random filename (without extension)
        random_filename = generate_random_string()

        # yt-dlp options
        ydl_opts = {
            'format': 'best[ext=mp4]/best',
            'outtmpl': os.path.join(output_dir, f'{random_filename}.%(ext)s'),
            'quiet': True,
            'no_warnings': True,
            'merge_output_format': None,
            'ignore_no_formats_error': True,
            'postprocessors': [],
            'allow_multiple_streams': False
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            downloaded_file = ydl.prepare_filename(info)

            # Confirm file exists
            if not os.path.exists(downloaded_file):
                raise FileNotFoundError(f"File not found: {downloaded_file}")

            return os.path.abspath(downloaded_file)

    except Exception as e:
        raise Exception(f"Download failed: {str(e)}")

if __name__ == "__main__":
    try:
        if len(sys.argv) < 2:
            print("Usage: python download.py <video_url> [output_dir]", file=sys.stderr)
            sys.exit(1)

        url = sys.argv[1]
        output_dir = sys.argv[2] if len(sys.argv) > 2 else "downloads"
        path = download_video(url, output_dir)

        # Print only the final path
        print(path, end='')

    except Exception as e:
        print(f"ERROR: {str(e)}", file=sys.stderr)
        sys.exit(1)
