import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { VideoData } from '../types';
import { cloudinaryService } from '../services/cloudinaryService';

interface ShareDialogProps {
  video: VideoData;
  onClose: () => void;
}

export const ShareDialog: React.FC<ShareDialogProps> = ({ video, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareableUrl = cloudinaryService.generateShareableUrl(video.publicId);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Share Video</h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={shareableUrl}
              readOnly
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleCopy}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              {copied ? <Check className="text-green-500" /> : <Copy />}
            </button>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};