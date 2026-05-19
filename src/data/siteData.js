import mohinga from "../assets/images/mohinga.jpg";
import claypotnoodle from "../assets/images/claypotnoodle.jpg";
import tealeafsalad from "../assets/images/tealeafsalad.jpg";
import coconutnoodle from "../assets/images/coconutnoodle.jpg";
import kyrzanhinn from "../assets/images/kyrzanhinn.jpg";
import noodlesalad from "../assets/images/noodlesalad.jpg";
import shanfishrice from "../assets/images/shanfishrice.jpg";
import tealeafhtamin from "../assets/images/tealeafhtamin.jpg";
import tofunway from "../assets/images/tofunway.jpg";
import tofusalad from "../assets/images/tofusalad.jpg";
import shannoodle from "../assets/images/shannoodle.jpg";
import rangoonhtaminpaung from "../assets/images/rangoonhtaminpaung.jpg";
import rakhinemotte from "../assets/images/rakhinemotte.jpg";
import ceylontea from "../assets/images/ceylontea.jpg";
import coffee from "../assets/images/coffee.jpg";
import milk from "../assets/images/milk.jpg";
import greentea from "../assets/images/greentea.jpg";
import falooda from "../assets/images/falooda.jpg";
import grassjellyjuice from "../assets/images/grassjellyjuice.jpg";
import fermentedglutinousrice from "../assets/images/fermentedglutinousrice.jpg";
import palmjucie from "../assets/images/palmjucie.jpg";
import sugarcane from "../assets/images/sugarcane.jpg";
import tamarindjuice from "../assets/images/tamarindjuice.jpg";
import burmesetempuras from "../assets/images/burmesetempuras.jpg";
import samosa from "../assets/images/samosa.jpg";
import burmesepancake from "../assets/images/burmesepancake.jpg";
import htamane from "../assets/images/htamane.jpg";
import htoemont from "../assets/images/htoemont.jpg";
import kyaukkywe from "../assets/images/kyaukkywe.jpg";
import montlatsaung from "../assets/images/montlatsaung.jpg";
import montlekauk from "../assets/images/montlekauk.jpg";
import montlinmaya from "../assets/images/montlinmaya.jpg";
import montloneyaypaw from "../assets/images/montloneyaypaw.jpg";
import pudding from "../assets/images/pudding.jpg";
import sagopearls from "../assets/images/sagopearls.jpg";
import sanwinmakin from "../assets/images/sanwinmakin.jpg";
import shweyinaye from "../assets/images/shweyinaye.jpg";
import stickyrice from "../assets/images/stickyrice.jpg";

export const BRAND = {
  name: "Burmese Bistro",
  tagline: "Authentic Myanmar Cuisine",
  emoji: "🍛",
  address: "88 Bogyoke Road, Yangon, Myanmar",
  phone: "+95 1 234 5678",
  founded: "1992",
  tableNumber: "C07",
};

export const STATS = [
  { value: "32", label: "Menu Items" },
  { value: "4.9★", label: "Rating" },
  { value: "20min", label: "Avg Wait" },
  { value: "1992", label: "Est." },
];

// ── Hero slideshow ────────────────────────────
// Replace each `image` URL with your own photo URL or imported asset
export const SLIDES = [
  {
    image: coconutnoodle,
    tag: "National Dish",
    title: "Ohn No Khao Swe",
    subtitle:
      "Coconut milk noodle soup with tender chicken — a comforting classic.",
  },
  {
    image: ceylontea,
    tag: "House Drinks",
    title: "Ceylon Tea ",
    subtitle:
      "Pyit Pyit Nhit Nhit Ah Ya Thar (Myanmar milk tea) with rich flavor and creamy texture.",
  },
  {
    image: mohinga,
    tag: "National Dish",
    title: "Mohinga",
    subtitle: "Burma's beloved catfish noodle soup — warmth in every bowl.",
  },
  {
    image: shweyinaye,
    tag: "Chef's Special",
    title: "Shwe Yin Aye",
    subtitle:
      "Coconut milk dessert with jelly, sticky rice and colorful toppings",
  },
  {
    image: sanwinmakin,
    tag: "Chef's Special",
    title: "Sanwin Makin",
    subtitle: "Traditional semolina cake baked with coconut and butter",
  },
];

// ── Menu items ────────────────────────────────
// tags: "popular" | "spicy" | "veg"  (any combination)
export const MENU = {
  foods: [
    {
      id: 1,
      name: "Mohinga",
      desc: "Catfish broth noodle soup with crispy fritters",
      price: 25000,
      image: mohinga,
      tags: ["popular", "musttry", "spicy"],
    },
    {
      id: 2,
      name: "Ohn No Khao Swe",
      desc: "Coconut milk noodle soup with tender chicken",
      price: 25000,
      image: coconutnoodle,
      tags: ["popular", "musttry", "spicy"],
    },
    {
      id: 3,
      name: "Shan Noodles",
      desc: "Flat rice noodles in mild tomato-pork broth",
      price: 22000,
      image: shannoodle,
      tags: ["musttry", "spicy"],
    },
    {
      id: 4,
      name: "Noodle Salad",
      desc: "Refreshing noodle salad with lime and roasted peanuts",
      price: 20000,
      image: noodlesalad,
      tags: ["veg", "spicy"],
    },
    {
      id: 5,
      name: "Claypot Noodle",
      desc: "Hot claypot noodles cooked with vegetables and spices",
      price: 30000,
      image: claypotnoodle,
      tags: ["popular"],
    },

    {
      id: 6,
      name: "Rakhine Mont Te",
      desc: "Spicy Rakhine fish soup with rice noodles and fresh herbs",
      price: 230000,
      image: rakhinemotte,
      tags: ["spicy", "musttry"],
    },
    {
      id: 7,
      name: "Kyar Zan Hinn",
      desc: "Glass noodle soup with mushrooms, herbs and tender chicken",
      price: 21000,
      image: kyrzanhinn,
      tags: ["popular", "musttry", "spicy"],
    },
    {
      id: 8,
      name: "Tofu Nway",
      desc: "Warm silky tofu pudding with savory sauce and crispy toppings",
      price: 20000,
      image: tofunway,
      tags: ["musttry"],
    },
    {
      id: 9,
      name: "Rangoon Htamin Paung",
      desc: "Steamed rice served with mixed vegetables and light curry sauce",
      price: 25000,
      image: rangoonhtaminpaung,
      tags: ["popular", "veg"],
    },
    {
      id: 10,
      name: "Shan Fish Rice",
      desc: "Flavorful Shan-style fish rice with garlic oil and herbs",
      price: 20000,
      image: shanfishrice,
      tags: ["popular"],
    },
    {
      id: 11,
      name: "Tea Leaf Rice",
      desc: "Fried rice mixed with fermented tea leaves and spicy toppings",
      price: 12000,
      image: tealeafhtamin,
      tags: ["spicy"],
    },
    {
      id: 12,
      name: "Tea Leaf Salad",
      desc: "Myanmar tea leaf salad with crunchy beans, peanuts and sesame",
      price: 35000,
      image: tealeafsalad,
      tags: ["veg", "spicy", "halal"],
    },
    {
      id: 13,
      name: "Tofu Salad",
      desc: "Fresh tofu salad tossed with herbs, garlic oil and peanuts",
      price: 12000,
      image: tofusalad,
      tags: ["veg", "spicy", "halal"],
    },
    {
      id: 14,
      name: "Samosa",
      desc: "Crispy golden pastry filled with savory potatoes and spices",
      price: 10000,
      image: samosa,
      tags: ["veg", "popular", "halal"],
    },
    {
      id: 15,
      name: "Burmese Tempura",
      desc: "Assorted crispy Burmese fritters served with fresh vegetables and savory dipping sauce",
      price: 20000,
      image: burmesetempuras,
      tags: ["veg", "popular", "halal"],
    },
  ],
  drinks: [
    {
      id: 16,
      name: "Ceylon Tea",
      desc: "Classic Myanmar milk tea with rich flavor and creamy texture",
      price: 15000,
      image: ceylontea,
      tags: ["hot", "sweet", "musttry"],
    },
    {
      id: 17,
      name: "Coffee",
      desc: "Fresh brewed coffee with deep aroma and smooth taste",
      price: 12000,
      image: coffee,
      tags: ["hot"],
    },
    {
      id: 18,
      name: "Milk",
      desc: "Fresh creamy milk served with hot or cold",
      price: 10000,
      image: milk,
      tags: ["sweet", "hot", "cold"],
    },
    {
      id: 19,
      name: "Green Tea",
      desc: "Light and healthy green tea with natural fresh aroma",
      price: 15000,
      image: greentea,
      tags: ["hot"],
    },
    {
      id: 20,
      name: "Falooda",
      desc: "Sweet dessert drink with jelly, milk and ice cream toppings",
      price: 18000,
      image: falooda,
      tags: ["popular", "musttry", "sweet", "cold"],
    },
    {
      id: 21,
      name: "Sugarcane Juice",
      desc: "Freshly squeezed sugarcane juice served with ice",
      price: 10000,
      image: sugarcane,
      tags: ["sweet", "cold"],
    },
    {
      id: 22,
      name: "Tamarind Juice",
      desc: "Sweet and tangy tamarind drink with refreshing flavor",
      price: 8000,
      image: tamarindjuice,
      tags: ["sour", "cold"],
    },
    {
      id: 23,
      name: "Grass Jelly Juice",
      desc: "Refreshing grass jelly drink with sweet syrup and ice",
      price: 8000,
      image: grassjellyjuice,
      tags: ["sweet", "sour", "cold"],
    },
    {
      id: 24,
      name: "Palm Juice",
      desc: "Traditional palm juice with natural sweet tropical taste",
      price: 10000,
      image: palmjucie,
      tags: ["sweet", "cold", "alcohol"],
    },
    {
      id: 25,
      name: "Fermented Glutinous Rice",
      desc: "Traditional sweet fermented sticky rice served chilled",
      price: 15000,
      image: fermentedglutinousrice,
      tags: ["sweet", "cold", "alcohol"],
    },
  ],
  desserts: [
    {
      id: 26,
      name: "Burmese Pancake",
      desc: "Savory crispy pancake served with dipping sauce and fresh toppings",
      price: 20000,
      image: burmesepancake,
      tags: ["popular", "musttry"],
    },

    {
      id: 27,
      name: "Htamane",
      desc: "Traditional sticky rice delicacy mixed with coconut, peanuts and sesame",
      price: 15000,
      image: htamane,
      tags: ["musttry"],
    },

    {
      id: 28,
      name: "Htoe Mont",
      desc: "Sweet semolina cake topped with roasted nuts and sesame",
      price: 30000,
      image: htoemont,
      tags: ["sweet", "popular", "musttry"],
    },

    {
      id: 29,
      name: "Kyauk Kywe",
      desc: "Colorful traditional jelly dessert served chilled with coconut flavor",
      price: 20000,
      image: kyaukkywe,
      tags: ["sweet", "cold"],
    },

    {
      id: 30,
      name: "Mont Lat Saung",
      desc: "Sweet coconut milk dessert with sticky rice balls and jelly",
      price: 15000,
      image: montlatsaung,
      tags: ["sweet", "cold", "musttry"],
    },

    {
      id: 31,
      name: "Mont Let Kauk",
      desc: "Deep fried sweet Myanmar donuts served with sweet dipping sauce",
      price: 12000,
      image: montlekauk,
      tags: ["popular", "sweet"],
    },

    {
      id: 32,
      name: "Mont Lin Ma Yar",
      desc: "Traditional Myanmar snack filled with quail egg and savory toppings",
      price: 15000,
      image: montlinmaya,
      tags: ["popular", "musttry"],
    },

    {
      id: 33,
      name: "Mont Lone Yay Paw",
      desc: "Sweet glutinous rice balls filled with jaggery and coconut flakes",
      price: 15000,
      image: montloneyaypaw,
      tags: ["popular", "sweet", "musttry"],
    },

    {
      id: 34,
      name: "Pudding",
      desc: "Soft creamy pudding topped with caramel flavor and fresh fruits",
      price: 15000,
      image: pudding,
      tags: ["sweet"],
    },

    {
      id: 35,
      name: "Sago Pearls",
      desc: "Sweet coconut dessert with chewy sago pearls and shredded coconut",
      price: 12000,
      image: sagopearls,
      tags: ["sweet", "cold"],
    },

    {
      id: 36,
      name: "Sanwin Makin",
      desc: "Traditional semolina cake baked with coconut and butter",
      price: 25000,
      image: sanwinmakin,
      tags: ["popular", "musttry", "sweet"],
    },

    {
      id: 37,
      name: "Shwe Yin Aye",
      desc: "Coconut milk dessert with jelly, sticky rice and colorful toppings",
      price: 18000,
      image: shweyinaye,
      tags: ["popular", "sweet", "cold"],
    },

    {
      id: 38,
      name: "Sticky Rice",
      desc: "Sweet sticky rice rolls served with coconut cream and black beans",
      price: 20000,
      image: stickyrice,
      tags: ["musttry"],
    },
  ],
};

export const MENU_CAT_DESC = {
  foods: "Traditional noodles, curries & rice dishes",
  drinks: "Refreshing Myanmar beverages & teas",
  desserts: "Sweet traditional Myanmar desserts",
};

export const TODAY_SPECIAL = {
  id: 1,
  name: "Mohinga",
  desc: "Catfish broth noodle soup",
  price: 8.5,
  emoji: "🍜",
};

// ── Services ──────────────────────────────────
export const SERVICES = [
  {
    icon: "Smartphone",
    name: "QR Table Ordering",
    desc: "Scan the QR at your table to browse and order instantly — no waiting for staff.",
  },
  {
    icon: "Truck",
    name: "Home Delivery",
    desc: "We deliver within 5km. Average delivery time: 30 minutes. Order via app or phone.",
  },
  {
    icon: "Users",
    name: "Private Dining",
    desc: "Reserve our private room for groups of 10–30. Perfect for family events and gatherings.",
  },
  {
    icon: "ChefHat",
    name: "Catering Service",
    desc: "Full catering for events. We handle setup, food and cleanup. Contact us 48hrs ahead.",
  },
  {
    icon: "Bot",
    name: "AI Food Assistant",
    desc: "Ask our AI about menu items, allergens, and pairings — available around the clock.",
  },
  {
    icon: "Gift",
    name: "Loyalty Rewards",
    desc: "Earn points on every order. Redeem for free dishes, drinks, and special discounts.",
  },
];

// ── About page ────────────────────────────────
export const ABOUT_FEATURES = [
  {
    icon: "Heart",
    title: "Our Story",
    desc: "Founded by Grandmother Aye in 1992 with a single pot of Mohinga. Today her grandchildren serve the same recipes.",
    link: "/our-story",
  },
  {
    icon: "Leaf",
    title: "Fresh Ingredients",
    desc: "Herbs and vegetables sourced daily from local farms. Curry pastes ground fresh every morning.",
  },
  {
    icon: "MapPin",
    title: "Location",
    desc: "88 Bogyoke Road, Yangon, Myanmar. 5 min walk from Bogyoke Market. Phone: +95 1 234 5678.",
  },
  {
    icon: "Clock",
    title: "Opening Hours",
    hours: [
      { day: "Mon – Fri", time: "7AM – 10PM" },
      { day: "Saturday", time: "7AM – 11PM" },
      { day: "Sunday", time: "8AM – 10PM" },
      { day: "Public Hols", time: "9AM – 9PM" },
    ],
  },
];

// ── Support chat quick-question chips ─────────
export const SUPPORT_CHIPS = [
  "What are your opening hours?",
  "Do you have vegetarian options?",
  "Can I make a reservation?",
  "What is Mohinga?",
  "Do you deliver?",
  "What are your most popular dishes?",
];

// ── Review sample texts ────────────────────────
export const REVIEW_SAMPLES = [
  "The Mohinga was absolutely incredible! Best noodle soup I've ever had. Service was fast and staff were so friendly.",
  "Food was okay but took 45 minutes to arrive. The curry was good but a bit too oily for my taste.",
  "Terrible experience. My order was wrong and no one apologized. The tea was cold too.",
  "Lovely atmosphere and authentic flavours. The tea leaf salad was a revelation!",
];

// ── AI system prompts (edit if needed) ────────
export const SUPPORT_SYSTEM_PROMPT = `You are a helpful customer support agent for Burmese Bistro. Menu: Mohinga 25000 MMK (national noodle soup), Shan Noodles 22000 MMK, Laphet Thoke 30000 MMK (tea leaf salad, veg), Ohn No Khao Swe 25000 MMK (coconut noodle soup), Samusa 8000 MMK (veg), Myanmar Green Tea 15000 MMK, Sugarcane Juice 10000 MMK, Mont Let Saung 10000 MMK (dessert), Sanwin Makin 25000 MMK, Shwe Yin Aye 15000 MMK. Hours: Mon-Fri 7AM-10PM, Sat 7AM-11PM, Sun 8AM-10PM. Location: 88 Bogyoke Road, Yangon. Delivery within 5km ~30min. Be warm, concise, use occasional food emojis.`;

export const REVIEW_SYSTEM_PROMPT = `You are an AI review analyzer for Burmese Bistro. Respond ONLY with valid JSON (no markdown, no backticks): {"sentiment":"Positive","score":4,"themes":["Great food","Fast service"],"summary":"One sentence summary","ownerReply":"Warm 2-3 sentence reply from owner"}. Sentiment: Positive/Neutral/Negative. Score: 1-5.`;
