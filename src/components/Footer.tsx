import { TreePine } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <TreePine className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-lg">TreeVision</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#demo" className="hover:text-foreground transition-colors">Demo</a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 TreeVision. AI-Powered Forestry.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
