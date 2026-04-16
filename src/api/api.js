import axios from "axios";

// ⚠️ Use HTTP because HTTPS is causing SSL error in browser
const BASE_URL = "http://qtify-backend-labs.crio.do";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Generic safe fetch function
const safeFetch = async (url, label) => {
  try {
    const response = await api.get(url);
    
    // Ensure data exists and is usable
    if (!response || !response.data) {
      console.warn(`${label}: Empty response`);
      return [];
    }

    return response.data;
  } catch (error) {
    console.error(`${label} error:`, error?.message || error);
    return []; // NEVER return Error object
  }
};

// API functions
const fetchTopAlbum = async () => {
  return await safeFetch("/albums/top", "Top Albums");
};

const fetchNewAlbum = async () => {
  return await safeFetch("/albums/new", "New Albums");
};

const fetchSongs = async () => {
  return await safeFetch("/songs", "Songs");
};

const fetchGenres = async () => {
  return await safeFetch("/genres", "Genres");
};

export { fetchTopAlbum, fetchNewAlbum, fetchSongs, fetchGenres };