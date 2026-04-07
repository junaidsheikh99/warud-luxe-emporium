import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "men" | "women" | "accessories";
  sizes: string[];
  rating: number;
  reviews: number;
  description: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Essential Black Tee",
    price: 1499,
    originalPrice: 2499,
    image: product1,
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviews: 128,
    description: "Premium cotton crew-neck tee crafted from the finest organic cotton. A wardrobe staple for the modern man.",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Slim Fit Denim",
    price: 3499,
    originalPrice: 4999,
    image: product2,
    category: "men",
    sizes: ["28", "30", "32", "34", "36"],
    rating: 4.7,
    reviews: 256,
    description: "Classic slim-fit jeans with stretch comfort. Japanese selvedge denim for an elevated everyday look.",
    isFeatured: true,
  },
  {
    id: "3",
    name: "Oxford Dress Shirt",
    price: 2999,
    image: product3,
    category: "men",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.3,
    reviews: 89,
    description: "Crisp white oxford shirt in premium Egyptian cotton. Perfect for business or smart-casual occasions.",
    isNew: true,
  },
  {
    id: "4",
    name: "Luxe Gold Timepiece",
    price: 12999,
    originalPrice: 18999,
    image: product4,
    category: "accessories",
    sizes: ["One Size"],
    rating: 4.9,
    reviews: 64,
    description: "Statement gold-tone wristwatch with Swiss movement. An accessory that elevates any ensemble.",
    isFeatured: true,
  },
  {
    id: "5",
    name: "Moto Leather Jacket",
    price: 8999,
    image: product5,
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    rating: 4.8,
    reviews: 192,
    description: "Genuine leather biker jacket with asymmetric zip. Timeless rebellion meets contemporary design.",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "6",
    name: "Tailored Chinos",
    price: 2799,
    originalPrice: 3999,
    image: product6,
    category: "men",
    sizes: ["28", "30", "32", "34"],
    rating: 4.4,
    reviews: 145,
    description: "Perfectly tailored slim-fit chinos in sand. Versatile enough for office or weekend.",
  },
];
