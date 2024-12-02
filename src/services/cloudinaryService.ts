import { cloudinary } from '../config/cloudinary';
import { VideoData } from '../types';

export const cloudinaryService = {
  async fetchVideos(): Promise<VideoData[]> {
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/resources/video`,
        {
          headers: {
            'Authorization': `Basic ${btoa(import.meta.env.VITE_CLOUDINARY_API_KEY + ':' + import.meta.env.VITE_CLOUDINARY_API_SECRET)}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.statusText}`);
      }

      const data = await response.json();
      return data.resources.map((resource: any) => ({
        id: resource.public_id,
        url: resource.secure_url,
        publicId: resource.public_id,
        duration: resource.duration || 0,
        thumbnail: `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload/w_400,h_300,c_fill,g_auto/${resource.public_id}.jpg`,
        actions: [],
      }));
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  },

  async uploadVideo(file: File): Promise<VideoData> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        id: data.public_id,
        url: data.secure_url,
        publicId: data.public_id,
        duration: data.duration || 0,
        thumbnail: `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload/w_400,h_300,c_fill,g_auto/${data.public_id}.jpg`,
        actions: [],
      };
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },

  generateHighlightUrl(publicId: string, startTime: number, duration: number) {
    return `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload/c_crop,ar_9:16,g_auto/${publicId}.mp4`;
  },

  generateShareableUrl(publicId: string) {
    return `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload/${publicId}.mp4`;
  },
};