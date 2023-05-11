export interface Credentials {
  email: string;
  password: string;
}

export interface AuthenticationTokenResponse {
  accessToken: string;
  refreshToken: string;
  statusCode: number;
}
