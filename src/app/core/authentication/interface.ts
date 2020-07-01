export interface TokenModel {
  token: string | null | undefined;

  [key: string]: any;
}

export interface AuthReferrer {
  url?: string | null | undefined;
}
