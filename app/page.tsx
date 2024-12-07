"use client";

import { PostField } from "./components/PostField";
import { useEffect, useState } from "react";
import { Post } from "./types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

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
      <PostField />
      {[...posts].reverse().map((post) => (
        <div key={post.id} className="m-10">
          <p>{post.content}</p>
        </div>
      ))}
    </>
  );
}
