import getUrl from './tmdb.config';

export type TMediaType = 'tv' | 'movie';
export type TMediaCategory = 'popular' | 'top_rated';

const tmdbApi = {
  mediaList: (
    mediaType: TMediaType,
    mediaCategory: TMediaCategory,
    page: string,
  ) => {
    const path = [mediaType, mediaCategory].join('/');
    return getUrl(path, { page });
  },
  mediaDetails: (mediaType: TMediaType, mediaId: string) => {
    const path = [mediaType, mediaId].join('/');
    return getUrl(path);
  },
  mediaCredits: (mediaType: TMediaType, mediaId: string) => {
    const path = [mediaType, mediaId, 'credits'].join('/');
    return getUrl(path);
  },
  mediaVideos: (mediaType: TMediaType, mediaId: string) => {
    const path = [mediaType, mediaId, 'videos'].join('/');
    return getUrl(path);
  },
  mediaRecommend: (mediaType: TMediaType, mediaId: string) => {
    const path = [mediaType, mediaId, 'recommendations'].join('/');
    return getUrl(path);
  },
  mediaImages: (mediaType: TMediaType, mediaId: string) => {
    const path = [mediaType, mediaId, 'images'].join('/');
    return getUrl(path);
  },
  genres: (mediaType: TMediaType) => {
    const path = ['genre', mediaType, 'list'].join('/');
    return getUrl(path);
  },
  search: (mediaType: TMediaType | 'person', page: string, query: string) => {
    const path = ['search', mediaType].join('/');
    return getUrl(path, { page, query });
  },
  personDetails: (personId: string) => {
    const path = ['person', personId].join('/');
    return getUrl(path);
  },
  personCombineCredits: (personId: string) => {
    const path = ['person', personId, 'combined_credits'].join('/');
    return getUrl(path);
  },
};

export default tmdbApi;
