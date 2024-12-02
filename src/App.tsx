import React, { useState } from 'react';
import { VideoPlayer } from './components/VideoPlayer';
import { ActionMarker } from './components/ActionMarker';
import { VideoComparison } from './components/VideoComparison';
import { VideoUploader } from './components/VideoUploader';
import { VideoLibrary } from './components/VideoLibrary';
import { HighlightCreator } from './components/HighlightCreator';
import { ShareDialog } from './components/ShareDialog';
import { useVideoStore } from './store/videoStore';
import { Video, Split, Share2 } from 'lucide-react';
import { VideoAction } from './types';

function App() {
  const { selectedVideo, compareVideo, actions, removeAction } = useVideoStore();
  const [activeTab, setActiveTab] = useState<'analyze' | 'compare'>('analyze');
  const [selectedAction, setSelectedAction] = useState<VideoAction | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [showUploader, setShowUploader] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="text-blue-500" />
              <h1 className="text-xl font-bold">Beach Volleyball Analysis</h1>
            </div>
            {selectedVideo && (
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('analyze')}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'analyze'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Analyze
                </button>
                <button
                  onClick={() => setActiveTab('compare')}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'compare'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Compare
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showUploader ? (
          <div>
            <button
              onClick={() => setShowUploader(false)}
              className="mb-4 text-blue-500 hover:text-blue-600"
            >
              ← Back to Library
            </button>
            <VideoUploader onSuccess={() => setShowUploader(false)} />
          </div>
        ) : !selectedVideo ? (
          <VideoLibrary onUploadClick={() => setShowUploader(true)} />
        ) : (
          <>
            {activeTab === 'analyze' && (
              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                  <VideoPlayer url={selectedVideo.url} />
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Actions</h2>
                    <div className="space-y-2">
                      {actions.map((action) => (
                        <ActionMarker
                          key={action.id}
                          action={action}
                          onDelete={removeAction}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Tools</h2>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedAction(actions[0])}
                        className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={!actions.length}
                      >
                        <Split size={18} />
                        <span>Create Highlight</span>
                      </button>
                      <button
                        onClick={() => setShowShare(true)}
                        className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded"
                      >
                        <Share2 size={18} />
                        <span>Share Analysis</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'compare' && compareVideo && (
              <VideoComparison video1={selectedVideo} video2={compareVideo} />
            )}

            {selectedAction && selectedVideo && (
              <HighlightCreator
                video={selectedVideo}
                action={selectedAction}
                onClose={() => setSelectedAction(null)}
              />
            )}

            {showShare && selectedVideo && (
              <ShareDialog
                video={selectedVideo}
                onClose={() => setShowShare(false)}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;