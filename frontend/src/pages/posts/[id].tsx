import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

import { Post } from "../../types";
import axios from "axios";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/posts/${id}`);
        setPost(data.data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!post) return <div className="text-center py-8">Post not found</div>;

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
        Back
      </Button>
      <article className="prose dark:prose-invert max-w-none">
        <h1>{post.title}</h1>
        <p className="text-muted-foreground">
          By {typeof post.author === "object" ? post.author.name : "Unknown"} •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div className="mt-6">{post.content}</div>
      </article>
    </div>
  );
}
