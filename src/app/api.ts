export interface Permissions {
  canUpload?: boolean;
  canListen?: boolean;
  admin: boolean;
}

export interface User {
  email: string;
  userName: string;
  permissions: Permissions;
}

export interface Song {
  title: string;
  artist: string;
  album: string;
  downloads?: number;
  year?: string;
  track?: number;
  genre?: string;
  path?: string;
  coverUrl: string;
  artistUrl: string;
  title: string;
}

export interface AuthenticateResponse {
  token: string;
}
