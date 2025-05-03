import { Button } from "@/components/ui/button";
import { Post } from "../../types";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PostCardProps {
  post: Post;
  onDelete?: (id: string) => void;
  canDelete?: boolean;
}

export default function PostCard({ post, onDelete, canDelete }: PostCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link to={`/posts/${post._id}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription>
          By {typeof post.author === "object" ? post.author.name : "Unknown"} •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 mb-4">{post.content}</p>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link to={`/posts/${post._id}`}>Read More</Link>
          </Button>
          {canDelete && onDelete && (
            <Button variant="destructive" onClick={() => onDelete(post._id)}>
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
