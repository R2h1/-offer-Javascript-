function drawVideo(video: HTMLVideoElement) {
  return new Promise((resolve) => {
    const cvs = document.createElement('canvas');
    const ctx = cvs.getContext('2d');
    cvs.width = video.videoWidth;
    cvs.height = video.videoHeight;
    ctx!.drawImage(video, 0, 0, cvs.width, cvs.height);
    cvs.toBlob((blob) => {
      resolve({
        blob,
        url: URL.createObjectURL(blob as Blob)
      });
    });
  });
}

export function captureFrame(videoFile: File, time = 0) {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.currentTime = time;
    video.muted = true;
    video.autoplay = true;
    video.oncanplay = async () => {
      const frame = await drawVideo(video);
      resolve(frame);
    };
    video.src = URL.createObjectURL(videoFile);
  });
}
