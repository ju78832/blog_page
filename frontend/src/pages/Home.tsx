import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Blog RBAC</h1>
      <p className="text-lg mb-8 max-w-2xl mx-auto">
        A secure blog platform with role-based access control
      </p>
      <div className="flex gap-4 justify-center">
        {user ? (
          <Button asChild>
            <Link to={user.role === "admin" ? "/admin" : "/dashboard"}>
              Go to Dashboard
            </Link>
          </Button>
        ) : (
          <>
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
