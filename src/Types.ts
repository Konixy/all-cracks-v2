export interface APIGame {
  _id: string;
  name: string;
  release: string;
  releaseDate: string;
  lastUpdate: string;
  lastUpdateDate: string;
  description?: string;
  tutorial?: string;
  bgUrl?: string;
  coverUrl?: string;
  videoId?: string;
  crackDlLink?: string;
  crackDlSize?: string;
  crackDlLinkType?: string;
  isOnline?: string;
  additionalLinks?: AdditionnalLink[];
}

interface AdditionnalLink {
  _id: string;
  name: string;
  link: string;
  linkType: 'rar' | 'torrent';
}

export interface APIResponse {
  games: APIGame[];
}

export interface APIUser {
  email: string;
}
