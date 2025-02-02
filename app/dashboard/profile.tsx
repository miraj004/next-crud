import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import Link from "next/link";
import { auth } from '@/lib/auth';
import { SignOut } from "@/components/signout-button";


const includesAny = (arr: string[], values: string[]) => values.some(v => arr.includes(v));

async function Profile() {
  const session = await auth()


  return (
    <Card className="max-w-3xl mx-auto shadow-lg border border-gray-200 relative">
      <CardHeader className="flex items-center justify-between pb-6 border-b border-gray-200">
      
        <div className="flex items-center space-x-4">
          <div className="bg-gray-500 text-white rounded-full p-3">
            <User className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              {session?.user?.name}

            </CardTitle>
            <p className="text-sm text-gray-600">{session?.user?.email}</p>
            <p>
            {JSON.stringify(session?.user)}
            </p>
          </div>
          <SignOut/>
        </div>

      </CardHeader>
      <CardContent className="py-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Roles:</h3>
          <ul className="mt-2 space-y-1">
            {session?.roles && session.roles.length > 0 ? (
              session.roles.map((role, index) => (
                <li
                  key={`${role}-${index}`}
                  className="text-sm text-gray-600 font-medium"
                >
                  {role}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-600">No roles assigned.</li>
            )}
          </ul>
        </div>

        <div className="mt-6 space-x-2">
          {session?.roles && session.roles.includes("manager") && (

            <Link
              href="/dashboard/banks"
              className="inline-block text-center text-white bg-gray-600 hover:bg-gray-700 rounded-lg px-4 py-2 text-sm font-medium"
            >
              Manage Banks
            </Link>

          )}
          {session?.roles && (includesAny(session.roles, ['manager', 'employee'])) && (
            <Link
              href="/dashboard/posts"
              className="inline-block text-center text-white bg-gray-600 hover:bg-gray-700 rounded-lg px-4 py-2 text-sm font-medium"
            >
              My Posts
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default Profile