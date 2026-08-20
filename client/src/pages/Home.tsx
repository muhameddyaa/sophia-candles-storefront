/**
 * Sophia Candles — Modern Keepsake Commerce
 * English-first quiet luxury, graphic type, black-on-ivory contrast, and the official Sophia wordmark.
 * A clear language toggle changes both the copy and direction without duplicating the storefront.
 */
import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { toast } from "sonner";

const officialLogo = "/manus-storage/sophia-official-logo_aa513219.png";
const heroImage = "/manus-storage/sophia-hero-bouquet_557ec05c.jpg";
const atelierImage = "/manus-storage/sophia-atelier-still-life_b579ade2.jpg";
const personalisationImage = "/manus-storage/sophia-personalisation_56f1a835.jpg";
const celebrationImage = "/manus-storage/sophia-celebration-table_3ed841c9.jpg";

type Language = "en" | "ar";

const copy = {
  en: {
    direction: "ltr",
    topNote: "HANDCRAFTED · GIFT-READY · UAE",
    brandMeta: "HANDMADE GIFT ATELIER",
    nav: [
      { label: "Collections", target: "collections" },
      { label: "Personalisation", target: "personalised" },
      { label: "Occasions", target: "occasions" },
    ],
    order: "Start your order",
    menu: "Menu",
    close: "Close menu",
    heroEyebrow: "Hand-poured in the UAE",
    heroTitle: <>Gifts with a<br /><em>story to keep.</em></>,
    heroBody: "Sculptural candles, floral bouquets and personal details, made for the moments that matter most.",
    explore: "Explore the collection",
    bespoke: "Personalised orders",
    heroTag: "Sophia Gift Atelier",
    heroCaption: "Designed to be given. Made to be remembered.",
    editEyebrow: "The Sophia edit",
    editTitle: <>Choose a gift<br />that <em>feels personal.</em></>,
    editBody: "A curated space for your confirmed collections, with every product, image and AED price displayed with clarity.",
    collections: [
      { no: "01", title: "Candle bouquets", body: "Flowers in form. A keepsake in spirit.", cue: "HAND-POURED" },
      { no: "02", title: "Personalised gifting", body: "Names, dates and thoughtful details.", cue: "MADE FOR THEM" },
      { no: "03", title: "Wedding & event favors", body: "Small gestures with a lasting impression.", cue: "FOR THE TABLE" },
    ],
    personalisedEyebrow: "Make it yours",
    personalisedTitle: <>Made around<br />your <em>moment.</em></>,
    personalisedBody: "For the person, the occasion and the message you want them to hold on to. We leave room for the details that make a gift feel truly theirs.",
    personalisedCta: "Talk to us about a custom idea",
    personalisedCaption: "Every detail starts with your story.",
    catalogueEyebrow: "Coming into focus",
    catalogueTitle: <>Your collection,<br /><em>beautifully considered.</em></>,
    catalogueBody: "Once you share the final product names, images and AED prices, this space becomes your shoppable catalogue — never a generic product grid.",
    catalogueTop: "ATELIER PREVIEW",
    catalogueCardLabel: "CURATED FOR GIFTING",
    catalogueCardTitle: "Your next signature piece",
    catalogueCardMeta: "Product name · Description · AED price",
    catalogueFooter: "A considered collection, ready for your final details",
    occasionEyebrow: "For the occasion",
    occasionTitle: <>Details your<br />guests <em>remember.</em></>,
    occasionBody: "An elevated space for wedding favors, welcome gifts and corporate moments — told with a different kind of care.",
    occasionCta: "Tell us about your occasion",
    closingEyebrow: "SOPHIA CANDLES · UAE",
    closingTitle: <>The next gift you give<br />can <em>stay with them.</em></>,
    closingCta: "Begin your order",
    closingNote: "WhatsApp ordering will be connected as soon as the customer service number is confirmed.",
    footerLine: "Handmade gifting, with meaning.",
    footerCopy: "© 2026 Sophia Candles",
    toastTitle: "Orders will open here soon.",
    toastBody: "We will connect this button to Sophia Candles WhatsApp once the number is confirmed.",
  },
  ar: {
    direction: "rtl",
    topNote: "مصنوع يدوياً · جاهز للإهداء · الإمارات",
    brandMeta: "هدايا مصنوعة بعناية",
    nav: [
      { label: "المجموعات", target: "collections" },
      { label: "التخصيص", target: "personalised" },
      { label: "المناسبات", target: "occasions" },
    ],
    order: "ابدئي طلبك",
    menu: "القائمة",
    close: "إغلاق القائمة",
    heroEyebrow: "مصنوع يدوياً في الإمارات",
    heroTitle: <>هدية لها<br /><em>حكاية تبقى.</em></>,
    heroBody: "شموع وبوكيهات بتفاصيل شخصية، مصنوعة للحظات اللي تستحق أن تبقى قريبة.",
    explore: "اكتشفي المجموعة",
    bespoke: "طلبات مخصصة",
    heroTag: "Sophia Gift Atelier",
    heroCaption: "مصممة لتُهدى. مصنوعة لتُتذكر.",
    editEyebrow: "اختيارات Sophia",
    editTitle: <>اختاري هدية<br /><em>تشبههم.</em></>,
    editBody: "هنا سيكون عرض منتجاتك المعتمدة، مع الصور والأسماء والأسعار بالـAED بشكل واضح وراقي.",
    collections: [
      { no: "01", title: "بوكيهات الشموع", body: "شكل ورد، وذكرى تعيش أطول.", cue: "مصبوب يدوياً" },
      { no: "02", title: "هدايا مخصصة", body: "أسماء وتواريخ وتفاصيل محسوبة.", cue: "لهم وحدهم" },
      { no: "03", title: "هدايا الزفاف والمناسبات", body: "لفتات صغيرة تترك أثراً كبيراً.", cue: "لضيافتك" },
    ],
    personalisedEyebrow: "تفصيلة تخصهم",
    personalisedTitle: <>مصنوعة على<br /><em>لحظتهم.</em></>,
    personalisedBody: "للشخص، وللمناسبة، وللكلمة التي تريدين أن تبقى. نترك مساحة للتفاصيل التي تجعل الهدية خاصة بهم وحدهم.",
    personalisedCta: "احكي لنا عن فكرتك",
    personalisedCaption: "كل تفصيلة تبدأ من حكايتك.",
    catalogueEyebrow: "قريباً في كتالوجك",
    catalogueTitle: <>مجموعتك،<br /><em>مقدمة كما تستحق.</em></>,
    catalogueBody: "بعد إرسال أسماء المنتجات النهائية وصورها وأسعارها بالـAED، يتحول هذا المكان إلى كتالوجك الحقيقي — مش مجرد شبكة منتجات تقليدية.",
    catalogueTop: "ATELIER PREVIEW",
    catalogueCardLabel: "مُختارة للإهداء",
    catalogueCardTitle: "قطعتك المميزة القادمة",
    catalogueCardMeta: "اسم المنتج · الوصف · السعر بالـAED",
    catalogueFooter: "مجموعة مدروسة، جاهزة لتفاصيلك النهائية",
    occasionEyebrow: "للمناسبة",
    occasionTitle: <>تفاصيل يتذكرها<br /><em>ضيوفك.</em></>,
    occasionBody: "مساحة راقية لهدايا الزفاف والاستقبال والشركات — لها نبرة وعناية مختلفة.",
    occasionCta: "احكي لنا عن مناسبتك",
    closingEyebrow: "SOPHIA CANDLES · UAE",
    closingTitle: <>الهدية الجاية<br /><em>تفضل معاهم.</em></>,
    closingCta: "ابدئي طلبك",
    closingNote: "سيتم ربط الطلبات بواتساب Sophia Candles عند تأكيد رقم خدمة العملاء.",
    footerLine: "هدايا مصنوعة بمعنى.",
    footerCopy: "© 2026 Sophia Candles",
    toastTitle: "الطلبات هتفتح من هنا قريباً.",
    toastBody: "هنربط الزر بواتساب Sophia Candles بمجرد تأكيد الرقم.",
  },
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function OfficialLogo({ alt = "Sophia Candles" }: { alt?: string }) {
  return (
    <span className="official-logo-wrap">
      <img className="official-logo" src={officialLogo} alt={alt} />
    </span>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];

  const showOrderToast = () => toast(t.toastTitle, { description: t.toastBody });
  const navigate = (target: string) => {
    setMenuOpen(false);
    scrollToSection(target);
  };
  const toggleLanguage = () => {
    setLanguage((current) => (current === "en" ? "ar" : "en"));
    setMenuOpen(false);
  };

  return (
    <div className="sophia-site" dir={t.direction} data-lang={language}>
      <div className="announcement-bar">{t.topNote}</div>
      <header className="site-header">
        <div className="header-inner">
          <button className="logo-button" onClick={() => scrollToSection("top")} aria-label="Sophia Candles home">
            <span className="brand-lockup"><OfficialLogo /><small>{t.brandMeta}</small></span>
          </button>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {t.nav.map((item) => <button key={item.target} onClick={() => navigate(item.target)}>{item.label}</button>)}
          </nav>

          <div className="header-actions">
            <button className="language-switch" onClick={toggleLanguage} aria-label="Switch website language">
              <span className={language === "en" ? "active" : ""}>EN</span><i />
              <span className={language === "ar" ? "active" : ""}>ع</span>
            </button>
            <button className="order-button desktop-order" onClick={showOrderToast}>{t.order}<ArrowUpRight size={15} /></button>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? t.close : t.menu}>
              {menuOpen ? <X size={20} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            {t.nav.map((item) => <button key={item.target} onClick={() => navigate(item.target)}>{item.label}<ArrowUpRight size={16} /></button>)}
            <button onClick={showOrderToast}>{t.order}<ArrowUpRight size={16} /></button>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow"><span />{t.heroEyebrow}</p>
            <h1 id="hero-heading">{t.heroTitle}</h1>
            <p className="hero-description">{t.heroBody}</p>
            <div className="hero-actions">
              <button className="order-button" onClick={() => scrollToSection("collections")}>{t.explore}<ArrowDownRight size={16} /></button>
              <button className="text-button" onClick={() => scrollToSection("personalised")}>{t.bespoke}<ArrowUpRight size={16} /></button>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-index">01 <span> / THE GIFT EDIT</span></div>
            <img src={heroImage} alt="Sophia Candles candle bouquet gift arrangement" />
            <div className="hero-sticker"><span>SC</span><p>{t.heroTag}</p></div>
            <p className="hero-caption">{t.heroCaption}</p>
            <div className="ribbon-mark hero-ribbon" aria-hidden="true" />
          </div>
        </section>

        <section id="collections" className="collections-section section-anchor" aria-labelledby="collection-heading">
          <div className="section-topline"><span>01 — 03</span><span className="section-seal">SC</span><span>{t.editEyebrow}</span></div>
          <div className="collection-intro">
            <div><p className="eyebrow"><span />{t.editEyebrow}</p><h2 id="collection-heading">{t.editTitle}</h2></div>
            <p>{t.editBody}</p>
          </div>
          <div className="collection-list">
            {t.collections.map((item) => (
              <article className="collection-item" key={item.no}>
                <span className="collection-number">{item.no}</span>
                <div><h3>{item.title}</h3><p>{item.body}</p></div>
                <span className="collection-cue"><b>SC</b>{item.cue}</span>
                <button onClick={() => scrollToSection("catalogue")} aria-label={item.title}><ArrowUpRight size={21} /></button>
              </article>
            ))}
          </div>
        </section>

        <section id="personalised" className="personalised-section section-anchor" aria-labelledby="personalised-heading">
          <div className="personalised-image"><img src={personalisationImage} alt="Hand-finished personalised candle and gift ribbon" /><span>02</span></div>
          <div className="personalised-copy">
            <p className="eyebrow"><span />{t.personalisedEyebrow}</p>
            <h2 id="personalised-heading">{t.personalisedTitle}</h2>
            <p className="section-body">{t.personalisedBody}</p>
            <button className="underlined-button" onClick={showOrderToast}>{t.personalisedCta}<ArrowUpRight size={17} /></button>
            <p className="image-side-note">{t.personalisedCaption}</p>
            <div className="ribbon-mark personal-ribbon" aria-hidden="true" />
          </div>
        </section>

        <section id="catalogue" className="catalogue-section section-anchor" aria-labelledby="catalogue-heading">
          <div className="catalogue-heading">
            <p className="eyebrow"><span />{t.catalogueEyebrow}</p>
            <h2 id="catalogue-heading">{t.catalogueTitle}</h2>
            <p>{t.catalogueBody}</p>
          </div>
          <div className="catalogue-preview">
            <div className="preview-header"><span>{t.catalogueTop}</span><span>SC · 2026</span></div>
            <div className="preview-image"><img src={atelierImage} alt="Sophia candle styling preview" /><div className="preview-card"><small>{t.catalogueCardLabel}</small><strong>{t.catalogueCardTitle}</strong><p>{t.catalogueCardMeta}</p></div></div>
            <div className="preview-footer"><i /><span>{t.catalogueFooter}</span></div>
          </div>
        </section>

        <section id="occasions" className="occasion-section section-anchor" aria-labelledby="occasion-heading">
          <div className="occasion-photo"><img src={celebrationImage} alt="Sophia Candles celebration favor arrangement" /></div>
          <div className="occasion-copy">
            <p className="eyebrow inverted"><span />{t.occasionEyebrow}</p>
            <h2 id="occasion-heading">{t.occasionTitle}</h2>
            <p>{t.occasionBody}</p>
            <button className="light-button" onClick={showOrderToast}>{t.occasionCta}<ArrowUpRight size={17} /></button>
          </div>
        </section>

        <section className="closing-section">
          <OfficialLogo alt="Sophia Candles official logo" />
          <p className="closing-eyebrow">{t.closingEyebrow}</p>
          <h2>{t.closingTitle}</h2>
          <button className="order-button" onClick={showOrderToast}>{t.closingCta}<ArrowUpRight size={16} /></button>
          <p className="closing-note">{t.closingNote}</p>
        </section>
      </main>

      <footer className="site-footer">
        <OfficialLogo alt="Sophia Candles" />
        <p>{t.footerLine}</p>
        <p>{t.footerCopy}</p>
      </footer>
    </div>
  );
}
