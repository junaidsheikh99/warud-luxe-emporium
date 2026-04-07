import { Link } from "react-router-dom";
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { products } from "@/data/products";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import catMen from "@/assets/cat-men.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catAccessories from "@/assets/cat-accessories.jpg";

const heroSlides = [
  {
    image: hero1,
    subtitle: "New Collection 2026",
    title: "Redefine Your Style",
    cta: "Shop Now",
    href: "/shop",
  },
  {
    image: hero2,
    subtitle: "Limited Edition",
    title: "Essentials Redefined",
    cta: "Explore",
    href: "/shop",
  },
];

const categories = [
  { name: "Men", image: catMen, href: "/shop?category=men" },
  { name: "Women", image: catWomen, href: "/shop?category=women" },
  { name: "Accessories", image: catAccessories, href: "/shop?category=accessories" },
];

const testimonials = [
  { name: "Priya S.", text: "Absolutely love the quality! Best fashion store in Warud.", rating: 5 },
  { name: "Rahul M.", text: "Premium feel at great prices. The leather jacket is stunning.", rating: 5 },
  { name: "Sneha K.", text: "Fast delivery, amazing packaging. Will shop again!", rating: 4 },
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featured = products.filter((p) => p.isFeatured);
  const newArrivals = products.filter((p) => p.isNew);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[85vh] overflow-hidden">
          <img
            src={slide.image}
            alt={slide.title}
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="animate-slide-up">
              <p className="text-label text-primary-foreground/80 mb-4">{slide.subtitle}</p>
              <h1 className="heading-display text-primary-foreground text-5xl sm:text-6xl lg:text-7xl mb-6">
                {slide.title}
              </h1>
              <p className="text-primary-foreground/70 text-sm mb-8 max-w-md mx-auto font-light">
                Style That Defines You
              </p>
              <Link to={slide.href} className="btn-luxury-outline border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
                {slide.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          {/* Slide controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-8 h-0.5 transition-all ${i === currentSlide ? "bg-primary-foreground" : "bg-primary-foreground/30"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={() => setCurrentSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-primary-foreground/70 hover:text-primary-foreground" aria-label="Previous slide">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={() => setCurrentSlide((s) => (s + 1) % heroSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-primary-foreground/70 hover:text-primary-foreground" aria-label="Next slide">
            <ChevronRight className="h-6 w-6" />
          </button>
        </section>

        {/* Marquee */}
        <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex">
            {Array(4).fill(null).map((_, i) => (
              <span key={i} className="text-xs tracking-[0.3em] uppercase mx-12">
                Free Shipping &nbsp;✦&nbsp; Premium Quality &nbsp;✦&nbsp; Easy Returns &nbsp;✦&nbsp; Secure Payment &nbsp;✦&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* Categories */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-label mb-2">Explore</p>
              <h2 className="heading-section">Shop by Category</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <Link to={cat.href} key={cat.name} className="group relative aspect-[3/4] overflow-hidden">
                  <img src={cat.image} alt={cat.name} loading="lazy" width={640} height={640} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
                  <div className="absolute inset-0 flex items-end p-8">
                    <div>
                      <h3 className="text-primary-foreground text-2xl font-display font-semibold">{cat.name}</h3>
                      <span className="text-primary-foreground/70 text-xs tracking-[0.15em] uppercase mt-1 inline-flex items-center gap-1">
                        Shop Now <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="section-padding bg-secondary">
          <div className="container-luxury">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-label mb-2">Curated</p>
                <h2 className="heading-section">Featured Products</h2>
              </div>
              <Link to="/shop" className="text-xs tracking-[0.15em] uppercase font-medium hover:text-gold transition-colors flex items-center gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Limited Offer Banner */}
        <section className="gold-bg py-16 text-center">
          <div className="container-luxury px-4">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3">Limited Time</p>
            <h2 className="heading-display text-3xl sm:text-4xl mb-4">Up to 40% Off</h2>
            <p className="text-sm text-foreground/70 mb-6 max-w-md mx-auto">
              Don't miss our seasonal sale. Premium fashion at unbeatable prices.
            </p>
            <Link to="/shop" className="btn-luxury">
              Shop the Sale
            </Link>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="section-padding">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-label mb-2">Just Dropped</p>
              <h2 className="heading-section">New Arrivals</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="text-label text-primary-foreground/50 mb-2">Reviews</p>
              <h2 className="heading-section text-primary-foreground">What Our Customers Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="text-center">
                  <div className="flex justify-center gap-1 mb-4">
                    {Array(t.rating).fill(null).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-primary-foreground/70 text-sm italic mb-4">"{t.text}"</p>
                  <p className="text-xs tracking-[0.15em] uppercase font-medium">{t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
