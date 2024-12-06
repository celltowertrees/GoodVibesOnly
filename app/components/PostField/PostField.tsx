"use client";

import { useState } from "react";

import { fal } from "@fal-ai/client";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

type Post = {
  id: number;
  content: string | null;
}

export default function PostField() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("Everything Sucks!!!");
  const [thing, setThing] = useState<Post | null>(null);

  const hiddenPrompt = `Please rewrite the following to have a more positive
    attitude. Your response should be the same exact prompt, just rewritten to be positive. 
    Do not offer multiple options, just write from the 
    perspective of the writer of the original prompt, except with a positive spin, 
    and without leaving out any crucial details. Please include exclamation points, positive emoji 
    and an excited demeanor. 
    DO NOT remove any crucial details.
    DO NOT invent any additional information that did not exist in the prompt.
    DO NOT change the core message of the prompt.
    TRIVIALIZE the negative information however possible. 
    Please keep the message to a similar length as the original. Here is the prompt:`;

  const generateThing = async () => {
    try {
      const result = await fal.subscribe("fal-ai/any-llm", {
        input: {
          prompt: `${hiddenPrompt} ${prompt}`,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            setLoading(true);
            update.logs.map((log) => console.log(log));
          }
        }
      });
      setThing({ id: result.data.id, content: result.data.output });
      // setPosts([...posts, { id: result.data.id, title: prompt, content: result.data.output }]);
      // await prisma.post.create({
      //   data: {
      //     id: result.data.id,
      //     title: prompt,
      //     content: result.data.output,
      //     authorId: 1,
      //   },
      // });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
