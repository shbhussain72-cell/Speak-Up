import { useState, useMemo, useEffect } from "react";
import { Search, Copy, Check, ExternalLink, ChevronDown, ChevronUp, Shuffle, X, Shield, Clock, Users } from "lucide-react";

interface DealCode {
  [key: string]: any;
}
interface Deal {
  id: string;
  brand: string;
  product: string;
  desc: string;
  category: string;
  orig: string;
  disc: string;
  saved: string;
  pct: number;
  r: number;
  rv: string;
  min: string;
  exp: string;
  use: string;
  hot: boolean;
  codes: DealCode[];
  url: string;
}

// ── Palette ──────────────────────────────────────────────────────────────────
const C = { bg:"#F1F5F9",card:"#fff",border:"#E2E8F0",hdr:"#0D1117",
  accent:"#2563EB",green:"#059669",red:"#DC2626",
  t1:"#0F172A",t2:"#475569",t3:"#94A3B8" };

const CAT_A = { Tech:"#2563EB",Fashion:"#7C3AED",Food:"#EA580C",
  Travel:"#0891B2","E-commerce":"#6D28D9",Courses:"#059669",
  "AI Tools":"#7C3AED",Gaming:"#DC2626",Health:"#16A34A" };

// ── Data ─────────────────────────────────────────────────────────────────────
/* const D = [
  // TECH
  {id:"t1",brand:"Apple",product:"MacBook Air M3",desc:"13-inch · M3 chip · 8GB RAM · 256GB SSD · Midnight",category:"Tech",
   orig:"₹1,14,900",disc:"₹91,920",saved:"₹22,980",pct:20,r:4.8,rv:"12.4k",min:"₹50,000",exp:"31 Dec 2025",use:"3.2k",hot:true,
   codes:[{c:"APPLEM3200",d:"20% OFF"},{c:"STDNT15MAC",d:"15% OFF"},{c:"APPLECARE10",d:"10% OFF"},{c:"AAPL5BACK",d:"5% Cashback"}],url:"https://apple.com"},
  {id:"t2",brand:"Samsung",product:"Galaxy S25 Ultra",desc:"6.9\" QHD+ AMOLED · 200MP OIS · Snapdragon 8 Elite · Titanium",category:"Tech",
   orig:"₹1,29,999",disc:"₹90,999",saved:"₹39,000",pct:30,r:4.7,rv:"8.9k",min:"₹80,000",exp:"15 Jan 2026",use:"5.7k",hot:true,
   codes:[{c:"SAMGS25ULTRA",d:"30% OFF"},{c:"SAMSUNG25",d:"25% OFF"},{c:"GALXY20",d:"20% OFF"},{c:"SAMOFF15",d:"15% OFF"},{c:"SAM10EXTRA",d:"10% OFF"}],url:"https://samsung.com"},
  {id:"t3",brand:"Sony",product:"WH-1000XM5 Headphones",desc:"Industry-leading ANC · 30hr battery · Multipoint connect · Foldable",category:"Tech",
   orig:"₹29,990",disc:"₹23,992",saved:"₹5,998",pct:20,r:4.6,rv:"6.1k",min:"₹10,000",exp:"28 Feb 2026",use:"1.9k",
   codes:[{c:"SONY20ANC",d:"20% OFF"},{c:"SONYHP15",d:"15% OFF"},{c:"SONYXM10",d:"10% OFF"}],url:"https://sony.com"},
  {id:"t4",brand:"boAt",product:"Airdopes 441 Pro",desc:"ANC · 42hr playtime · BEAST™ Mode · Low-latency gaming audio",category:"Tech",
   orig:"₹3,499",disc:"₹1,749",saved:"₹1,750",pct:50,r:4.3,rv:"22.1k",min:"₹999",exp:"10 Jan 2026",use:"8.4k",hot:true,
   codes:[{c:"BOATFEST50",d:"50% OFF"},{c:"BOATDEAL35",d:"35% OFF"},{c:"BOAT20",d:"20% OFF"},{c:"BOATAUDIO15",d:"15% OFF"}],url:"https://boat-lifestyle.com"},
  {id:"t5",brand:"Dell",product:"XPS 15 Laptop",desc:"Intel i7-13th Gen · 16GB RAM · 512GB SSD · OLED 3.5K Touch",category:"Tech",
   orig:"₹1,89,999",disc:"₹1,51,999",saved:"₹38,000",pct:20,r:4.5,rv:"3.2k",min:"₹1,00,000",exp:"31 Mar 2026",use:"980",
   codes:[{c:"DELLXPS20",d:"20% OFF"},{c:"DELLFEST15",d:"15% OFF"},{c:"DELL10NOW",d:"10% OFF"}],url:"https://dell.com"},
  {id:"t6",brand:"Xiaomi",product:"Redmi Note 14 Pro",desc:"200MP OIS · 120W HyperCharge · 6.67\" AMOLED 120Hz · IP68",category:"Tech",
   orig:"₹27,999",disc:"₹19,599",saved:"₹8,400",pct:30,r:4.4,rv:"18.7k",min:"₹10,000",exp:"20 Jan 2026",use:"12.3k",
   codes:[{c:"MI30NOTE14",d:"30% OFF"},{c:"MIFLASH20",d:"20% OFF"},{c:"MI2KOFF",d:"₹2,000 OFF"},{c:"MIFAN15",d:"15% OFF"}],url:"https://mi.com/in"},
  {id:"t7",brand:"OnePlus",product:"OnePlus 13",desc:"Snapdragon 8 Elite · Hasselblad cameras · 100W SUPERVOOC · 6000mAh",category:"Tech",
   orig:"₹69,999",disc:"₹55,999",saved:"₹14,000",pct:20,r:4.6,rv:"9.3k",min:"₹30,000",exp:"31 Jan 2026",use:"6.5k",
   codes:[{c:"OP13LAUNCH",d:"20% OFF"},{c:"OP13DEAL",d:"15% OFF"},{c:"OP10RED",d:"10% OFF"}],url:"https://oneplus.in"},
  // FASHION
  {id:"f1",brand:"Nike",product:"Air Max 270",desc:"Lightweight mesh upper · Max Air heel unit · Men's & Women's sizes",category:"Fashion",
   orig:"₹12,995",disc:"₹9,746",saved:"₹3,249",pct:25,r:4.6,rv:"31.2k",min:"₹5,000",exp:"30 Jan 2026",use:"7.8k",hot:true,
   codes:[{c:"NIKE25RUN",d:"25% OFF"},{c:"NIKEAIR20",d:"20% OFF"},{c:"NKFRIENDS15",d:"15% OFF"},{c:"NIKEMOVE10",d:"10% OFF"}],url:"https://nike.com"},
  {id:"f2",brand:"Adidas",product:"Ultraboost 24",desc:"BOOST midsole · Primeknit+ upper · Continental™ rubber outsole",category:"Fashion",
   orig:"₹14,999",disc:"₹10,499",saved:"₹4,500",pct:30,r:4.7,rv:"14.5k",min:"₹6,000",exp:"28 Feb 2026",use:"4.3k",
   codes:[{c:"ADICLUB30",d:"30% OFF"},{c:"ADICREATOR20",d:"20% OFF"},{c:"ADI15",d:"15% OFF"},{c:"ADIDAS10X",d:"10% OFF"}],url:"https://adidas.com"},
  {id:"f3",brand:"Zara",product:"Summer Collection 2025",desc:"Linen shirts · Printed dresses · Resort shorts — All sizes in stock",category:"Fashion",
   orig:"₹5,990",disc:"₹2,995",saved:"₹2,995",pct:50,r:4.2,rv:"5.6k",min:"₹1,500",exp:"30 Jun 2025",use:"9.1k",
   codes:[{c:"ZARASALE50",d:"50% OFF"},{c:"ZARANEW30",d:"30% OFF"},{c:"ZARA20SS",d:"20% OFF"}],url:"https://zara.com"},
  {id:"f4",brand:"Levi's",product:"511 Slim Fit Jeans",desc:"Slim from hip to ankle · Stretch denim · Classic 5-pocket styling",category:"Fashion",
   orig:"₹4,999",disc:"₹2,999",saved:"₹2,000",pct:40,r:4.5,rv:"28.3k",min:"₹2,000",exp:"31 Jan 2026",use:"14.2k",
   codes:[{c:"LEVIS40",d:"40% OFF"},{c:"LEVISDENIM25",d:"25% OFF"},{c:"LEVI15",d:"15% OFF"},{c:"LEVIS10",d:"10% OFF"}],url:"https://levis.com"},
  {id:"f5",brand:"Puma",product:"Running Shoes Collection",desc:"NITRO foam · PUMAGRIP outsole · Multiple styles available",category:"Fashion",
   orig:"₹8,999",disc:"₹5,399",saved:"₹3,600",pct:40,r:4.4,rv:"9.7k",min:"₹4,000",exp:"15 Feb 2026",use:"5.5k",hot:true,
   codes:[{c:"PUMASHOP40",d:"40% OFF"},{c:"PUMA30RUN",d:"30% OFF"},{c:"PUMA20",d:"20% OFF"},{c:"PUMACAT10",d:"10% OFF"}],url:"https://puma.com"},
  // FOOD
  {id:"fd1",brand:"Zomato",product:"Any Restaurant Order",desc:"Valid at 10,000+ restaurants · Max discount ₹120 · All cities",category:"Food",
   orig:"₹600",disc:"₹240",saved:"₹360",pct:60,r:4.3,rv:"2.1M",min:"₹149",exp:"31 Dec 2025",use:"45.2k",hot:true,
   codes:[{c:"ZOMGOLD60",d:"60% OFF"},{c:"ZOMFRESH50",d:"50% OFF"},{c:"ZOM30",d:"30% OFF"},{c:"ZOMFREE15",d:"15% OFF"},{c:"ZOM10EXTRA",d:"10% OFF"}],url:"https://zomato.com"},
  {id:"fd2",brand:"Swiggy",product:"Any Restaurant Order",desc:"500+ restaurants · Free delivery included · Instamart eligible",category:"Food",
   orig:"₹500",disc:"₹250",saved:"₹250",pct:50,r:4.2,rv:"1.8M",min:"₹199",exp:"31 Dec 2025",use:"38.7k",hot:true,
   codes:[{c:"SWIGMAX50",d:"50% OFF"},{c:"SWIGFEAST40",d:"40% OFF"},{c:"SWIGGOLD30",d:"30% OFF"},{c:"SWIG15",d:"15% OFF"}],url:"https://swiggy.com"},
  {id:"fd3",brand:"Domino's",product:"Large Pizza (Any Crust)",desc:"Thin crust · New Hand Tossed · Cheese Burst — Delivery & dine-in",category:"Food",
   orig:"₹499",disc:"₹349",saved:"₹150",pct:30,r:4.1,rv:"890k",min:"₹299",exp:"28 Feb 2026",use:"22.1k",
   codes:[{c:"DOM30NOW",d:"30% OFF"},{c:"DOMWEEKEND25",d:"25% OFF"},{c:"PIZZADOM20",d:"20% OFF"},{c:"DOM15",d:"15% OFF"}],url:"https://dominos.com"},
  {id:"fd4",brand:"Starbucks",product:"Handcrafted Beverages",desc:"All sizes · Hot & cold · Valid at company-owned stores",category:"Food",
   orig:"₹550",disc:"₹275",saved:"₹275",pct:50,r:4.4,rv:"124k",min:"₹0",exp:"30 Jun 2026",use:"8.3k",
   codes:[{c:"SBUXBOGO",d:"Buy 1 Get 1"},{c:"SBUX25OFF",d:"25% OFF"},{c:"SBUX15",d:"15% OFF"}],url:"https://starbucks.com"},
  {id:"fd5",brand:"BigBasket",product:"Grocery Order ₹500+",desc:"Fresh produce · Staples · Packaged goods — Same day delivery",category:"Food",
   orig:"₹800",disc:"₹560",saved:"₹240",pct:30,r:4.2,rv:"567k",min:"₹500",exp:"31 Jan 2026",use:"18.9k",
   codes:[{c:"BBDROP30",d:"30% OFF"},{c:"BBFRESH20",d:"20% OFF"},{c:"BBDEAL15",d:"15% OFF"}],url:"https://bigbasket.com"},
  // TRAVEL
  {id:"tr1",brand:"MakeMyTrip",product:"Domestic Flights",desc:"All airlines · All routes · Instant confirmation · Flexible fares",category:"Travel",
   orig:"₹8,500",disc:"₹5,950",saved:"₹2,550",pct:30,r:4.3,rv:"421k",min:"₹3,000",exp:"31 Mar 2026",use:"11.4k",hot:true,
   codes:[{c:"MMT30FLY",d:"30% OFF"},{c:"MMT2500OFF",d:"₹2,500 OFF"},{c:"MMTAIR15",d:"15% OFF"},{c:"MMTNEW10",d:"10% OFF"}],url:"https://makemytrip.com"},
  {id:"tr2",brand:"OYO",product:"Weekend Hotel Stay",desc:"3000+ hotels · Free breakfast at select properties · Instant booking",category:"Travel",
   orig:"₹2,499",disc:"₹1,249",saved:"₹1,250",pct:50,r:3.9,rv:"892k",min:"₹800",exp:"30 Jun 2026",use:"19.6k",
   codes:[{c:"OYO50STAY",d:"50% OFF"},{c:"OYO35WKND",d:"35% OFF"},{c:"OYOFLEX20",d:"20% OFF"},{c:"OYO10NEW",d:"10% OFF"}],url:"https://oyorooms.com"},
  {id:"tr3",brand:"Airbnb",product:"First International Stay",desc:"Valid on first booking outside India · Entire homes & private rooms",category:"Travel",
   orig:"$150",disc:"$100",saved:"$50",pct:33,r:4.7,rv:"2.4M",min:"$100",exp:"31 Dec 2025",use:"4.1k",
   codes:[{c:"AIRBNB50",d:"$50 OFF"},{c:"AIRFIRST30",d:"30% OFF"},{c:"AIR15NEW",d:"15% OFF"}],url:"https://airbnb.com"},
  // E-COMMERCE
  {id:"ec1",brand:"Ajio",product:"Branded Fashion",desc:"Puma, Levis, Nike, H&M, Reebok & 500+ brands · Free delivery",category:"E-commerce",
   orig:"₹3,999",disc:"₹1,999",saved:"₹2,000",pct:50,r:4.2,rv:"234k",min:"₹1,500",exp:"31 Dec 2025",use:"16.4k",hot:true,
   codes:[{c:"AJIO50",d:"50% OFF"},{c:"AJIO40X10",d:"40%+10% OFF"},{c:"AJIOBIG30",d:"30% OFF"},{c:"AJIO20",d:"20% OFF"}],url:"https://ajio.com"},
  {id:"ec2",brand:"Flipkart",product:"Electronics & Fashion",desc:"Mobiles, laptops, appliances, fashion — Big Billion Days offer",category:"E-commerce",
   orig:"₹5,000",disc:"₹3,250",saved:"₹1,750",pct:35,r:4.3,rv:"1.2M",min:"₹2,000",exp:"15 Jan 2026",use:"28.9k",hot:true,
   codes:[{c:"FKSUPER35",d:"35% OFF"},{c:"FKBIG25",d:"25% OFF"},{c:"FLIPKART15",d:"15% OFF"},{c:"FK10EXTRA",d:"10% OFF"}],url:"https://flipkart.com"},
  {id:"ec3",brand:"Amazon India",product:"Electronics Sitewide",desc:"Laptops, phones, headphones, TVs — Next-day delivery on Prime",category:"E-commerce",
   orig:"₹10,000",disc:"₹8,500",saved:"₹1,500",pct:15,r:4.5,rv:"3.1M",min:"₹5,000",exp:"31 Mar 2026",use:"42.3k",
   codes:[{c:"AMZNOW15",d:"15% OFF"},{c:"AMZPRIME10",d:"10% OFF"},{c:"AMAZON5",d:"5% OFF"}],url:"https://amazon.in"},
  // COURSES
  {id:"c1",brand:"Udemy",product:"Any Online Course",desc:"180,000+ courses · Tech, design, business — Lifetime access",category:"Courses",
   orig:"₹3,499",disc:"₹349",saved:"₹3,150",pct:90,r:4.6,rv:"18.9M",min:"₹0",exp:"31 Dec 2025",use:"89.4k",hot:true,
   codes:[{c:"UDEMY90",d:"90% OFF"},{c:"ULEARN80",d:"80% OFF"},{c:"UDEMY70",d:"70% OFF"},{c:"UFRIDAY50",d:"50% OFF"},{c:"UDEMY30",d:"30% OFF"}],url:"https://udemy.com"},
  {id:"c2",brand:"Coursera",product:"Coursera Plus Annual",desc:"7,000+ courses, professional certificates & degrees — All-access",category:"Courses",
   orig:"₹4,999",disc:"₹1,499",saved:"₹3,500",pct:70,r:4.7,rv:"3.2M",min:"₹0",exp:"31 Dec 2025",use:"21.3k",hot:true,
   codes:[{c:"COURSE70",d:"70% OFF"},{c:"LEARNPLUS50",d:"50% OFF"},{c:"CPLUS30",d:"30% OFF"},{c:"CERA20NEW",d:"20% OFF"}],url:"https://coursera.org"},
  {id:"c3",brand:"Skillshare",product:"Annual Membership",desc:"10,000+ creative & business classes · Download for offline use",category:"Courses",
   orig:"$167",disc:"$67",saved:"$100",pct:60,r:4.4,rv:"823k",min:"$0",exp:"30 Jun 2026",use:"6.2k",
   codes:[{c:"SKILL60",d:"60% OFF"},{c:"SKANNUAL40",d:"40% OFF"},{c:"SKILLS25",d:"25% OFF"}],url:"https://skillshare.com"},
  {id:"c4",brand:"Unacademy",product:"Iconic Subscription",desc:"UPSC, JEE, NEET & more · Live classes · Study material · Mock tests",category:"Courses",
   orig:"₹8,999",disc:"₹4,499",saved:"₹4,500",pct:50,r:4.2,rv:"1.1M",min:"₹0",exp:"31 Mar 2026",use:"14.8k",
   codes:[{c:"UNA50ICONIC",d:"50% OFF"},{c:"UNALEAP30",d:"30% OFF"},{c:"UNAPLUS20",d:"20% OFF"}],url:"https://unacademy.com"},
  // AI TOOLS
  {id:"ai1",brand:"Canva Pro",product:"Annual Subscription",desc:"100M+ templates · AI design tools · Brand Kit · Background Remover",category:"AI Tools",
   orig:"₹5,999",disc:"₹2,999",saved:"₹3,000",pct:50,r:4.8,rv:"2.7M",min:"₹0",exp:"31 Mar 2026",use:"31.2k",hot:true,
   codes:[{c:"CANVAPRO50",d:"50% OFF"},{c:"CANVA30PRO",d:"30% OFF"},{c:"CANVATEAM20",d:"20% OFF"},{c:"CANVA15",d:"15% OFF"}],url:"https://canva.com"},
  {id:"ai2",brand:"Notion AI",product:"Annual Plan",desc:"AI workspace · Notes, docs, wikis, databases — All in one place",category:"AI Tools",
   orig:"$96",disc:"$48",saved:"$48",pct:50,r:4.7,rv:"891k",min:"$0",exp:"28 Feb 2026",use:"8.1k",hot:true,
   codes:[{c:"NOTIONAI50",d:"50% OFF"},{c:"NOTION30AI",d:"30% OFF"},{c:"NTNANNUAL20",d:"20% OFF"}],url:"https://notion.so"},
  {id:"ai3",brand:"ChatGPT Plus",product:"Monthly Subscription",desc:"GPT-4o · Advanced reasoning · Image generation · Priority access",category:"AI Tools",
   orig:"$20",disc:"$14",saved:"$6",pct:30,r:4.9,rv:"4.2M",min:"$0",exp:"31 Jan 2026",use:"19.7k",hot:true,
   codes:[{c:"GPT30DEAL",d:"30% OFF"},{c:"CHATGPT20",d:"20% OFF"},{c:"GPT15OFF",d:"15% OFF"}],url:"https://chat.openai.com"},
  {id:"ai4",brand:"Grammarly Premium",product:"Annual Plan",desc:"AI writing assistant · Grammar, clarity, tone & plagiarism detection",category:"AI Tools",
   orig:"$144",disc:"$72",saved:"$72",pct:50,r:4.6,rv:"1.4M",min:"$0",exp:"31 Dec 2025",use:"12.4k",
   codes:[{c:"GRAM50YEAR",d:"50% OFF"},{c:"GRAMPRO30",d:"30% OFF"},{c:"GRAMLY20",d:"20% OFF"}],url:"https://grammarly.com"},
  // GAMING
  {id:"g1",brand:"Xbox Game Pass",product:"Ultimate — 3 Months",desc:"300+ games · EA Play included · Cloud gaming · Xbox Live Gold",category:"Gaming",
   orig:"$44.99",disc:"$1",saved:"$43.99",pct:98,r:4.7,rv:"567k",min:"$0",exp:"31 Jan 2026",use:"28.3k",hot:true,
   codes:[{c:"XBOXPASS1",d:"Trial — $1"},{c:"XBGP50",d:"50% OFF"},{c:"GAMEPASS30",d:"30% OFF"},{c:"XBOX20OFF",d:"20% OFF"}],url:"https://xbox.com"},
  {id:"g2",brand:"Steam",product:"Game Sale Bundle",desc:"Top AAA titles + indie gems · DLCs included · Windows & Mac",category:"Gaming",
   orig:"₹4,999",disc:"₹1,499",saved:"₹3,500",pct:70,r:4.8,rv:"3.4M",min:"₹0",exp:"15 Jan 2026",use:"41.2k",hot:true,
   codes:[{c:"STEAM70NOW",d:"70% OFF"},{c:"STEAMWINTER50",d:"50% OFF"},{c:"GAMER30",d:"30% OFF"},{c:"STEAM15G",d:"15% OFF"}],url:"https://store.steampowered.com"},
  {id:"g3",brand:"PlayStation",product:"PS Plus Extra — Annual",desc:"400+ PS4 & PS5 games · Online multiplayer · 100GB cloud storage",category:"Gaming",
   orig:"$134.99",disc:"$94.49",saved:"$40.50",pct:30,r:4.5,rv:"789k",min:"$0",exp:"31 Mar 2026",use:"9.8k",
   codes:[{c:"PSPLUS30",d:"30% OFF"},{c:"PSGOLD20",d:"20% OFF"},{c:"PS15EXTRA",d:"15% OFF"}],url:"https://playstation.com"},
  // HEALTH
  {id:"h1",brand:"Cult.fit",product:"Monthly Membership",desc:"Unlimited gym, yoga, HIIT, cycle & boxing at 1000+ centres",category:"Health",
   orig:"₹2,499",disc:"₹1,249",saved:"₹1,250",pct:50,r:4.4,rv:"312k",min:"₹0",exp:"31 Jan 2026",use:"7.6k",hot:true,
   codes:[{c:"CULTFIT50",d:"50% OFF"},{c:"CULTJOIN30",d:"30% OFF"},{c:"CULT20",d:"20% OFF"}],url:"https://cult.fit"},
  {id:"h2",brand:"Healthkart",product:"Protein Supplements",desc:"MuscleBlaze, GNC, Optimum Nutrition — Whey & Mass Gainer",category:"Health",
   orig:"₹3,499",disc:"₹2,099",saved:"₹1,400",pct:40,r:4.3,rv:"189k",min:"₹1,000",exp:"28 Feb 2026",use:"5.2k",
   codes:[{c:"HK40PROTEIN",d:"40% OFF"},{c:"HKFIT25",d:"25% OFF"},{c:"HEALTH15",d:"15% OFF"},{c:"HK10MRP",d:"10% OFF"}],url:"https://healthkart.com"},
  {id:"h3",brand:"PharmEasy",product:"Medicine & Healthcare",desc:"Prescription & OTC medicines · Lab tests · Free delivery above ₹500",category:"Health",
   orig:"₹1,000",disc:"₹750",saved:"₹250",pct:25,r:4.2,rv:"567k",min:"₹500",exp:"31 Mar 2026",use:"14.3k",
   codes:[{c:"PHARME25",d:"25% OFF"},{c:"PHARMDEAL20",d:"20% OFF"},{c:"PHFREE15",d:"15% OFF"}],url:"https://pharmeasy.in"},
*/

const D: Deal[] = [
  // TECH
  {id:"t1",brand:"Apple",product:"MacBook Air M3",desc:"13-inch · M3 chip · 8GB RAM · 256GB SSD · Midnight",category:"Tech",
   orig:"₹1,14,900",disc:"₹91,920",saved:"₹22,980",pct:20,r:4.8,rv:"12.4k",min:"₹50,000",exp:"31 Dec 2025",use:"3.2k",hot:true,
   codes:[{c:"APPLEM3200",d:"20% OFF"},{c:"STDNT15MAC",d:"15% OFF"},{c:"APPLECARE10",d:"10% OFF"},{c:"AAPL5BACK",d:"5% Cashback"}],url:"https://apple.com"},
  {id:"t2",brand:"Samsung",product:"Galaxy S25 Ultra",desc:"6.9\" QHD+ AMOLED · 200MP OIS · Snapdragon 8 Elite · Titanium",category:"Tech",
   orig:"₹1,29,999",disc:"₹90,999",saved:"₹39,000",pct:30,r:4.7,rv:"8.9k",min:"₹80,000",exp:"15 Jan 2026",use:"5.7k",hot:true,
   codes:[{c:"SAMGS25ULTRA",d:"30% OFF"},{c:"SAMSUNG25",d:"25% OFF"},{c:"GALXY20",d:"20% OFF"},{c:"SAMOFF15",d:"15% OFF"},{c:"SAM10EXTRA",d:"10% OFF"}],url:"https://samsung.com"},
  {
    id: "t3", brand: "Sony", product: "WH-1000XM5 Headphones", desc: "Industry-leading ANC · 30hr battery · Multipoint connect · Foldable", category: "Tech",
    orig: "₹29,990", disc: "₹23,992", saved: "₹5,998", pct: 20, r: 4.6, rv: "6.1k", min: "₹10,000", exp: "28 Feb 2026", use: "1.9k",
    codes: [{ c: "SONY20ANC", d: "20% OFF" }, { c: "SONYHP15", d: "15% OFF" }, { c: "SONYXM10", d: "10% OFF" }], url: "https://sony.com",
    hot: false
  },
  {id:"t4",brand:"boAt",product:"Airdopes 441 Pro",desc:"ANC · 42hr playtime · BEAST™ Mode · Low-latency gaming audio",category:"Tech",
   orig:"₹3,499",disc:"₹1,749",saved:"₹1,750",pct:50,r:4.3,rv:"22.1k",min:"₹999",exp:"10 Jan 2026",use:"8.4k",hot:true,
   codes:[{c:"BOATFEST50",d:"50% OFF"},{c:"BOATDEAL35",d:"35% OFF"},{c:"BOAT20",d:"20% OFF"},{c:"BOATAUDIO15",d:"15% OFF"}],url:"https://boat-lifestyle.com"},
  {
    id: "t5", brand: "Dell", product: "XPS 15 Laptop", desc: "Intel i7-13th Gen · 16GB RAM · 512GB SSD · OLED 3.5K Touch", category: "Tech",
    orig: "₹1,89,999", disc: "₹1,51,999", saved: "₹38,000", pct: 20, r: 4.5, rv: "3.2k", min: "₹1,00,000", exp: "31 Mar 2026", use: "980",
    codes: [{ c: "DELLXPS20", d: "20% OFF" }, { c: "DELLFEST15", d: "15% OFF" }, { c: "DELL10NOW", d: "10% OFF" }], url: "https://dell.com",
    hot: false
  },
  {
    id: "t6", brand: "Xiaomi", product: "Redmi Note 14 Pro", desc: "200MP OIS · 120W HyperCharge · 6.67\" AMOLED 120Hz · IP68", category: "Tech",
    orig: "₹27,999", disc: "₹19,599", saved: "₹8,400", pct: 30, r: 4.4, rv: "18.7k", min: "₹10,000", exp: "20 Jan 2026", use: "12.3k",
    codes: [{ c: "MI30NOTE14", d: "30% OFF" }, { c: "MIFLASH20", d: "20% OFF" }, { c: "MI2KOFF", d: "₹2,000 OFF" }, { c: "MIFAN15", d: "15% OFF" }], url: "https://mi.com/in",
    hot: false
  },
  {
    id: "t7", brand: "OnePlus", product: "OnePlus 13", desc: "Snapdragon 8 Elite · Hasselblad cameras · 100W SUPERVOOC · 6000mAh", category: "Tech",
    orig: "₹69,999", disc: "₹55,999", saved: "₹14,000", pct: 20, r: 4.6, rv: "9.3k", min: "₹30,000", exp: "31 Jan 2026", use: "6.5k",
    codes: [{ c: "OP13LAUNCH", d: "20% OFF" }, { c: "OP13DEAL", d: "15% OFF" }, { c: "OP10RED", d: "10% OFF" }], url: "https://oneplus.in",
    hot: false
  },
  // FASHION
  {id:"f1",brand:"Nike",product:"Air Max 270",desc:"Lightweight mesh upper · Max Air heel unit · Men's & Women's sizes",category:"Fashion",
   orig:"₹12,995",disc:"₹9,746",saved:"₹3,249",pct:25,r:4.6,rv:"31.2k",min:"₹5,000",exp:"30 Jan 2026",use:"7.8k",hot:true,
   codes:[{c:"NIKE25RUN",d:"25% OFF"},{c:"NIKEAIR20",d:"20% OFF"},{c:"NKFRIENDS15",d:"15% OFF"},{c:"NIKEMOVE10",d:"10% OFF"}],url:"https://nike.com"},
  {
    id: "f2", brand: "Adidas", product: "Ultraboost 24", desc: "BOOST midsole · Primeknit+ upper · Continental™ rubber outsole", category: "Fashion",
    orig: "₹14,999", disc: "₹10,499", saved: "₹4,500", pct: 30, r: 4.7, rv: "14.5k", min: "₹6,000", exp: "28 Feb 2026", use: "4.3k",
    codes: [{ c: "ADICLUB30", d: "30% OFF" }, { c: "ADICREATOR20", d: "20% OFF" }, { c: "ADI15", d: "15% OFF" }, { c: "ADIDAS10X", d: "10% OFF" }], url: "https://adidas.com",
    hot: false
  },
  {
    id: "f3", brand: "Zara", product: "Summer Collection 2025", desc: "Linen shirts · Printed dresses · Resort shorts — All sizes in stock", category: "Fashion",
    orig: "₹5,990", disc: "₹2,995", saved: "₹2,995", pct: 50, r: 4.2, rv: "5.6k", min: "₹1,500", exp: "30 Jun 2025", use: "9.1k",
    codes: [{ c: "ZARASALE50", d: "50% OFF" }, { c: "ZARANEW30", d: "30% OFF" }, { c: "ZARA20SS", d: "20% OFF" }], url: "https://zara.com",
    hot: false
  },
  {
    id: "f4", brand: "Levi's", product: "511 Slim Fit Jeans", desc: "Slim from hip to ankle · Stretch denim · Classic 5-pocket styling", category: "Fashion",
    orig: "₹4,999", disc: "₹2,999", saved: "₹2,000", pct: 40, r: 4.5, rv: "28.3k", min: "₹2,000", exp: "31 Jan 2026", use: "14.2k",
    codes: [{ c: "LEVIS40", d: "40% OFF" }, { c: "LEVISDENIM25", d: "25% OFF" }, { c: "LEVI15", d: "15% OFF" }, { c: "LEVIS10", d: "10% OFF" }], url: "https://levis.com",
    hot: false
  },
  {id:"f5",brand:"Puma",product:"Running Shoes Collection",desc:"NITRO foam · PUMAGRIP outsole · Multiple styles available",category:"Fashion",
   orig:"₹8,999",disc:"₹5,399",saved:"₹3,600",pct:40,r:4.4,rv:"9.7k",min:"₹4,000",exp:"15 Feb 2026",use:"5.5k",hot:true,
   codes:[{c:"PUMASHOP40",d:"40% OFF"},{c:"PUMA30RUN",d:"30% OFF"},{c:"PUMA20",d:"20% OFF"},{c:"PUMACAT10",d:"10% OFF"}],url:"https://puma.com"},
  // FOOD
  {id:"fd1",brand:"Zomato",product:"Any Restaurant Order",desc:"Valid at 10,000+ restaurants · Max discount ₹120 · All cities",category:"Food",
   orig:"₹600",disc:"₹240",saved:"₹360",pct:60,r:4.3,rv:"2.1M",min:"₹149",exp:"31 Dec 2025",use:"45.2k",hot:true,
   codes:[{c:"ZOMGOLD60",d:"60% OFF"},{c:"ZOMFRESH50",d:"50% OFF"},{c:"ZOM30",d:"30% OFF"},{c:"ZOMFREE15",d:"15% OFF"},{c:"ZOM10EXTRA",d:"10% OFF"}],url:"https://zomato.com"},
  {id:"fd2",brand:"Swiggy",product:"Any Restaurant Order",desc:"500+ restaurants · Free delivery included · Instamart eligible",category:"Food",
   orig:"₹500",disc:"₹250",saved:"₹250",pct:50,r:4.2,rv:"1.8M",min:"₹199",exp:"31 Dec 2025",use:"38.7k",hot:true,
   codes:[{c:"SWIGMAX50",d:"50% OFF"},{c:"SWIGFEAST40",d:"40% OFF"},{c:"SWIGGOLD30",d:"30% OFF"},{c:"SWIG15",d:"15% OFF"}],url:"https://swiggy.com"},
  {
    id: "fd3", brand: "Domino's", product: "Large Pizza (Any Crust)", desc: "Thin crust · New Hand Tossed · Cheese Burst — Delivery & dine-in", category: "Food",
    orig: "₹499", disc: "₹349", saved: "₹150", pct: 30, r: 4.1, rv: "890k", min: "₹299", exp: "28 Feb 2026", use: "22.1k",
    codes: [{ c: "DOM30NOW", d: "30% OFF" }, { c: "DOMWEEKEND25", d: "25% OFF" }, { c: "PIZZADOM20", d: "20% OFF" }, { c: "DOM15", d: "15% OFF" }], url: "https://dominos.com",
    hot: false
  },
  {
    id: "fd4", brand: "Starbucks", product: "Handcrafted Beverages", desc: "All sizes · Hot & cold · Valid at company-owned stores", category: "Food",
    orig: "₹550", disc: "₹275", saved: "₹275", pct: 50, r: 4.4, rv: "124k", min: "₹0", exp: "30 Jun 2026", use: "8.3k",
    codes: [{ c: "SBUXBOGO", d: "Buy 1 Get 1" }, { c: "SBUX25OFF", d: "25% OFF" }, { c: "SBUX15", d: "15% OFF" }], url: "https://starbucks.com",
    hot: false
  },
  {
    id: "fd5", brand: "BigBasket", product: "Grocery Order ₹500+", desc: "Fresh produce · Staples · Packaged goods — Same day delivery", category: "Food",
    orig: "₹800", disc: "₹560", saved: "₹240", pct: 30, r: 4.2, rv: "567k", min: "₹500", exp: "31 Jan 2026", use: "18.9k",
    codes: [{ c: "BBDROP30", d: "30% OFF" }, { c: "BBFRESH20", d: "20% OFF" }, { c: "BBDEAL15", d: "15% OFF" }], url: "https://bigbasket.com",
    hot: false
  },
  // TRAVEL
  {id:"tr1",brand:"MakeMyTrip",product:"Domestic Flights",desc:"All airlines · All routes · Instant confirmation · Flexible fares",category:"Travel",
   orig:"₹8,500",disc:"₹5,950",saved:"₹2,550",pct:30,r:4.3,rv:"421k",min:"₹3,000",exp:"31 Mar 2026",use:"11.4k",hot:true,
   codes:[{c:"MMT30FLY",d:"30% OFF"},{c:"MMT2500OFF",d:"₹2,500 OFF"},{c:"MMTAIR15",d:"15% OFF"},{c:"MMTNEW10",d:"10% OFF"}],url:"https://makemytrip.com"},
  {id:"tr2",brand:"OYO",product:"Weekend Hotel Stay",desc:"3000+ hotels · Free breakfast at select properties · Instant booking",category:"Travel",
   orig:"₹2,499",disc:"₹1,249",saved:"₹1,250",pct:50,r:3.9,rv:"892k",min:"₹800",exp:"30 Jun 2026",use:"19.6k",hot:true,
   codes:[{c:"OYO50STAY",d:"50% OFF"},{c:"OYO35WKND",d:"35% OFF"},{c:"OYOFLEX20",d:"20% OFF"},{c:"OYO10NEW",d:"10% OFF"}],url:"https://oyorooms.com"},
  {
    id: "tr3", brand: "Airbnb", product: "First International Stay", desc: "Valid on first booking outside India · Entire homes & private rooms", category: "Travel",
    orig: "$150", disc: "$100", saved: "$50", pct: 33, r: 4.7, rv: "2.4M", min: "$100", exp: "31 Dec 2025", use: "4.1k",
    codes: [{ c: "AIRBNB50", d: "$50 OFF" }, { c: "AIRFIRST30", d: "30% OFF" }, { c: "AIR15NEW", d: "15% OFF" }], url: "https://airbnb.com",
    hot: false
  },
  // E-COMMERCE
  {id:"ec1",brand:"Ajio",product:"Branded Fashion",desc:"Puma, Levis, Nike, H&M, Reebok & 500+ brands · Free delivery",category:"E-commerce",
   orig:"₹3,999",disc:"₹1,999",saved:"₹2,000",pct:50,r:4.2,rv:"234k",min:"₹1,500",exp:"31 Dec 2025",use:"16.4k",hot:true,
   codes:[{c:"AJIO50",d:"50% OFF"},{c:"AJIO40X10",d:"40%+10% OFF"},{c:"AJIOBIG30",d:"30% OFF"},{c:"AJIO20",d:"20% OFF"}],url:"https://ajio.com"},
  {id:"ec2",brand:"Flipkart",product:"Electronics & Fashion",desc:"Mobiles, laptops, appliances, fashion — Big Billion Days offer",category:"E-commerce",
   orig:"₹5,000",disc:"₹3,250",saved:"₹1,750",pct:35,r:4.3,rv:"1.2M",min:"₹2,000",exp:"15 Jan 2026",use:"28.9k",hot:true,
   codes:[{c:"FKSUPER35",d:"35% OFF"},{c:"FKBIG25",d:"25% OFF"},{c:"FLIPKART15",d:"15% OFF"},{c:"FK10EXTRA",d:"10% OFF"}],url:"https://flipkart.com"},
  {
    id: "ec3", brand: "Amazon India", product: "Electronics Sitewide", desc: "Laptops, phones, headphones, TVs — Next-day delivery on Prime", category: "E-commerce",
    orig: "₹10,000", disc: "₹8,500", saved: "₹1,500", pct: 15, r: 4.5, rv: "3.1M", min: "₹5,000", exp: "31 Mar 2026", use: "42.3k",
    codes: [{ c: "AMZNOW15", d: "15% OFF" }, { c: "AMZPRIME10", d: "10% OFF" }, { c: "AMAZON5", d: "5% OFF" }], url: "https://amazon.in",
    hot: false
  },
  // COURSES
  {id:"c1",brand:"Udemy",product:"Any Online Course",desc:"180,000+ courses · Tech, design, business — Lifetime access",category:"Courses",
   orig:"₹3,499",disc:"₹349",saved:"₹3,150",pct:90,r:4.6,rv:"18.9M",min:"₹0",exp:"31 Dec 2025",use:"89.4k",hot:true,
   codes:[{c:"UDEMY90",d:"90% OFF"},{c:"ULEARN80",d:"80% OFF"},{c:"UDEMY70",d:"70% OFF"},{c:"UFRIDAY50",d:"50% OFF"},{c:"UDEMY30",d:"30% OFF"}],url:"https://udemy.com"},
  {id:"c2",brand:"Coursera",product:"Coursera Plus Annual",desc:"7,000+ courses, professional certificates & degrees — All-access",category:"Courses",
   orig:"₹4,999",disc:"₹1,499",saved:"₹3,500",pct:70,r:4.7,rv:"3.2M",min:"₹0",exp:"31 Dec 2025",use:"21.3k",hot:true,
   codes:[{c:"COURSE70",d:"70% OFF"},{c:"LEARNPLUS50",d:"50% OFF"},{c:"CPLUS30",d:"30% OFF"},{c:"CERA20NEW",d:"20% OFF"}],url:"https://coursera.org"},
  {
    id: "c3", brand: "Skillshare", product: "Annual Membership", desc: "10,000+ creative & business classes · Download for offline use", category: "Courses",
    orig: "$167", disc: "$67", saved: "$100", pct: 60, r: 4.4, rv: "823k", min: "$0", exp: "30 Jun 2026", use: "6.2k",
    codes: [{ c: "SKILL60", d: "60% OFF" }, { c: "SKANNUAL40", d: "40% OFF" }, { c: "SKILLS25", d: "25% OFF" }], url: "https://skillshare.com",
    hot: false
  },
  {
    id: "c4", brand: "Unacademy", product: "Iconic Subscription", desc: "UPSC, JEE, NEET & more · Live classes · Study material · Mock tests", category: "Courses",
    orig: "₹8,999", disc: "₹4,499", saved: "₹4,500", pct: 50, r: 4.2, rv: "1.1M", min: "₹0", exp: "31 Mar 2026", use: "14.8k",
    codes: [{ c: "UNA50ICONIC", d: "50% OFF" }, { c: "UNALEAP30", d: "30% OFF" }, { c: "UNAPLUS20", d: "20% OFF" }], url: "https://unacademy.com",
    hot: false
  },
  // AI TOOLS
  {id:"ai1",brand:"Canva Pro",product:"Annual Subscription",desc:"100M+ templates · AI design tools · Brand Kit · Background Remover",category:"AI Tools",
   orig:"₹5,999",disc:"₹2,999",saved:"₹3,000",pct:50,r:4.8,rv:"2.7M",min:"₹0",exp:"31 Mar 2026",use:"31.2k",hot:true,
   codes:[{c:"CANVAPRO50",d:"50% OFF"},{c:"CANVA30PRO",d:"30% OFF"},{c:"CANVATEAM20",d:"20% OFF"},{c:"CANVA15",d:"15% OFF"}],url:"https://canva.com"},
  {id:"ai2",brand:"Notion AI",product:"Annual Plan",desc:"AI workspace · Notes, docs, wikis, databases — All in one place",category:"AI Tools",
   orig:"$96",disc:"$48",saved:"$48",pct:50,r:4.7,rv:"891k",min:"₹0",exp:"28 Feb 2026",use:"8.1k",hot:true,
   codes:[{c:"NOTIONAI50",d:"50% OFF"},{c:"NOTION30AI",d:"30% OFF"},{c:"NTNANNUAL20",d:"20% OFF"}],url:"https://notion.so"},
  {id:"ai3",brand:"ChatGPT Plus",product:"Monthly Subscription",desc:"GPT-4o · Advanced reasoning · Image generation · Priority access",category:"AI Tools",
   orig:"$20",disc:"$14",saved:"$6",pct:30,r:4.9,rv:"4.2M",min:"₹0",exp:"31 Jan 2026",use:"19.7k",hot:true,
   codes:[{c:"GPT30DEAL",d:"30% OFF"},{c:"CHATGPT20",d:"20% OFF"},{c:"GPT15OFF",d:"15% OFF"}],url:"https://chat.openai.com"},
  {
    id: "ai4", brand: "Grammarly Premium", product: "Annual Plan", desc: "AI writing assistant · Grammar, clarity, tone & plagiarism detection", category: "AI Tools",
    orig: "$144", disc: "$72", saved: "$72", pct: 50, r: 4.6, rv: "1.4M", min: "₹0", exp: "31 Dec 2025", use: "12.4k",
    codes: [{ c: "GRAM50YEAR", d: "50% OFF" }, { c: "GRAMPRO30", d: "30% OFF" }, { c: "GRAMLY20", d: "20% OFF" }], url: "https://grammarly.com",
    hot: false
  },
  // GAMING
  {id:"g1",brand:"Xbox Game Pass",product:"Ultimate — 3 Months",desc:"300+ games · EA Play included · Cloud gaming · Xbox Live Gold",category:"Gaming",
   orig:"$44.99",disc:"$1",saved:"$43.99",pct:98,r:4.7,rv:"567k",min:"₹0",exp:"31 Jan 2026",use:"28.3k",hot:true,
   codes:[{c:"XBOXPASS1",d:"Trial — $1"},{c:"XBGP50",d:"50% OFF"},{c:"GAMEPASS30",d:"30% OFF"},{c:"XBOX20OFF",d:"20% OFF"}],url:"https://xbox.com"},
  {id:"g2",brand:"Steam",product:"Game Sale Bundle",desc:"Top AAA titles + indie gems · DLCs included · Windows & Mac",category:"Gaming",
   orig:"₹4,999",disc:"₹1,499",saved:"₹3,500",pct:70,r:4.8,rv:"3.4M",min:"₹0",exp:"15 Jan 2026",use:"41.2k",hot:true,
   codes:[{c:"STEAM70NOW",d:"70% OFF"},{c:"STEAMWINTER50",d:"50% OFF"},{c:"GAMER30",d:"30% OFF"},{c:"STEAM15G",d:"15% OFF"}],url:"https://store.steampowered.com"},
  {id:"g3",brand:"PlayStation",product:"PS Plus Extra — Annual",desc:"400+ PS4 & PS5 games · Online multiplayer · 100GB cloud storage",category:"Gaming",
   orig:"$134.99",disc:"$94.49",saved:"$40.50",pct:30,r:4.5,rv:"789k",min:"₹0",exp:"31 Mar 2026",use:"9.8k",hot:true,
   codes:[{c:"PSPLUS30",d:"30% OFF"},{c:"PSGOLD20",d:"20% OFF"},{c:"PS15EXTRA",d:"15% OFF"}],url:"https://playstation.com"},
  // HEALTH
  {id:"h1",brand:"Cult.fit",product:"Monthly Membership",desc:"Unlimited gym, yoga, HIIT, cycle & boxing at 1000+ centres",category:"Health",
   orig:"₹2,499",disc:"₹1,249",saved:"₹1,250",pct:50,r:4.4,rv:"312k",min:"₹0",exp:"31 Jan 2026",use:"7.6k",hot:true,
   codes:[{c:"CULTFIT50",d:"50% OFF"},{c:"CULTJOIN30",d:"30% OFF"},{c:"CULT20",d:"20% OFF"}],url:"https://cult.fit"},
  {
    id: "h2", brand: "Healthkart", product: "Protein Supplements", desc: "MuscleBlaze, GNC, Optimum Nutrition — Whey & Mass Gainer", category: "Health",
    orig: "₹3,499", disc: "₹2,099", saved: "₹1,400", pct: 40, r: 4.3, rv: "189k", min: "₹1,000", exp: "28 Feb 2026", use: "5.2k",
    codes: [{ c: "HK40PROTEIN", d: "40% OFF" }, { c: "HKFIT25", d: "25% OFF" }, { c: "HEALTH15", d: "15% OFF" }, { c: "HK10MRP", d: "10% OFF" }], url: "https://healthkart.com",
    hot: false
  },
  {
    id: "h3", brand: "PharmEasy", product: "Medicine & Healthcare", desc: "Prescription & OTC medicines · Lab tests · Free delivery above ₹500", category: "Health",
    orig: "₹1,000", disc: "₹750", saved: "₹250", pct: 25, r: 4.2, rv: "567k", min: "₹500", exp: "31 Mar 2026", use: "14.3k",
    codes: [{ c: "PHARME25", d: "25% OFF" }, { c: "PHARMDEAL20", d: "20% OFF" }, { c: "PHFREE15", d: "15% OFF" }], url: "https://pharmeasy.in",
    hot: false
  },
];

const HOT = D.filter(x=>x.hot).sort((a,b)=>b.pct-a.pct);
const CATS = ["All","🔥 Hot Deals","Tech","Fashion","Food","Travel","E-commerce","Courses","AI Tools","Gaming","Health"];

// ── Sub-components ────────────────────────────────────────────────────────────
function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="9" fill="#2563EB"/>
      <path d="M8 10H22L29 18L22 26H8V10Z" stroke="white" strokeWidth="2" fill="none" strokeLinejoin="round"/>
      <circle cx="14" cy="18" r="2.5" fill="white"/>
      <line x1="14" y1="23.5" x2="22" y2="12.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="22" cy="12.5" r="1.8" fill="white"/>
    </svg>
  );
}

function Stars({ r }: { r: number }) {
  const full = Math.round(r);
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:4}}>
      <span style={{color:"#F59E0B",fontSize:12,letterSpacing:"-0.5px"}}>
        {"★".repeat(full)}{"☆".repeat(5-full)}
      </span>
      <span style={{fontSize:12,fontWeight:600,color:C.t2}}>{r}</span>
    </span>
  );
}

function CopyBtn({ code }: { code: string }) {
  const [ok, setOk] = useState(false);
  const go = () => { navigator.clipboard.writeText(code).catch(()=>{}); setOk(true); setTimeout(()=>setOk(false),2000); };
  return (
    <button onClick={go} style={{
      display:"flex",alignItems:"center",gap:4,padding:"5px 11px",
      borderRadius:5,fontSize:12,fontWeight:600,cursor:"pointer",
      border:`1px solid ${ok?"#A7F3D0":"#CBD5E1"}`,transition:"all 0.15s",whiteSpace:"nowrap",
      background:ok?"#ECFDF5":"#F8FAFC",color:ok?"#059669":"#475569"}}>
      {ok?<Check size={11}/>:<Copy size={11}/>}{ok?"Copied!":"Copy"}
    </button>
  );
}

function CodeRow({ entry, url }: { entry: DealCode; url: string }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:7,padding:"7px 10px",borderRadius:6,
      background:"#F8FAFC",border:"1px solid #E2E8F0",marginBottom:5,flexWrap:"wrap"}}>
      <span style={{flex:1,fontFamily:"'Courier New',monospace",fontSize:13,fontWeight:800,
        color:C.t1,letterSpacing:"0.04em",minWidth:60}}>{entry.c}</span>
      <span style={{padding:"2px 7px",borderRadius:4,fontSize:11,fontWeight:700,
        background:"#FEF9C3",color:"#92400E",whiteSpace:"nowrap"}}>{entry.d}</span>
      <CopyBtn code={entry.c}/>
      <a href={url} target="_blank" rel="noopener noreferrer"
        style={{display:"flex",alignItems:"center",color:C.t3,textDecoration:"none",
          padding:"4px",borderRadius:4,transition:"color 0.12s"}}
        onMouseEnter={e=>e.currentTarget.style.color=C.accent}
        onMouseLeave={e=>e.currentTarget.style.color=C.t3}>
        <ExternalLink size={12}/>
      </a>
    </div>
  );
}

function DealCard({ deal }: { deal: Deal }) {
  const [exp, setExp] = useState(false);
  const ac = CAT_A[deal.category as keyof typeof CAT_A]||C.accent;
  const top = deal.codes[0]; const rest = deal.codes.slice(1);
  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",
      boxShadow:"0 1px 4px rgba(0,0,0,0.06)",transition:"box-shadow 0.2s"}}
      onMouseEnter={e=>e.currentTarget.style.boxShadow="0 6px 24px rgba(0,0,0,0.1)"}
      onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,0.06)"}>
      <div style={{display:"flex"}}>
        <div style={{width:4,background:ac,flexShrink:0}}/>
        <div style={{flex:1,padding:"15px 16px"}}>
          {/* Header */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:10.5,fontWeight:700,color:ac,textTransform:"uppercase",letterSpacing:"0.07em"}}>{deal.category}</span>
            <div style={{display:"flex",gap:5}}>
              {deal.hot&&<span style={{fontSize:9.5,fontWeight:700,padding:"2px 6px",borderRadius:3,background:"#FEF2F2",color:C.red}}>🔥 HOT</span>}
              <span style={{fontSize:9.5,fontWeight:700,padding:"2px 7px",borderRadius:3,background:"#ECFDF5",color:C.green}}>{deal.pct}% OFF</span>
            </div>
          </div>
          {/* Brand + product */}
          <p style={{margin:"0 0 2px",fontSize:17,fontWeight:700,color:C.t1,lineHeight:1.2}}>{deal.brand}</p>
          <p style={{margin:"0 0 3px",fontSize:13,fontWeight:500,color:C.t2}}>{deal.product}</p>
          <p style={{margin:"0 0 8px",fontSize:12,color:C.t3,lineHeight:1.5}}>{deal.desc}</p>
          {/* Rating */}
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
            <Stars r={deal.r}/>
            <span style={{fontSize:12,color:C.t3}}>({deal.rv} ratings)</span>
          </div>
          {/* Pricing */}
          <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:3,flexWrap:"wrap"}}>
            <span style={{fontSize:22,fontWeight:800,color:C.t1}}>{deal.disc}</span>
            <span style={{fontSize:14,color:C.t3,textDecoration:"line-through"}}>{deal.orig}</span>
          </div>
          <p style={{margin:"0 0 12px",fontSize:12,fontWeight:600,color:C.green}}>You save {deal.saved}</p>
          <div style={{height:1,background:"#F1F5F9",margin:"0 0 12px"}}/>
          {/* Best code */}
          <p style={{margin:"0 0 6px",fontSize:10.5,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:"0.07em"}}>Best code found</p>
          <CodeRow entry={top} url={deal.url}/>
          {rest.length>0&&<>
            <button onClick={()=>setExp(e=>!e)} style={{
              display:"flex",alignItems:"center",gap:4,padding:"4px 0",
              background:"transparent",border:"none",cursor:"pointer",
              fontSize:12,fontWeight:600,color:ac,transition:"opacity 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.65"}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              {exp?<ChevronUp size={12}/>:<ChevronDown size={12}/>}
              {exp?"Hide codes":`Show ${rest.length} more code${rest.length>1?"s":""}`}
            </button>
            {exp&&<div style={{marginTop:6}}>{rest.map((en: DealCode, i: number)=><CodeRow key={i} entry={en} url={deal.url}/>)}</div>}
          </>}
          {/* Meta */}
          <div style={{height:1,background:"#F1F5F9",margin:"12px 0 10px"}}/>
          <div style={{display:"flex",flexWrap:"wrap",gap:"6px 14px"}}>
            <span style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:C.t2}}>
              <Shield size={10} color={C.t3}/> Min: {deal.min}
            </span>
            <span style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:C.t2}}>
              <Clock size={10} color={C.t3}/> Expires {deal.exp}
            </span>
            <span style={{display:"flex",alignItems:"center",gap:4,fontSize:11,fontWeight:600,color:C.green}}>
              <Users size={10}/> {deal.use} used today
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LuckyModal({ deal, onClose, onReroll }: { deal: Deal; onClose: () => void; onReroll: () => void; }) {
  if (!deal) return null;
  const ac = CAT_A[deal.category as keyof typeof CAT_A]||C.accent;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(5px)",
      display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:20}}
      onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:C.card,borderRadius:12,maxWidth:460,width:"100%",
        boxShadow:"0 24px 60px rgba(0,0,0,0.25)",overflow:"hidden",animation:"slideUp 0.25s ease"}}>
        <div style={{background:C.hdr,padding:"18px 22px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:26}}>🎲</span>
            <div>
              <p style={{margin:0,fontSize:17,fontWeight:700,color:"#fff"}}>Lucky Dip</p>
              <p style={{margin:0,fontSize:11,color:"rgba(255,255,255,0.45)"}}>Random deal from the vault</p>
            </div>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.08)",border:"none",
            borderRadius:6,padding:"6px 8px",cursor:"pointer",display:"flex",alignItems:"center"}}>
            <X size={14} color="rgba(255,255,255,0.6)"/>
          </button>
        </div>
        <div style={{padding:"20px 22px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:10.5,fontWeight:700,color:ac,textTransform:"uppercase",letterSpacing:"0.07em"}}>{deal.category}</span>
            <span style={{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:3,background:"#ECFDF5",color:C.green}}>{deal.pct}% OFF</span>
          </div>
          <p style={{margin:"0 0 2px",fontSize:20,fontWeight:700,color:C.t1}}>{deal.brand}</p>
          <p style={{margin:"0 0 3px",fontSize:13,fontWeight:500,color:C.t2}}>{deal.product}</p>
          <p style={{margin:"0 0 10px",fontSize:12,color:C.t3,lineHeight:1.5}}>{deal.desc}</p>
          <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:2}}>
            <span style={{fontSize:24,fontWeight:800,color:C.t1}}>{deal.disc}</span>
            <span style={{fontSize:14,color:C.t3,textDecoration:"line-through"}}>{deal.orig}</span>
          </div>
          <p style={{margin:"0 0 14px",fontSize:12,fontWeight:600,color:C.green}}>You save {deal.saved}</p>
          <div style={{background:"#F8FAFC",borderRadius:8,padding:"12px 12px 6px",marginBottom:14,border:`1px solid ${C.border}`}}>
            <p style={{margin:"0 0 8px",fontSize:10.5,fontWeight:700,color:C.t3,textTransform:"uppercase",letterSpacing:"0.07em"}}>All codes found</p>
            {deal.codes.map((en: DealCode, i: number)=><CodeRow key={i} entry={en} url={deal.url}/>)}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={onReroll} style={{
              flex:1,padding:"10px",borderRadius:6,border:`1px solid ${C.border}`,
              background:"#F8FAFC",color:C.t2,fontSize:13,fontWeight:600,
              cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,
              transition:"background 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.background="#F1F5F9"}
              onMouseLeave={e=>e.currentTarget.style.background="#F8FAFC"}>
              <Shuffle size={13}/> Re-roll
            </button>
            <a href={deal.url} target="_blank" rel="noopener noreferrer" style={{
              flex:1,padding:"10px",borderRadius:6,border:"none",
              background:C.accent,color:"#fff",fontSize:13,fontWeight:600,
              cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,
              textDecoration:"none",transition:"background 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.background="#1E40AF"}
              onMouseLeave={e=>e.currentTarget.style.background=C.accent}>
              <ExternalLink size={13}/> Visit Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("best");
  const [lucky, setLucky] = useState<Deal | null>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
    const s = document.createElement("style");
    s.textContent=`*{font-family:'Inter','Segoe UI',system-ui,sans-serif!important}
      input::placeholder{color:#9CA3AF!important}
      @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      ::-webkit-scrollbar{width:5px;height:4px}::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:4px}`;
    document.head.appendChild(s);
    return ()=>{document.head.removeChild(link);document.head.removeChild(s);};
  }, []);

  const results = useMemo(()=>{
    let pool = tab==="🔥 Hot Deals"?HOT:tab==="All"?D:D.filter(x=>x.category===tab);
    if(q.trim()){const lq=q.toLowerCase();pool=pool.filter(x=>x.brand.toLowerCase().includes(lq)||x.product.toLowerCase().includes(lq)||x.category.toLowerCase().includes(lq)||x.codes.some(e=>e.c.toLowerCase().includes(lq)));}
    return [...pool].sort((a,b)=>sort==="best"?b.pct-a.pct:a.pct-b.pct);
  },[tab,q,sort]);

  const dip=()=>setLucky(D[Math.floor(Math.random()*D.length)]);

  return (
    <div style={{minHeight:"100vh",background:C.bg}}>
      {/* ── Header ───────────────────────────────────────────────── */}
      <div style={{background:C.hdr,padding:"0 20px",boxShadow:"0 2px 8px rgba(0,0,0,0.4)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",gap:14,padding:"12px 0",flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0,cursor:"default"}}>
            <Logo/>
            <div>
              <p style={{margin:0,fontSize:19,fontWeight:800,color:"#fff",letterSpacing:"-0.03em",lineHeight:1.1}}>
                Coupon<span style={{color:"#60A5FA"}}>Miner</span>
              </p>
              <p style={{margin:0,fontSize:8.5,fontWeight:500,color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:"0.12em"}}>Find Every Deal</p>
            </div>
          </div>
          <div style={{flex:1,minWidth:180,position:"relative"}}>
            <Search size={14} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#9CA3AF",pointerEvents:"none"}}/>
            <input type="text" value={q} onChange={e=>setQ(e.target.value)}
              placeholder="Search brand, product, or promo code…"
              style={{width:"100%",height:42,paddingLeft:36,boxSizing:"border-box",
                background:"#fff",border:"none",borderRadius:6,fontSize:14,color:C.t1,outline:"none"}}/>
          </div>
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{
            height:42,padding:"0 12px",borderRadius:6,fontSize:13,fontWeight:600,
            cursor:"pointer",border:"none",background:"rgba(255,255,255,0.09)",color:"#fff",flexShrink:0}}>
            <option value="best" style={{background:"#1e293b",color:"#fff"}}>↓ Best Discount First</option>
            <option value="low" style={{background:"#1e293b",color:"#fff"}}>↑ Lowest Discount First</option>
          </select>
          <button onClick={dip} style={{
            display:"flex",alignItems:"center",gap:7,height:42,padding:"0 18px",
            borderRadius:6,border:"none",cursor:"pointer",fontSize:13,fontWeight:700,
            background:C.accent,color:"#fff",flexShrink:0,transition:"background 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.background="#1E40AF"}
            onMouseLeave={e=>e.currentTarget.style.background=C.accent}>
            <Shuffle size={14}/> Lucky Dip
          </button>
        </div>
      </div>

      {/* ── Category tabs ────────────────────────────────────────── */}
      <div style={{background:"#fff",borderBottom:`1px solid ${C.border}`,overflowX:"auto",
        boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",padding:"0 20px"}}>
          {CATS.map(c=>{
            const active=tab===c;
            const isHot=c==="🔥 Hot Deals";
            const ac=isHot?C.red:(CAT_A[c as keyof typeof CAT_A]||C.accent);
            return(
              <button key={c} onClick={()=>setTab(c)} style={{
                padding:"11px 14px",fontSize:13,fontWeight:active?700:400,
                background:"transparent",border:"none",cursor:"pointer",whiteSpace:"nowrap",
                color:active?ac:C.t2,
                borderBottom:`2.5px solid ${active?ac:"transparent"}`,
                transition:"all 0.15s"}}>
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"22px 20px 80px"}}>
        {tab==="🔥 Hot Deals"&&(
          <div style={{background:"linear-gradient(135deg,#7F1D1D,#B91C1C)",borderRadius:8,
            padding:"16px 22px",marginBottom:20,display:"flex",alignItems:"center",gap:14,
            boxShadow:"0 4px 16px rgba(185,28,28,0.2)"}}>
            <span style={{fontSize:28,flexShrink:0}}>🔥</span>
            <div>
              <p style={{margin:0,fontSize:18,fontWeight:700,color:"#fff"}}>Hottest Deals Right Now</p>
              <p style={{margin:"3px 0 0",fontSize:13,color:"rgba(255,255,255,0.7)"}}>Highest-value promo codes currently active across all platforms</p>
            </div>
          </div>
        )}
        <p style={{margin:"0 0 16px",fontSize:13,color:C.t2}}>
          Showing <strong style={{color:C.t1}}>{results.length}</strong> deal{results.length!==1?"s":""}
          {q&&<> for <span style={{color:C.accent,fontWeight:600}}>"{q}"</span></>}
        </p>
        {results.length>0
          ?<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14}}>
              {results.map(x=><DealCard key={x.id} deal={x}/>)}
            </div>
          :<div style={{textAlign:"center",padding:"80px 0",color:C.t3}}>
              <div style={{fontSize:44,marginBottom:10}}>🔍</div>
              <p style={{fontSize:17,fontWeight:600,color:C.t2,margin:"0 0 5px"}}>No results found</p>
              <p style={{fontSize:13,margin:0}}>Try a different search term or category</p>
            </div>
        }
      </div>

      <div style={{position:"fixed",bottom:12,right:16,fontSize:9.5,fontWeight:700,
        color:"rgba(0,0,0,0.1)",letterSpacing:"0.18em",textTransform:"uppercase",
        pointerEvents:"none",userSelect:"none"}}>MUKHIYA</div>

      <LuckyModal deal={lucky} onClose={()=>setLucky(null)} onReroll={dip}/>
    </div>
  );
}
