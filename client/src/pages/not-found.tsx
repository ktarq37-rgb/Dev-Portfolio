import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="glass-card p-12 rounded-3xl border border-white/10 text-center max-w-md mx-4">
        <div className="mb-6 flex justify-center">
          <AlertTriangle className="h-16 w-16 text-primary animate-pulse" />
        </div>
        <h1 className="text-4xl font-display font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          The page you're looking for has vanished into the void.
        </p>
        <Link href="/">
          <a className="inline-block px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">
            Return Home
          </a>
        </Link>
      </div>
    </div>
  );
}
