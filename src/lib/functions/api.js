import { todayNumber } from '../stores/todayNumber.js';
import { get } from 'svelte/store';

export async function getTodayVideo(playlistId, apiKey, dayNumberOverride) {
  const dayNumberRaw =
    typeof dayNumberOverride === 'number' && Number.isFinite(dayNumberOverride)
      ? dayNumberOverride
      : get(todayNumber);
  const dayNumber = Math.max(1, Math.floor(dayNumberRaw || 1));

  let pageNumber = Math.ceil(dayNumber / 50);
  let actualPage = 1;
  let nextPageToken = '';
  let totalOfVideos = 0;
  let videoIndex = 0;
  let looped = false;
  
  while (actualPage < pageNumber) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50&pageToken=${nextPageToken}`);
    const data = await response.json();
    if (!response.ok || data?.error) {
      throw new Error(data?.error?.message || `YouTube API error (${response.status})`);
    }
    totalOfVideos = Number(data?.pageInfo?.totalResults || 0);
    if (totalOfVideos > 0 && totalOfVideos < dayNumber) {
      const loopIndex = ((dayNumber - 1) % totalOfVideos) + 1;
      pageNumber = Math.ceil(loopIndex / 50);
      videoIndex = (loopIndex - 1) % 50;
      looped = true;
    }
    nextPageToken = data.nextPageToken;
    actualPage++;
  }
  if (looped === false) {
    videoIndex = (dayNumber - 1) % 50;
  }
  const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50&pageToken=${nextPageToken}`);
  const data = await response.json();
  if (!response.ok || data?.error) {
    throw new Error(data?.error?.message || `YouTube API error (${response.status})`);
  }
  const items = Array.isArray(data?.items) ? data.items : [];
  const video = items[videoIndex];
  if (!video) return null;
  if (video?.snippet?.title === 'Private video' || video?.snippet?.title === 'Deleted video') {
    throw new Error('Video is private or deleted');
  }
  return video;
}

export async function getVideoById(videoId, apiKey) {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);
  const data = await response.json();
  return data.items[0];
}
