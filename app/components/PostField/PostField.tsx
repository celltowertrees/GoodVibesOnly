"use client";

import { useState } from "react";
import { Post } from "@/app/types";

export default function PostField() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [thing, setThing] = useState<Post | null>(null);

  const savePost = async (id: number, output: string) => {
    await fetch("/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: output,
      }),
    });
  };

  const generateThing = async () => {
    setLoading(true);

    await savePost(1, prompt);

    setLoading(false);

    setThing({ id: 1, content: prompt });
  };

  return (
    <div className="m-10">
      <h1>✨ Good Vibes Only ✨</h1>
      <hr className="my-10" />
      <div className="w-full">
        <form className="w-full flex" onSubmit={(e) => { e.preventDefault(); generateThing() } }>
          <input type="text" className="flex-1" placeholder="Everything Sucks!!!" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <button type="submit">Post</button>
        </form>
      </div>
      <hr className="my-10" />
      {loading && <p>Loading...</p>}
      {thing && (
        <div>
          <p>{thing.content}</p>
        </div>
      )}
    </div>
  );
}
