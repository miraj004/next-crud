'use server';

import { getAccessToken } from "@/utils/session-token-accessor";

export async function getUserSession() {
  const url = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/userinfo/`;
  const accessToken = await getAccessToken();

  try {
    const resp = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (resp.ok) {
      return resp.json();
    } else {
      console.log(`Failed to fetch data. Status: ${resp.status}`);
      return { error: 'Unauthorized' };
    }
  } catch (error) {
    console.log('Error during session fetching:', error);
    return { error: 'Session error' };
  }
}
