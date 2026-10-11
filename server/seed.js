
// require("dotenv").config();

// const mongoose = require("mongoose");
// const Product = require("./models/Product");

// const PRODUCTS_PER_CATEGORY = 1000;


// const productImages = {
//   Electronics: [
//     "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
//     "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
//     "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
//     "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600",
//     "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
//     "https://images.unsplash.com/photo-1609592806596-b43bada4f4b0?w=600",
//   ],

//   Fashion: [
//     "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
//     "https://images.unsplash.com/photo- shirt-placeholder?w=600",
//     "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
//     "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
//     "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
//   ],

//   Accessories: [
//     "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
//     "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600",
//     "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
//     "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
//   ],

//   Sports: [
//     "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600",
//     "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600",
//     "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600",
//     "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600",
//   ],
// };


// const categories = [
//   {
//     name: "Electronics",
//     brands: ["TechNova", "SoundPro", "GadgetHub", "DigitalPeak"],
//     items: [
//       "Wireless Headphones",
//       "Smart Watch",
//       "Bluetooth Speaker",
//       "Wireless Mouse",
//       "Mechanical Keyboard",
//       "USB-C Hub",
//       "Power Bank",
//       "Webcam",
//       "Gaming Controller",
//       "Portable Monitor",
//     ],
//     minPrice: 499,
//     maxPrice: 12999,
//   },
//   {
//     name: "Fashion",
//     brands: ["UrbanWear", "StyleCraft", "EverydayCo", "TrendLine"],
//     items: [
//       "Classic T-Shirt",
//       "Casual Shirt",
//       "Running Shoes",
//       "Denim Jeans",
//       "Cotton Hoodie",
//       "Summer Dress",
//       "Sports Jacket",
//       "Casual Sneakers",
//       "Formal Trousers",
//       "Cotton Polo",
//     ],
//     minPrice: 299,
//     maxPrice: 5999,
//   },
//   {
//     name: "Accessories",
//     brands: ["TravelMate", "UrbanGear", "DailyStyle", "CarryPro"],
//     items: [
//       "Travel Backpack",
//       "Leather Wallet",
//       "Laptop Sleeve",
//       "Sunglasses",
//       "Wrist Watch",
//       "Travel Pouch",
//       "Keychain",
//       "Card Holder",
//       "Laptop Bag",
//       "Water Bottle",
//     ],
//     minPrice: 149,
//     maxPrice: 3999,
//   },
//   {
//     name: "Sports",
//     brands: ["ActiveZone", "FitForce", "SportEdge", "PowerPlay"],
//     items: [
//       "Yoga Mat",
//       "Cricket Bat",
//       "Football",
//       "Badminton Racket",
//       "Skipping Rope",
//       "Resistance Bands",
//       "Gym Gloves",
//       "Fitness Dumbbells",
//       "Sports Water Bottle",
//       "Training Cones",
//     ],
//     minPrice: 199,
//     maxPrice: 4999,
//   },
// ];

// function createDemoProduct(category, categoryIndex, index) {
//   const number = String(index + 1).padStart(4, "0");
//   const item = category.items[index % category.items.length];
//   const brand =
//     category.brands[index % category.brands.length];

//   const priceRange = category.maxPrice - category.minPrice;
//   const price =
//     category.minPrice +
//     ((index * 137 + categoryIndex * 251) % (priceRange + 1));

//   return {
//     name: `DEMO-${category.name.toUpperCase()}-${number} - ${item}`,
//     description:
//       `DEMO PRODUCT — generated for ShopEase development and testing. ` +
//       `This is not a verified real-world listing. ` +
//       `Category: ${category.name}. Demo item number: ${number}.`,
//     price,
//     category: category.name,
//     image:
//       "https://placehold.co/600x400/png?text=" +
//       encodeURIComponent(`${category.name} Demo ${number}`),
//     stock: 5 + ((index * 7 + categoryIndex) % 96),
//     brand,
//     rating: 0,
//     numReviews: 0,
//     isFeatured: index < 8,
//   };
// }

// async function seedProducts() {
//   try {
//     if (!process.env.MONGO_URI) {
//       throw new Error(
//         "MONGO_URI is missing from server/.env"
//       );
//     }

//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("Connected to MongoDB.");

//     let total = 0;

//     for (
//       let categoryIndex = 0;
//       categoryIndex < categories.length;
//       categoryIndex++
//     ) {
//       const category = categories[categoryIndex];

//       const products = Array.from(
//         { length: PRODUCTS_PER_CATEGORY },
//         (_, index) =>
//           createDemoProduct(category, categoryIndex, index)
//       );

//       const operations = products.map((product) => ({
//         updateOne: {
//           filter: { name: product.name },
//           update: { $set: product },
//           upsert: true,
//         },
//       }));

//       const result = await Product.bulkWrite(operations, {
//         ordered: true,
//       });

//       const count = await Product.countDocuments({
//         category: category.name,
//         name: {
//           $regex: `^DEMO-${category.name.toUpperCase()}-\\d{4} - `,
//         },
//       });

//       console.log(
//         `${category.name}: ${count} demo products ` +
//         `(inserted: ${result.upsertedCount}, updated: ${result.modifiedCount})`
//       );

//       if (count !== PRODUCTS_PER_CATEGORY) {
//         throw new Error(
//           `${category.name}: expected ${PRODUCTS_PER_CATEGORY}, found ${count}`
//         );
//       }

//       total += count;
//     }

//     console.log("-----------------------------------");
//     console.log(`Total generated demo products: ${total}`);
//     console.log("ShopEase product seeding completed.");
//   } catch (error) {
//     console.error("Seeding failed:", error.message);
//     process.exitCode = 1;
//   } finally {
//     if (mongoose.connection.readyState !== 0) {
//       await mongoose.disconnect();
//     }
//   }
// }

// seedProducts();



require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

const PRODUCTS_PER_CATEGORY = 1000;

const categories = [
  {
    name: "Electronics",
    brands: ["TechNova", "SoundPro", "GadgetHub", "DigitalPeak"],
    items: [
      "Wireless Headphones",
      "Smart Watch",
      "Bluetooth Speaker",
      "Wireless Mouse",
      "Mechanical Keyboard",
      "USB-C Hub",
      "Power Bank",
      "Webcam",
      "Gaming Controller",
      "Portable Monitor",
    ],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
    ],
    minPrice: 499,
    maxPrice: 12999,
  },
  {
    name: "Fashion",
    brands: ["UrbanWear", "StyleCraft", "EverydayCo", "TrendLine"],
    items: [
      "Classic T-Shirt",
      "Casual Shirt",
      "Running Shoes",
      "Denim Jeans",
      "Cotton Hoodie",
      "Summer Dress",
      "Sports Jacket",
      "Casual Sneakers",
      "Formal Trousers",
      "Cotton Polo",
    ],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
    ],
    minPrice: 299,
    maxPrice: 5999,
  },
  {
    name: "Accessories",
    brands: ["TravelMate", "UrbanGear", "DailyStyle", "CarryPro"],
    items: [
      "Travel Backpack",
      "Leather Wallet",
      "Laptop Sleeve",
      "Sunglasses",
      "Wrist Watch",
      "Travel Pouch",
      "Keychain",
      "Card Holder",
      "Laptop Bag",
      "Water Bottle",
    ],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
    ],
    minPrice: 149,
    maxPrice: 3999,
  },
  {
    name: "Sports",
    brands: ["ActiveZone", "FitForce", "SportEdge", "PowerPlay"],
    items: [
      "Yoga Mat",
      "Cricket Bat",
      "Football",
      "Badminton Racket",
      "Skipping Rope",
      "Resistance Bands",
      "Gym Gloves",
      "Fitness Dumbbells",
      "Sports Water Bottle",
      "Training Cones",
    ],
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600",
    ],
    minPrice: 199,
    maxPrice: 4999,
  },
];

function createProduct(category, categoryIndex, index) {
  const number = String(index + 1).padStart(4, "0");
  const item = category.items[index % category.items.length];
  const brand = category.brands[index % category.brands.length];

  const priceRange = category.maxPrice - category.minPrice;
  const price =
    category.minPrice +
    ((index * 137 + categoryIndex * 251) % (priceRange + 1));

  return {
    name: `DEMO-${category.name.toUpperCase()}-${number} - ${item}`,
    description:
      `DEMO PRODUCT: ${item}. This generated product is for ` +
      `ShopEase development and testing. It is not a verified real listing.`,
    price,
    category: category.name,
    image: category.images[index % category.images.length],
    stock: 5 + ((index * 7 + categoryIndex) % 96),
    brand,
    rating: 0,
    numReviews: 0,
    isFeatured: index < 8,
  };
}

async function seedProducts() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from server/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    let total = 0;

    for (let c = 0; c < categories.length; c++) {
      const category = categories[c];

      const products = Array.from(
        { length: PRODUCTS_PER_CATEGORY },
        (_, index) => createProduct(category, c, index)
      );

      const operations = products.map((product) => ({
        updateOne: {
          filter: { name: product.name },
          update: { $set: product },
          upsert: true,
        },
      }));

      const result = await Product.bulkWrite(operations, {
        ordered: true,
      });

      const count = await Product.countDocuments({
        category: category.name,
        name: {
          $regex: `^DEMO-${category.name.toUpperCase()}-\\d{4} - `,
        },
      });

      console.log(
        `${category.name}: ${count} products | ` +
        `${result.upsertedCount} inserted | ` +
        `${result.modifiedCount} updated`
      );

      if (count !== PRODUCTS_PER_CATEGORY) {
        throw new Error(
          `${category.name}: expected 1000 products, found ${count}`
        );
      }

      total += count;
    }

    console.log("--------------------------------");
    console.log(`Total demo products: ${total}`);
    console.log("ShopEase seeding completed successfully.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

seedProducts();
