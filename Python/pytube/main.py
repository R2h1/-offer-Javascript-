import argparse
from pytube import YouTube

VIDEO_SAVE_DIRECTORY = "./video"
AUDIO_SAVE_DIRECTORY = "./audio"

def download(video_url, only_audio = False):
    video_streams = YouTube(video_url).streams
    try:
      if only_audio:
          video_streams.filter(only_audio = True).first().download(AUDIO_SAVE_DIRECTORY)
      else:
          video_streams.get_highest_resolution().download(VIDEO_SAVE_DIRECTORY)
    except:
        print("Failed to download")

    print("download successfully")

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("-v", "--video", required = True, help = "URL to youtube video")
    ap.add_argument("-a", "--audio", required = False, help = "audio only", action = argparse.BooleanOptionalAction)
    args = vars(ap.parse_args())

    if args["audio"]:
        download(args["video"], True)
    else:
        download(args["video"])