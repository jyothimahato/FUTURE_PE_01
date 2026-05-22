/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Chef's Special" | "Croissants" | "Burgers" | "Appetizers" | "Quick Bites" | "Wraps" | "Rice Bowls" | "Chinese" | "Pizzas" | "Pasta" | "Sandwiches" | "Beverages" | "Desserts";
  image: string;
  isVeg?: boolean;
  hasGluten?: boolean;
  hasDairy?: boolean;
  hasNuts?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  // Beverages
  {
    id: "bv-1",
    name: "Double Alchemist Espresso",
    description: "A potent, dark-roasted double shot to ignite your narrative.",
    price: 180.00,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1510707513151-471d151dc894?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
    hasGluten: false,
    hasDairy: false,
  },
  {
    id: "bv-2",
    name: "Chamomile Poetry",
    description: "Calming herbal infusion with notes of honey and dried petals.",
    price: 150.00,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1544787210-2211d44b53ce?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
    hasGluten: false,
    hasDairy: false,
  },
  {
    id: "bv-3",
    name: "Earl Grey Manuscript",
    description: "Elegant bergamot-infused black tea for deep focused work.",
    price: 160.00,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
    hasGluten: false,
    hasDairy: false,
  },

  // Desserts
  {
    id: "ds-1",
    name: "Citrus Plot Twist (Lemon Tart)",
    description: "Zesty lemon curd atop a buttery, flaky shortcrust base.",
    price: 220.00,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
    hasGluten: true,
    hasDairy: true,
  },
  {
    id: "ds-2",
    name: "The Soft Marginal (Plain Scone)",
    description: "Warm, crumbly scone served with clotted cream and berry preserve.",
    price: 190.00,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1582293041079-7814c2f120d3?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
    hasGluten: true,
    hasDairy: true,
  },

  // Chef's Special
  {
    id: "cs-1",
    name: "Bangla Paneer",
    description: "A signature paneer dish with rich, traditional spices.",
    price: 339.90,
    category: "Chef's Special",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
    hasDairy: true,
    hasGluten: false,
    hasNuts: false,
  },
  {
    id: "cs-2",
    name: "Crispy Paneer Fingers",
    description: "Golden and crunchy paneer fingers, a delightful snack.",
    price: 361.90,
    category: "Chef's Special",
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
    hasDairy: true,
    hasGluten: true,
    hasNuts: false,
  },
  {
    id: "cs-3",
    name: "Veg Lollipop",
    description: "Savory and spiced vegetable lollipops.",
    price: 306.90,
    category: "Chef's Special",
    image: "https://images.unsplash.com/photo-1606491956689-2ea8c5119c85?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
    hasGluten: true,
    hasDairy: false,
    hasNuts: false,
  },
  {
    id: "cs-4",
    name: "Creamy Thai Basil Chicken",
    description: "Crispy chicken pieces tossed in sauce with fresh basil leaves.",
    price: 429.00,
    category: "Chef's Special",
    image: "https://images.unsplash.com/photo-1562607394-5abc012a6587?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "cs-5",
    name: "Schezwan Chicken Flamed Rice",
    description: "Schezwan Chicken placed on heart shape fried rice.",
    price: 429.00,
    category: "Chef's Special",
    image: "https://images.unsplash.com/photo-1512058560366-cd2429555e54?auto=format&fit=crop&q=80&w=400",
  },

  // Croissants
  {
    id: "cr-1",
    name: "Chicken Croissant Sandwich",
    description: "Our signature flaky croissant with roasted chicken.",
    price: 279.00,
    category: "Croissants",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400",
    hasGluten: true,
    hasDairy: true,
    hasNuts: false,
  },
  {
    id: "cr-2",
    name: "Lotus Biscoff Croissant",
    description: "Drizzled with Lotus Biscoff spread.",
    price: 269.00,
    category: "Croissants",
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
    hasGluten: true,
    hasDairy: true,
    hasNuts: true,
  },
  {
    id: "cr-3",
    name: "Plain Croissant",
    description: "Classic buttery, flaky goodness.",
    price: 199.00,
    category: "Croissants",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
  },

  // Sliders & Burgers
  {
    id: "bg-1",
    name: "Crispy Fried Chicken Burger",
    description: "Crunchy fillet with special sauce.",
    price: 328.90,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "bg-2",
    name: "Paneer Burger",
    description: "Spiced paneer patty with fresh veggies.",
    price: 284.90,
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
  },

  // Appetizers
  {
    id: "ap-1",
    name: "Butter Garlic Chicken",
    description: "Tossed in rich garlic butter.",
    price: 372.90,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1599481238640-4c1288750d7a?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "ap-2",
    name: "Chicken 65",
    description: "Spicy, deep-fried chicken classic.",
    price: 379.00,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "ap-3",
    name: "Chilli Paneer",
    description: "Indo-Chinese spicy paneer.",
    price: 350.90,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
  },

  // Quick Bites
  {
    id: "qb-1",
    name: "Peri Peri Fries",
    description: "Crispy fries with spicy peri peri seasoning.",
    price: 269.00,
    category: "Quick Bites",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
    hasGluten: false,
    hasDairy: false,
    hasNuts: false,
  },
  {
    id: "qb-2",
    name: "Cheese Garlic Bread",
    description: "Toasted bread with garlic and melting cheese.",
    price: 295.90,
    category: "Quick Bites",
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
  },

  // Wraps
  {
    id: "wp-1",
    name: "Pesto Chicken Wrap",
    description: "Grilled chicken with aromatic pesto sauce.",
    price: 284.90,
    category: "Wraps",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "wp-2",
    name: "Pesto Paneer Wrap",
    description: "Soft paneer with garden fresh pesto.",
    price: 273.90,
    category: "Wraps",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
  },

  // Rice Bowls
  {
    id: "rb-1",
    name: "Paneer Butter Masala Rice",
    description: "Creamy paneer butter masala with rice.",
    price: 339.90,
    category: "Rice Bowls",
    image: "https://images.unsplash.com/photo-1542361345-89e58247f2d5?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
  },
  {
    id: "rb-2",
    name: "Butter Chicken with Rice",
    description: "Classic butter chicken served with steaming rice.",
    price: 361.90,
    category: "Rice Bowls",
    image: "https://images.unsplash.com/photo-1542361345-89e58247f2d5?auto=format&fit=crop&q=80&w=400",
  },

  // Chinese
  {
    id: "ch-1",
    name: "Chicken Fried Rice",
    description: "Stir-fried rice with chicken and veggies.",
    price: 361.90,
    category: "Chinese",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "ch-2",
    name: "Veg Soft Noodles",
    description: "Wok-tossed noodles with garden vegetables.",
    price: 295.90,
    category: "Chinese",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
  },

  // Pizzas
  {
    id: "pz-1",
    name: "Margherita Pizza 9\"",
    description: "Classic mozzarella and tomato sauce.",
    price: 361.90,
    category: "Pizzas",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
  },
  {
    id: "pz-2",
    name: "Chicken Tikka Pizza 9\"",
    description: "Topped with spicy chicken tikka pieces.",
    price: 405.90,
    category: "Pizzas",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400",
  },

  // Pasta
  {
    id: "pa-1",
    name: "Alfredo Chicken Penne",
    description: "Rich butter, cream, and Parmesan sauce.",
    price: 411.40,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1645112481338-35623ba99f6c?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "pa-2",
    name: "Alfredo Penne Veg",
    description: "Creamy Alfredo sauce with perfectly cooked penne.",
    price: 394.90,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1645112481338-35623ba99f6c?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
  },

  // Sandwiches
  {
    id: "sw-1",
    name: "Club Chicken Sandwich",
    description: "Triple-layered classic with chicken and egg.",
    price: 361.90,
    category: "Sandwiches",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "sw-2",
    name: "Paneer Tikka Sandwich",
    description: "Spiced paneer tikka between toasted bread.",
    price: 284.90,
    category: "Sandwiches",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=400",
    isVeg: true,
  },
];


