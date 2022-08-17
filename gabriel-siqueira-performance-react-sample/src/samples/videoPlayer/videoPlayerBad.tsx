import React, { ChangeEvent, useEffect, useRef, useState } from "react";

type Props = {};

const VideoPlayerBad = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setPaying] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);

  const play = () => {
    isPlaying ? videoRef.current?.pause() : videoRef.current?.play();
    setPaying(!isPlaying);
  };

  const seek = (event: ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseInt(event.target.value, 10);
    setCurrentValue(seekTo);
    videoRef.current!.currentTime = (seekTo / 100) * videoRef.current!.duration;
  };

  useEffect(() => {
    const videoInstance = videoRef.current!;
    if (isPlaying) {
      let timeoutId: any = null;
      const progressLoop = () => {
        const progress = Math.round(
          (videoInstance.currentTime / videoInstance.duration) * 100
        );
        setCurrentValue(progress);
        if (progress < 100) {
          timeoutId = setTimeout(progressLoop, 100);
        } else {
          setPaying(false);
        }
      };
      progressLoop();
      return () => {
        clearInterval(timeoutId);
      };
    }
  }, [isPlaying]);

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
          value={currentValue}
          type="range"
          step={0.1}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
};

export default VideoPlayerBad;
