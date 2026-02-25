import { motion } from "framer-motion";
import { Upload, TreePine } from "lucide-react";
import { useState } from "react";

const DemoSection = () => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section id="demo" className="py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm font-medium tracking-widest uppercase">
            Try It Out
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            See It in Action
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Upload an aerial image or video to see our AI detect trees in real time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={() => setIsDragging(false)}
            className={`glass-card rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer ${
              isDragging ? "border-primary glow-border" : "hover:border-primary/30"
            }`}
          >
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-float">
              <Upload className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">
              Drop your file here
            </h3>
            <p className="text-muted-foreground mb-6">
              Supports MP4, AVI, JPG, PNG — up to 100MB
            </p>
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-display font-semibold hover:brightness-110 transition-all">
              <TreePine className="w-4 h-4" />
              Select File
            </button>
          </div>

          {/* Sample output preview */}
          <div className="mt-8 glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-display font-medium text-muted-foreground">
                Sample Output
              </span>
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                23 trees detected
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="text-2xl font-display font-bold text-primary">23</div>
                <div className="text-xs text-muted-foreground mt-1">Trees Found</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="text-2xl font-display font-bold text-primary">97%</div>
                <div className="text-xs text-muted-foreground mt-1">Confidence</div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="text-2xl font-display font-bold text-primary">0.3s</div>
                <div className="text-xs text-muted-foreground mt-1">Processing</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
