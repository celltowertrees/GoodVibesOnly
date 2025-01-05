"use client";

import { useEffect, useState } from "react";
import { Post } from "./types";


function getAuthorId() {
  const authorId = localStorage.getItem("authorId");
  if (authorId) {
    return authorId;
  } else {
    const newAuthorId = crypto.randomUUID();
    localStorage.setItem("authorId", newAuthorId);
    return newAuthorId;
  }
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");

  const savePost = async (id: number, output: string) => {
    const newPost = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: output,
        authorId: getAuthorId(),
        id,
      }),
    });

    return newPost.json();
  };

  const generateThing = async () => {
    setLoading(true);

    setPosts([...posts, { content: prompt, id: posts.length + 1 }]);
    setPrompt("");

    const newPost = await savePost(posts.length + 1, prompt);

    console.log(newPost);

    setLoading(false);

    getPosts().then((posts) => setPosts(posts.posts));
  };

  const getPosts = async () => {
    const response = await fetch('/api', {
      method: "GET",
    });
    const posts = await response.json();

    return posts;
  }

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts.posts));
  }, []);

  return (
    <div className="max-w-prose m-auto">
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
    </div>
  );
}
