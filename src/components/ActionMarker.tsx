import React from 'react';
import { VideoAction } from '../types';
import { Tag, Trash2 } from 'lucide-react';

interface ActionMarkerProps {
  action: VideoAction;
  onDelete: (id: string) => void;
}

export const ActionMarker: React.FC<ActionMarkerProps> = ({ action, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md mb-2">
      <div className="flex items-center space-x-3">
        <Tag className="text-blue-500" />
        <div>
          <h3 className="font-semibold capitalize">{action.type}</h3>
          <p className="text-sm text-gray-500">
            {Math.floor(action.startTime)}s - {Math.floor(action.startTime + action.duration)}s
          </p>
        </div>
      </div>
      
      <button
        onClick={() => onDelete(action.id)}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};