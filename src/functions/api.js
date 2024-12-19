import { todayNumber } from '../stores/todayNumber.js';
import { get } from 'svelte/store';

export async function getTodayVideo(playlistId, apiKey) {
  let pageNumber = Math.ceil(get(todayNumber) / 50);
  let actualPage = 1;
  let nextPageToken = '';
  let totalOfVideos = 0;
  let videoIndex = 0;
  let looped = false;
  while (actualPage < pageNumber) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50&pageToken=${nextPageToken}`);
    const data = await response.json();
    totalOfVideos = Number(data.pageInfo.totalResults);
    if (totalOfVideos < get(todayNumber)) {
      const loopIndex = get(todayNumber) % totalOfVideos;
      pageNumber = Math.ceil(loopIndex / 50);
      videoIndex = (loopIndex - 1) % 50;
      looped = true;
    }
    nextPageToken = data.nextPageToken;
    actualPage++;
  }
  if (looped === false) {
    videoIndex = (get(todayNumber) - 1) % 50;
  }
  const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50&pageToken=${nextPageToken}`);
  const data = await response.json();
  const video = data.items[videoIndex];
  if (video.snippet.title === 'Private video' || video.snippet.title === 'Deleted video') {
    throw new Error('Video is private or deleted');
  }
  return video;
}

export async function getVideoById(videoId, apiKey) {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);
  const data = await response.json();
  return data.items[0];
}

export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
