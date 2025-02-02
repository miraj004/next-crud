"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addPost, updatePost, type Post } from "@/actions/api/posts";
import Link from "next/link";
import { SubmitButton } from "./submit-button";
import type { PostFormState } from "@/actions/api/posts";

type Props = {
  post?: Post;
};



export default function PostForm({ post }: Props) {
  const action = post ? updatePost.bind(null, post.id) : addPost;

  const initialState: PostFormState = {
    errors: {},
    values: {
      title: post?.title || "",
      content: post?.content || "",
    },
  };
  
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form className="space-y-4" action={formAction}>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <Input id="title" name="title" type="text" placeholder="Enter post title" defaultValue={state.values?.title} />
        {state.errors?.title && <p className="text-sm text-red-500">{state.errors.title}</p>}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <Textarea id="content" name="content" placeholder="Write your post content here" defaultValue={state.values?.content} rows={5} />
        {state.errors?.content && <p className="text-sm text-red-500">{state.errors.content}</p>}
      </div>

      <div className="flex space-x-2">
        <Link href={`/dashboard/posts`} className="w-full">
          <Button className="w-full bg-gray-200 text-black hover:bg-gray-400">Cancel</Button>
        </Link>
        <SubmitButton>{post ? "Update" : "Create"}</SubmitButton>
      </div>
    </form>
  );
}
