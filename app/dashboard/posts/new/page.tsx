
import PostForm from "@/components/post-form";
import { addPost } from "@/actions/api/posts";



export default function NewPost() {


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">Create New Post</h1>
        <PostForm/>
    </div>
  );
}
