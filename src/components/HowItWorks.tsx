import { motion } from "framer-motion";
import { Upload, Cpu, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Media",
    description:
      "Feed aerial drone footage or satellite imagery into our pipeline. Supports video and image formats.",
  },
  {
    icon: Cpu,
    title: "AI Processing",
    description:
      "Our YOLO v8 model processes each frame, detecting and classifying trees with bounding box annotations.",
  },
  {
    icon: BarChart3,
    title: "Get Results",
    description:
      "Receive annotated outputs with tree counts, species classification, health indicators, and export-ready data.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-display text-sm font-medium tracking-widest uppercase">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            Three Simple Steps
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative glass-card rounded-xl p-8 text-center group hover:border-primary/30 transition-all duration-300"
            >
              <div className="text-5xl font-display font-bold text-primary/10 absolute top-4 right-6">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
