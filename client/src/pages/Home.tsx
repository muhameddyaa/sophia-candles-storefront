/**
 * Sophia Candles — Category-First Storefront
 * Design reminder: lead with three user-defined categories and a generous product grid; content remains clear, direct, and catalogue-led.
 * UI is black, white, and neutral grey; every product image stays in its supplied natural colour.
 */
import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronRight, Instagram, Menu, Search, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";

const officialLogo = "/manus-storage/sophia-official-logo_aa513219.png";
const imagery = {
  teddyGift: "/manus-storage/teddy-bloom-gift-candle_0514c0a4.png",
  teddyBowl: "/manus-storage/teddy-bloom-bowl-candle_282e78aa.png",
  bouquet: "/manus-storage/sophia-hero-bouquet_557ec05c.jpg",
  studio: "/manus-storage/sophia-atelier-still-life_b579ade2.jpg",
  personal: "/manus-storage/sophia-personalisation_56f1a835.jpg",
  favors: "/manus-storage/sophia-celebration-table_3ed841c9.jpg",
};

type Language = "en" | "ar";
type Category = "all" | "bouquets" | "favors" | "candles";

const products = {
  en: [
    { id: "teddy-gift", category: "candles" as Category, tag: "NEW", title: "Teddy Bloom Gift Candle", subtitle: "A keepsake presented in a clear gift box.", image: imagery.teddyGift },
    { id: "teddy-bowl", category: "candles" as Category, tag: "NEW", title: "Teddy Bloom Bowl Candle", subtitle: "A soft sculptural scene made for gifting.", image: imagery.teddyBowl },
    { id: "peony-bouquet", category: "bouquets" as Category, tag: "FLOWER BOUQUET", title: "Peony Candle Bouquet", subtitle: "Wax florals gathered as a thoughtful gift.", image: imagery.bouquet },
    { id: "bloom-piece", category: "candles" as Category, tag: "CANDLE", title: "Bloom Sculptural Candle", subtitle: "Made by hand for a beautiful small moment.", image: imagery.personal },
    { id: "petite-favors", category: "favors" as Category, tag: "FAVORS", title: "Petite Celebration Favors", subtitle: "Small handmade gestures for your table.", image: imagery.favors },
    { id: "atelier-bouquet", category: "bouquets" as Category, tag: "FLOWER BOUQUET", title: "Atelier Flower Candle", subtitle: "A delicate wax bloom for gifting and keeping.", image: imagery.studio },
  ],
  ar: [
    { id: "teddy-gift", category: "candles" as Category, tag: "جديد", title: "شمعة Teddy Bloom في علبة هدايا", subtitle: "قطعة مميزة داخل علبة هدايا شفافة.", image: imagery.teddyGift },
    { id: "teddy-bowl", category: "candles" as Category, tag: "جديد", title: "شمعة Teddy Bloom في وعاء", subtitle: "مشهد شموع فني ناعم، جاهز كهدية.", image: imagery.teddyBowl },
    { id: "peony-bouquet", category: "bouquets" as Category, tag: "باقات ورود", title: "باقة شموع بيوني", subtitle: "ورد شمعي متجمع كهدية مدروسة.", image: imagery.bouquet },
    { id: "bloom-piece", category: "candles" as Category, tag: "شموع", title: "شمعة Bloom الفنية", subtitle: "مصنوعة يدوياً للحظات الصغيرة الحلوة.", image: imagery.personal },
    { id: "petite-favors", category: "favors" as Category, tag: "توزيعات", title: "توزيعات احتفال صغيرة", subtitle: "لفتات يدوية صغيرة لسفرتك ومناسبتك.", image: imagery.favors },
    { id: "atelier-bouquet", category: "bouquets" as Category, tag: "باقات ورود", title: "شمعة ورد من الأتيليه", subtitle: "وردة شمعية رقيقة للهدية والذكرى.", image: imagery.studio },
  ],
};

const copy = {
  en: {
    direction: "ltr", announcement: "COMPLIMENTARY GIFT PACKAGING · HANDMADE IN THE UAE", delivery: "Thoughtful gifts, made by hand.",
    categories: [{ id: "bouquets" as Category, label: "Flower Bouquets", detail: "Wax florals, gathered by hand" }, { id: "favors" as Category, label: "Favors", detail: "Small gestures, generously felt" }, { id: "candles" as Category, label: "Candles", detail: "Sculptural pieces, made to keep" }],
    nav: ["Shop all", "Flower bouquets", "Favors", "Candles"],
    search: "Search", bag: "Bag", menu: "Open menu", close: "Close menu", heading: "Find a gift that feels like them.",
    body: "Handmade candle gifts, flower bouquets and small celebration details — all gathered in one considered collection.",
    browse: "Shop by category", collection: "Sophia’s collection", all: "All products", cards: "products", explore: "View product", showAll: "View all products",
    catalogueNote: "Product prices in AED will be added once the final catalogue is confirmed.",
    lowerTitle: "A gift made for the moment.", lowerBody: "For names, dates, wedding tables and the details that deserve to feel personal.", lowerCta: "Start a custom enquiry",
    studioTitle: "A closer look at the atelier.", studioText: "New pieces and handmade moments, shared from Sophia’s studio.", studioCta: "Follow Sophia on Instagram",
    newsletter: "Notes from the atelier", newsletterText: "New releases and gifting ideas, delivered quietly.", email: "Your email address", subscribe: "Subscribe",
    toastTitle: "Product details are being prepared.", toastBody: "AED pricing and WhatsApp ordering will be added after the catalogue is confirmed.", subscribeToast: "Thank you — email updates will be connected shortly.", footer: "Sophia Candles · Handmade gifting in the UAE",
  },
  ar: {
    direction: "rtl", announcement: "تغليف هدايا مجاني · مصنوع يدوياً في الإمارات", delivery: "هدايا مدروسة، مصنوعة يدوياً.",
    categories: [{ id: "bouquets" as Category, label: "باقات ورود", detail: "ورود شمعية مجمعة يدوياً" }, { id: "favors" as Category, label: "توزيعات", detail: "لفتات صغيرة بمعنى كبير" }, { id: "candles" as Category, label: "شموع", detail: "قطع فنية مصنوعة لتبقى" }],
    nav: ["كل المنتجات", "باقات ورود", "توزيعات", "شموع"],
    search: "بحث", bag: "الحقيبة", menu: "فتح القائمة", close: "إغلاق القائمة", heading: "اختاري هدية تشبههم.",
    body: "هدايا شموع مصنوعة يدوياً وباقات ورود شمعية وتفاصيل احتفال صغيرة — كلها في مجموعة واحدة مدروسة.",
    browse: "تسوقي حسب الفئة", collection: "مجموعة Sophia", all: "كل المنتجات", cards: "منتجات", explore: "شاهدي المنتج", showAll: "شاهدي كل المنتجات",
    catalogueNote: "هتضاف أسعار المنتجات بالـAED بعد اعتماد الكتالوج النهائي.",
    lowerTitle: "هدية للحظة التي تهم.", lowerBody: "للأسماء والتواريخ وسفرة الزفاف والتفاصيل التي تستحق أن تكون شخصية.", lowerCta: "ابدئي طلباً مخصصاً",
    studioTitle: "نظرة أقرب على الأتيليه.", studioText: "قطع جديدة ولحظات يدوية من أتيليه Sophia.", studioCta: "تابعي Sophia على إنستجرام",
    newsletter: "رسائل من الأتيليه", newsletterText: "إصدارات جديدة وأفكار هدايا، توصلك بهدوء.", email: "بريدك الإلكتروني", subscribe: "اشتركي",
    toastTitle: "بنجهز تفاصيل المنتج حالياً.", toastBody: "هنضيف أسعار الـAED وطريقة الطلب على واتساب بعد اعتماد الكتالوج.", subscribeToast: "شكراً، هنربط تحديثات البريد قريباً.", footer: "Sophia Candles · هدايا مصنوعة يدوياً في الإمارات",
  },
};

function OfficialLogo() { return <span className="official-logo-wrap"><img className="official-logo" src={officialLogo} alt="Sophia Candles" /></span>; }
function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];
  const visibleProducts = useMemo(() => activeCategory === "all" ? products[language] : products[language].filter((product) => product.category === activeCategory), [activeCategory, language]);
  const productToast = () => toast(t.toastTitle, { description: t.toastBody });
  const setCategory = (category: Category) => { setActiveCategory(category); setMenuOpen(false); scrollTo("products"); };
  const toggleLanguage = () => { setLanguage((previous) => previous === "en" ? "ar" : "en"); setActiveCategory("all"); setMenuOpen(false); };

  return (
    <div className="sophia-catalogue" dir={t.direction} data-lang={language}>
      <div className="announcement">{t.announcement}</div>
      <header className="catalogue-header">
        <div className="utility-row"><span>{t.delivery}</span><div><button onClick={() => toast(t.search, { description: t.toastBody })}><Search size={13} />{t.search}</button><button onClick={productToast}><ShoppingBag size={13} />{t.bag}</button></div></div>
        <div className="logo-row"><button onClick={() => { setActiveCategory("all"); scrollTo("top"); }} aria-label="Sophia Candles home"><OfficialLogo /></button></div>
        <div className="main-nav"><nav aria-label="Primary navigation"><button onClick={() => setCategory("all")}>{t.nav[0]}</button>{t.categories.map((category) => <button key={category.id} onClick={() => setCategory(category.id)}>{category.label}</button>)}</nav><div className="header-actions"><button className="language-toggle" onClick={toggleLanguage} aria-label="Switch language"><b className={language === "en" ? "active" : ""}>EN</b><i /><b className={language === "ar" ? "active" : ""}>ع</b></button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.close : t.menu}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button></div></div>
        {menuOpen && <div className="mobile-menu"><button onClick={() => setCategory("all")}>{t.nav[0]}<ChevronRight size={17} /></button>{t.categories.map((category) => <button key={category.id} onClick={() => setCategory(category.id)}>{category.label}<ChevronRight size={17} /></button>)}</div>}
      </header>

      <main id="top">
        <section className="catalogue-hero"><div><p>{t.collection}</p><h1>{t.heading}</h1><span>{t.body}</span></div><div className="hero-stamp"><b>SC</b><p>HANDMADE<br />IN UAE</p></div></section>
        <section className="category-section" aria-labelledby="category-heading"><div className="section-label"><span>01</span><i /><p id="category-heading">{t.browse}</p><b>SC</b></div><div className="category-tabs">{t.categories.map((category, index) => <button key={category.id} className={activeCategory === category.id ? "selected" : ""} onClick={() => setCategory(category.id)}><span className="category-number">0{index + 1}</span><span className="category-copy"><strong>{category.label}</strong><small>{category.detail}</small></span><span className="ribbon-arc" aria-hidden="true" /><ArrowUpRight size={18} /></button>)}</div></section>
        <section id="products" className="products-section"><div className="products-heading"><div><p><b>SC</b>{activeCategory === "all" ? t.all : t.categories.find((category) => category.id === activeCategory)?.label}</p><h2>{visibleProducts.length} {t.cards}</h2></div>{activeCategory !== "all" && <button onClick={() => setCategory("all")}>{t.showAll}<ArrowUpRight size={15} /></button>}</div><div className="product-grid">{visibleProducts.map((product) => <article className="product-card" key={product.id}><button className="card-image" onClick={productToast} aria-label={product.title}><img src={product.image} alt={product.title} /><span>{product.tag}</span><i><ArrowUpRight size={18} /></i></button><div className="card-details"><div><p>{product.tag}</p><h3>{product.title}</h3><span>{product.subtitle}</span></div><button onClick={productToast}>{t.explore}<ArrowUpRight size={14} /></button></div></article>)}</div><p className="catalogue-note">{t.catalogueNote}</p></section>
        <section className="custom-banner"><div className="custom-mark" aria-hidden="true"><span>S</span><i /><span>C</span></div><div><p>MADE FOR YOUR MOMENT</p><h2>{t.lowerTitle}</h2><span>{t.lowerBody}</span><button onClick={productToast}>{t.lowerCta}<ArrowUpRight size={16} /></button></div></section>
        <section className="studio-section"><div className="studio-mark">SC</div><p>FROM SOPHIA</p><h2>{t.studioTitle}</h2><span>{t.studioText}</span><a href="https://www.instagram.com/sophiacandles.ae/" target="_blank" rel="noreferrer">{t.studioCta}<Instagram size={15} /></a></section>
        <section className="newsletter"><div><h2>{t.newsletter}</h2><p>{t.newsletterText}</p></div><form onSubmit={(event) => { event.preventDefault(); toast(t.subscribeToast); }}><input type="email" required placeholder={t.email} aria-label={t.email} /><button type="submit">{t.subscribe}<ArrowUpRight size={15} /></button></form></section>
      </main>
      <footer><OfficialLogo /><p>{t.footer}</p><small>© 2026 Sophia Candles</small></footer>
    </div>
  );
}
