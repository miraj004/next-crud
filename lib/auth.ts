import { decodeAccessToken, extractRoles } from "@/utils/decode";
import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { JWT } from "next-auth/jwt";
import { type DecodedToken } from "@/types/next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID!,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
        token.id_token = account.id_token!;
        token.access_token = account.access_token!;
        token.expires_at =
          Math.floor(Date.now() / 1000) + (Number(account.expires_in) || 0);
        token.refresh_token = account.refresh_token!;

        const decodedAccessToken = decodeAccessToken(account.access_token!);

        token.roles = extractRoles(decodedAccessToken);
        token.decoded = decodedAccessToken;
      } else if (Date.now() / 1000 > token.expires_at) {
        console.log("Refreshing access token...");
        const refreshedToken = await refreshAccessToken(token);
        console.log("Access token refreshed successfully");
        return refreshedToken;
      }

      return token;
    },

    async session({ session, token }) {
      session.access_token = token.access_token ?? "";
      session.id_token = token.id_token ?? "";
      session.roles = token.roles;
      session.error = token.error;
      session.user = {
        id: token.decoded?.sub,
        name: token.decoded?.name,
        email: token.decoded?.email,
      };
      return session;
    },
  },
  events: {
    signOut: async (token: any) => {
      await doFinalLogout(token);
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
});

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(
      `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.AUTH_KEYCLOAK_ID || "",
          client_secret: process.env.AUTH_KEYCLOAK_SECRET || "",
          grant_type: "refresh_token",
          refresh_token: token.refresh_token!,
        }),
      }
    );

    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;

    const decodedAccessToken = jwtDecode<DecodedToken>(
      refreshedTokens.access_token
    );

    const realmRoles = decodedAccessToken.realm_access?.roles || [];
    const clientRoles = Object.values(
      decodedAccessToken.resource_access || {}
    ).flatMap((resource) => resource.roles || []);

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      expires_at: Math.floor(Date.now() / 1000) + refreshedTokens.expires_in,
      refresh_token: refreshedTokens.refresh_token,
      decoded: decodedAccessToken,
      roles: Array.from(new Set([...realmRoles, ...clientRoles])),
    };
  } catch (error) {
    console.log("Error refreshing access token:", error);
    await doFinalLogout({ token });
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export async function doFinalLogout({ token }: { token: JWT }) {
  if (token.provider === "keycloak") {
    const logOutUrl = new URL(
      `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`
    );
    logOutUrl.searchParams.set("id_token_hint", token.id_token!);
    await fetch(logOutUrl);
  }
}
