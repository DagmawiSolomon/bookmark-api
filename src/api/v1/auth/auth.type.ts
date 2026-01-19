export type OAuthProvider = 'google';

export enum AuthRequestType {
  MAGIC_LINK = 'magic_link',
  OAUTH = 'oauth'
}

export type AuthRequest =
  | { email: string; type: AuthRequestType.MAGIC_LINK}
  | { provider: OAuthProvider; token: string; type: AuthRequestType.OAUTH };

export interface AuthResponse {
  token: string;
  expiresIn: number;
}