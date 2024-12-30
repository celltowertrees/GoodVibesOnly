"use client";

import { useEffect, useState } from "react";
import { Post } from "./types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");

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

    setPosts([...posts, { content: prompt, id: posts.length + 1 }]);

    await savePost(posts.length + 1, prompt);

    setLoading(false);

    // poll for new posts
  };

  const getPosts = async () => {
    const response = await fetch('/api/', {
      method: "GET",
    });
    const posts = await response.json();
    console.log(posts);
    return posts;
  }

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts.posts));
  }, []);

  return (
    <>
        <div className="m-10">
        <h1>✨ Good Vibes Only ✨</h1>
        <hr className="my-10" />
        <div className="w-full">
          <form className="w-full flex" onSubmit={(e) => { e.preventDefault(); generateThing() } }>
            <input type="text" className="flex-1" placeholder="Post Ur Vibe :)" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <button type="submit">Post</button>
          </form>
        </div>
        <hr className="my-10" />
      </div>

      {[...posts].reverse().map((post) => (
        <div key={post.id} className={`m-10${loading && post.id === posts.length ? " animate-pulse" : ""}`}>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  );
}
