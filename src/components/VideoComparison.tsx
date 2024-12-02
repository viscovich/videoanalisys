import React, { useState } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { VideoData } from '../types';

interface VideoComparisonProps {
  video1: VideoData;
  video2: VideoData;
}

export const VideoComparison: React.FC<VideoComparisonProps> = ({
  video1,
  video2,
}) => {
  const [syncMode, setSyncMode] = useState<'parallel' | 'sequential'>('parallel');
  const [playing, setPlaying] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setSyncMode('parallel')}
          className={`px-4 py-2 rounded ${
            syncMode === 'parallel'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Parallel
        </button>
        <button
          onClick={() => setSyncMode('sequential')}
          className={`px-4 py-2 rounded ${
            syncMode === 'sequential'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Sequential
        </button>
      </div>

      <div className={`grid ${syncMode === 'parallel' ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
        <div className={syncMode === 'sequential' && !playing ? 'block' : 'hidden'}>
          <VideoPlayer url={video1.url} />
        </div>
        <div className={syncMode === 'sequential' && playing ? 'block' : 'hidden'}>
          <VideoPlayer url={video2.url} />
        </div>
        {syncMode === 'parallel' && (
          <>
            <VideoPlayer url={video1.url} />
            <VideoPlayer url={video2.url} />
          </>
        )}
      </div>
    </div>
  );
};