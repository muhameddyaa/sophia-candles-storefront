/**
 * Sophia Candles — Product Card Storefront
 * Image-first boutique commerce: each collection is a tactile card with a clear category, action, and catalogue-ready state.
 * The visual language borrows only the card hierarchy from the user's reference; Sophia stays warm, monochrome in UI, and bilingual.
 */
import { useState } from "react";
import { ArrowUpRight, ChevronRight, Instagram, Menu, Search, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";

const officialLogo = "/manus-storage/sophia-official-logo_aa513219.png";
const products = {
  teddyGift: "/manus-storage/teddy-bloom-gift-candle_0514c0a4.png",
  teddyBowl: "/manus-storage/teddy-bloom-bowl-candle_282e78aa.png",
  bouquet: "/manus-storage/sophia-hero-bouquet_557ec05c.jpg",
  sculptural: "/manus-storage/sophia-atelier-still-life_b579ade2.jpg",
  personal: "/manus-storage/sophia-personalisation_56f1a835.jpg",
  favors: "/manus-storage/sophia-celebration-table_3ed841c9.jpg",
};

type Language = "en" | "ar";

const copy = {
  en: {
    direction: "ltr",
    banner: "COMPLIMENTARY GIFT PACKAGING · MADE IN THE UAE",
    delivery: "Handmade gifting, delivered with care.",
    nav: [
      { label: "Shop all", target: "collection" },
      { label: "Candle bouquets", target: "collection" },
      { label: "Personalised gifts", target: "custom" },
      { label: "Events & favors", target: "occasions" },
    ],
    search: "Search", bag: "Bag", menu: "Open menu", close: "Close menu",
    introKicker: "THE TEDDY BLOOM EDIT",
    introTitle: "Two gifts. A little world of their own.",
    introBody: "Meet Teddy Bloom — handmade candle scenes designed to turn one thoughtful moment into a keepsake.",
    introSide: "A small handmade gift, presented with care.",
    viewAll: "Meet Teddy Bloom",
    cardAction: "Explore",
    cards: [
      { no: "01", label: "NEW PRODUCT", title: "Teddy Bloom Gift Candle", description: "A handmade keepsake presented in a clear gift box.", image: products.teddyGift },
      { no: "02", label: "NEW PRODUCT", title: "Teddy Bloom Bowl Candle", description: "A soft, sculptural candle scene made for gifting.", image: products.teddyBowl },
    ],
    catalogueNote: "The first two Teddy Bloom pieces are here. Final product details and AED prices will follow your catalogue confirmation.",
    customKicker: "FOR THE DETAIL THAT MAKES IT THEIRS",
    customTitle: "A name. A date. A little more meaning.",
    customBody: "Build a gift around the person receiving it, from the message to the finishing detail.",
    customAction: "Start a custom order",
    occasionsKicker: "FOR WEDDINGS, WELCOMES & WORK MOMENTS",
    occasionsTitle: "Small favors. A lasting impression.",
    occasionsBody: "A considered route for reception gifts, wedding favors and corporate gifting. Your occasion comes first; every candle follows its story.",
    occasionsAction: "Plan your occasion",
    studioTitle: "From the Sophia atelier",
    studioBody: "Follow along for new pieces, handmade moments and the details behind the gift.",
    studioAction: "See the studio on Instagram",
    newsletterTitle: "A note from Sophia, now and then.",
    newsletterBody: "New collection previews and thoughtful gifting ideas, quietly delivered.",
    email: "Email address", subscribe: "Subscribe",
    toastTitle: "This collection is being prepared.",
    toastBody: "Product details, AED prices and WhatsApp ordering will be connected once the catalogue is confirmed.",
    subscribeToast: "Thank you — email updates will be connected shortly.",
    footer: "Sophia Candles · Handmade gifting in the UAE",
  },
  ar: {
    direction: "rtl",
    banner: "تغليف هدايا مجاني · مصنوع في الإمارات",
    delivery: "هدايا مصنوعة بعناية، تصل بدفء.",
    nav: [
      { label: "كل المنتجات", target: "collection" },
      { label: "بوكيهات الشموع", target: "collection" },
      { label: "هدايا مخصصة", target: "custom" },
      { label: "مناسبات وضيافة", target: "occasions" },
    ],
    search: "بحث", bag: "الحقيبة", menu: "فتح القائمة", close: "إغلاق القائمة",
    introKicker: "تشكيلة TEDDY BLOOM",
    introTitle: "هديتان. وعالم صغير خاص بهما.",
    introBody: "تعرفي على Teddy Bloom — مشاهد شموع مصنوعة يدوياً لتحول لحظة مدروسة إلى ذكرى تبقى.",
    introSide: "هدية صغيرة مصنوعة يدوياً، مقدمة بعناية.",
    viewAll: "تعرفي على Teddy Bloom",
    cardAction: "اكتشفي",
    cards: [
      { no: "01", label: "منتج جديد", title: "شمعة Teddy Bloom في علبة هدايا", description: "قطعة يدوية مميزة داخل علبة هدايا شفافة.", image: products.teddyGift },
      { no: "02", label: "منتج جديد", title: "شمعة Teddy Bloom في وعاء", description: "مشهد شموع ناعم وفني، جاهز كهدية.", image: products.teddyBowl },
    ],
    catalogueNote: "أول قطعتين من Teddy Bloom موجودين الآن. تفاصيل المنتجات النهائية وأسعار الـAED هتضاف بعد اعتماد الكتالوج.",
    customKicker: "للتفصيلة اللي تخليها تخصهم",
    customTitle: "اسم. تاريخ. ومعنى أكثر.",
    customBody: "نصنع الهدية حول الشخص الذي سيستلمها، من الرسالة وحتى اللمسة الأخيرة.",
    customAction: "ابدئي طلباً مخصصاً",
    occasionsKicker: "للأعراس والاستقبال وهدايا الشركات",
    occasionsTitle: "هدايا صغيرة. أثر يبقى.",
    occasionsBody: "مسار مرتب لهدايا الاستقبال والزفاف والشركات. مناسبتك هي البداية، وكل شمعة تكمل حكايتها.",
    occasionsAction: "خططي لمناسبتك",
    studioTitle: "من أتيليه Sophia",
    studioBody: "تابعي القطع الجديدة واللحظات اليدوية والتفاصيل التي تصنع الهدية.",
    studioAction: "شاهدي الأتيليه على إنستجرام",
    newsletterTitle: "رسالة من Sophia، من وقت للتاني.",
    newsletterBody: "لمحات من المجموعات الجديدة وأفكار هدايا مدروسة، توصلك بهدوء.",
    email: "بريدك الإلكتروني", subscribe: "اشتركي",
    toastTitle: "المجموعة دي بنجهزها حالياً.",
    toastBody: "هنضيف تفاصيل المنتجات وأسعار الـAED وطريقة الطلب على واتساب بعد اعتماد الكتالوج.",
    subscribeToast: "شكراً، هنربط تحديثات البريد قريباً.",
    footer: "Sophia Candles · هدايا مصنوعة يدوياً في الإمارات",
  },
};

function scrollToSection(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }
function OfficialLogo({ alt = "Sophia Candles" }: { alt?: string }) { return <span className="official-logo-wrap"><img className="official-logo" src={officialLogo} alt={alt} /></span>; }

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];
  const unavailable = () => toast(t.toastTitle, { description: t.toastBody });
  const goTo = (target: string) => { setMenuOpen(false); scrollToSection(target); };
  const switchLanguage = () => { setLanguage((previous) => previous === "en" ? "ar" : "en"); setMenuOpen(false); };

  return (
    <div className="sophia-store" dir={t.direction} data-lang={language}>
      <div className="store-banner">{t.banner}</div>
      <header className="store-header">
        <div className="header-utility"><span>{t.delivery}</span><div><button onClick={() => toast(t.search, { description: t.toastBody })}><Search size={12} />{t.search}</button><button onClick={unavailable}><ShoppingBag size={12} />{t.bag}</button></div></div>
        <div className="logo-line"><button onClick={() => scrollToSection("top")} aria-label="Sophia Candles home"><OfficialLogo /></button></div>
        <div className="navigation-line"><nav aria-label="Primary navigation">{t.nav.map((item) => <button key={item.label} onClick={() => goTo(item.target)}>{item.label}</button>)}</nav><div className="navigation-actions"><button className="language-toggle" onClick={switchLanguage} aria-label="Switch language"><span className={language === "en" ? "active" : ""}>EN</span><i /><span className={language === "ar" ? "active" : ""}>ع</span></button><button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.close : t.menu}>{menuOpen ? <X size={17} /> : <Menu size={18} />}</button></div></div>
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{t.nav.map((item) => <button key={item.label} onClick={() => goTo(item.target)}>{item.label}<ChevronRight size={16} /></button>)}</nav>}
      </header>

      <main id="top">
        <section className="store-intro" aria-labelledby="collection-heading"><div><p>{t.introKicker}</p><h1 id="collection-heading">{t.introTitle}</h1><span>{t.introBody}</span></div><aside><b>SC</b><p>{t.introSide}</p><button onClick={() => goTo("collection")}>{t.viewAll}<ArrowUpRight size={15} /></button></aside></section>

        <section id="collection" className="catalogue-grid section-anchor" aria-label="Sophia product collection"><div className="featured-strip"><span>01 — TEDDY BLOOM</span><p>{t.introSide}</p></div>{t.cards.map((card) => <article className="collection-card" key={card.no}><button className="collection-image" onClick={unavailable} aria-label={card.title}><img src={card.image} alt={card.title} /><span>{card.no}</span><i><ArrowUpRight size={17} /></i></button><div className="collection-info"><div><p>{card.no} · {card.label}</p><h2>{card.title}</h2><span>{card.description}</span></div><button onClick={unavailable}>{t.cardAction}<ArrowUpRight size={14} /></button></div></article>)}</section>
        <p className="catalogue-note">{t.catalogueNote}</p>

        <section id="custom" className="detail-section custom-section section-anchor"><div className="detail-index"><span>01</span><i /></div><div className="detail-content"><p>{t.customKicker}</p><h2>{t.customTitle}</h2><span>{t.customBody}</span><button onClick={unavailable}>{t.customAction}<ArrowUpRight size={16} /></button></div><div className="monogram" aria-hidden="true"><b>S</b><i /><b>C</b></div></section>
        <section id="occasions" className="detail-section occasion-section section-anchor"><div className="detail-index"><span>02</span><i /></div><div className="detail-content"><p>{t.occasionsKicker}</p><h2>{t.occasionsTitle}</h2><span>{t.occasionsBody}</span><button onClick={unavailable}>{t.occasionsAction}<ArrowUpRight size={16} /></button></div><div className="occasion-ornament" aria-hidden="true"><i /><i /><i /></div></section>

        <section className="studio-section"><div className="studio-seal">SC</div><p>STUDIO NOTE</p><h2>{t.studioTitle}</h2><span>{t.studioBody}</span><a href="https://www.instagram.com/sophiacandles.ae/" target="_blank" rel="noreferrer">{t.studioAction}<Instagram size={15} /></a></section>
        <section className="email-section"><div><h2>{t.newsletterTitle}</h2><p>{t.newsletterBody}</p></div><form onSubmit={(event) => { event.preventDefault(); toast(t.subscribeToast); }}><input type="email" placeholder={t.email} aria-label={t.email} required /><button type="submit">{t.subscribe}<ArrowUpRight size={15} /></button></form></section>
      </main>
      <footer className="store-footer"><OfficialLogo /><p>{t.footer}</p><small>© 2026 Sophia Candles</small></footer>
    </div>
  );
}
