import { create } from 'zustand';
import { VideoData, VideoAction } from '../types';

interface VideoStore {
  videos: VideoData[];
  selectedVideo: VideoData | null;
  compareVideo: VideoData | null;
  actions: VideoAction[];
  setVideos: (videos: VideoData[]) => void;
  addVideo: (video: VideoData) => void;
  setSelectedVideo: (video: VideoData | null) => void;
  setCompareVideo: (video: VideoData | null) => void;
  addAction: (action: VideoAction) => void;
  removeAction: (actionId: string) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  videos: [],
  selectedVideo: null,
  compareVideo: null,
  actions: [],
  setVideos: (videos) => set({ videos }),
  addVideo: (video) =>
    set((state) => ({ videos: [...state.videos, video] })),
  setSelectedVideo: (video) =>
    set(() => ({ selectedVideo: video })),
  setCompareVideo: (video) =>
    set(() => ({ compareVideo: video })),
  addAction: (action) =>
    set((state) => ({ actions: [...state.actions, action] })),
  removeAction: (actionId) =>
    set((state) => ({
      actions: state.actions.filter((action) => action.id !== actionId),
    })),
}));