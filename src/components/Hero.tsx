import { motion } from "framer-motion";
import heroImage from "@/assets/hero-forest.jpg";
import { TreePine, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="AI-powered tree detection from aerial view"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary font-display text-sm font-medium tracking-widest uppercase">
              AI-Powered Detection
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
            Detect Every{" "}
            <span className="text-gradient">Tree</span>{" "}
            with Precision AI
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
            Harness YOLO-powered computer vision to identify, count, and analyze
            trees from aerial imagery and video in real time.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#demo"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-display font-semibold hover:brightness-110 transition-all"
            >
              <TreePine className="w-5 h-5" />
              Try Demo
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-lg font-display font-medium text-foreground hover:bg-secondary transition-all"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl"
        >
          {[
            { value: "99.2%", label: "Detection Accuracy" },
            { value: "30fps", label: "Real-time Processing" },
            { value: "50K+", label: "Trees Analyzed" },
            { value: "YOLO v8", label: "Model Architecture" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-display font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
