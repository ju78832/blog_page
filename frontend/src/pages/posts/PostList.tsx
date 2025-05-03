import { Post } from "../../types";
import PostCard from "./PostCard";

interface PostListProps {
  posts: Post[];
  onDelete?: (id: string) => void;
  canDelete?: boolean;
}

export default function PostList({
  posts,
  onDelete,
  canDelete,
}: PostListProps) {
  if (posts.length === 0) {
    return <div className="text-center py-8">No posts found</div>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onDelete={onDelete}
          canDelete={canDelete}
        />
      ))}
    </div>
  );
}
