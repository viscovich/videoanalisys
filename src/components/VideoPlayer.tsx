import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  onProgress?: (state: { played: number; playedSeconds: number }) => void;
  onDuration?: (duration: number) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  onProgress,
  onDuration,
}) => {
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
  };

  return (
    <div className="relative">
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="auto"
        playing={playing}
        playbackRate={playbackRate}
        onProgress={onProgress}
        onDuration={onDuration}
        controls={false}
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 5)}
            className="text-white hover:text-blue-400"
          >
            <SkipBack />
          </button>
          
          <button
            onClick={handlePlayPause}
            className="text-white hover:text-blue-400"
          >
            {playing ? <Pause /> : <Play />}
          </button>
          
          <button
            onClick={() => playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 5)}
            className="text-white hover:text-blue-400"
          >
            <SkipForward />
          </button>
          
          <div className="flex space-x-2">
            {[-2, -1, 1, 2].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`px-2 py-1 rounded ${
                  playbackRate === speed
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};