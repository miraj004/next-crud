'use server';

import { getAccessToken } from "@/utils/session-token-accessor";

export interface Bank {
  id: number;
  code: string;
  name: string;
}

export async function getBanks(): Promise<Bank[] | { error: string }> {
  try {
    const url = `${process.env.BACKEND_URL}/api/banks`;
    const accessToken = await getAccessToken();

    const resp = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (resp.ok) {
      const banks = await resp.json();
      if (banks.length === 0) {
        return { error: 'Record not found' }; 
      }
      return banks;
    } else if (resp.status === 401) {
      return { error: 'Unauthorized' };
    } else {

      console.error(`Error: Unexpected response status: ${resp.status}`);
      return { error: 'Failed to fetch banks' };
    }
  } catch (error) {
    console.error('Error while fetching banks:', error);
    return { error: 'An error occurred while fetching banks' };
  }
}
