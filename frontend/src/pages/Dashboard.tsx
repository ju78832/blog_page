import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import PostList from "./posts/PostList";
import { Post } from "../types";
import axios from "axios";

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("/posts");
        setPosts(data.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Dashboard</h1>
        <Button asChild>
          <a href="/posts/create">Create Post</a>
        </Button>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
