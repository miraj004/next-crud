import { auth } from "@/lib/auth";

export async function getAccessToken() {
    const session = await auth();
    if (session) {
        const accessTokenDecrypted = session.access_token;
        return accessTokenDecrypted;
    }
    return null;
}
