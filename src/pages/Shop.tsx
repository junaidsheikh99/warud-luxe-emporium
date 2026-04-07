import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { products, Product } from "@/data/products";

type SortOption = "latest" | "price-asc" | "price-desc" | "popular";

export default function Shop() {
  const [params] = useSearchParams();
  const initialCategory = params.get("category") || "all";

  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("latest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [category, search, sort]);

  const categories = [
    { value: "all", label: "All" },
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "accessories", label: "Accessories" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-primary text-primary-foreground py-16 text-center">
          <p className="text-label text-primary-foreground/50 mb-2">Collection</p>
          <h1 className="heading-display text-primary-foreground">Shop All</h1>
        </div>

        <div className="container-luxury section-padding">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 border border-border bg-background text-sm focus:outline-none focus:border-gold"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden btn-luxury-outline !py-2 !px-4 text-xs"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
            >
              <option value="latest">Latest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popular">Popularity</option>
            </select>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className={`${showFilters ? "block" : "hidden"} sm:block w-full sm:w-48 flex-shrink-0`}>
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.value}>
                    <button
                      onClick={() => setCategory(cat.value)}
                      className={`text-sm transition-colors ${
                        category === cat.value
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-6">{filtered.length} products</p>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No products found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
