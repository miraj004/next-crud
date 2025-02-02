import { getPosts, type Post } from "@/actions/api/posts";
import TableLoading from "@/components/table-loading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Suspense } from "react";
import DeleteButton from "@/components/delete-button";
import { notFound } from "next/navigation";

export default async function PostList() {
  const posts = await getPosts();

  if (posts === undefined) {
    notFound();
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Title</TableHead>
          <TableHead>Content</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <Suspense fallback={<TableLoading />}>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <TableRow
                key={post.id}
                className="hover:bg-muted/50 cursor-pointer"
              >
                <TableCell className="font-medium w-[300px]">
                  {post.title}
                </TableCell>
                <TableCell>{post.content}</TableCell>
                <TableCell className="flex space-x-2">
                  <Link href={`/dashboard/posts/${post.id}/edit`}>
                    <Button>Edit</Button>
                  </Link>
                  <DeleteButton id={post.id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>
                <p className="text-red-500 text-center">Record Not Found</p>
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Suspense>
    </Table>
  );
}
