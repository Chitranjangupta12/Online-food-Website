export const foodItems = [
  // --- PIZZA ---
  {
    id: "pizza-1",
    name: "Margherita Supreme Pizza",
    category: "pizza",
    restaurantId: "rest-1",
    restaurantName: "La Piazza Gourmet Pizza",
    price: 13.99,
    originalPrice: 16.99,
    rating: 4.8,
    ratingCount: 320,
    isVeg: true,
    prepTime: "20-25 min",
    calories: "780 kcal",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=700&q=80",
    description: "Classic Neapolitan crust topped with San Marzano tomato sauce, fresh buffalo mozzarella, aromatic basil leaves, and extra virgin olive oil.",
    ingredients: ["San Marzano Sauce", "Buffalo Mozzarella", "Fresh Basil", "Extra Virgin Olive Oil", "Sea Salt"],
    bestseller: true,
    sizes: [
      { name: "Regular 8\"", priceOffset: 0 },
      { name: "Medium 10\"", priceOffset: 3.50 },
      { name: "Large 12\"", priceOffset: 6.00 }
    ],
    crusts: ["Classic Hand-Tossed", "Thin Crust", "Cheese Burst (+ $2.00)"],
    addOns: [
      { name: "Extra Buffalo Mozzarella", price: 1.99 },
      { name: "Garlic Butter Dip", price: 0.99 },
      { name: "Jalapeño Slices", price: 0.75 }
    ]
  },
  {
    id: "pizza-2",
    name: "Pepperoni Passion Woodfire",
    category: "pizza",
    restaurantId: "rest-1",
    restaurantName: "La Piazza Gourmet Pizza",
    price: 16.49,
    originalPrice: 19.99,
    rating: 4.9,
    ratingCount: 540,
    isVeg: false,
    prepTime: "20-25 min",
    calories: "920 kcal",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=700&q=80",
    description: "Generously layered with double slices of smoky Italian pepperoni, melted whole-milk mozzarella, and herbs.",
    ingredients: ["Italian Pepperoni", "Whole-Milk Mozzarella", "Oregano", "Herb Tomato Sauce"],
    bestseller: true,
    sizes: [
      { name: "Regular 8\"", priceOffset: 0 },
      { name: "Medium 10\"", priceOffset: 3.50 },
      { name: "Large 12\"", priceOffset: 6.00 }
    ],
    crusts: ["Classic Hand-Tossed", "Thin Crust", "Cheese Burst (+ $2.00)"],
    addOns: [
      { name: "Extra Pepperoni", price: 2.49 },
      { name: "Chili Honey Drizzle", price: 1.25 },
      { name: "Ranch Dip", price: 0.99 }
    ]
  },
  {
    id: "pizza-3",
    name: "BBQ Smoked Chicken Pizza",
    category: "pizza",
    restaurantId: "rest-9",
    restaurantName: "Tuscan Crust Woodfired",
    price: 15.99,
    originalPrice: 18.50,
    rating: 4.7,
    ratingCount: 280,
    isVeg: false,
    prepTime: "25-30 min",
    calories: "860 kcal",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",
    description: "Tender grilled chicken chunks glazed with smoky honey BBQ sauce, red onions, bell peppers, and cheddar cheese blend.",
    ingredients: ["BBQ Grilled Chicken", "Smoked Gouda & Mozzarella", "Red Onions", "Coriander"],
    bestseller: false,
    sizes: [
      { name: "Regular 8\"", priceOffset: 0 },
      { name: "Medium 10\"", priceOffset: 3.50 },
      { name: "Large 12\"", priceOffset: 6.00 }
    ],
    crusts: ["Classic Hand-Tossed", "Thin Crust"],
    addOns: [
      { name: "Crispy Bacon Bits", price: 2.00 },
      { name: "Extra BBQ Sauce", price: 0.75 }
    ]
  },
  {
    id: "pizza-4",
    name: "Farmhouse Veggie Delight",
    category: "pizza",
    restaurantId: "rest-1",
    restaurantName: "La Piazza Gourmet Pizza",
    price: 14.25,
    originalPrice: 17.00,
    rating: 4.6,
    ratingCount: 215,
    isVeg: true,
    prepTime: "20-25 min",
    calories: "720 kcal",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80",
    description: "Loaded with crunchy bell peppers, sweet corn kernels, button mushrooms, ripe black olives, and Italian herbs.",
    ingredients: ["Button Mushrooms", "Sweet Corn", "Black Olives", "Capsicum", "Mozzarella"],
    bestseller: false,
    sizes: [
      { name: "Regular 8\"", priceOffset: 0 },
      { name: "Medium 10\"", priceOffset: 3.50 },
      { name: "Large 12\"", priceOffset: 6.00 }
    ],
    crusts: ["Classic Hand-Tossed", "Thin Crust", "Gluten Free"],
    addOns: [
      { name: "Paneer Cubes", price: 1.75 },
      { name: "Extra Cheese", price: 1.99 }
    ]
  },
  {
    id: "pizza-5",
    name: "Truffle Mushroom Artisan Pizza",
    category: "pizza",
    restaurantId: "rest-9",
    restaurantName: "Tuscan Crust Woodfired",
    price: 17.99,
    originalPrice: 21.00,
    rating: 4.9,
    ratingCount: 190,
    isVeg: true,
    prepTime: "25-30 min",
    calories: "790 kcal",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=700&q=80",
    description: "Sautéed wild forest mushrooms drizzled with white truffle oil, fontina cheese, thyme, and roasted garlic cream sauce.",
    ingredients: ["Wild Shiitake & Button Mushrooms", "Truffle Oil", "Fontina Cheese", "Roasted Garlic"],
    bestseller: true,
    sizes: [
      { name: "Regular 8\"", priceOffset: 0 },
      { name: "Medium 10\"", priceOffset: 3.50 },
      { name: "Large 12\"", priceOffset: 6.00 }
    ],
    crusts: ["Neapolitan Woodfire Crust"],
    addOns: [
      { name: "Shaved Parmesan", price: 1.80 },
      { name: "Balsamic Glaze", price: 0.90 }
    ]
  },

  // --- BURGERS ---
  {
    id: "burger-1",
    name: "Grand Double Cheeseburger",
    category: "burger",
    restaurantId: "rest-2",
    restaurantName: "The Royal Burger Co.",
    price: 11.99,
    originalPrice: 14.50,
    rating: 4.9,
    ratingCount: 680,
    isVeg: false,
    prepTime: "15-20 min",
    calories: "850 kcal",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    description: "Two prime smashed beef patties with double melted cheddar cheese, house secret burger relish, dill pickles, and crisp iceberg lettuce.",
    ingredients: ["100% Smashed Beef Patties", "Aged Cheddar", "House Relish", "Brioche Bun", "Pickles"],
    bestseller: true,
    sizes: [
      { name: "Single Patty", priceOffset: -2.00 },
      { name: "Double Patty (Standard)", priceOffset: 0 },
      { name: "Triple Beast", priceOffset: 3.50 }
    ],
    addOns: [
      { name: "Crispy Bacon Strips", price: 1.75 },
      { name: "Fried Free-Range Egg", price: 1.25 },
      { name: "Caramelized Onions", price: 0.80 }
    ]
  },
  {
    id: "burger-2",
    name: "Crispy Nashville Hot Chicken Burger",
    category: "burger",
    restaurantId: "rest-2",
    restaurantName: "The Royal Burger Co.",
    price: 10.99,
    originalPrice: 13.00,
    rating: 4.8,
    ratingCount: 490,
    isVeg: false,
    prepTime: "15-20 min",
    calories: "740 kcal",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=700&q=80",
    description: "Buttermilk marinated chicken thigh deep-fried to golden perfection, tossed in Nashville cayenne glaze, with creamy coleslaw & pickles.",
    ingredients: ["Spicy Fried Chicken Thigh", "Nashville Cayenne Glaze", "Creamy Slaw", "Pickles", "Brioche Bun"],
    bestseller: true,
    sizes: [
      { name: "Standard", priceOffset: 0 },
      { name: "Extra Large Patty", priceOffset: 2.50 }
    ],
    addOns: [
      { name: "Pepper Jack Cheese", price: 1.00 },
      { name: "Extra Nashville Dip", price: 0.75 }
    ]
  },
  {
    id: "burger-3",
    name: "Avocado Black Bean Veggie Burger",
    category: "burger",
    restaurantId: "rest-2",
    restaurantName: "The Royal Burger Co.",
    price: 9.99,
    originalPrice: 11.99,
    rating: 4.6,
    ratingCount: 310,
    isVeg: true,
    prepTime: "12-18 min",
    calories: "590 kcal",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=700&q=80",
    description: "Wholesome spiced black bean & sweetcorn patty topped with freshly mashed Hass avocado, tomato slice, and chipotle lime aioli.",
    ingredients: ["Black Bean Patty", "Hass Avocado", "Tomato", "Baby Spinach", "Chipotle Aioli"],
    bestseller: false,
    sizes: [
      { name: "Standard", priceOffset: 0 }
    ],
    addOns: [
      { name: "Vegan Cheddar Slice", price: 1.25 },
      { name: "Crispy Onion Rings", price: 1.50 }
    ]
  },
  {
    id: "burger-4",
    name: "Truffle Swiss Mushroom Burger",
    category: "burger",
    restaurantId: "rest-2",
    restaurantName: "The Royal Burger Co.",
    price: 12.49,
    originalPrice: 15.00,
    rating: 4.7,
    ratingCount: 220,
    isVeg: false,
    prepTime: "15-20 min",
    calories: "810 kcal",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80",
    description: "Grilled Angus patty smothered in melted Swiss cheese, caramelized garlic mushrooms, and savory truffle mayo.",
    ingredients: ["Angus Beef Patty", "Swiss Cheese", "Sautéed Cremini Mushrooms", "Truffle Mayo"],
    bestseller: false,
    sizes: [
      { name: "Single Patty", priceOffset: 0 },
      { name: "Double Patty", priceOffset: 3.00 }
    ],
    addOns: [
      { name: "Crispy Bacon", price: 1.75 }
    ]
  },

  // --- BIRYANI ---
  {
    id: "biryani-1",
    name: "Royal Hyderabadi Dum Chicken Biryani",
    category: "biryani",
    restaurantId: "rest-3",
    restaurantName: "Nawabi Dastarkhwan Biryani",
    price: 14.99,
    originalPrice: 17.50,
    rating: 4.9,
    ratingCount: 890,
    isVeg: false,
    prepTime: "25-30 min",
    calories: "950 kcal",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80",
    description: "Slow-cooked long grain basmati rice layered with succulent bone-in chicken marinated in yogurt, saffron, mint, and secret shahi spices.",
    ingredients: ["Aged Basmati Rice", "Tender Marinated Chicken", "Kashmiri Saffron", "Caramelized Birista", "Desi Ghee"],
    bestseller: true,
    sizes: [
      { name: "Regular (Serves 1)", priceOffset: 0 },
      { name: "Family Pack (Serves 2-3)", priceOffset: 12.00 },
      { name: "Jumbo Party Pack (Serves 4-5)", priceOffset: 24.00 }
    ],
    addOns: [
      { name: "Mirchi Ka Salan & Extra Raita", price: 1.50 },
      { name: "Boiled Egg (2 pcs)", price: 1.25 },
      { name: "Chicken Kebab (4 pcs)", price: 4.50 }
    ]
  },
  {
    id: "biryani-2",
    name: "Shahi Mutton Dum Biryani",
    category: "biryani",
    restaurantId: "rest-3",
    restaurantName: "Nawabi Dastarkhwan Biryani",
    price: 17.99,
    originalPrice: 21.00,
    rating: 4.9,
    ratingCount: 720,
    isVeg: false,
    prepTime: "30-35 min",
    calories: "1050 kcal",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=700&q=80",
    description: "Melt-in-mouth tender goat mutton pieces cooked sealed in earthen handi with aromatic whole spices, saffron milk, and rose water.",
    ingredients: ["Tender Goat Mutton", "Long-Grain Rice", "Mughlai Spices", "Kewra Water", "Fresh Mint"],
    bestseller: true,
    sizes: [
      { name: "Regular (Serves 1)", priceOffset: 0 },
      { name: "Family Pack (Serves 2-3)", priceOffset: 15.00 }
    ],
    addOns: [
      { name: "Extra Mutton Gravy", price: 2.00 },
      { name: "Cucumber Mint Raita", price: 1.00 }
    ]
  },
  {
    id: "biryani-3",
    name: "Nawabi Paneer Tikka Biryani",
    category: "biryani",
    restaurantId: "rest-3",
    restaurantName: "Nawabi Dastarkhwan Biryani",
    price: 12.99,
    originalPrice: 15.00,
    rating: 4.7,
    ratingCount: 380,
    isVeg: true,
    prepTime: "20-25 min",
    calories: "780 kcal",
    image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=700&q=80",
    description: "Char-grilled cottage cheese cubes cooked in spicy tandoori marinade, layered with fragrant saffron rice and fried onions.",
    ingredients: ["Fresh Cottage Cheese (Paneer)", "Basmati Rice", "Tandoori Spices", "Fried Cashews"],
    bestseller: false,
    sizes: [
      { name: "Regular (Serves 1)", priceOffset: 0 },
      { name: "Family Pack (Serves 2-3)", priceOffset: 10.00 }
    ],
    addOns: [
      { name: "Extra Raita", price: 0.99 },
      { name: "Roasted Papad (2 pcs)", price: 0.75 }
    ]
  },
  {
    id: "biryani-4",
    name: "Lucknowi Veg Awadhi Dum Biryani",
    category: "biryani",
    restaurantId: "rest-3",
    restaurantName: "Nawabi Dastarkhwan Biryani",
    price: 11.99,
    originalPrice: 13.99,
    rating: 4.6,
    ratingCount: 290,
    isVeg: true,
    prepTime: "20-25 min",
    calories: "680 kcal",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80",
    description: "Subtly spiced Awadhi style dum rice cooked with green beans, carrots, cauliflower, green peas, and fragrant cardamom saffron essence.",
    ingredients: ["Garden Fresh Vegetables", "Basmati Rice", "Cardamom & Mace", "Desi Ghee", "Saffron"],
    bestseller: false,
    sizes: [
      { name: "Regular (Serves 1)", priceOffset: 0 },
      { name: "Family Pack (Serves 2-3)", priceOffset: 9.50 }
    ],
    addOns: [
      { name: "Boondi Raita", price: 1.00 }
    ]
  },

  // --- CHINESE ---
  {
    id: "chinese-1",
    name: "Classic Hakka Veg Noodles",
    category: "chinese",
    restaurantId: "rest-4",
    restaurantName: "Golden Dragon Wok",
    price: 9.99,
    originalPrice: 12.00,
    rating: 4.7,
    ratingCount: 420,
    isVeg: true,
    prepTime: "15-20 min",
    calories: "520 kcal",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80",
    description: "High-heat wok-tossed noodles with shredded cabbage, carrots, spring onions, bell peppers, and savoury soy-garlic seasoning.",
    ingredients: ["Egg-free Wheat Noodles", "Crunchy Veggies", "Dark Soy Sauce", "Toasted Sesame Oil"],
    bestseller: true,
    sizes: [
      { name: "Standard Portion", priceOffset: 0 },
      { name: "Large Shareable", priceOffset: 3.00 }
    ],
    addOns: [
      { name: "Spicy Schezwan Sauce", price: 0.75 },
      { name: "Crispy Fried Wonton Strips", price: 1.00 }
    ]
  },
  {
    id: "chinese-2",
    name: "Crispy Chili Paneer Dry",
    category: "chinese",
    restaurantId: "rest-4",
    restaurantName: "Golden Dragon Wok",
    price: 11.49,
    originalPrice: 13.50,
    rating: 4.8,
    ratingCount: 360,
    isVeg: true,
    prepTime: "15-20 min",
    calories: "610 kcal",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=700&q=80",
    description: "Crispy coated cottage cheese cubes tossed with green chilies, diced onions, bell peppers, and zesty Indo-Chinese chili sauce.",
    ingredients: ["Fresh Paneer", "Green Chilies", "Capsicum", "Garlic & Ginger", "Chili Glaze"],
    bestseller: true,
    sizes: [
      { name: "Standard", priceOffset: 0 }
    ],
    addOns: [
      { name: "Extra Spicy Heat Level", price: 0.00 },
      { name: "Fried Garlic Topping", price: 0.50 }
    ]
  },
  {
    id: "chinese-3",
    name: "Kung Pao Chicken & Cashews",
    category: "chinese",
    restaurantId: "rest-4",
    restaurantName: "Golden Dragon Wok",
    price: 13.99,
    originalPrice: 16.50,
    rating: 4.8,
    ratingCount: 310,
    isVeg: false,
    prepTime: "20-25 min",
    calories: "720 kcal",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=700&q=80",
    description: "Diced chicken breast stir-fried with Sichuan peppercorns, dried red chilies, roasted crunchy cashews, and scallions.",
    ingredients: ["Chicken Breast", "Roasted Cashews", "Sichuan Peppers", "Soy Glaze", "Scallions"],
    bestseller: false,
    sizes: [
      { name: "Standard Portion", priceOffset: 0 },
      { name: "With Steamed Jasmine Rice", priceOffset: 2.50 }
    ],
    addOns: [
      { name: "Spring Rolls (2 pcs)", price: 2.50 }
    ]
  },
  {
    id: "chinese-4",
    name: "Steamed Dim Sum Dumpling Basket (6 pcs)",
    category: "chinese",
    restaurantId: "rest-4",
    restaurantName: "Golden Dragon Wok",
    price: 8.99,
    originalPrice: 10.50,
    rating: 4.9,
    ratingCount: 275,
    isVeg: true,
    prepTime: "15-20 min",
    calories: "340 kcal",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=700&q=80",
    description: "Handmade translucent parcels stuffed with minced water chestnuts, shiitake mushrooms, and fresh herbs served with chili dip.",
    ingredients: ["Shiitake Mushrooms", "Water Chestnuts", "Scallions", "Chili Garlic Dip"],
    bestseller: false,
    sizes: [
      { name: "6 Pieces", priceOffset: 0 },
      { name: "12 Pieces", priceOffset: 6.50 }
    ],
    addOns: [
      { name: "Chili Oil Crisp", price: 0.75 }
    ]
  },

  // --- SOUTH INDIAN ---
  {
    id: "south-1",
    name: "Crispy Mysore Masala Dosa",
    category: "south-indian",
    restaurantId: "rest-5",
    restaurantName: "Sri Udupi Grand Pure Veg",
    price: 8.49,
    originalPrice: 10.00,
    rating: 4.9,
    ratingCount: 810,
    isVeg: true,
    prepTime: "12-15 min",
    calories: "460 kcal",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80",
    description: "Golden crispy fermented crepe spread with spicy Mysore red garlic chutney, filled with spiced potato mash, served with sambar and fresh chutneys.",
    ingredients: ["Fermented Rice & Urad Dal Batter", "Mysore Red Chutney", "Spiced Potato Mash", "Pure Ghee", "Sambar & Chutneys"],
    bestseller: true,
    sizes: [
      { name: "Single Dosa", priceOffset: 0 },
      { name: "Jumbo Special Dosa", priceOffset: 2.00 }
    ],
    addOns: [
      { name: "Extra Ghee Roast", price: 0.99 },
      { name: "Gunjur Podi Gunpowder", price: 0.75 },
      { name: "Extra Sambar Bowl", price: 0.50 }
    ]
  },
  {
    id: "south-2",
    name: "Steamed Button Idli & Crispy Medu Vada Combo",
    category: "south-indian",
    restaurantId: "rest-5",
    restaurantName: "Sri Udupi Grand Pure Veg",
    price: 7.49,
    originalPrice: 8.99,
    rating: 4.8,
    ratingCount: 520,
    isVeg: true,
    prepTime: "10-15 min",
    calories: "380 kcal",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80",
    description: "3 cloud-fluffy steamed rice cakes and 2 crunchy lentil fritters served swimming in piping hot aromatic drumstick sambar.",
    ingredients: ["Steamed Rice Idlis", "Crispy Urad Dal Vada", "Coconut Chutney", "Tomato Chutney", "Lentil Sambar"],
    bestseller: true,
    sizes: [
      { name: "Combo Pack (3 Idlis + 2 Vadas)", priceOffset: 0 }
    ],
    addOns: [
      { name: "Extra Medu Vada (2 pcs)", price: 2.50 }
    ]
  },
  {
    id: "south-3",
    name: "South Indian Ghee Podi Thatte Idli",
    category: "south-indian",
    restaurantId: "rest-5",
    restaurantName: "Sri Udupi Grand Pure Veg",
    price: 6.99,
    originalPrice: 8.50,
    rating: 4.8,
    ratingCount: 340,
    isVeg: true,
    prepTime: "10-12 min",
    calories: "410 kcal",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=700&q=80",
    description: "Giant thick soft plate idli soaked generously with melted organic desi ghee and fiery roasted gun powder podi masala.",
    ingredients: ["Thick Plate Idli", "Desi Cow Ghee", "Spiced Podi Masala", "Mint & Coconut Chutney"],
    bestseller: false,
    sizes: [
      { name: "2 Big Idlis", priceOffset: 0 }
    ],
    addOns: [
      { name: "Extra Ghee Pour", price: 0.80 }
    ]
  },
  {
    id: "south-4",
    name: "Authentic Malabar Parotta & Veg Kurma",
    category: "south-indian",
    restaurantId: "rest-5",
    restaurantName: "Sri Udupi Grand Pure Veg",
    price: 9.49,
    originalPrice: 11.00,
    rating: 4.7,
    ratingCount: 260,
    isVeg: true,
    prepTime: "15-20 min",
    calories: "620 kcal",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80",
    description: "Flaky, layered golden Kerala parottas paired with rich coconut milk curry simmered with vegetables and crushed spices.",
    ingredients: ["Flaky Layered Parottas", "Coconut Milk Kurma", "Green Peas & Potatoes", "Fennel & Curry Leaves"],
    bestseller: false,
    sizes: [
      { name: "2 Parottas + Kurma", priceOffset: 0 },
      { name: "3 Parottas + Large Kurma", priceOffset: 2.50 }
    ],
    addOns: [
      { name: "Extra Parotta (1 pc)", price: 1.25 }
    ]
  },

  // --- NORTH INDIAN ---
  {
    id: "north-1",
    name: "Paneer Butter Masala & Butter Naan Combo",
    category: "north-indian",
    restaurantId: "rest-6",
    restaurantName: "Punjab Heritage Dhaba",
    price: 13.99,
    originalPrice: 16.50,
    rating: 4.9,
    ratingCount: 940,
    isVeg: true,
    prepTime: "20-25 min",
    calories: "820 kcal",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80",
    description: "Velvety smooth rich tomato cashew gravy with melt-in-mouth cottage cheese cubes, served with 2 freshly baked tandoori butter naans.",
    ingredients: ["Fresh Cottage Cheese", "Cashew Tomato Gravy", "Kasuri Methi", "Fresh Cream", "Tandoori Butter Naan"],
    bestseller: true,
    sizes: [
      { name: "Combo (Curry + 2 Naans)", priceOffset: 0 },
      { name: "Large Curry + 4 Naans", priceOffset: 6.50 }
    ],
    addOns: [
      { name: "Garlic Naan Upgrade", price: 1.00 },
      { name: "Jeera Rice Bowl", price: 2.50 }
    ]
  },
  {
    id: "north-2",
    name: "Dhaba Style Dal Makhani Slow-Cooked",
    category: "north-indian",
    restaurantId: "rest-6",
    restaurantName: "Punjab Heritage Dhaba",
    price: 11.49,
    originalPrice: 13.99,
    rating: 4.8,
    ratingCount: 670,
    isVeg: true,
    prepTime: "18-22 min",
    calories: "640 kcal",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80",
    description: "Whole black lentils and kidney beans simmered overnight over slow charcoal flame with churned butter and fresh cream.",
    ingredients: ["Black Urad Dal", "Rajma", "White Butter", "Rich Cream", "Ginger Juliennes"],
    bestseller: true,
    sizes: [
      { name: "Standard Bowl (400ml)", priceOffset: 0 },
      { name: "Family Handi (800ml)", priceOffset: 5.50 }
    ],
    addOns: [
      { name: "Lachha Paratha (2 pcs)", price: 2.20 },
      { name: "Tandoori Roti (2 pcs)", price: 1.50 }
    ]
  },
  {
    id: "north-3",
    name: "Murgh Butter Chicken Classic",
    category: "north-indian",
    restaurantId: "rest-6",
    restaurantName: "Punjab Heritage Dhaba",
    price: 15.49,
    originalPrice: 18.00,
    rating: 4.9,
    ratingCount: 880,
    isVeg: false,
    prepTime: "20-25 min",
    calories: "890 kcal",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80",
    description: "Tender boneless chicken roasted in clay oven and simmered in buttery, mildly spiced makhani gravy infused with aromatic fenugreek.",
    ingredients: ["Clay Oven Roasted Chicken", "Tomato Cashew Sauce", "Butter & Cream", "Kasuri Methi"],
    bestseller: true,
    sizes: [
      { name: "Regular Portion", priceOffset: 0 },
      { name: "Large Portion", priceOffset: 5.00 }
    ],
    addOns: [
      { name: "Garlic Butter Naan (2 pcs)", price: 2.50 },
      { name: "Basmati Pilaf", price: 2.50 }
    ]
  },
  {
    id: "north-4",
    name: "Amritsari Kulcha with Chole",
    category: "north-indian",
    restaurantId: "rest-6",
    restaurantName: "Punjab Heritage Dhaba",
    price: 10.99,
    originalPrice: 12.99,
    rating: 4.7,
    ratingCount: 390,
    isVeg: true,
    prepTime: "15-20 min",
    calories: "710 kcal",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
    description: "Crispy tandoori kulcha stuffed with spiced potato and pomegranate seeds, served with tangy dark chickpea curry and pickled onions.",
    ingredients: ["Crispy Stuffed Kulcha", "Amritsari Chole", "Pickled Onions", "Tamarind Chutney"],
    bestseller: false,
    sizes: [
      { name: "2 Stuffed Kulchas + Chole", priceOffset: 0 }
    ],
    addOns: [
      { name: "Sweet Lassi (300ml)", price: 2.00 }
    ]
  },

  // --- DESSERTS ---
  {
    id: "dessert-1",
    name: "Warm Molten Belgian Chocolate Lava Cake",
    category: "desserts",
    restaurantId: "rest-7",
    restaurantName: "Sweet Tooth Patisserie",
    price: 7.99,
    originalPrice: 9.50,
    rating: 4.9,
    ratingCount: 650,
    isVeg: true,
    prepTime: "10-15 min",
    calories: "510 kcal",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",
    description: "Decadent dark Belgian chocolate sponge cake with a rich oozing chocolate center, served with Madagascar vanilla ice cream.",
    ingredients: ["70% Belgian Dark Chocolate", "Madagascar Vanilla Ice Cream", "Cocoa Dust", "Butter"],
    bestseller: true,
    sizes: [
      { name: "Single Cake with Scoop", priceOffset: 0 },
      { name: "Double Lava Cake Duo", priceOffset: 5.50 }
    ],
    addOns: [
      { name: "Extra Vanilla Scoop", price: 1.50 },
      { name: "Warm Salted Caramel Drizzle", price: 0.75 }
    ]
  },
  {
    id: "dessert-2",
    name: "Nutella & Fresh Strawberry Belgian Waffle",
    category: "desserts",
    restaurantId: "rest-7",
    restaurantName: "Sweet Tooth Patisserie",
    price: 8.49,
    originalPrice: 10.00,
    rating: 4.8,
    ratingCount: 410,
    isVeg: true,
    prepTime: "12-15 min",
    calories: "580 kcal",
    image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=700&q=80",
    description: "Crispy on the outside, fluffy inside Brussels waffle generously lathered with Nutella spread, sliced fresh strawberries, and icing sugar.",
    ingredients: ["Crispy Belgian Waffle", "Nutella Hazelnut Spread", "Fresh Farm Strawberries", "Whipped Cream"],
    bestseller: true,
    sizes: [
      { name: "Single Waffle", priceOffset: 0 },
      { name: "Double Stack Waffle", priceOffset: 4.00 }
    ],
    addOns: [
      { name: "Roasted Hazelnuts", price: 0.99 },
      { name: "Extra Nutella Shot", price: 1.25 }
    ]
  },
  {
    id: "dessert-3",
    name: "Classic New York Cheesecake Slice",
    category: "desserts",
    restaurantId: "rest-7",
    restaurantName: "Sweet Tooth Patisserie",
    price: 6.99,
    originalPrice: 8.50,
    rating: 4.7,
    ratingCount: 330,
    isVeg: true,
    prepTime: "5-10 min",
    calories: "450 kcal",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80",
    description: "Creamy baked Philadelphia cream cheese on a buttery graham cracker crust topped with tangy raspberry coulis.",
    ingredients: ["Philadelphia Cream Cheese", "Graham Cracker Crust", "Raspberry Compote"],
    bestseller: false,
    sizes: [
      { name: "Single Slice", priceOffset: 0 },
      { name: "Two Slices Pack", priceOffset: 5.50 }
    ],
    addOns: [
      { name: "Blueberry Compote Topping", price: 1.00 }
    ]
  },
  {
    id: "dessert-4",
    name: "Warm Gulab Jamun with Rabri (2 pcs)",
    category: "desserts",
    restaurantId: "rest-6",
    restaurantName: "Punjab Heritage Dhaba",
    price: 5.99,
    originalPrice: 7.00,
    rating: 4.9,
    ratingCount: 510,
    isVeg: true,
    prepTime: "5-10 min",
    calories: "390 kcal",
    image: "https://images.unsplash.com/photo-1667312985799-8d147bb0daee?auto=format&fit=crop&w=700&q=80",
    description: "Soft golden khoya dumplings soaked in rose and saffron scented cardamom sugar syrup, topped with thick condensed milk rabri.",
    ingredients: ["Khoya Dumplings", "Saffron Sugar Syrup", "Creamy Rabri", "Pistachio Slivers"],
    bestseller: false,
    sizes: [
      { name: "2 Pieces", priceOffset: 0 },
      { name: "4 Pieces", priceOffset: 4.50 }
    ],
    addOns: [
      { name: "Extra Rabri Dip", price: 1.25 }
    ]
  },

  // --- BEVERAGES ---
  {
    id: "bev-1",
    name: "Iced Caramel Macchiato Cold Brew",
    category: "beverages",
    restaurantId: "rest-8",
    restaurantName: "Sip & Chill Beverage Lab",
    price: 5.49,
    originalPrice: 6.50,
    rating: 4.8,
    ratingCount: 460,
    isVeg: true,
    prepTime: "5-8 min",
    calories: "220 kcal",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80",
    description: "Slow-steeped 16-hour artisan cold brew layered with fresh oat milk, vanilla syrup, and rich buttery caramel drizzle.",
    ingredients: ["100% Arabica Cold Brew", "Oat Milk", "Madagascar Vanilla", "Salted Caramel"],
    bestseller: true,
    sizes: [
      { name: "Regular (350ml)", priceOffset: 0 },
      { name: "Large (500ml)", priceOffset: 1.20 }
    ],
    addOns: [
      { name: "Extra Espresso Shot", price: 1.00 },
      { name: "Whipped Cream", price: 0.60 }
    ]
  },
  {
    id: "bev-2",
    name: "Fresh Mango Passion Fruit Smoothie",
    category: "beverages",
    restaurantId: "rest-8",
    restaurantName: "Sip & Chill Beverage Lab",
    price: 5.99,
    originalPrice: 7.00,
    rating: 4.9,
    ratingCount: 380,
    isVeg: true,
    prepTime: "5-8 min",
    calories: "260 kcal",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=700&q=80",
    description: "Blend of ripe Alphonso mangoes, tropical passion fruit pulp, Greek yogurt, and a touch of organic honey.",
    ingredients: ["Alphonso Mango Pulp", "Passion Fruit", "Greek Yogurt", "Organic Honey", "Chia Seeds"],
    bestseller: true,
    sizes: [
      { name: "Regular (350ml)", priceOffset: 0 },
      { name: "Large (500ml)", priceOffset: 1.50 }
    ],
    addOns: [
      { name: "Plant Protein Boost", price: 1.50 },
      { name: "Boba Pearls", price: 0.99 }
    ]
  },
  {
    id: "bev-3",
    name: "Mint Mojito Sparkling Cooler",
    category: "beverages",
    restaurantId: "rest-8",
    restaurantName: "Sip & Chill Beverage Lab",
    price: 4.99,
    originalPrice: 6.00,
    rating: 4.7,
    ratingCount: 290,
    isVeg: true,
    prepTime: "5 min",
    calories: "140 kcal",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80",
    description: "Muddled fresh garden mint leaves, zesty lime wedges, brown sugar syrup topped with chilled sparkling club soda.",
    ingredients: ["Fresh Spearmint", "Persian Lime", "Cane Sugar", "Sparkling Club Soda", "Crushed Ice"],
    bestseller: false,
    sizes: [
      { name: "Regular (400ml)", priceOffset: 0 }
    ],
    addOns: [
      { name: "Add Blue Curacao Flavor", price: 0.50 }
    ]
  },
  {
    id: "bev-4",
    name: "Royal Saffron Almond Thandai",
    category: "beverages",
    restaurantId: "rest-6",
    restaurantName: "Punjab Heritage Dhaba",
    price: 6.49,
    originalPrice: 7.50,
    rating: 4.8,
    ratingCount: 240,
    isVeg: true,
    prepTime: "5-8 min",
    calories: "320 kcal",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=700&q=80",
    description: "Traditional chilled aromatic milk infused with ground California almonds, pistachio paste, fennel seeds, cardamom, and saffron threads.",
    ingredients: ["Full Cream Milk", "Almond & Pistachio Paste", "Fennel & Cardamom", "Kashmiri Saffron", "Rose Petals"],
    bestseller: false,
    sizes: [
      { name: "Bottle (300ml)", priceOffset: 0 }
    ],
    addOns: [
      { name: "Crushed Pistachio Extra", price: 0.75 }
    ]
  }
];
