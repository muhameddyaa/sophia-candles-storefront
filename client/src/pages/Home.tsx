/**
 * Sophia Candles — Atelier of Lasting Flowers
 * Warm minimalist editorial luxury: ivory, parchment, matte gold, and Sophia Sage.
 * The site is an asymmetric gifting journey, not a dense product grid.
 */
import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpLeft,
  ChevronLeft,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";

const heroImage = "/manus-storage/sophia-hero-bouquet_557ec05c.jpg";
const atelierImage = "/manus-storage/sophia-atelier-still-life_b579ade2.jpg";
const personalisationImage = "/manus-storage/sophia-personalisation_56f1a835.jpg";
const celebrationImage = "/manus-storage/sophia-celebration-table_3ed841c9.jpg";
const symbolImage = "/manus-storage/sophia-symbol_38ac2f68.png";

const navItems = [
  { label: "المجموعات", target: "collections" },
  { label: "هدايا مخصصة", target: "personalised" },
  { label: "للمناسبات", target: "occasions" },
];

const collections = [
  {
    number: "01",
    title: "بوكيهات الشموع",
    subtitle: "هدية تشبه الورد، وذكراها أطول.",
    accent: "from-[#f2ece3] to-[#e1e5dc]",
  },
  {
    number: "02",
    title: "لمسات باسمهم",
    subtitle: "تفاصيل مصممة للحظة لا تتكرر.",
    accent: "from-[#e6e9e2] to-[#d7d4ca]",
  },
  {
    number: "03",
    title: "استقبال وضيافة",
    subtitle: "هدايا صغيرة تترك أثراً كبيراً.",
    accent: "from-[#eee7dc] to-[#e2ddd4]",
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ComingSoonToast() {
  toast("سنربط هذا الزر بواتساب الطلبات بعد تأكيد الرقم.", {
    description: "الموقع الآن نسخة عرض، والأسعار والمنتجات ستضاف من بياناتك المعتمدة.",
  });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const chooseNav = (target: string) => {
    setMenuOpen(false);
    scrollToSection(target);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbfaf6] text-[#28312b]" dir="rtl">
      <header className="site-header">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10 lg:py-5">
          <button
            aria-label="العودة إلى بداية الصفحة"
            className="brand-lockup group"
            onClick={() => scrollToSection("top")}
          >
            <img src={symbolImage} alt="رمز Sophia Candles" className="brand-symbol" />
            <span className="brand-name" dir="ltr">
              Sophia
              <small>CANDLES</small>
              <b>GIFT ATELIER · UAE</b>
            </span>
          </button>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="التنقل الرئيسي">
            {navItems.map((item) => (
              <button className="nav-link" key={item.target} onClick={() => scrollToSection(item.target)}>
                {item.label}
              </button>
            ))}
            <button className="header-cta" onClick={ComingSoonToast}>
              اطلبي هدية مميزة <ArrowUpLeft size={15} strokeWidth={1.8} />
            </button>
          </nav>

          <button
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#d9d8cf] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav lg:hidden" aria-label="التنقل عبر الهاتف">
            {navItems.map((item) => (
              <button key={item.target} onClick={() => chooseNav(item.target)}>
                {item.label} <ChevronLeft size={17} />
              </button>
            ))}
            <button onClick={ComingSoonToast}>ابدئي طلبك <ArrowUpLeft size={17} /></button>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <div className="eyebrow"><span /> مصنوع يدوياً في الإمارات</div>
            <p className="hero-kicker">لأن الهدية الحلوة تبدأ بتفصيلٍ واحد.</p>
            <h1 id="hero-heading">هدية شكلها ورد،<br /><em>وذكراها أطول.</em></h1>
            <p className="hero-intro">
              شموع وبوكيهات مصنوعة بعناية، لتصير كل مناسبة أكثر قرباً ودفئاً.
            </p>
            <div className="hero-actions">
              <button className="button-primary" onClick={() => scrollToSection("collections")}>
                اكتشفي المجموعات <ArrowDownLeft size={17} />
              </button>
              <button className="button-quiet" onClick={() => scrollToSection("personalised")}>
                للطلبات المخصصة <span>↙</span>
              </button>
            </div>
            <div className="hero-note">
              <div className="wax-seal">SC</div>
              <span>مُغلفة كأنها جزء من الهدية.</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="تصور لبوكيه شموع فاخر">
            <div className="hero-photo-wrap">
              <img src={heroImage} alt="بوكيه شموع وردي فاخر بألوان عاجية" />
            </div>
            <div className="hero-badge"><span>01</span> Sophia Gift Atelier</div>
            <div className="ribbon-line" aria-hidden="true" />
          </div>
        </section>

        <section className="intro-strip" aria-label="قيم Sophia Candles">
          <div className="intro-number">01</div>
          <p>ليست مجرد شمعة. هي لحظة تختارينها لشخصٍ مهم.</p>
          <div className="intro-details">
            <span>Hand-poured</span><i /> <span>Gift-ready</span><i /> <span>Made to remember</span>
          </div>
        </section>

        <section id="collections" className="collections-section section-anchor" aria-labelledby="collections-heading">
          <div className="section-heading-wrap">
            <div>
              <div className="eyebrow"><span /> مجموعة Sophia</div>
              <h2 id="collections-heading">كل هدية تبدأ<br />بـ <em>حكاية.</em></h2>
            </div>
            <p className="section-side-copy">هذا هو مكان كتالوجك القادم: صور أصلية، منتجات مؤكدة، وأسعار واضحة فقط بعد ما تبعتيها.</p>
          </div>

          <div className="collection-list">
            {collections.map((collection) => (
              <article className="collection-row" key={collection.number}>
                <div className="collection-no">{collection.number}</div>
                <div className="collection-copy">
                  <h3>{collection.title}</h3>
                  <p>{collection.subtitle}</p>
                </div>
                <div className={`collection-swatch bg-gradient-to-bl ${collection.accent}`}>
                  <span className="collection-flower">✦</span>
                </div>
                <button
                  aria-label={`استكشاف ${collection.title}`}
                  className="round-arrow"
                  onClick={() => scrollToSection("catalogue")}
                >
                  <ArrowUpLeft size={19} strokeWidth={1.5} />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="personalised" className="personalised-section section-anchor" aria-labelledby="personalised-heading">
          <div className="personalised-photo">
            <img src={personalisationImage} alt="تفصيل يدوي لشمعة مخصصة وشريط هدية" />
            <div className="photo-caption">A little more personal</div>
          </div>
          <div className="personalised-content">
            <div className="eyebrow"><span /> لأجمل التفاصيل</div>
            <h2 id="personalised-heading">اسمهم.<br />تاريخهم.<br /><em>حكايتهم.</em></h2>
            <p>
              للمناسبات التي تستحق شيئاً خاصاً: نترك مساحة لاسم أو ذكرى أو لمسة تجعل الهدية لهم وحدهم.
            </p>
            <button className="text-link" onClick={ComingSoonToast}>
              اطلبي فكرة مخصصة <ArrowUpLeft size={18} />
            </button>
            <div className="quiet-rule" />
            <p className="micro-note">التفاصيل والخيارات النهائية ستظهر هنا بعد اعتماد المنتجات المتاحة.</p>
          </div>
        </section>

        <section id="catalogue" className="catalogue-section section-anchor" aria-labelledby="catalogue-heading">
          <div className="catalogue-copy">
            <div className="eyebrow"><span /> قريبا في الكتالوج</div>
            <h2 id="catalogue-heading">منتجاتك،<br /><em>كما تستحق أن تُرى.</em></h2>
            <p>
              هنضيف هنا كل منتج بصورته، اسمه، وصفه، وسعره بالـAED بمجرد ما تبعتي لنا البيانات النهائية.
            </p>
          </div>
          <div className="catalogue-placeholder" aria-label="مساحة لعرض المنتجات والأسعار عند إضافتها">
            <div className="placeholder-top"><span>THE SOPHIA EDIT</span><span>ATELIER PREVIEW</span></div>
            <div className="placeholder-main">
              <img src={atelierImage} alt="تنسيق شموع فاخرة كنموذج للعرض" />
              <div className="placeholder-card">
                <span>من دفتر الأتيليه</span>
                <strong>تفصيلة من هديتك</strong>
                <small>الاسم · الوصف · السعر المعتمد</small>
              </div>
            </div>
            <div className="placeholder-base"><i /> <span>تكتمل المجموعة مع اختياراتك النهائية</span></div>
          </div>
        </section>

        <section id="occasions" className="occasion-section section-anchor" aria-labelledby="occasion-heading">
          <div className="occasion-content">
            <div className="eyebrow light"><span /> مناسبات بتفاصيلها</div>
            <h2 id="occasion-heading">للضيافة التي<br />يبقى <em>أثرها.</em></h2>
            <p>مساحة منفصلة لتقديم هدايا الاستقبال، الزفاف، والشركات بنبرة خاصة بها.</p>
            <button className="button-light" onClick={ComingSoonToast}>
              احكي لنا عن مناسبتك <ArrowUpLeft size={17} />
            </button>
          </div>
          <div className="occasion-photo">
            <img src={celebrationImage} alt="تنسيق راق لهدايا استقبال من الشموع" />
          </div>
          <div className="occasion-mark"><Sparkles size={18} /><span>Made for the memory</span></div>
        </section>

        <section className="closing-section" aria-label="التواصل مع Sophia Candles">
          <div className="closing-mark"><img src={symbolImage} alt="" /></div>
          <p className="closing-overline">SOPHIA CANDLES · UAE</p>
          <h2>هديتك الجاية<br /><em>تبدأ من هنا.</em></h2>
          <button className="button-primary" onClick={ComingSoonToast}>
            ابدئي طلبك <ArrowUpLeft size={17} />
          </button>
          <p className="closing-note">سيتم ربط الطلبات مباشرة بواتساب Sophia Candles بعد تأكيد رقم الاستقبال.</p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand" dir="ltr">
          <img src={symbolImage} alt="" />
          <span>Sophia<br /><small>CANDLES · GIFT ATELIER</small></span>
        </div>
        <p>Handmade gifting, with meaning.</p>
        <p className="footer-year">© 2026 Sophia Candles</p>
      </footer>
    </div>
  );
}
