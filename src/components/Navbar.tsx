import { useState, useEffect } from "react";
import { TreePine, Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : ""
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <TreePine className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-xl">TreeVision</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
            Demo
          </a>
          <a
            href="#demo"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-display font-semibold text-sm hover:brightness-110 transition-all"
          >
            Get Started
          </a>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 pb-6 flex flex-col gap-4">
          <a href="#how-it-works" onClick={() => setOpen(false)} className="text-muted-foreground">How It Works</a>
          <a href="#features" onClick={() => setOpen(false)} className="text-muted-foreground">Features</a>
          <a href="#demo" onClick={() => setOpen(false)} className="text-muted-foreground">Demo</a>
          <a href="#demo" onClick={() => setOpen(false)} className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-display font-semibold text-sm text-center">
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
