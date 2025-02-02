"use client";

import { deletePost } from "@/actions/api/posts";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={async () => {
        startTransition(async () => {
            await deletePost(id);
        })
      }}
      disabled={isPending}
      className="bg-red-700 text-white hover:bg-red-800"
    >
      {isPending ? 'Deleting..':'Delete'}
    </Button>
  );
}
