import React, { useEffect, useState } from 'react';
import { cloudinaryService } from '../services/cloudinaryService';
import { useVideoStore } from '../store/videoStore';
import { VideoData } from '../types';
import { Upload, Plus } from 'lucide-react';

interface VideoLibraryProps {
  onUploadClick: () => void;
}

export const VideoLibrary: React.FC<VideoLibraryProps> = ({ onUploadClick }) => {
  const { videos, setVideos, setSelectedVideo } = useVideoStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setError(null);
        const fetchedVideos = await cloudinaryService.fetchVideos();
        setVideos(fetchedVideos);
      } catch (err) {
        setError('Failed to load videos. Please try again later.');
        console.error('Error loading videos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [setVideos]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={onUploadClick}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus size={18} />
          <span>Upload New Video</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Video Library</h2>
        <button
          onClick={onUploadClick}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Plus size={18} />
          <span>Upload New</span>
        </button>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No videos uploaded yet</p>
          <button
            onClick={onUploadClick}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-auto"
          >
            <Upload size={18} />
            <span>Upload Your First Video</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video: VideoData) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow overflow-hidden cursor-pointer transform transition hover:scale-105"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="aspect-video relative">
                <img
                  src={video.thumbnail}
                  alt={video.publicId}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Upload className="text-white" size={24} />
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold truncate">{video.publicId}</p>
                <p className="text-sm text-gray-500">{Math.round(video.duration)}s</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};