type Param = string | number;

const ALBUMS_BASE = 'photoalbum';

export const getAlbumsUrl = () => `${ALBUMS_BASE}/albums`;
export const getAlbumUrl = (albumId: Param) => `${ALBUMS_BASE}/albums/${albumId}`;

export const getPhotosUrl = () => `${ALBUMS_BASE}/photos`;
export const getPhotoUrl = (photoId: Param) => `${ALBUMS_BASE}/photos/${photoId}/`;

export const getTagsUrl = () => `${ALBUMS_BASE}/tags`;
export const getTagUrl = (tagId: Param) => `${ALBUMS_BASE}/tags/${tagId}/`;

export const getUsersUrl = () => `/users`;
export const getUserUrl = (userId: Param) => `/albums/${userId}/`;
