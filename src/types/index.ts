export type ActionType = 'spike' | 'block' | 'serve' | 'dig' | 'set' | 'receive';

export interface VideoAction {
  id: string;
  type: ActionType;
  startTime: number;
  duration: number;
  videoId: string;
  tags: string[];
  notes?: string;
}

export interface VideoData {
  id: string;
  url: string;
  publicId: string;
  actions: VideoAction[];
  duration: number;
  thumbnail?: string;
}