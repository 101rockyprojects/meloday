export const playlistId = import.meta.env.VITE_YT_PLAYLIST_ID;

export const apiKey = import.meta.env.VITE_YT_API_KEY;

export const specialDates = Object.keys(import.meta.env)
  .filter(key => key.startsWith('VITE_SPECIAL_DATE_'))
  .map(key => import.meta.env[key]);
