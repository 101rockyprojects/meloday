export const playlistId = import.meta.env.VITE_YT_PLAYLIST_ID;

export const apiKey = import.meta.env.VITE_YT_API_KEY;

export const specialDates = import.meta.env.VITE_SPECIAL_DATES 
    ? import.meta.env.VITE_SPECIAL_DATES.split(',').map(date => date.trim()) 
    : [];