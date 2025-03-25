
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass-card p-8 rounded-xl text-center max-w-md w-full animate-scale-in">
        <div className="mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl font-bold text-primary">404</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link to="/">
          <Button className="w-full gap-2">
            <ArrowLeft className="h-4 w-4" /> Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
