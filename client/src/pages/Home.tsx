/**
 * Sophia Candles — Shoppable Category Storefront
 * Interface: monochrome, tactile, soft-edge catalogue. All photography is supplied by the user; no generated/third-party product image is used.
 * Commerce: sale pricing shown only as directly supplied by the user; cart is front-end functional and checkout transparently awaits Shopify setup.
 */
import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, Minus, Plus, Search, ShoppingBag, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const logo = "/manus-storage/sophia-official-logo_aa513219.png";
const images = {
  teddyGift: "/manus-storage/teddy-bloom-gift-candle_0514c0a4.png",
  teddyBowl: "/manus-storage/teddy-bloom-bowl-candle_282e78aa.png",
  blueFavors: "/manus-storage/sophia-blue-favors_56cbaaf4.webp",
  heartBouquet: "/manus-storage/sophia-bouquet-heart-note_2e960724.webp",
  pastelWrap: "/manus-storage/sophia-bouquet-lilac-wrap_9887cd09.webp",
  roseBox: "/manus-storage/sophia-bouquet-rose-box_52af8995.webp",
  pinkBloom: "/manus-storage/sophia-bouquet-pink-box_1dcc4066.webp",
  lilacCloseup: "/manus-storage/sophia-bouquet-lilac-closeup_120909be.webp",
};

type Language = "en" | "ar";
type Category = "all" | "bouquets" | "favors" | "candles";
type Product = { id: string; category: Exclude<Category, "all">; image: string; tag: string; title: string; subtitle: string; price?: number; originalPrice?: number; badge?: string };
type CartItem = { id: string; quantity: number };

const products: Record<Language, Product[]> = {
  en: [
    { id: "rose-note", category: "bouquets", image: images.heartBouquet, tag: "FLOWER BOUQUET", title: "Rose Note Candle Bouquet", subtitle: "A candle bouquet with space for your message.", price: 140, originalPrice: 180, badge: "SAVE AED 40" },
    { id: "pastel-wrap", category: "bouquets", image: images.pastelWrap, tag: "FLOWER BOUQUET", title: "Pastel Wrap Candle Bouquet", subtitle: "A soft floral candle bouquet finished in ribbon wrap.", price: 140, originalPrice: 180, badge: "SAVE AED 40" },
    { id: "rose-box", category: "bouquets", image: images.roseBox, tag: "SMALL BOUQUET", title: "Rose Box Candle Bouquet", subtitle: "A compact bloom arrangement in a keepsake box.", price: 100, originalPrice: 150, badge: "SAVE AED 50" },
    { id: "pink-bloom", category: "bouquets", image: images.pinkBloom, tag: "SMALL BOUQUET", title: "Pink Bloom Candle Bouquet", subtitle: "Soft rose candles gathered in a small floral arrangement.", price: 100, originalPrice: 150, badge: "SAVE AED 50" },
    { id: "lilac-bloom", category: "bouquets", image: images.lilacCloseup, tag: "SMALL BOUQUET", title: "Lilac Bloom Candle Bouquet", subtitle: "Pastel candle flowers in a soft gifting wrap.", price: 100, originalPrice: 150, badge: "SAVE AED 50" },
    { id: "teddy-gift", category: "candles", image: images.teddyGift, tag: "CANDLE", title: "Teddy Bloom Gift Candle", subtitle: "A handmade keepsake in a clear gift box." },
    { id: "teddy-bowl", category: "candles", image: images.teddyBowl, tag: "CANDLE", title: "Teddy Bloom Bowl Candle", subtitle: "A soft sculptural candle scene for gifting." },
    { id: "blue-favors", category: "favors", image: images.blueFavors, tag: "FAVORS", title: "Blue Bloom Celebration Favors", subtitle: "Small ribbon-tied pieces for a special table." },
  ],
  ar: [
    { id: "rose-note", category: "bouquets", image: images.heartBouquet, tag: "باقات ورود", title: "باقة شموع ورد مع بطاقة", subtitle: "باقة شموع مع مساحة لرسالتك.", price: 140, originalPrice: 180, badge: "خصم AED 40" },
    { id: "pastel-wrap", category: "bouquets", image: images.pastelWrap, tag: "باقات ورود", title: "باقة شموع ورد باستيل", subtitle: "باقة ورد شموع ناعمة بتغليف وشريط رقيق.", price: 140, originalPrice: 180, badge: "خصم AED 40" },
    { id: "rose-box", category: "bouquets", image: images.roseBox, tag: "باقة صغيرة", title: "باقة شموع ورد في علبة", subtitle: "تنسيق ورد شمعي صغير داخل علبة مميزة.", price: 100, originalPrice: 150, badge: "خصم AED 50" },
    { id: "pink-bloom", category: "bouquets", image: images.pinkBloom, tag: "باقة صغيرة", title: "باقة شموع ورد وردية", subtitle: "ورد شمعي ناعم متجمع في تنسيق صغير.", price: 100, originalPrice: 150, badge: "خصم AED 50" },
    { id: "lilac-bloom", category: "bouquets", image: images.lilacCloseup, tag: "باقة صغيرة", title: "باقة شموع ورد ليلكي", subtitle: "ورود شموع باستيل في تغليف هدايا ناعم.", price: 100, originalPrice: 150, badge: "خصم AED 50" },
    { id: "teddy-gift", category: "candles", image: images.teddyGift, tag: "شموع", title: "شمعة Teddy Bloom في علبة هدايا", subtitle: "قطعة يدوية مميزة داخل علبة هدايا شفافة." },
    { id: "teddy-bowl", category: "candles", image: images.teddyBowl, tag: "شموع", title: "شمعة Teddy Bloom في وعاء", subtitle: "مشهد شموع فني ناعم للهدية." },
    { id: "blue-favors", category: "favors", image: images.blueFavors, tag: "توزيعات", title: "توزيعات Blue Bloom", subtitle: "قطع صغيرة بشريط رقيق لسفرة مناسبتك." },
  ],
};

const copy = {
  en: {
    dir: "ltr", announcement: "SPECIAL BOUQUET OFFERS · HANDMADE IN THE UAE", delivery: "Thoughtful gifts, made by hand.", search: "Search", bag: "Bag", menu: "Open menu", close: "Close menu",
    nav: "Shop all", categoryIntro: "SHOP BY CATEGORY", categoryTitle: "Gifts that hold the moment.", categoryButton: "Explore", categories: [
      { id: "bouquets" as Category, title: "Flower Bouquets", detail: "Wax flowers, gathered by hand", image: images.lilacCloseup },
      { id: "favors" as Category, title: "Favors", detail: "Little welcome gestures", image: images.blueFavors },
      { id: "candles" as Category, title: "Candles", detail: "Sculptural pieces to keep", image: images.teddyBowl },
    ],
    bestKicker: "THE SOPHIA EDIT", bestTitle: "Most loved gifts", bestSub: "Four small stories in wax, ribbon and flowers.", allProducts: "Shop all products", add: "Add to bag", unavailable: "Price coming soon", request: "Enquire", offerKicker: "FOR A SHORT WHILE", offerTitle: "Bouquet offers", offerSub: "Hand-finished bouquets, with a softer price for now.", viewOffers: "See bouquet offers", was: "was", checkout: "Proceed to checkout", cartTitle: "Your bag", cartEmpty: "Your bag is waiting for something beautiful.", cartEmptyCta: "Explore bouquets", subtotal: "Subtotal", cartNote: "Delivery and checkout will be confirmed next.", checkoutToast: "Checkout is ready to connect", checkoutDescription: "Please confirm the Shopify store to activate secure checkout and payments.", added: "Added to your bag", unavailableToast: "This price is being prepared", unavailableDescription: "We will add this product to the cart once its AED price is confirmed.",
    customKicker: "A MORE PERSONAL GIFT", customTitle: "Made around their moment.", customText: "For gifts with a message, wedding tables and the little detail that makes it theirs.", customCta: "Start a custom order", newsletter: "Notes from Sophia", newsletterText: "New gift ideas and collection updates, delivered quietly.", email: "Your email address", subscribe: "Subscribe", subscribeToast: "Thank you — email updates will be connected shortly.", footer: "Sophia Candles · Handmade gifting in the UAE",
  },
  ar: {
    dir: "rtl", announcement: "عروض خاصة على الباقات · مصنوع يدوياً في الإمارات", delivery: "هدايا مدروسة، مصنوعة يدوياً.", search: "بحث", bag: "الحقيبة", menu: "فتح القائمة", close: "إغلاق القائمة",
    nav: "كل المنتجات", categoryIntro: "تسوقي حسب الفئة", categoryTitle: "هدايا تحفظ معنى اللحظة.", categoryButton: "اكتشفي", categories: [
      { id: "bouquets" as Category, title: "باقات ورود", detail: "ورود شمعية مجمعة يدوياً", image: images.lilacCloseup },
      { id: "favors" as Category, title: "توزيعات", detail: "لفتات صغيرة للضيوف", image: images.blueFavors },
      { id: "candles" as Category, title: "شموع", detail: "قطع فنية تبقى", image: images.teddyBowl },
    ],
    bestKicker: "اختيارات SOPHIA", bestTitle: "الأكثر حباً", bestSub: "أربع حكايات صغيرة من الشمع والشريط والورد.", allProducts: "كل المنتجات", add: "أضيفي للحقيبة", unavailable: "السعر قريباً", request: "استفسري", offerKicker: "لفترة قصيرة", offerTitle: "عروض الباقات", offerSub: "باقات مصنوعة يدوياً بسعر ألطف لفترة محدودة.", viewOffers: "شاهدي عروض الباقات", was: "بدلاً من", checkout: "إتمام الطلب", cartTitle: "حقيبتك", cartEmpty: "حقيبتك مستنية حاجة حلوة.", cartEmptyCta: "شاهدي الباقات", subtotal: "المجموع", cartNote: "التوصيل وإتمام الطلب هيتأكدوا في الخطوة التالية.", checkoutToast: "الـcheckout جاهز للربط", checkoutDescription: "أكدي متجر Shopify عشان نفعل الدفع والـcheckout الآمن.", added: "اتضاف للحقيبة", unavailableToast: "بنجهز السعر حالياً", unavailableDescription: "هنضيف المنتج للسلة بعد تأكيد سعره بالـAED.",
    customKicker: "هدية أكثر خصوصية", customTitle: "مصنوعة للحظتهم.", customText: "لهدايا فيها رسالة، وسفرة زفاف، والتفصيلة الصغيرة اللي تخليها تخصهم.", customCta: "ابدئي طلباً مخصصاً", newsletter: "رسائل من Sophia", newsletterText: "أفكار هدايا وإصدارات جديدة، توصلك بهدوء.", email: "بريدك الإلكتروني", subscribe: "اشتركي", subscribeToast: "شكراً، هنربط تحديثات البريد قريباً.", footer: "Sophia Candles · هدايا مصنوعة يدوياً في الإمارات",
  },
};

function Logo() { return <span className="logo-crop"><img src={logo} alt="Sophia Candles" /></span>; }
const money = (price: number) => `AED ${price}`;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const t = copy[language];
  const inventory = products[language];
  const bestIds = ["rose-note", "pastel-wrap", "blue-favors", "teddy-gift"];
  const bestSellers = useMemo(() => activeCategory === "all" ? inventory.filter((product) => bestIds.includes(product.id)) : inventory.filter((product) => product.category === activeCategory), [activeCategory, inventory]);
  const offerProducts = inventory.filter((product) => ["rose-note", "pastel-wrap", "rose-box"].includes(product.id));
  const cartRows = cart.map((item) => ({ ...item, product: inventory.find((product) => product.id === item.id) })).filter((item): item is CartItem & { product: Product } => Boolean(item.product));
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartRows.reduce((sum, item) => sum + (item.product.price ?? 0) * item.quantity, 0);

  const scroll = (delta: number) => carouselRef.current?.scrollBy({ left: delta * 360, behavior: "smooth" });
  const addToCart = (product: Product) => {
    if (!product.price) { toast(t.unavailableToast, { description: t.unavailableDescription }); return; }
    setCart((previous) => previous.some((item) => item.id === product.id) ? previous.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...previous, { id: product.id, quantity: 1 }]);
    toast(t.added, { description: `${product.title} · ${money(product.price)}` });
  };
  const changeQuantity = (id: string, delta: number) => setCart((previous) => previous.flatMap((item) => item.id !== id ? [item] : item.quantity + delta > 0 ? [{ ...item, quantity: item.quantity + delta }] : []));
  const selectCategory = (category: Category) => { setActiveCategory(category); setMenuOpen(false); document.getElementById("best-sellers")?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const toggleLanguage = () => { setLanguage((previous) => previous === "en" ? "ar" : "en"); setMenuOpen(false); setActiveCategory("all"); };

  return (
    <div className="sophia-shop" dir={t.dir} data-lang={language}>
      <div className="offer-banner">{t.announcement}</div>
      <header className="shop-header">
        <div className="utility-bar"><span>{t.delivery}</span><div><button onClick={() => toast(t.search)}><Search size={13} />{t.search}</button><Sheet><SheetTrigger asChild><button className="bag-trigger"><ShoppingBag size={13} />{t.bag}<b>{itemCount}</b></button></SheetTrigger><SheetContent side={language === "ar" ? "left" : "right"} className="cart-sheet"><SheetHeader><SheetTitle>{t.cartTitle} <span>({itemCount})</span></SheetTitle><SheetDescription className="sr-only">{t.cartTitle}</SheetDescription></SheetHeader><div className="cart-items">{cartRows.length === 0 ? <div className="cart-empty"><ShoppingBag size={27} /><p>{t.cartEmpty}</p><SheetClose asChild><button onClick={() => selectCategory("bouquets")}>{t.cartEmptyCta}<ArrowUpRight size={15} /></button></SheetClose></div> : cartRows.map(({ product, quantity }) => <article key={product.id} className="cart-row"><img src={product.image} alt={product.title} /><div><p>{product.title}</p><span>{product.price ? money(product.price) : t.unavailable}</span><div className="quantity-control"><button onClick={() => changeQuantity(product.id, -1)} aria-label="Reduce quantity"><Minus size={12} /></button><b>{quantity}</b><button onClick={() => changeQuantity(product.id, 1)} aria-label="Increase quantity"><Plus size={12} /></button></div></div><button className="remove-item" onClick={() => setCart((previous) => previous.filter((item) => item.id !== product.id))} aria-label="Remove"><Trash2 size={15} /></button></article>)}</div>{cartRows.length > 0 && <div className="cart-footer"><div><span>{t.subtotal}</span><b>{money(total)}</b></div><p>{t.cartNote}</p><button onClick={() => toast(t.checkoutToast, { description: t.checkoutDescription })}>{t.checkout}<ArrowUpRight size={16} /></button></div>}</SheetContent></Sheet></div></div>
        <div className="wordmark"><button onClick={() => { setActiveCategory("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="Sophia Candles home"><Logo /></button></div>
        <div className="header-nav"><nav><button onClick={() => selectCategory("all")}>{t.nav}</button>{t.categories.map((category) => <button key={category.id} onClick={() => selectCategory(category.id)}>{category.title}</button>)}</nav><div><button className="language-switch" onClick={toggleLanguage}><span className={language === "en" ? "active" : ""}>EN</span><i /><span className={language === "ar" ? "active" : ""}>ع</span></button><button className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.close : t.menu}>{menuOpen ? <X size={18} /> : <span><i /><i /></span>}</button></div></div>
        {menuOpen && <nav className="mobile-nav"><button onClick={() => selectCategory("all")}>{t.nav}<ChevronRight size={16} /></button>{t.categories.map((category) => <button key={category.id} onClick={() => selectCategory(category.id)}>{category.title}<ChevronRight size={16} /></button>)}</nav>}
      </header>

      <main>
        <section className="category-hero"><div><p>{t.categoryIntro}</p><h1>{t.categoryTitle}</h1></div><span className="hero-seal">SC</span></section>
        <section className="category-rail" aria-label={t.categoryIntro}>{t.categories.map((category, index) => <button key={category.id} className={activeCategory === category.id ? "selected" : ""} onClick={() => selectCategory(category.id)}><img src={category.image} alt="" /><span className="category-shadow" /><div><small>0{index + 1}</small><strong>{category.title}</strong><p>{category.detail}</p><em>{t.categoryButton}<ArrowUpRight size={14} /></em></div></button>)}</section>

        <section id="best-sellers" className="bestseller-section"><div className="section-heading"><div><p>{t.bestKicker}</p><h2>{activeCategory === "all" ? t.bestTitle : t.categories.find((category) => category.id === activeCategory)?.title}</h2><span>{t.bestSub}</span></div><div className="carousel-controls"><button onClick={() => scroll(language === "ar" ? 1 : -1)} aria-label="Previous"><ArrowLeft size={17} /></button><button onClick={() => scroll(language === "ar" ? -1 : 1)} aria-label="Next"><ArrowRight size={17} /></button></div></div><div ref={carouselRef} className="best-carousel">{bestSellers.map((product) => <ProductCard key={product.id} product={product} t={t} addToCart={addToCart} />)}</div></section>

        <section id="offers" className="offers-section"><div className="offer-heading"><div><span>{t.offerKicker}</span><h2>{t.offerTitle}</h2><p>{t.offerSub}</p></div><b className="offer-stamp">SALE<br />EVENT</b></div><div className="offer-grid">{offerProducts.map((product) => <article className="offer-card" key={product.id}><div className="offer-image"><img src={product.image} alt={product.title} /><span>{product.badge}</span></div><div><p>{product.tag}</p><h3>{product.title}</h3><div className="offer-price"><b>{product.price && money(product.price)}</b><s>{product.originalPrice && money(product.originalPrice)}</s><small>{t.was}</small></div><button onClick={() => addToCart(product)}>{t.add}<ShoppingBag size={15} /></button></div></article>)}</div><button className="all-offers" onClick={() => selectCategory("bouquets")}>{t.viewOffers}<ArrowUpRight size={15} /></button></section>

        <section className="custom-strip"><div className="strip-seal">SC</div><div><p>{t.customKicker}</p><h2>{t.customTitle}</h2><span>{t.customText}</span></div><button onClick={() => toast(t.customCta, { description: t.checkoutDescription })}>{t.customCta}<ArrowUpRight size={16} /></button></section>
        <section className="newsletter"><div><span>SC</span><h2>{t.newsletter}</h2><p>{t.newsletterText}</p></div><form onSubmit={(event) => { event.preventDefault(); toast(t.subscribeToast); }}><input type="email" placeholder={t.email} aria-label={t.email} required /><button type="submit">{t.subscribe}<ArrowUpRight size={15} /></button></form></section>
      </main>
      <footer><Logo /><p>{t.footer}</p><small>© 2026 Sophia Candles</small></footer>
    </div>
  );
}

function ProductCard({ product, t, addToCart }: { product: Product; t: (typeof copy)[Language]; addToCart: (product: Product) => void }) {
  return <article className="best-card"><div className="best-image"><img src={product.image} alt={product.title} /><span>{product.tag}</span>{product.badge && <b>{product.badge}</b>}</div><div className="best-details"><p>{product.tag}</p><h3>{product.title}</h3><span>{product.subtitle}</span>{product.price ? <div className="price-row"><b>{money(product.price)}</b><s>{money(product.originalPrice ?? product.price)}</s></div> : <div className="price-row unavailable"><b>{t.unavailable}</b></div>}<button onClick={() => addToCart(product)}>{product.price ? t.add : t.request}<ShoppingBag size={14} /></button></div></article>;
}
