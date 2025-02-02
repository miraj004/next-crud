import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function NavLinks() {
  const session = await auth();
  return (
    <>
      {session ? (
        <Link
          href="/dashboard"
          className="inline-block text-center bg-gray-800 text-white rounded-lg px-4 py-2 text-sm font-medium"
        >
          Go to Dashboard
        </Link>
      ) : (
        <Link
          href="/auth/signin"
          className="inline-block text-center text-white bg-gray-600 hover:bg-gray-700 rounded-lg px-4 py-2 text-sm font-medium"
        >
          Log In
        </Link>
      )}
    </>
  );
}
