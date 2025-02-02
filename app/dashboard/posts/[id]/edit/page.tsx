import PostForm from "@/components/post-form";
import { getPost, updatePost } from "@/actions/api/posts";
import { notFound } from "next/navigation";


export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const postId = param.id;

  const post = await getPost(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">Edit Existing Post</h1>
      <PostForm post={post} />
    </div>
  );
}
