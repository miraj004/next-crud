"use server";

import { getAccessToken } from "@/utils/session-token-accessor";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from 'zod'

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

type PostError = {
  title?: string;
  content?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
}

export type PostFormState = {
  errors: Record<string, string[]>;
  values: {
    title: string;
    content: string;
  };
};



export async function getPosts(): Promise<Post[] | undefined> {
  let isAuthorized = true;
  try {
    const url = `${process.env.BACKEND_URL}/api/posts`;
    const accessToken = await getAccessToken();

    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "force-cache",
    });

    if (resp.ok) {
      const posts = await resp.json();
      return posts;
    } else if (resp.status === 401) {
      isAuthorized = false;
    } else {
      console.log(`Error: Unexpected response status: ${resp.status}`);
    }
  } catch (error) {
    console.log("Error while fetching posts:", error);
  } finally {
    if (!isAuthorized) {
      redirect('/auth/logout')
    }
  }
}

export async function getPost(postId: string): Promise<Post | undefined> {
  let isAuthorized = true;
  try {
    if (!postId) {
      notFound();
    }
    const url = `${process.env.BACKEND_URL}/api/posts/${postId}`;
    const accessToken = await getAccessToken();

    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (resp.ok) {
      const post = await resp.json();
      return post;
    } else if (resp.status === 401) {
      isAuthorized = false;
    } else {
      console.error(`Error: Unexpected response status: ${resp.status}`);
    }
  } catch (error) {
    console.log("Error while fetching posts:", error);
  } finally {
    if (!isAuthorized) {
      redirect("/auth/logout");
    }
  }
}
export async function addPost(_: unknown, formData: FormData): Promise<PostFormState | void> {
  let isAuthorized = true;
  let success = false;
  
  const parsedData = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      values: {
        title: (formData.get("title") as string) || "",
        content: (formData.get("content") as string) || "",
      },
    };
  }
  
  
  try {
    const url = `${process.env.BACKEND_URL}/api/posts`;
    const accessToken = await getAccessToken();
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(parsedData.data),
    });

    if (resp.ok) {
      success = true;
    } else if (resp.status === 401) {
      isAuthorized = false;
    } else {
      console.error(`Error: Unexpected response status: ${resp.status}`);
    }
  } catch (error) {
    console.error("Error while creating post:", error);
  } finally {
    if (success) redirect("/dashboard/posts");
    if (!isAuthorized) redirect("/auth/logout");
  }
}

export async function updatePost(id: string, _: unknown, formData: FormData): Promise<PostFormState | void> {
  let isAuthorized = true;
  let success = false;

  const parsedData = postSchema.safeParse({
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      values: {
        title: (formData.get("title") as string) || "",
        content: (formData.get("content") as string) || "",
      },
    };
  }

  try {
    const url = `${process.env.BACKEND_URL}/api/posts/${id}`;
    const accessToken = await getAccessToken();

    const resp = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(parsedData.data),
    });

    if (resp.ok) {
      success = true;
    } else if (resp.status === 401) {
      isAuthorized = false;
    } else {
      console.error(`Error: Unexpected response status: ${resp.status}`);
    }
  } catch (error) {
    console.error("Error while updating post:", error);
  } finally {
    if (success) redirect("/dashboard/posts");
    if (!isAuthorized) redirect("/auth/logout");
  }
}


export async function deletePost(id: string): Promise<void> {
  let isAuthorized = true;
  try {
    const url = `${process.env.BACKEND_URL}/api/posts/${id}`;
    const accessToken = await getAccessToken();

    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (resp.ok) {
      revalidatePath("/dashboard/posts");
    } else if (resp.status === 401) {
      isAuthorized = false;
    } else {
      console.error(`Error: Unexpected response status: ${resp.status}`);
    }
  } catch (error) {
    console.error("Error while deleting post:", error);
  } finally {
    if (!isAuthorized) redirect("auth/logout");
  }
}

