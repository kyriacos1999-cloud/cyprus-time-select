import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// Replace these with real TikTok video IDs from @replic8cy
const tiktokVideos = [
  { id: "7493399498498658593", caption: "Meridian Diver Black" },
  { id: "7488566048394461473", caption: "Atlas GMT Unboxing" },
  { id: "7485942284955538721", caption: "Viceroy Classic 36" },
  { id: "7480640660431453473", caption: "Apex Chronograph" },
  { id: "7476936413898538273", caption: "Full Collection" },
  { id: "7473286285065469217", caption: "Meridian Two-Tone" },
];

const TikTokIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.26a8.28 8.28 0 004.77 1.52V7.33a4.85 4.85 0 01-1-.64z" />
  </svg>
);

const TikTokGrid = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4 font-medium flex items-center justify-center gap-2">
            <TikTokIcon />
            Follow Us
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground tracking-tight mb-3">
            @replic8cy on TikTok
          </h2>
          <p className="text-muted-foreground text-sm font-light max-w-md mx-auto">
            Watch our latest reviews, unboxings, and wrist shots.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
          {tiktokVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group"
            >
              <a
                href={`https://www.tiktok.com/@replic8cy/video/${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[9/16] rounded-sm overflow-hidden bg-foreground/5"
              >
                <iframe
                  src={`https://www.tiktok.com/player/v1/${video.id}?&music_info=0&description=0&controls=0&autoplay=0`}
                  className="w-full h-full border-0 pointer-events-none"
                  allow="fullscreen"
                  loading="lazy"
                  title={video.caption}
                />
                {/* Overlay for click-through */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-end justify-center pb-4 cursor-pointer">
                  <span className="text-white text-[10px] md:text-xs font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 px-3 py-1.5 rounded-sm backdrop-blur-sm flex items-center gap-1.5">
                    <ExternalLink className="w-3 h-3" />
                    {video.caption}
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.tiktok.com/@replic8cy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-medium px-8 py-3.5 hover:bg-foreground/90 transition-colors rounded-sm"
          >
            <TikTokIcon />
            Follow @replic8cy
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TikTokGrid;
