import axios from "axios";

const YOUTUBE_TOKEN = process.env.REACT_APP_YOUTUBE_TOKEN;

type KeyType = "default" | "medium" | "high" | "maxres" | "standard";

export interface MovieResorce {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key in KeyType]: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    tags: [string];
    categoryId: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction: {
      allowed: [string];
      blocked: [string];
    };
    contentRating: {
      mpaaRating: string;
      tvpgRating: string;
      bbfcRating: string;
      chvrsRating: string;
      eirinRating: string;
      cbfcRating: string;
      fmocRating: string;
      icaaRating: string;
      acbRating: string;
      oflcRating: string;
      fskRating: string;
      kmrbRating: string;
      djctqRating: string;
      russiaRating: string;
      rtcRating: string;
      ytRating: string;
    };
  };
  status: {
    uploadStatus: string;
    failureReason: string;
    rejectionReason: string;
    privacyStatus: string;
    license: string;
    embeddable: boolean;
    publicStatsViewable: boolean;
  };
  statistics: {
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    favoriteCount: number;
    commentCount: number;
  };
  player: {
    embedHtml: string;
  };
  topicDetails: {
    topicIds: [string];
    relevantTopicIds: [string];
  };
  recordingDetails: {
    locationDescription: string;
    location: {
      latitude: number;
      longitude: number;
      altitude: number;
    };
    recordingDate: Date;
  };
  fileDetails: {
    fileName: string;
    fileSize: number;
    fileType: string;
    container: string;
    videoStreams: [
      {
        widthPixels: number;
        heightPixels: number;
        frameRateFps: number;
        aspectRatio: number;
        codec: string;
        bitrateBps: number;
        rotation: string;
        vendor: string;
      }
    ];
    audioStreams: [
      {
        channelCount: number;
        codec: string;
        bitrateBps: number;
        vendor: string;
      }
    ];
    durationMs: number;
    bitrateBps: number;
    recordingLocation: {
      latitude: number;
      longitude: number;
      altitude: number;
    };
    creationTime: string;
  };
  processingDetails: {
    processingStatus: string;
    processingProgress: {
      partsTotal: number;
      partsProcessed: number;
      timeLeftMs: number;
    };
    processingFailureReason: string;
    fileDetailsAvailability: string;
    processingIssuesAvailability: string;
    tagSuggestionsAvailability: string;
    editorSuggestionsAvailability: string;
    thumbnailsAvailability: string;
  };
  suggestions: {
    processingErrors: [string];
    processingWarnings: [string];
    processingHints: [string];
    tagSuggestions: [
      {
        tag: string;
        categoryRestricts: [string];
      }
    ];
    editorSuggestions: [string];
  };
}

export interface YoutubeResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: MovieResorce[];
}

export interface YoutubeRelatedResponse {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key in KeyType]: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
  };
}

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

const params = {
  part: "snippet",
  maxResult: 40,
  key: YOUTUBE_TOKEN,
  regionCode: "JP",
  type: "video",
};
export const fetchPopularData = async () => {
  return await youtube.get<YoutubeResponse>("/videos", {
    params: {
      ...params,
      chart: "mostPopular",
    },
  });
};

export const fetchSelectedData = async (id: string) => {
  return await youtube.get<YoutubeResponse>("/videos", {
    params: {
      ...params,
      id,
    },
  });
};

export const fetchRelatedData = async (id: string) => {
  return await youtube.get<YoutubeResponse>("/search", {
    params: {
      ...params,
      relatedToVideoId: id,
    },
  });
};

export const fetchSearchData = async (query: string) => {
  return await youtube.get<YoutubeResponse>("/search", {
    params: {
      ...params,
      q: query,
    },
  });
};
