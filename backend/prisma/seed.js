require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const img = (seed) => `https://picsum.photos/seed/${seed}/640/480`;

async function main() {
//   console.log("Seeding database …");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create the default user (well-known UUID used across the API)
  await prisma.user.create({
    data: {
      id: "00000000-0000-0000-0000-000000000001",
      email: "user@example.com",
      password: "not-used",
      name: "Default User",
    },
  });
  console.log(`✅ Seeded default user`);

  const categories = await Promise.all(
    [
      {
        name: "Electronics",
        slug: "electronics",
        description: "Smartphones, laptops, cameras, and more",
        image: img("electronics"),
      },
      {
        name: "Books",
        slug: "books",
        description: "Bestsellers, fiction, non-fiction, and academic titles",
        image: img("books"),
      },
      {
        name: "Clothing",
        slug: "clothing",
        description: "Men's, women's, and kids' apparel",
        image: img("clothing"),
      },
      {
        name: "Kitchen",
        slug: "kitchen",
        description: "Cookware, appliances, and dining essentials",
        image: img("kitchen"),
      },
      {
        name: "Sports",
        slug: "sports",
        description: "Fitness equipment, outdoor gear, and sportswear",
        image: img("sports"),
      },
    ].map((c) => prisma.category.create({ data: c }))
  );

  const [electronics, books, clothing, kitchen, sports] = categories;

  const products = [
    {
      title: "ProMax Wireless Noise-Cancelling Headphones",
      slug: "promax-wireless-nc-headphones",
      description:
        "Premium over-ear headphones with 40-hour battery life, active noise cancellation, and Hi-Res Audio support. Foldable design with memory-foam cushions for all-day comfort.",
      price: 249.99,
      mrp: 349.99,
      stock: 120,
      rating: 4.5,
      reviewCount: 1842,
      isFeatured: true,
      images: [img("headphones1"), img("headphones2"), img("headphones3")],
      categoryId: electronics.id,
    },
    {
      title: 'UltraView 27" 4K IPS Monitor',
      slug: "ultraview-27-4k-monitor",
      description:
        "27-inch 4K UHD IPS display with 99% sRGB coverage, USB-C Power Delivery (65 W), built-in KVM switch, and adjustable ergonomic stand.",
      price: 399.99,
      mrp: 549.99,
      stock: 45,
      rating: 4.7,
      reviewCount: 734,
      isFeatured: true,
      images: [img("monitor1"), img("monitor2")],
      categoryId: electronics.id,
    },
    {
      title: "SwiftCharge 20000 mAh Power Bank",
      slug: "swiftcharge-20000mah-power-bank",
      description:
        "65 W fast-charging power bank with dual USB-C and USB-A ports. Charges a laptop up to 50 % in 30 minutes. Airline-approved capacity.",
      price: 49.99,
      mrp: 79.99,
      stock: 300,
      rating: 4.4,
      reviewCount: 3201,
      images: [img("powerbank1"), img("powerbank2")],
      categoryId: electronics.id,
    },
    {
      title: "TrueSound Portable Bluetooth Speaker",
      slug: "truesound-bluetooth-speaker",
      description:
        "Waterproof (IP67) portable speaker delivering 360° room-filling sound. 18-hour playtime, built-in microphone, and stereo pairing support.",
      price: 79.99,
      mrp: 119.99,
      stock: 200,
      rating: 4.3,
      reviewCount: 2105,
      images: [img("speaker1"), img("speaker2")],
      categoryId: electronics.id,
    },
    {
      title: "MechForce RGB Mechanical Keyboard",
      slug: "mechforce-rgb-mechanical-keyboard",
      description:
        "Full-size hot-swappable mechanical keyboard with per-key RGB, PBT keycaps, gasket-mount design, and programmable macros via companion app.",
      price: 89.99,
      mrp: 129.99,
      stock: 150,
      rating: 4.6,
      reviewCount: 967,
      images: [img("keyboard1"), img("keyboard2")],
      categoryId: electronics.id,
    },
    {
      title: "SmartFit Pro Fitness Tracker",
      slug: "smartfit-pro-fitness-tracker",
      description:
        "AMOLED display fitness tracker with heart rate, SpO2, sleep tracking, and GPS. 14-day battery life. Water-resistant to 50 m.",
      price: 129.99,
      mrp: 179.99,
      stock: 90,
      rating: 4.2,
      reviewCount: 1456,
      isFeatured: true,
      images: [img("tracker1"), img("tracker2")],
      categoryId: electronics.id,
    },
    {
      title: "ClearCam 4K Webcam with Ring Light",
      slug: "clearcam-4k-webcam",
      description:
        "Ultra HD webcam with built-in adjustable ring light, auto-focus, dual noise-cancelling microphones, and privacy shutter.",
      price: 69.99,
      mrp: 99.99,
      stock: 175,
      rating: 4.1,
      reviewCount: 543,
      images: [img("webcam1"), img("webcam2")],
      categoryId: electronics.id,
    },
    {
      title: "AeroGlide Wireless Ergonomic Mouse",
      slug: "aeroglide-wireless-mouse",
      description:
        "Ergonomic vertical mouse with 4800 DPI optical sensor, silent clicks, USB-C rechargeable battery (lasts 3 months), and Bluetooth 5.0 / 2.4 GHz dual mode.",
      price: 39.99,
      mrp: 59.99,
      stock: 400,
      rating: 4.5,
      reviewCount: 2387,
      images: [img("mouse1"), img("mouse2")],
      categoryId: electronics.id,
    },

    {
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      slug: "clean-code-handbook",
      description:
        "Robert C. Martin's seminal guide to writing readable, maintainable, and elegant code. A must-read for every software engineer.",
      price: 33.99,
      mrp: 44.99,
      stock: 500,
      rating: 4.7,
      reviewCount: 12450,
      isFeatured: true,
      images: [img("cleancode1")],
      categoryId: books.id,
    },
    {
      title: "Atomic Habits: Tiny Changes, Remarkable Results",
      slug: "atomic-habits",
      description:
        "James Clear's proven framework for building good habits and breaking bad ones. Over 15 million copies sold worldwide.",
      price: 16.99,
      mrp: 24.99,
      stock: 800,
      rating: 4.8,
      reviewCount: 98210,
      isFeatured: true,
      images: [img("atomichabits1")],
      categoryId: books.id,
    },
    {
      title: "The Pragmatic Programmer: 20th Anniversary Edition",
      slug: "pragmatic-programmer-20th",
      description:
        "Updated classic covering topics from personal responsibility and career development to architectural techniques for keeping code flexible and easy to adapt.",
      price: 39.99,
      mrp: 54.99,
      stock: 300,
      rating: 4.6,
      reviewCount: 4321,
      images: [img("pragprog1")],
      categoryId: books.id,
    },
    {
      title: "Designing Data-Intensive Applications",
      slug: "designing-data-intensive-apps",
      description:
        "Martin Kleppmann explores the principles and practicalities of data systems—from databases and stream processing to batch computation and distributed architectures.",
      price: 42.99,
      mrp: 55.00,
      stock: 220,
      rating: 4.8,
      reviewCount: 7654,
      images: [img("ddia1")],
      categoryId: books.id,
    },
    {
      title: "The Psychology of Money",
      slug: "psychology-of-money",
      description:
        "Morgan Housel shares 19 short stories exploring the strange ways people think about money, and how to make better financial decisions.",
      price: 14.99,
      mrp: 19.99,
      stock: 600,
      rating: 4.6,
      reviewCount: 45320,
      images: [img("psymoney1")],
      categoryId: books.id,
    },
    {
      title: "System Design Interview – Volume 1",
      slug: "system-design-interview-v1",
      description:
        "Alex Xu's step-by-step guide to acing system design interviews. Covers URL shortener, chat system, notification service, and 10 more real-world systems.",
      price: 29.99,
      mrp: 39.99,
      stock: 350,
      rating: 4.5,
      reviewCount: 8910,
      images: [img("sysdesign1")],
      categoryId: books.id,
    },
    {
      title: "Deep Work: Rules for Focused Success",
      slug: "deep-work-cal-newport",
      description:
        "Cal Newport argues that the ability to concentrate without distraction is becoming increasingly rare—and increasingly valuable. Learn how to cultivate it.",
      price: 13.99,
      mrp: 18.99,
      stock: 420,
      rating: 4.4,
      reviewCount: 23100,
      images: [img("deepwork1")],
      categoryId: books.id,
    },

    {
      title: "Classic Fit Premium Cotton Crew-Neck T-Shirt",
      slug: "classic-fit-cotton-tshirt",
      description:
        "Super-soft 100 % ring-spun cotton tee with reinforced shoulder seams and tag-free comfort. Available in 12 colors.",
      price: 19.99,
      mrp: 29.99,
      stock: 1000,
      rating: 4.3,
      reviewCount: 15670,
      images: [img("tshirt1"), img("tshirt2")],
      categoryId: clothing.id,
    },
    {
      title: "UrbanFlex Slim-Fit Stretch Chinos",
      slug: "urbanflex-slim-chinos",
      description:
        "Modern slim-fit chinos with 2 % elastane for all-day stretch. Wrinkle-resistant fabric, zip fly, and hidden coin pocket.",
      price: 44.99,
      mrp: 64.99,
      stock: 350,
      rating: 4.4,
      reviewCount: 4520,
      images: [img("chinos1"), img("chinos2")],
      categoryId: clothing.id,
    },
    {
      title: "AllWeather Lightweight Windbreaker Jacket",
      slug: "allweather-windbreaker-jacket",
      description:
        "Packable water-repellent windbreaker with adjustable hood, reflective accents, and zippered pockets. Weighs just 280 g.",
      price: 59.99,
      mrp: 89.99,
      stock: 200,
      rating: 4.5,
      reviewCount: 2340,
      isFeatured: true,
      images: [img("jacket1"), img("jacket2")],
      categoryId: clothing.id,
    },
    {
      title: "ComfortStride Running Shoes",
      slug: "comfortstride-running-shoes",
      description:
        "Lightweight mesh running shoes with responsive foam midsole, anti-slip rubber outsole, and breathable knit upper. Ideal for road running.",
      price: 74.99,
      mrp: 109.99,
      stock: 280,
      rating: 4.3,
      reviewCount: 6780,
      images: [img("shoes1"), img("shoes2"), img("shoes3")],
      categoryId: clothing.id,
    },
    {
      title: "ThermoLayer Merino Wool Hoodie",
      slug: "thermolayer-merino-hoodie",
      description:
        "Midweight merino wool blend hoodie—naturally odor-resistant, moisture-wicking, and temperature-regulating. Kangaroo pocket with hidden media port.",
      price: 89.99,
      mrp: 129.99,
      stock: 150,
      rating: 4.6,
      reviewCount: 1890,
      images: [img("hoodie1"), img("hoodie2")],
      categoryId: clothing.id,
    },
    {
      title: "DryTech Moisture-Wicking Polo Shirt",
      slug: "drytech-polo-shirt",
      description:
        "Performance polo with UPF 30 sun protection, four-way stretch, and fast-drying fabric. Great for golf, travel, or smart-casual wear.",
      price: 34.99,
      mrp: 49.99,
      stock: 500,
      rating: 4.2,
      reviewCount: 3450,
      images: [img("polo1"), img("polo2")],
      categoryId: clothing.id,
    },

    {
      title: "BrewMaster Pro Programmable Coffee Maker",
      slug: "brewmaster-pro-coffee-maker",
      description:
        "12-cup programmable drip coffee maker with built-in grinder, thermal carafe, auto-clean cycle, and bold-brew mode.",
      price: 89.99,
      mrp: 129.99,
      stock: 100,
      rating: 4.4,
      reviewCount: 5670,
      isFeatured: true,
      images: [img("coffeemaker1"), img("coffeemaker2")],
      categoryId: kitchen.id,
    },
    {
      title: "ChefEdge 15-Piece Knife Block Set",
      slug: "chefedge-15pc-knife-set",
      description:
        "High-carbon German stainless-steel knife set with ergonomic handles, full tang construction, and natural acacia wood block.",
      price: 119.99,
      mrp: 179.99,
      stock: 75,
      rating: 4.7,
      reviewCount: 2340,
      images: [img("knifeset1"), img("knifeset2")],
      categoryId: kitchen.id,
    },
    {
      title: "AirCrisp Digital Air Fryer – 5.8 Qt",
      slug: "aircrisp-digital-air-fryer",
      description:
        "Large-capacity digital air fryer with 8 preset cooking programs, rapid-air circulation technology, and dishwasher-safe basket. Cook with up to 85 % less oil.",
      price: 69.99,
      mrp: 99.99,
      stock: 160,
      rating: 4.5,
      reviewCount: 8920,
      images: [img("airfryer1"), img("airfryer2")],
      categoryId: kitchen.id,
    },
    {
      title: "NutriBlend 1200W High-Speed Blender",
      slug: "nutriblend-1200w-blender",
      description:
        "Professional-grade blender with 1200 W motor, BPA-free Tritan pitcher, variable speed dial, and pulse function. Crushes ice in seconds.",
      price: 59.99,
      mrp: 84.99,
      stock: 180,
      rating: 4.3,
      reviewCount: 4510,
      images: [img("blender1"), img("blender2")],
      categoryId: kitchen.id,
    },
    {
      title: "CastIron Lodge 12-Inch Skillet",
      slug: "castiron-lodge-12in-skillet",
      description:
        "Pre-seasoned cast-iron skillet with helper handle. Unmatched heat retention for searing, baking, broiling, and campfire cooking.",
      price: 34.99,
      mrp: 49.99,
      stock: 250,
      rating: 4.8,
      reviewCount: 32100,
      images: [img("skillet1"), img("skillet2")],
      categoryId: kitchen.id,
    },
    {
      title: "SilkPour Non-Stick Cookware Set – 10 Piece",
      slug: "silkpour-nonstick-cookware-set",
      description:
        "PFOA-free ceramic non-stick cookware set including frying pans, saucepans, and Dutch oven. Oven-safe to 450 °F with stainless-steel handles.",
      price: 149.99,
      mrp: 219.99,
      stock: 60,
      rating: 4.4,
      reviewCount: 3120,
      images: [img("cookware1"), img("cookware2")],
      categoryId: kitchen.id,
    },

    {
      title: "FlexFit Adjustable Dumbbell Set – 5-52.5 lbs",
      slug: "flexfit-adjustable-dumbbell-set",
      description:
        "Space-saving adjustable dumbbells that replace 15 sets of weights. Turn the dial to switch between 5 and 52.5 lbs in 2.5 lb increments.",
      price: 299.99,
      mrp: 399.99,
      stock: 40,
      rating: 4.7,
      reviewCount: 6780,
      isFeatured: true,
      images: [img("dumbbell1"), img("dumbbell2")],
      categoryId: sports.id,
    },
    {
      title: "YogaZen Premium Non-Slip Mat – 6 mm",
      slug: "yogazen-premium-mat",
      description:
        "Extra-thick TPE yoga mat with dual-layer texture for superior grip. Eco-friendly, latex-free, and comes with a carrying strap.",
      price: 29.99,
      mrp: 44.99,
      stock: 350,
      rating: 4.5,
      reviewCount: 9870,
      images: [img("yogamat1"), img("yogamat2")],
      categoryId: sports.id,
    },
    {
      title: "TrailBlazer 50L Hiking Backpack",
      slug: "trailblazer-50l-hiking-backpack",
      description:
        "Lightweight yet rugged 50-liter backpack with rain cover, hydration sleeve, ventilated back panel, and multiple compression straps.",
      price: 79.99,
      mrp: 119.99,
      stock: 100,
      rating: 4.4,
      reviewCount: 3450,
      images: [img("backpack1"), img("backpack2")],
      categoryId: sports.id,
    },
    {
      title: "SpinCycle Indoor Exercise Bike",
      slug: "spincycle-indoor-exercise-bike",
      description:
        "Magnetic resistance indoor bike with LCD display, adjustable seat and handlebars, tablet holder, and near-silent belt drive.",
      price: 349.99,
      mrp: 499.99,
      stock: 25,
      rating: 4.3,
      reviewCount: 2100,
      images: [img("spinbike1"), img("spinbike2")],
      categoryId: sports.id,
    },
    {
      title: "GripForce Resistance Bands Set – 5 Pack",
      slug: "gripforce-resistance-bands-set",
      description:
        "Set of 5 natural latex resistance bands (10–50 lbs) with door anchor, ankle straps, and mesh carry bag. Ideal for home workouts and physical therapy.",
      price: 24.99,
      mrp: 39.99,
      stock: 500,
      rating: 4.6,
      reviewCount: 14300,
      images: [img("bands1"), img("bands2")],
      categoryId: sports.id,
    },
    {
      title: "AquaStrike Insulated Water Bottle – 32 oz",
      slug: "aquastrike-insulated-bottle",
      description:
        "Double-wall vacuum-insulated stainless-steel bottle. Keeps drinks cold 24 hrs / hot 12 hrs. Leak-proof lid with one-hand operation.",
      price: 27.99,
      mrp: 39.99,
      stock: 600,
      rating: 4.5,
      reviewCount: 18200,
      images: [img("bottle1"), img("bottle2")],
      categoryId: sports.id,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`✅ Seeded ${categories.length} categories`);
  console.log(`✅ Seeded ${products.length} products`);
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
