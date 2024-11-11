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

  const generateThing = async () => {
    try {
      const prompt = "What is your least favorite color?";
  
      const result = await fal.subscribe("fal-ai/any-llm", {
        input: {
          prompt,
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
    <div>
      <button onClick={() => generateThing()}>Ask the AI what its least favorite color is</button>
      <h1>Thing:</h1>
      {loading && <p>Loading...</p>}
      {thing && <pre>{JSON.stringify(thing, null, 2)}</pre>}
    </div>
  );
}
