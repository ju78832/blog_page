import { useEffect, useState } from "react";
import PostList from "./posts/PostList";
import { Post } from "../types";
import axios from "axios";

export default function Admin() {
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

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      <PostList posts={posts} onDelete={handleDelete} canDelete />
    </div>
  );
}
