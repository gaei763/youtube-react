import axios from "axios";

const KEY = "AIzaSyB_ynWQMpCUw6z66N1nLho6NO4XM97xYvQ";

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

export const fetchPopularData = async () => {
  return await youtube.get("/videos", {
    params: {
      part: "snippet",
      maxResult: 40,
      key: KEY,
      regionCode: "JP",
      type: "video",
      chart: "mostPopular",
    },
  });
};
