// src/data/products.js

import image1 from "../assets/images/infants/image1.jpg";
import image2 from "../assets/images/infants/image2.jpg";
import image3 from "../assets/images/infants/image3.jpg";
import men1 from "../assets/images/men/image1.jpg";
import women1 from "../assets/images/women/image1.jpg";
import women2 from "../assets/images/women/image2.jpg";

const allProducts = [
  {
    id: 1,
    name: "Clo-Bear 1",
    price: 150,
    image: image1,
    category: "clo-bear",
    size: ["M"],
    color: ["Grey"],
  },
  {
    id: 2,
    name: "clo-bear 2",
    price: 130,
    image: image2,
    category: "clo-bear",
    size: ["L"],
    color: ["Grey"],
  },
  {
    id: 3,
    name: "clo-bear 3",
    price: 175,
    image: image3,
    category: "clo-bear",
    size: ["S"],
    color: ["Grey"],
  },
  {
    id: 4,
    name: "Clo-Prime",
    price: 65,
    image: men1,
    category: "clo-prime",
    size: ["L"],
    color: ["Navy"],
  },
  {
    id: 5,
    name: "Clo-Prime",
    price: 65,
    image: men1,
    category: "clo-prime",
    size: ["L"],
    color: ["Black"],
  },
  {
    id: 6,
    name: "Clo-Aura",
    price: 65,
    image: women1,
    category: "clo-aura",
    size: ["S"],
    color: ["Beige"],
  },
  {
    id: 7,
    name: "Clo-Zion",
    price: 170,
    image: image3,
    category: "clo-zion",
    size: ["M"],
    color: ["Blue"],
  },
  {
    id: 8,
    name: "Clo-Aura 2",
    price: 150,
    image: women2,
    category: "clo-aura",
    size: ["L"],
    color: ["Grey"],
  },
];

export default allProducts;
