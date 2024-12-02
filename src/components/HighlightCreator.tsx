import React, { useState } from 'react';
import { VideoAction, VideoData } from '../types';
import { cloudinaryService } from '../services/cloudinaryService';

interface HighlightCreatorProps {
  video: VideoData;
  action: VideoAction;
  onClose: () => void;
}

export const HighlightCreator: React.FC<HighlightCreatorProps> = ({
  video,
  action,
  onClose,
}) => {
  const [processing, setProcessing] = useState(false);
  const [highlightUrl, setHighlightUrl] = useState<string | null>(null);

  const createHighlight = async () => {
    setProcessing(true);
    try {
      const url = cloudinaryService.generateHighlightUrl(
        video.publicId,
        action.startTime,
        action.duration
      );
      setHighlightUrl(url);
    } catch (error) {
      console.error('Error creating highlight:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Create Highlight</h2>
        
        {!highlightUrl ? (
          <div className="space-y-4">
            <p>
              Create a vertical (9:16) highlight video from{' '}
              <span className="font-semibold">{action.type}</span> action
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={createHighlight}
                disabled={processing}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {processing ? 'Processing...' : 'Create'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-green-600">Highlight created successfully!</p>
            <video src={highlightUrl} controls className="w-full" />
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};