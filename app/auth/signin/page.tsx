import { signIn } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogIn } from "lucide-react";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back App 1</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("keycloak");
          }}
        >
          <Button type="submit" className="w-full">
            <LogIn className="mr-2 h-4 w-4" />
            Sign in with SSO
          </Button>
        </form>
      </Card>
    </div>
  );
}
