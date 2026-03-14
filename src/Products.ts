// Products.ts - Ocean Pearl Database Structure

// Products.ts
export interface MenuItem {
    id: number;
    name: string;
    price: number; // تم التغيير هنا
    description: string;
    image: string;
    highlight?: string; // ميزة خاصة مثل "Chef's Special"
    detailedIngredients: string[];
}

export interface MenuCategory {
    categoryName: string;
    categoryIcon: string;
    categoryImage: string;
    categoryTagline: string;
    image3d: string;
    image3d2: string;
    items: MenuItem[]; 
}

export const menuData: MenuCategory[] = [
  {
    categoryName: "Oceanic Preludes", 
    categoryIcon: "fa-solid fa-water", // أيقونة الأمواج للفواتح البحرية
    categoryImage: "/category/Oceanic-Preludes.png", 
    categoryTagline: "Artisanal beginnings crafted to awaken your senses.",
    image3d: "/category/Oceanic-Preludes-3d1.png",
    image3d2: "/category/Oceanic-Preludes-3d2.png",
 items: [
        { 
            id: 101, 
            name: "Golden Oyster", 
            price: 45, 
            description: "Fresh Atlantic oyster topped with 24k gold leaf and citrus zest.", 
            image: "/productss/Golden-Oyster.png", 
            highlight: "24K Gold",
            detailedIngredients: ["Premium Atlantic Blue Point Oyster", "24K Pure Edible Gold Leaf", "Yuzu Citrus Zest", "Mignonette Pearl Spheres", "Fresh Shallot Infusion"]
        },
        { 
            id: 102, 
            name: "Pearl Scallops", 
            price: 38, 
            description: "Hokkaido scallops seared in truffle butter with pea purée.", 
            image: "/productss/Pearl-Scallops.png", 
            highlight: "Truffle Infused",
            detailedIngredients: ["Jumbo Hokkaido Sea Scallops", "Black Winter Truffle Butter", "Sweet Garden Pea Purée", "Crispy Pancetta Dust", "Micro-Basil Garnish"]
        },
        { 
            id: 103, 
            name: "Seafoam Soup", 
            price: 29, 
            description: "Light lobster bisque with a champagne foam topping.", 
            image: "/productss/Seafoam-Soup.png",
            detailedIngredients: ["Slow-simmered Lobster Essence", "Vintage Champagne Foam", "Cognac Infused Cream", "Poached Claw Medallions", "Chive Oil Droplets"]
        },
        { 
            id: 104, 
            name: "Coral Tartare", 
            price: 42, 
            description: "Bluefin tuna with avocado mousse and squid ink crackers.", 
            image: "/productss/Coral-Tartare.png",
            detailedIngredients: ["Line-caught Bluefin Tuna", "Whipped Hass Avocado Mousse", "Handmade Squid Ink Tuiles", "Pickled Radish Petals", "Organic Sesame Emulsion"]
        },
        { 
            id: 105, 
            name: "Amber Shrimp", 
            price: 35, 
            description: "Jumbo shrimp marinated in saffron and honey glaze.", 
            image: "/productss/Amber-Shrimp.png",
            detailedIngredients: ["Wild Jumbo Tiger Shrimp", "Grade-A Spanish Saffron", "Artisanal Wildflower Honey", "Smoked Paprika Hint", "Roasted Garlic Confit"]
        },
        { 
            id: 106, 
            name: "Ocean Velouté", 
            price: 32, 
            description: "Creamy seafood reduction with wild herbs.", 
            image: "/productss/Ocean-Veloute.png",
            detailedIngredients: ["Reduced Shellfish Consommé", "Crème Fraîche Swirl", "Foraged Wild Sea Herbs", "Lemon Verbena Infusion", "Artisan Brioche Crumb"]
        }
    ]
  },
  {
    categoryName: "The Raw Collection", 
    categoryIcon: "fa-solid fa-fish-fins", // أيقونة سمكة احترافية للنيء
    categoryImage: "/category/The-Raw-Collection11.png", 
    categoryTagline: "The purest essence of the ocean.", 
     image3d: "/category/The-Raw-Collection-3d1.png",
      image3d2: "/category/The-Raw-Collection-3d2.png",
  items: [
        { 
            id: 301, 
            name: "Royal Dragon", 
            price: 55, 
            description: "Wagyu beef and tempura shrimp topped with eel sauce.", 
            image: "/productss/Royal-Dragon.png", 
            highlight: "Wagyu A5",
            detailedIngredients: ["A5 Grade Japanese Wagyu", "Crispy Tiger Prawn Tempura", "Hand-picked Vinegared Rice", "House-made Kabayaki Eel Glaze", "Micro-chives & Sesame."]
        },
        { 
            id: 302, 
            name: "Midnight Pearl", 
            price: 48, 
            description: "Black rice sushi with spicy salmon and gold dust.", 
            image: "/productss/Midnight-Pearl.png", 
            highlight: "Black Rice",
            detailedIngredients: ["Forbidden Organic Black Rice", "Atlantic Sockeye Salmon", "Artisanal Spicy Mayo", "24K Edible Gold Dust", "Thinly Sliced Persian Cucumber."]
        },
        { 
            id: 303, 
            name: "Ocean Bloom", 
            price: 42, 
            description: "Cucumber wrapped rolls with yellowtail and jalapeño.", 
            image: "/productss/Ocean-Bloom.png",
            detailedIngredients: ["Japanese Hamachi (Yellowtail)", "Paper-thin English Cucumber Wrap", "Fresh Jalapeño Slices", "Yuzu Ponzu Dipping Sauce", "Cilantro Micro-greens."]
        },
        { 
            id: 304, 
            name: "Diamond Nigiri", 
            price: 60, 
            description: "Fatty tuna belly with a touch of fresh wasabi.", 
            image: "/productss/Diamond-Nigiri.png",
            detailedIngredients: ["Prime Bluefin Otoro (Fatty Belly)", "Traditional Shari Rice", "Real Grated Wasabi Root", "Aged Tamari Soy Sauce Brush", "Sea-salt Crystal Finish."]
        },
        { 
            id: 305, 
            name: "Volcano Pearl", 
            price: 45, 
            description: "Baked scallop and crab mix over a California roll.", 
            image: "/productss/Volcano-Pearl.png",
            detailedIngredients: ["Diver-caught Hokkaido Scallops", "Snow Crab Leg Meat", "Classic California Base", "Torched Sriracha Aioli", "Crispy Panko & Masago."]
        },
        { 
            id: 306, 
            name: "Truffle Maki", 
            price: 52, 
            description: "Creamy salmon with white truffle oil.", 
            image: "/productss/Truffle-Maki.png",
            detailedIngredients: ["Ora King Salmon Fillet", "Premium White Truffle Oil", "Japanese Cream Cheese", "Toasted Nori Seaweed", "Shaved Black Truffle Accents."]
        }
    ]
  },
  {
    categoryName: "Signature Pearl Rolls", 
    categoryIcon: "fa-solid fa-shrimp", // أيqونة الروبيان/السوشي
    categoryImage: "/category/Signature-Pearl-Rolls.png", 
    categoryTagline: "A symphony of tradition and modern culinary rebellion.",
     image3d: "/category/Signature-Pearl-Rolls-3d1.png", 
      image3d2: "/category/Signature-Pearl-Rolls-3d2.png",
    items: [
{ 
            id: 301, 
            name: "Golden Dragon Roll", 
            price: 52, 
            description: "Tempura shrimp and cucumber topped with seared unagi and gold flakes.", 
            image: "/productss/Golden-Dragon-Roll.png", 
            highlight: "Chef's Special",
            detailedIngredients: ["Jumbo Tiger Shrimp Tempura", "Fresh English Cucumber", "Prime Seared Freshwater Unagi", "24K Edible Gold Flakes", "Aged Sweet Soy Reduction"]
        },
        { 
            id: 302, 
            name: "Truffle Lobster Roll", 
            price: 58, 
            description: "Poached lobster, avocado, and black truffle aioli wrapped in soy paper.", 
            image: "/productss/Truffle-Lobster-Roll.png", 
            highlight: "Rare Catch",
            detailedIngredients: ["Butter-poached Maine Lobster", "Creamy Hass Avocado", "Black Winter Truffle Aioli", "Delicate Mamenori Soy Paper", "Shaved Autumn Truffles"]
        },
        { 
            id: 303, 
            name: "Sunset Serenity", 
            price: 44, 
            description: "Spicy tuna with mango salsa and a drizzle of hibiscus reduction.", 
            image: "/productss/Sunset-Serenity.png",
            detailedIngredients: ["Premium Spicy Bluefin Tuna", "Fresh Alphonso Mango Salsa", "Artisanal Hibiscus Flower Reduction", "Organic Micro-cilantro", "Spiced Tempura Crunch"]
        },
        { 
            id: 304, 
            name: "Imperial Wagyu Roll", 
            price: 65, 
            description: "A5 Wagyu beef, asparagus, and crispy shallots with balsamic pearls.", 
            image: "/productss/Imperial-Wagyu-Roll.png", 
            highlight: "A5 Wagyu",
            detailedIngredients: ["Torched A5 Miyazaki Wagyu", "Tender Grilled Asparagus", "Crispy Golden Shallots", "Molecular Balsamic Vinegar Pearls", "Truffle-infused Shoyu"]
        },
        { 
            id: 305, 
            name: "Emerald Sea Roll", 
            price: 38, 
            description: "Yellowtail, cilantro, and jalapeño with a refreshing lime-wasabi dressing.", 
            image: "/productss/Emerald-Sea-Roll.png",
            detailedIngredients: ["Sashimi-grade Hamachi", "Fresh Cilantro Leaves", "Sliced Serrano Jalapeño", "Zesty Lime-Wasabi Vinaigrette", "Thin Radish Sprouts"]
        },
        { 
            id: 306, 
            name: "Pearl Velvet Roll", 
            price: 46, 
            description: "Creamy scallops and snow crab topped with a touch of beluga caviar.", 
            image: "/productss/Pearl-Velvet-Roll.png", 
            highlight: "Caviar Topping",
            detailedIngredients: ["Hokkaido Scallop Medallions", "Alaskan Snow Crab Meat", "Spiced Japanese Mayo", "Premium Beluga Caviar", "Hand-harvested Seaweed"]
        }
    ]
  },
  {
    categoryName: "Imperial Main Courses", 
    categoryIcon: "fa-solid fa-crown", // أيقونة التاج للأطباق الإمبراطورية
    categoryImage: "/category/Imperial-Main-Courses.png", 
    categoryTagline: "Where fire meets the sea to create legendary masterpieces.", 
     image3d: "/category/Imperial-Main-Courses-3d1.png",
      image3d2: "/category/Imperial-Main-Courses-3d2.png",
  items: [
        { 
            id: 401, 
            name: "Miso Glazed Black Cod", 
            price: 72, 
            description: "24-hour marinated black cod served with bok choy and ginger foam.", 
            image: "/productss/Miso-Glazed-Black-Cod.png", 
            highlight: "Most Loved",
            detailedIngredients: ["Wild-caught Alaskan Black Cod", "White Miso Umami Glaze", "Aged Mirin Reduction", "Organic Baby Bok Choy", "Molecular Ginger Cloud"]
        },
        { 
            id: 402, 
            name: "Ocean King Platter", 
            price: 120, 
            description: "A royal selection of grilled lobster, king crab legs, and tiger prawns.", 
            image: "/productss/Ocean-King-Platter.png", 
            highlight: "Signature Shareable",
            detailedIngredients: ["Butter-poached Atlantic Lobster Tail", "Red King Crab Legs", "Jumbo Madagascar Prawns", "Clarified Garlic Herb Butter", "Hand-harvested Sea Salt Crystals"]
        },
        { 
            id: 403, 
            name: "Saffron Sea Bass", 
            price: 68, 
            description: "Pan-seared sea bass over a bed of saffron risotto and sea asparagus.", 
            image: "/productss/Saffron-Sea-Bass.png",
            detailedIngredients: ["Chilean Sea Bass Fillet", "Iranian Grade-A Saffron", "Acquerello Risotto Rice", "Crispy Sea Asparagus", "Edible Gold Dusting"]
        },
        { 
            id: 404, 
            name: "Braised Octopus Tentacles", 
            price: 55, 
            description: "Slow-cooked octopus with smoked paprika and charcoal-grilled potatoes.", 
            image: "/productss/Braised-Octopus-Tentacles.png",
            detailedIngredients: ["Mediterranean Tenderized Octopus", "De La Vera Smoked Paprika", "Confit Fingerling Potatoes", "Black Garlic Emulsion", "Extra Virgin Arbequina Oil"]
        },
        { 
            id: 405, 
            name: "Truffle Crusted Salmon", 
            price: 59, 
            description: "Wild caught salmon with a crust of black truffles and microgreens.", 
            image: "/productss/Truffle-Crusted-Salmon.png",
            detailedIngredients: ["Sashimi-grade King Salmon", "Shaved Black Perigord Truffles", "Artisanal Herb Crust", "Citrus-infused Microgreens", "Champagne Beurre Blanc"]
        },
        { 
            id: 406, 
            name: "Imperial Bluefin Toro", 
            price: 85, 
            description: "Prime fatty tuna belly aged for 14 days, served with a sea-salt whiskey shoyu glaze.", 
            image: "/productss/Imperial-Bluefin-Toro.png", 
            highlight: "Dry Aged",
            detailedIngredients: ["Hon-Maguro Bluefin Otoro", "14-Day Dry Aging Process", "Suntory Whiskey Shoyu Glaze", "Freshly Grated Shizuoka Wasabi", "Kala Namak Volcanic Salt"]
        }
    ]
  },
  {
    categoryName: "Liquid Jewels", 
    categoryIcon: "fa-solid fa-gem", // أيقونة الجوهرة للشوربات والذهب السائل
    categoryImage: "/category/Liquid-Jewels.png", 
    categoryTagline: "Concentrated gold and ocean nectar, simmered to perfection.",
     image3d: "/category/Liquid-Jewels-3d2.png", 
      image3d2: "/category/Liquid-Jewels-3d1.png",
items: [
        { 
            id: 501, 
            name: "Golden Bouillabaisse", 
            price: 42, 
            description: "Traditional Provencal fish stew infused with premium saffron threads.", 
            image: "/productss/Golden-Bouillabaisse.png", 
            highlight: "Saffron Infused",
            detailedIngredients: ["Wild Mediterranean Sea Bass", "Grade-AAA Saffron Threads", "Reduced Fennel & Tomato Base", "Hand-peeled Garlic Confit", "Artisanal Rouille Crouton"]
        },
        { 
            id: 502, 
            name: "White Truffle Chowder", 
            price: 35, 
            description: "Velvety clam chowder drizzled with white truffle oil and chives.", 
            image: "/productss/White-Truffle-Chowder.png",
            detailedIngredients: ["Chopped Littleneck Clams", "Double-creamed Potato Base", "White Alba Truffle Oil", "Fresh Organic Chives", "Smoked Sea Salt"]
        },
        { 
            id: 503, 
            name: "Miso Umami Gold", 
            price: 28, 
            description: "Aged miso soup with silken tofu, shiitake, and edible gold flakes.", 
            image: "/productss/Miso-Umami-Gold.png",
            detailedIngredients: ["24-Month Aged Red Miso", "Organic Silken Tofu Cubes", "Sautéed Shiitake Mushrooms", "24K Edible Gold Flakes", "Hand-cut Scallion Rings"]
        },
        { 
            id: 504, 
            name: "Spicy Lobster Nectar", 
            price: 39, 
            description: "Intense lobster reduction with a hint of Thai lemongrass and chili.", 
            image: "/productss/Spicy-Lobster-Nectar.png", 
            highlight: "Chef's Choice",
            detailedIngredients: ["8-Hour Lobster Shell Reduction", "Fresh Thai Lemongrass Infusion", "Bird's Eye Chili Oil", "Coconut Cream Swirl", "Galangal Root Accents"]
        },
        { 
            id: 505, 
            name: "Clear Ocean Consommé", 
            price: 25, 
            description: "Crystal clear seafood broth with hand-carved vegetable jewels.", 
            image: "/productss/Clear-Ocean-Consomme.png",
            detailedIngredients: ["Triple-clarified Seafood Broth", "Hand-carved Root Vegetables", "Fresh Tarragon Sprigs", "Transparent Kelp Noodles", "Micro-Flower Garnish"]
        },
        { 
            id: 506, 
            name: "Creamy Crab Essence", 
            price: 34, 
            description: "A rich, silky bisque made from roasted king crab shells.", 
            image: "/productss/Creamy-Crab-Essence.png",
            detailedIngredients: ["Roasted Red King Crab Shells", "VSOP Cognac Flambé", "Organic Heavy Cream", "Dungeness Crab Tail Meat", "Smoked Paprika Dust"]
        }
    ]
  },
  {
    categoryName: "Sweet Tidings", 
    categoryIcon: "fa-solid fa-stroopwafel", // أيقونة حلوى راقية
    categoryImage: "/category/Sweet-Tidings.png", 
    categoryTagline: "A final touch of grace to conclude your royal voyage.", 
     image3d: "/category/Sweet-Tidings-3d1.png",
      image3d2: "/category/Sweet-Tidings-3d2.png",
items: [
        { 
            id: 601, 
            name: "The Golden Pearl", 
            price: 32, 
            description: "White chocolate sphere filled with passionfruit mousse and mango.", 
            image: "/productss/The-Golden-Pearl.png", 
            highlight: "Visual Masterpiece",
            detailedIngredients: ["Valrhona White Chocolate Shell", "Velvety Passionfruit Mousse", "Fresh Alphonso Mango Coulis", "Edible Gold Shimmer", "Madagascar Vanilla Bean Crumbs"]
        },
        { 
            id: 602, 
            name: "Matcha Moss Garden", 
            price: 28, 
            description: "Matcha cheesecake with edible soil, flowers, and yuzu gel.", 
            image: "/productss/Matcha-Moss-Garden.png",
            detailedIngredients: ["Ceremonial Grade Uji Matcha", "Whipped Hokkaido Cream Cheese", "Chocolate Shortbread 'Soil'", "Crystallized Edible Flowers", "Zesty Yuzu Infused Gel"]
        },
        { 
            id: 603, 
            name: "Molten Lava Abyss", 
            price: 30, 
            description: "Dark chocolate fondant with a salted caramel center and vanilla bean ice cream.", 
            image: "/productss/Molten-Lava-Abyss.png", 
            highlight: "Classic",
            detailedIngredients: ["70% Guanaja Dark Chocolate", "Liquid Fleur de Sel Caramel", "Tahitian Vanilla Bean Gelato", "Warm Ganache Core", "Gold-dusted Cocoa Nibs"]
        },
        { 
            id: 604, 
            name: "Ocean Breeze Tart", 
            price: 26, 
            description: "Deconstructed lemon tart with blueberry 'sea' foam.", 
            image: "/productss/Ocean-Breeze-Tart.png",
            detailedIngredients: ["Buttery Sable Breton Crust", "Meyer Lemon Curd", "Wild Blueberry Aerated Foam", "Candied Lemon Peel", "Dehydrated Meringue Shards"]
        },
        { 
            id: 605, 
            name: "Crystalized Sorbet", 
            price: 22, 
            description: "A trio of exotic fruit sorbets served in a hand-carved ice bowl.", 
            image: "/productss/Crystalized-Sorbet.png",
            detailedIngredients: ["Dragon Fruit & Lychee Sorbet", "Blood Orange Infusion", "Hand-carved Crystal Ice Bowl", "Fresh Mint Leaf Essence", "Exotic Fruit Carpaccio"]
        },
        { 
            id: 606, 
            name: "Royal Tiramisu", 
            price: 34, 
            description: "Espresso soaked savoiardi with mascarpone cream and gold leaf.", 
            image: "/productss/Royal-Tiramisu.png", 
            highlight: "Royal Edition",
            detailedIngredients: ["Arabica Cold Brew Soak", "Artisanal Ladyfinger Biscuits", "Organic Mascarpone Mousse", "Shaved Fine Dark Chocolate", "24K Venetian Gold Leaf"]
        }
    ]
  }
];