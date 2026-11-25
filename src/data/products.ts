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
    price: 99000,
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
  {
    id: "MEH004",
    slug: "mahira-yellow-mehndi-suit",
    name: "Mahira Yellow Mehndi Suit",
    category: "Mehndi",
    price: 39000,
    image: "/images/products/mehndi/mahira_yellow.jpeg",
    description: "A beautiful traditional look for your special occasion.",
    madeToOrder: true,
  },
  {
    id: "MEH005",
    slug: "yellow-mehndi-kurti-lehnga",
    name: "Yellow Mehndi Kurti with Lehnga",
    category: "Mehndi",
    price: 39000,
    image: "/images/products/mehndi/yellow_mehndi.jpg",
    description: "A beautiful traditional kurti paired with an elegant lehnga.",
    madeToOrder: true,
  },
  {
    id: "MEH006",
    slug: "red-bridal-sister-dress",
    name: "Red Bridal Sister Dress",
    category: "Mehndi",
    price: 35000,
    image: "/images/products/bridal/bride_sister.jpg",
    description: "A beautiful traditional kurti paired with an elegant lehnga.",
    madeToOrder: true,
  },
  {
    id: "MEH007",
    slug: "skyblue-casual-mehndi-dress",
    name: "Sky Blue Casual Mehndi Dress",
    category: "Mehndi",
    price: 35000,
    image: "/images/products/formals/casual_skyblue.jpg",
    description: "A beautiful yet simple kurti for parties",
    madeToOrder: true,
  },
  {
    id: "MEH008",
    slug: "teal-casual-mehndi-dress",
    name: "Teal Blue Casual Mehndi Dress",
    category: "Mehndi",
    price: 35000,
    image: "/images/products/formals/casual_teal.jpg",
    description: "A beautiful yet simple kurti for parties",
    madeToOrder: true,
  },
  {
    id: "MEH009",
    slug: "rainbow-casual-mehndi-dress",
    name: "Rainbow Casual Mehndi Dress",
    category: "Mehndi",
    price: 35000,
    image: "/images/products/formals/casual_rainbow.jpg",
    description: "A beautiful yet simple kurti for parties",
    madeToOrder: true,
  },
  {
    id: "MEH010",
    slug: "maroon-casual-mehndi-dress",
    name: "Maroon Casual Mehndi Dress",
    category: "Mehndi",
    price: 35000,
    image: "/images/products/formals/casual_maroon.jpg",
    description: "A beautiful yet simple kurti for parties",
    madeToOrder: true,
  },
  {
    id: "MEH011",
    slug: "frock-black-mehndi-dress",
    name: "Black Frock Mehndi Dress",
    category: "Mehndi",
    price: 45000,
    image: "/images/products/mehndi/frock_black.jpg",
    description: "A beautiful black frock for mehndi and other events",
    madeToOrder: true,
  },
];
