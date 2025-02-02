import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types/next-auth";

export function decodeAccessToken(accessToken: string): DecodedToken {
  return jwtDecode<DecodedToken>(accessToken);
}

export function extractRoles(decodedAccessToken: DecodedToken): string[] {
  const realmRoles = decodedAccessToken.realm_access?.roles || [];
  const clientRoles = Object.values(decodedAccessToken.resource_access || {})
    .flatMap((resource) => resource.roles || []);
  return Array.from(new Set([...realmRoles, ...clientRoles]));
}
