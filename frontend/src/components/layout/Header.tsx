import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-bold">
          Blog RBAC
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              {user.role === "admin" && (
                <Button asChild variant="ghost">
                  <Link to="/admin">Admin</Link>
                </Button>
              )}
              <Button asChild variant="ghost">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
