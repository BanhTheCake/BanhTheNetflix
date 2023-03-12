import axios from 'axios';
import tmdbApi, { TMediaCategory, TMediaType } from './tmdb.api';

const TmdbServices = {
  getMediaList: (
    mediaType: TMediaType,
    mediaCategory: TMediaCategory,
    page: string,
  ) => {
    return axios.get(tmdbApi.mediaList(mediaType, mediaCategory, page));
  },
  getMediaDetails: (mediaType: TMediaType, mediaId: string) => {
    return axios.get(tmdbApi.mediaDetails(mediaType, mediaId));
  },
  getMediaCredits: (mediaType: TMediaType, mediaId: string) => {
    return axios.get(tmdbApi.mediaCredits(mediaType, mediaId));
  },
  getMediaVideos: (mediaType: TMediaType, mediaId: string) => {
    return axios.get(tmdbApi.mediaVideos(mediaType, mediaId));
  },
  getMediaRecommend: (mediaType: TMediaType, mediaId: string) => {
    return axios.get(tmdbApi.mediaRecommend(mediaType, mediaId));
  },
  getMediaImages: (mediaType: TMediaType, mediaId) => {
    return axios.get(tmdbApi.mediaImages(mediaType, mediaId));
  },
  getGenres: (mediaType: TMediaType) => {
    return axios.get(tmdbApi.genres(mediaType));
  },
  searchWithKeyword: (
    mediaType: TMediaType | 'person',
    page: string,
    query: string,
  ) => {
    return axios.get(tmdbApi.search(mediaType, page, query));
  },
  getPersonDetails: (personId: string) => {
    return axios.get(tmdbApi.personDetails(personId));
  },
  getPersonCombinedCredits: (personId: string) => {
    return axios.get(tmdbApi.personCombineCredits(personId));
  },
};

export default TmdbServices;
