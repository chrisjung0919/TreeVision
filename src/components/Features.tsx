import { motion } from "framer-motion";
import { Scan, Video, TreePine, Zap, MapPin, Shield } from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "Object Detection",
    description: "Accurate bounding-box detection of individual trees using state-of-the-art YOLO architecture.",
  },
  {
    icon: Video,
    title: "Video Analysis",
    description: "Process full-length drone and satellite video footage frame by frame in real time.",
  },
  {
    icon: TreePine,
    title: "Species Classification",
    description: "Identify different tree species with trained classification models for ecological surveys.",
  },
  {
    icon: Zap,
    title: "Real-time Inference",
    description: "Lightning-fast inference at 30+ FPS for live monitoring and rapid batch analysis.",
  },
  {
    icon: MapPin,
    title: "Geospatial Mapping",
    description: "Overlay detection results on maps with GPS coordinates for precise forestry management.",
  },
  {
    icon: Shield,
    title: "Health Assessment",
    description: "Detect signs of disease, deforestation, or stress through visual pattern analysis.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-display text-sm font-medium tracking-widest uppercase">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            Powerful Features
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Everything you need for comprehensive tree detection and forest analysis.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-xl p-7 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
