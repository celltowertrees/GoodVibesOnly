"use client";

import { useState } from "react";

import { fal } from "@fal-ai/client";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thing, setThing] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("Everything Sucks!!!");

  const hiddenPrompt = "Please rewrite the following to have a more positive attitude. Your response should be nothing but the same exact prompt just rewritten to be positive. Do not offer multiple options, just write from the perspective of the writer of the original prompt, except with a positive spin, and without leaving out any crucial details. Here is the prompt:";

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
      setThing(result);
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
      <div className="w-full flex">
        <input type="text" className="flex-1" placeholder="Everything Sucks!!!" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button onClick={() => generateThing()}>Post</button>
      </div>
      <hr className="my-10" />
      {loading && <p>Loading...</p>}
      {thing && thing.data.output}
    </div>
  );
}
