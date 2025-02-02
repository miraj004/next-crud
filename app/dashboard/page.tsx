import Profile from "@/app/dashboard/profile";
import CheckSession from "@/components/check-session";

import Link from "next/link";

export default function Dashboard() {

  return (
    <>
    <CheckSession/>
    <div className="min-h-screen bg-gray-100 py-12 px-6">
          <Link href='/'>
            <h1 className="mb-5 font-bold text-2xl absolute left-1 top-1 p-2 bg-gray-700 rounded text-white">
               App 1 Home
            </h1>
          </Link>
      <Profile/>
    </div>
    </>
  );
}
