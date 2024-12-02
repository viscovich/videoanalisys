import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { cloudinaryService } from '../services/cloudinaryService';
import { useVideoStore } from '../store/videoStore';

interface VideoUploaderProps {
  onSuccess?: () => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({ onSuccess }) => {
  const { addVideo, setSelectedVideo } = useVideoStore();
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      if (file.size > 100 * 1024 * 1024) {
        throw new Error('File size exceeds 100MB limit');
      }

      if (!file.type.startsWith('video/')) {
        throw new Error('Please upload a valid video file');
      }

      const videoData = await cloudinaryService.uploadVideo(file);
      addVideo(videoData);
      setSelectedVideo(videoData);
      onSuccess?.();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to upload video');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  }, [addVideo, setSelectedVideo, onSuccess]);

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
        error ? 'border-red-300 bg-red-50 hover:bg-red-100' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
      }`}>
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className={`w-10 h-10 mb-3 ${error ? 'text-red-400' : 'text-gray-400'}`} />
          {uploading ? (
            <p className="text-sm text-blue-500">Uploading video...</p>
          ) : (
            <>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">MP4, WebM or MOV (MAX. 100MB)</p>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept="video/*"
          onChange={handleFileUpload}
          disabled={uploading}
        />
      </label>

      {error && (
        <div className="flex items-center space-x-2 text-red-500">
          <AlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};