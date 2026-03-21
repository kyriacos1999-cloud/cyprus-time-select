import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import Navbar from "@/components/Navbar";
import UrgencyBanner from "@/components/UrgencyBanner";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const BlogIndex = () => {
  const { posts, loading } = useBlogPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Watch Blog | Guides, Style Tips & News | Replic8 Cyprus";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Expert watch guides, style tips, and buying advice for men in Cyprus. Learn about automatic movements, dive watches, gifting, and fashion.");
  }, []);

  if (loading) {
    return (
      <main>
        <UrgencyBanner />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-24">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <UrgencyBanner />
      <Navbar />

      <section className="pt-[94px] pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 md:py-24"
          >
            <p className="text-primary text-xs tracking-[0.5em] uppercase mb-4 font-medium">
              The Journal
            </p>
            <h1 className="text-4xl md:text-6xl font-display text-foreground tracking-tight mb-4">
              Watch Blog
            </h1>
            <p className="text-muted-foreground text-base max-w-lg mx-auto font-light">
              Guides, style tips, and expert advice for watch enthusiasts in Cyprus.
            </p>
          </motion.div>

          {/* Featured Post */}
          {posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <Link to={`/blog/${posts[0].slug}`} className="group block">
                <article className="border border-border p-8 md:p-12 hover:border-primary/30 transition-colors duration-300">
                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground font-light">
                    <span className="bg-primary/10 text-primary px-3 py-1 font-medium tracking-wide uppercase text-[10px]">
                      {posts[0].category}
                    </span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {posts[0].date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {posts[0].readTime}</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-display text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors">
                    {posts[0].title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light max-w-2xl mb-6">
                    {posts[0].excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary text-xs tracking-[0.15em] uppercase font-medium group-hover:gap-3 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </article>
              </Link>
            </motion.div>
          )}

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {posts.slice(1).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <article className="border border-border p-6 md:p-8 h-full hover:border-primary/30 transition-colors duration-300 flex flex-col">
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground font-light">
                      <span className="bg-primary/10 text-primary px-2.5 py-0.5 font-medium tracking-wide uppercase text-[10px]">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-lg md:text-xl font-display text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed font-light flex-1">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary text-xs tracking-[0.15em] uppercase font-medium mt-4 group-hover:gap-3 transition-all">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogIndex;
