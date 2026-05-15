import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="text-center">
        <h1 className="font-display text-9xl font-light text-espresso/20">404</h1>
        <h2 className="font-display text-3xl md:text-5xl font-light text-espresso mt-[-2rem]">Spilt milk.</h2>
        <p className="mt-6 text-espresso-soft font-light">We can't find the page you're looking for.</p>
        <Link to="/" className="mt-10 inline-flex items-center gap-3 bg-espresso text-cream px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-copper transition-colors group">
          Go back home <ArrowUpRight className="w-3 h-3 group-hover:rotate-45 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
