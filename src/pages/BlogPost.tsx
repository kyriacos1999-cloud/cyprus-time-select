import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronRight, ArrowLeft } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts, getBySlug, loading } = useBlogPosts();
  const post = slug ? getBySlug(slug) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    document.title = post.seoTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const pageUrl = `https://replic8.shop/blog/${post.slug}`;
    setMeta("name", "description", post.metaDescription);
    setMeta("property", "og:title", post.seoTitle);
    setMeta("property", "og:description", post.metaDescription);
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:type", "article");
    setMeta("name", "twitter:title", post.seoTitle);
    setMeta("name", "twitter:description", post.metaDescription);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageUrl);

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.id = "blog-schema";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.date,
      author: { "@type": "Organization", name: "Replic8" },
      publisher: { "@type": "Organization", name: "Replic8", url: "https://replic8.shop" },
      url: pageUrl,
    });
    document.head.appendChild(schema);

    return () => {
      document.getElementById("blog-schema")?.remove();
      document.title = "Luxury Watches Cyprus | Premium Men's Watches | Fast Delivery";
    };
  }, [post]);

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

  if (!post) {
    return (
      <main>
        <UrgencyBanner />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-3xl font-display text-foreground mb-4">Article Not Found</h1>
            <Link to="/blog" className="text-primary hover:underline">Back to Blog</Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const relatedWatches = products.filter((p) => post.relatedProducts.includes(p.id));
  const otherPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main>
      <UrgencyBanner />
      <Navbar />

      <article className="pt-[94px]">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-4">
          <ol className="flex items-center gap-1.5 text-xs text-muted-foreground font-light">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><ChevronRight className="w-3 h-3" /></li>
            <li className="text-foreground font-medium truncate max-w-[200px]">{post.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="container mx-auto px-4 max-w-3xl py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6 text-xs text-muted-foreground font-light">
              <span className="bg-primary/10 text-primary px-3 py-1 font-medium tracking-wide uppercase text-[10px]">
                {post.category}
              </span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display text-foreground tracking-tight leading-tight">
              {post.title}
            </h1>
          </motion.div>
        </header>

        {/* Article Content */}
        <div className="container mx-auto px-4 max-w-3xl pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            {post.content.map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-xl md:text-2xl font-display text-foreground tracking-tight pt-6">
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={i} className="text-muted-foreground text-sm leading-relaxed font-light">
                  {block}
                </p>
              );
            })}
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedWatches.length > 0 && (
          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-display text-foreground mb-8 tracking-tight text-center">
                Featured Watches
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {relatedWatches.map((rp) => {
                  const rpSeo = productSEOData[rp.id];
                  return (
                    <Link key={rp.id} to={`/watches/${rpSeo?.slug || rp.id}`} className="group">
                      <div className="aspect-square overflow-hidden bg-white mb-3">
                        <img
                          src={rp.image}
                          alt={`${rp.name} — premium men's watch`}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="font-display text-sm text-foreground text-center">{rp.name}</h3>
                      <p className="text-primary text-sm font-display text-center">€{rp.price}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* More Articles */}
        {otherPosts.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-display text-foreground mb-8 tracking-tight text-center">
                More Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherPosts.map((op) => (
                  <Link key={op.slug} to={`/blog/${op.slug}`} className="group border border-border p-6 hover:border-primary/30 transition-colors">
                    <span className="text-[10px] text-primary tracking-wide uppercase font-medium">{op.category}</span>
                    <h3 className="font-display text-base text-foreground mt-2 mb-2 group-hover:text-primary transition-colors">{op.title}</h3>
                    <p className="text-muted-foreground text-xs font-light">{op.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to blog */}
        <div className="container mx-auto px-4 max-w-3xl py-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary text-xs tracking-[0.15em] uppercase font-medium hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default BlogPost;
