import React, { ChangeEvent, useCallback, useEffect, useRef } from "react";

type Props = {};

const VideoPlayerGood = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);

  const play = useCallback(() => {
    const video = videoRef.current!;
    video.paused ? video.play() : video.pause();
  }, []);

  const seek = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current!;
    const seekTo = parseInt(event.target.value, 10);
    const currentTime = (seekTo / 100) * video.duration;
    video.currentTime = currentTime;
  }, []);

  useEffect(() => {
    const videoInstance = videoRef.current!;
    const rangeInstance = rangeRef.current!;
    let timeoutId: any = null;

    const progressLoop = () => {
      const progress = Math.round(
        (videoInstance.currentTime / videoInstance.duration) * 100
      );
      rangeInstance.value = `${progress}`;
      if (progress < 100) {
        timeoutId = setTimeout(progressLoop, 100);
      } else {
        timeoutId = null;
      }
    };

    videoInstance.onplay = () => {
      timeoutId && clearInterval(timeoutId);
      progressLoop();
    };

    videoInstance.onpause = () => {
      timeoutId && clearInterval(timeoutId);
      timeoutId = null;
    };

    rangeInstance.value = "0";
  }, []);

  console.log("Rendered");

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <video ref={videoRef} width="320" height="240">
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
      </video>
      <div>
        <button onClick={play}>Play</button>
      </div>
      <div>
        <input
          onChange={seek}
          ref={rangeRef}
          type="range"
          step={0.1}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
};

export default VideoPlayerGood;
