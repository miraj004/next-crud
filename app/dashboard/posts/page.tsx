import { Notebook } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PostList from "./post-list";

export default async function BanksPage() {
  return (
    <div className="flex">
      <div className="container mx-auto py-10 p-10">
        <div className="my-2 flex justify-between">
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
          <Link href="/dashboard/posts/new">
            <Button>Create</Button>
          </Link>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Notebook className="h-6 w-6" />
              Post List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PostList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
