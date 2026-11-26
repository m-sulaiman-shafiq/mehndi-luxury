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
    id: "MEH004",
    slug: "mahira-yellow-mehndi-suit",
    name: "Mahira Yellow Mehndi Suit",
    category: "Mehndi",
    price: 15000,
    image: "/images/products/mehndi/mahira_yellow.jpeg",
    description: "Shirt & Dupatta: Organza Sharara: Silk; Goti work; Lase",
    madeToOrder: true,
  },
  {
    id: "MEH005",
    slug: "yellow-mehndi-kurti-lehnga",
    name: "Yellow Mehndi Kurti with Lehnga",
    category: "Mehndi",
    price: 15000,
    image: "/images/products/mehndi/yellow_mehndi.jpg",
    description: "KAttan Silk; Net DUpatta; Goti work; Lase",
    madeToOrder: true,
  },
  {
    id: "MEH006",
    slug: "red-bridal-sister-dress",
    name: "Red Bridal Sister Dress",
    category: "Mehndi",
    price: 25000,
    image: "/images/products/bridal/bride_sister.jpg",
    description:
      "Embroidered Velvet Kurti; Net Dupatta; Jamawar; Double Net; Lace; Stome Work ",
    madeToOrder: true,
  },
  {
    id: "MEH007",
    slug: "skyblue-casual-mehndi-dress",
    name: "Sky Blue Casual Mehndi Dress",
    category: "Mehndi",
    price: 35000,
    image: "/images/products/formals/casual_skyblue.jpg",
    description:
      "Kurti Ogranza; Lehanga Dupatta; Crushed Silk; Stone Work; LAce",
    madeToOrder: true,
  },
  {
    id: "MEH008",
    slug: "teal-casual-mehndi-dress",
    name: "Teal Blue Casual Mehndi Dress",
    category: "Mehndi",
    price: 35000,
    image: "/images/products/formals/casual_teal.jpg",
    description:
      "Lehnga: Crushed silk; Duappta & shirt: ORganza; Lace; Stone work",
    madeToOrder: true,
  },
  {
    id: "MEH009",
    slug: "rainbow-casual-mehndi-dress",
    name: "Rainbow Casual Mehndi Dress",
    category: "Mehndi",
    price: 35000,
    image: "/images/products/formals/casual_rainbow.jpg",
    description: "Blouse: Kataan Silk; Stone work; Silk or Kattan Silk Skirt",
    madeToOrder: true,
  },
  {
    id: "MEH010",
    slug: "maroon-casual-mehndi-dress",
    name: "Maroon Casual Mehndi Dress",
    category: "Mehndi",
    price: 35000,
    image: "/images/products/formals/casual_maroon.jpg",
    description: "Velvet shirt; stone work; crushed silk skirt",
    madeToOrder: true,
  },
  {
    id: "MEH011",
    slug: "frock-black-mehndi-dress",
    name: "Black Frock Mehndi Dress",
    category: "Mehndi",
    price: 45000,
    image: "/images/products/mehndi/frock_black.jpg",
    description: "Net Frock; Stone work; Lace",
    madeToOrder: true,
  },
];
