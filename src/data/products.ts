export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  madeToOrder: boolean;
};

export const products: Product[] = [
  {
    id: "MEH001",
    slug: "emerald-mehndi-suit",
    name: "Emerald Mehndi Suit",
    category: "Mehndi",
    price: 25000,
    image: "/images/products/mehndi/emerald-mehndi-01.jpeg",
    description: "An elegant mehndi outfit with rich traditional detailing.",
    madeToOrder: true,
  },
  {
    id: "MEH002",
    slug: "golden-mehndi-suit",
    name: "Golden Mehndi Suit",
    category: "Bridal",
    price: 32000,
    image: "/images/products/bridal/golden-bridal-01.jpeg",
    description: "A timeless festive design with graceful golden accents.",
    madeToOrder: true,
  },
  {
    id: "MEH003",
    slug: "traditional-mehndi-suit",
    name: "Traditional Mehndi Suit",
    category: "Formal",
    price: 18500,
    image: "/images/products/formals/champagne-formal-01.jpeg",
    description: "A beautiful traditional look for your special occasion.",
    madeToOrder: true,
  },
];
