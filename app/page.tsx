import { PostField } from "./components/PostField";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const posts = await prisma.post.findMany();

export default function Home() {
  return (
    <>
      <PostField />
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  );
}
