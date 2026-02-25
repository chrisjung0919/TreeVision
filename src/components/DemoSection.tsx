import { motion } from "framer-motion";
import { Upload, TreePine, Loader2, Image as ImageIcon } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface TreeDetection {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  label: string;
}

const DemoSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [detections, setDetections] = useState<TreeDetection[]>([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const drawBoxes = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !detections.length) return;

    const rect = img.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach((d) => {
      const bx = d.x * canvas.width;
      const by = d.y * canvas.height;
      const bw = d.width * canvas.width;
      const bh = d.height * canvas.height;

      // Box
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 2.5;
      ctx.strokeRect(bx, by, bw, bh);

      // Corner accents
      const corner = 12;
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#4ade80";
      // top-left
      ctx.beginPath();
      ctx.moveTo(bx, by + corner);
      ctx.lineTo(bx, by);
      ctx.lineTo(bx + corner, by);
      ctx.stroke();
      // top-right
      ctx.beginPath();
      ctx.moveTo(bx + bw - corner, by);
      ctx.lineTo(bx + bw, by);
      ctx.lineTo(bx + bw, by + corner);
      ctx.stroke();
      // bottom-left
      ctx.beginPath();
      ctx.moveTo(bx, by + bh - corner);
      ctx.lineTo(bx, by + bh);
      ctx.lineTo(bx + corner, by + bh);
      ctx.stroke();
      // bottom-right
      ctx.beginPath();
      ctx.moveTo(bx + bw - corner, by + bh);
      ctx.lineTo(bx + bw, by + bh);
      ctx.lineTo(bx + bw, by + bh - corner);
      ctx.stroke();

      // Label background
      const label = `${d.label} ${Math.round(d.confidence * 100)}%`;
      ctx.font = "bold 12px Inter, sans-serif";
      const textWidth = ctx.measureText(label).width;
      ctx.fillStyle = "rgba(34, 197, 94, 0.85)";
      ctx.fillRect(bx, by - 22, textWidth + 12, 22);

      // Label text
      ctx.fillStyle = "#000";
      ctx.fillText(label, bx + 6, by - 6);
    });
  }, [detections]);

  useEffect(() => {
    drawBoxes();
    window.addEventListener("resize", drawBoxes);
    return () => window.removeEventListener("resize", drawBoxes);
  }, [drawBoxes]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processImage = async (file: File) => {
    setIsProcessing(true);
    setDetections([]);

    // Show preview
    const previewUrl = URL.createObjectURL(file);
    setImageSrc(previewUrl);

    try {
      const base64 = await fileToBase64(file);

      const { data, error } = await supabase.functions.invoke("detect-trees", {
        body: { imageBase64: base64 },
      });

      if (error) throw error;

      const trees: TreeDetection[] = data?.trees || [];
      setDetections(trees);

      if (trees.length === 0) {
        toast({ title: "No trees detected", description: "Try a different image with visible trees." });
      } else {
        toast({ title: `${trees.length} tree${trees.length > 1 ? "s" : ""} detected!` });
      }
    } catch (err: any) {
      console.error("Detection error:", err);
      toast({
        title: "Detection failed",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Only images supported",
        description: "Please upload a JPG or PNG image.",
        variant: "destructive",
      });
      return;
    }
    processImage(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

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
            Upload an aerial image to see our AI detect and annotate trees with bounding boxes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Upload area */}
          {!imageSrc && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`glass-card rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer ${
                isDragging ? "border-primary glow-border" : "hover:border-primary/30"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
              />
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-float">
                <Upload className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                Drop your image here
              </h3>
              <p className="text-muted-foreground mb-6">
                Supports JPG, PNG — aerial or ground-level tree photos
              </p>
              <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-display font-semibold hover:brightness-110 transition-all">
                <ImageIcon className="w-4 h-4" />
                Select Image
              </button>
            </div>
          )}

          {/* Result area */}
          {imageSrc && (
            <div className="space-y-6">
              <div className="relative glass-card rounded-2xl overflow-hidden">
                {isProcessing && (
                  <div className="absolute inset-0 z-20 bg-background/70 backdrop-blur-sm flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mb-3" />
                    <p className="text-sm font-display text-muted-foreground">Detecting trees...</p>
                  </div>
                )}
                <div className="relative inline-block w-full">
                  <img
                    ref={imgRef}
                    src={imageSrc}
                    alt="Uploaded image for tree detection"
                    className="w-full h-auto block rounded-2xl"
                    onLoad={drawBoxes}
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 pointer-events-none"
                  />
                </div>
              </div>

              {/* Stats */}
              {detections.length > 0 && (
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-display font-medium text-muted-foreground">
                      Detection Results
                    </span>
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      {detections.length} tree{detections.length > 1 ? "s" : ""} detected
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="text-2xl font-display font-bold text-primary">{detections.length}</div>
                      <div className="text-xs text-muted-foreground mt-1">Trees Found</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="text-2xl font-display font-bold text-primary">
                        {Math.round(detections.reduce((a, d) => a + d.confidence, 0) / detections.length * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Avg Confidence</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="text-2xl font-display font-bold text-primary">
                        {new Set(detections.map((d) => d.label)).size}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Species</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Try another */}
              <button
                onClick={() => { setImageSrc(null); setDetections([]); }}
                className="w-full glass-card rounded-xl p-4 text-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all font-display"
              >
                ← Upload another image
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
