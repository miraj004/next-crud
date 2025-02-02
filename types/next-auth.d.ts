
import { DefaultUser, JWT as NextAuthJWT } from 'next-auth';
export interface DecodedToken {
    exp: number;
    iat: number;
    jti: string;
    iss: string;
    aud: string;
    sub: string;
    typ: string;
    azp: string;
    sid: string;
    acr: string;
    realm_access: {
      roles: string[];
    };
    resource_access: {
      [key: string]: {
        roles: string[];
      };
    };
    scope: string;
    email_verified: boolean;
    address: object;
    name: string;
    groups: string[];
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
  }
  
declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
      id_token: string;
      access_token: string;
      expires_at: number;
      refresh_token: string;
      decoded: DecodedToken;
      roles: string[];
      error?: "RefreshAccessTokenError";
    }
  }
  
  declare module "next-auth" {
    interface Session {
      access_token: string;
      id_token: string;
      roles: string[];
      error?: "RefreshAccessTokenError";
      user?: DefaultUser & { 
        id: string;
        name: string;
        email: string; };
    }

  }

  

  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
  }
  
  