import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Outlet, useLocation, Link, NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Toaster as Sonner, toast } from "sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ArrowUpRight, Star, Coffee, Clock, MapPin, Phone, Menu, X, CheckCircle2, Trash2, Calendar } from "lucide-react";

const Instagram = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Facebook = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
import { cn } from "@/lib/utils";

// Assets
import heroCoffee from "@/assets/hero-coffee.png";
import breakfast from "@/assets/breakfast-spread.png";
import interior from "@/assets/interior.png";
import barista from "@/assets/barista.png";

// Pages
import NotFound from "./pages/NotFound";

// ============================================================
// SITE CONFIG — change these values to brand the template
// ============================================================
const s = {
  name: "The Coffee Shop",
  tagline: "Slow mornings, deep brews",
  shortDescription:
    "A neighbourhood coffee shop — locally roasted beans, bread baked before sunrise, and a very loud kettle.",
  phone: "011 234 5678",
  phoneHref: "tel:0112345678",
  email: "hello@thecoffeeshop.co.za",
  city: "Johannesburg",
  region: "Gauteng",
  addressShort: "Rosebank, Johannesburg",
  mapsQuery: "coffee shop Rosebank",
  pricePerPerson: "R 50–150",
  rating: "4.9 / 5",
  reviewsCount: "Loved by locals",
  hoursToday: "07:30 – 16:00",
  hours: [
    ["Mon", "7:30 – 16:00"],
    ["Tue", "7:30 – 16:00"],
    ["Wed", "7:30 – 16:00"],
    ["Thu", "7:30 – 16:00"],
    ["Fri", "7:30 – 16:00"],
    ["Sat", "7:30 – 14:00"],
    ["Sun", "8:00 – 13:00"],
  ] as [string, string][],
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  founded: "2020",
  milestones: [
    { y: "2020", t: "First pour", d: "A few tables, one machine, all heart." },
    { y: "2022", t: "The bakery starts", d: "Croissants and sourdough, baked daily." },
    { y: "Today", t: "A neighbourhood ritual", d: "Thank you for keeping us busy." },
  ],
  currency: "R",
};

// ============================================================
// HEADER
// ============================================================
const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/story", label: "Story" },
  { to: "/visit", label: "Visit" },
  { to: "/reserve", label: "Reserve" },
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", scrolled ? "bg-cream/85 backdrop-blur-md border-b border-espresso/10" : "bg-transparent")}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-espresso text-xl tracking-tight">
          <span className="italic font-light text-espresso/60">the</span> Coffee Shop
        </Link>
        <nav className="hidden md:flex gap-8 text-espresso/80 text-[10px] uppercase tracking-[0.2em] font-medium">
          {NAV.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => cn("transition-colors hover:text-copper", isActive && "text-copper")}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/reserve" className="hidden md:inline-flex items-center gap-2 bg-espresso text-cream px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] hover:bg-copper transition-colors group">
          Book a table <ArrowUpRight className="w-3 h-3 group-hover:rotate-45 transition-transform" />
        </Link>
        <button aria-label="Toggle menu" className="md:hidden text-espresso p-2" onClick={() => setOpen((o) => !o)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-cream border-t border-espresso/10 h-screen animate-in fade-in slide-in-from-top duration-300">
          <nav className="flex flex-col px-6 py-12 gap-8">
            {NAV.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)} className={({ isActive }) => cn("font-display text-4xl py-1 transition-colors", isActive ? "text-copper" : "text-espresso")}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/reserve" onClick={() => setOpen(false)} className="inline-flex items-center gap-3 bg-espresso text-cream px-6 py-4 text-xs uppercase tracking-[0.25em] mt-4 self-start">
              Book a table <ArrowUpRight className="w-3 h-3" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

// ============================================================
// FOOTER
// ============================================================
const SiteFooter = () => (
  <footer className="bg-espresso text-cream/50 px-6 md:px-10 py-16">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div className="md:col-span-2">
        <div className="font-display text-3xl text-cream">
          <span className="italic font-light text-cream/40">the</span> Coffee Shop
        </div>
        <p className="mt-4 max-w-sm text-sm font-light leading-relaxed">{s.shortDescription}</p>
        <div className="flex gap-3 mt-8">
          <a aria-label="Instagram" href={s.instagram} className="w-10 h-10 border border-cream/10 flex items-center justify-center hover:bg-copper hover:border-copper hover:text-cream transition-all">
            <Instagram className="w-4 h-4" />
          </a>
          <a aria-label="Facebook" href={s.facebook} className="w-10 h-10 border border-cream/10 flex items-center justify-center hover:bg-copper hover:border-copper hover:text-cream transition-all">
            <Facebook className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-copper-glow mb-6">Explore</div>
        <ul className="space-y-3 text-[11px] uppercase tracking-[0.1em]">
          <li><Link to="/menu" className="hover:text-cream transition-colors">Menu</Link></li>
          <li><Link to="/story" className="hover:text-cream transition-colors">Our Story</Link></li>
          <li><Link to="/visit" className="hover:text-cream transition-colors">Visit Us</Link></li>
          <li><Link to="/reserve" className="hover:text-cream transition-colors">Reserve</Link></li>
        </ul>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-copper-glow mb-6">Find Us</div>
        <ul className="space-y-4 text-sm font-light">
          <li className="flex gap-3"><MapPin className="w-4 h-4 shrink-0 text-copper" /> {s.addressShort}</li>
          <li className="flex gap-3"><Phone className="w-4 h-4 shrink-0 text-copper" /> <a href={s.phoneHref} className="hover:text-cream transition-colors">{s.phone}</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-cream/5 flex flex-col md:flex-row justify-between gap-4 text-[9px] uppercase tracking-[0.4em]">
      <span>© {new Date().getFullYear()} {s.name}</span>
      <span className="text-cream/30 italic">Crafted with care by <a id="upscale-link" href="https://upscaleda.com" target="_blank" rel="noopener noreferrer" className="hover:text-sage transition-colors underline decoration-white/20 underline-offset-4 inline-block">UPSCALE DIGITAL</a></span>
    </div>
  </footer>
);

// ============================================================
// LAYOUT
// ============================================================
const Layout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1"><Outlet /></main>
      <SiteFooter />
    </div>
  );
};

// ============================================================
// HOME
// ============================================================
const Home = () => (
  <div>
    <section className="relative min-h-screen bg-espresso overflow-hidden flex items-center">
      <div className="absolute inset-0 opacity-60 scale-105 animate-slow-zoom" style={{ backgroundImage: `url(${heroCoffee})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent" />
      <div className="relative z-10 px-6 md:px-10 pt-32 pb-16 max-w-7xl mx-auto w-full">
        <div className="text-copper-glow text-[10px] uppercase tracking-[0.5em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">☕ A neighbourhood ritual · {s.addressShort}</div>
        <h1 className="font-display text-cream text-[15vw] md:text-[9rem] leading-[0.8] font-light tracking-[-0.04em] max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Slow <span className="italic font-extralight text-copper-glow">mornings,</span><br />
          deep <span className="italic font-extralight">brews.</span>
        </h1>
        <div className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <p className="text-cream/70 max-w-md text-lg md:text-xl font-light leading-relaxed">{s.shortDescription} We'd love you to come sit.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/menu" className="group inline-flex items-center gap-4 bg-cream text-espresso px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-copper hover:text-cream transition-all duration-500">
              See the menu <ArrowUpRight className="w-3 h-3 group-hover:rotate-45 transition-transform" />
            </Link>
            <Link to="/reserve" className="group inline-flex items-center gap-4 border border-cream/20 text-cream px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-cream hover:text-espresso transition-all duration-500">
              Book a table <ArrowUpRight className="w-3 h-3 group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-cream-deep border-y border-espresso/5 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-espresso">
        {[
          { Icon: Clock, label: "Open today", value: s.hoursToday },
          { Icon: MapPin, label: "Where", value: s.addressShort },
          { Icon: Coffee, label: "Per person", value: s.pricePerPerson },
          { Icon: Star, label: "Rated", value: s.rating },
        ].map(({ Icon, label, value }) => (
          <div key={label} className="group">
            <Icon className="w-5 h-5 text-copper mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-[9px] uppercase tracking-[0.3em] text-espresso/40 mb-1">{label}</div>
            <div className="font-display text-xl font-light">{value}</div>
          </div>
        ))}
      </div>
    </section>

    <section className="py-24 md:py-40 px-6 md:px-10 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">
        <div className="md:col-span-5 relative group">
          <div className="absolute -inset-4 border border-copper/10 translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700" />
          <img src={interior} alt="Coffee shop interior" loading="lazy" className="w-full aspect-[4/5] object-cover relative z-10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" />
        </div>
        <div className="md:col-span-6 md:col-start-8">
          <div className="text-copper text-[10px] uppercase tracking-[0.4em] mb-8">— A small room, big heart</div>
          <h2 className="font-display text-5xl md:text-7xl font-light leading-[0.9] tracking-tight text-balance mb-8">
            Years of pouring, baking, and <span className="italic text-copper">making space</span> for one more.
          </h2>
          <p className="text-espresso-soft text-lg md:text-xl font-light leading-relaxed max-w-xl mb-10">
            We started with one machine and a few tables. The tables have multiplied — the belief that a really good cup can anchor a neighbourhood hasn't budged.
          </p>
          <Link to="/story" className="inline-flex items-center gap-3 text-espresso text-[11px] uppercase tracking-[0.3em] group">
            <span className="border-b border-espresso/20 pb-1 group-hover:border-copper group-hover:text-copper transition-all">Read our story</span>
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 group-hover:text-copper transition-all" />
          </Link>
        </div>
      </div>
    </section>

    <section className="py-24 md:py-40 px-6 md:px-10 bg-espresso text-cream overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">
        <div className="md:col-span-7 order-2 md:order-1">
          <div className="text-copper-glow text-[10px] uppercase tracking-[0.4em] mb-8">— Today's favourites</div>
          <h2 className="font-display text-5xl md:text-7xl font-light leading-[0.9] mb-12">
            Made <span className="italic">today,</span><br />eaten <span className="italic text-copper-glow">today.</span>
          </h2>
          <div className="space-y-2 mb-12">
            {[
              ["Flat White", "38"],
              ["Eggs on Sourdough", "85"],
              ["Buttered Croissant", "32"],
              ["The Big Breakfast", "98"],
            ].map(([n, p]) => (
              <div key={n} className="flex items-baseline gap-6 py-5 border-b border-cream/5 hover:border-cream/20 transition-colors group">
                <div className="font-display text-2xl md:text-3xl font-light flex-1 group-hover:text-copper-glow transition-colors">{n}</div>
                <div className="flex-1 hidden md:block border-b border-dashed border-cream/10" />
                <div className="font-display text-xl text-copper-glow tabular-nums">{s.currency}{p}</div>
              </div>
            ))}
          </div>
          <Link to="/menu" className="inline-flex items-center gap-3 text-cream text-[11px] uppercase tracking-[0.3em] group">
            <span className="border-b border-cream/20 pb-1 group-hover:border-copper-glow group-hover:text-copper-glow transition-all">Full menu</span>
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 group-hover:text-copper-glow transition-all" />
          </Link>
        </div>
        <div className="md:col-span-5 order-1 md:order-2">
          <img src={breakfast} alt="Breakfast spread" loading="lazy" className="w-full aspect-[4/5] object-cover shadow-2xl" />
        </div>
      </div>
    </section>

    <section className="py-32 md:py-56 px-6 md:px-10 bg-cream-deep text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-espresso/10" />
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="font-display text-6xl md:text-9xl font-light leading-[0.85] tracking-tight text-balance mb-8">
          Pull up a <span className="italic text-copper">chair.</span>
        </h2>
        <p className="mt-6 text-espresso-soft text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">Outdoor seating, room for the dog, and we'll always make space for one more.</p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/reserve" className="inline-flex items-center gap-4 bg-espresso text-cream px-10 py-5 text-xs uppercase tracking-[0.3em] hover:bg-copper transition-all duration-500 shadow-xl">
            Reserve a table <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link to="/visit" className="inline-flex items-center gap-4 border border-espresso text-espresso px-10 py-5 text-xs uppercase tracking-[0.3em] hover:bg-espresso hover:text-cream transition-all duration-500">
            How to find us <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  </div>
);

// ============================================================
// MENU
// ============================================================
type Item = { name: string; note: string; price: number; cat: string; tags?: string[] };
const ITEMS: Item[] = [
  { name: "Espresso", note: "Double shot, house blend", price: 28, cat: "Coffee" },
  { name: "Americano", note: "Long black, room for milk", price: 32, cat: "Coffee" },
  { name: "Flat White", note: "Silk milk, velvet finish", price: 38, cat: "Coffee" },
  { name: "Cappuccino", note: "Classic, dusted with cocoa", price: 38, cat: "Coffee" },
  { name: "Single Origin Pour-Over", note: "Rotating beans, ask the barista", price: 45, cat: "Coffee" },
  { name: "Iced Latte", note: "Cold milk, double shot, ice", price: 42, cat: "Coffee" },
  { name: "Buttered Croissant", note: "Baked at 5 a.m. daily", price: 32, cat: "Bakery", tags: ["v"] },
  { name: "Almond Croissant", note: "Frangipane, toasted almonds", price: 42, cat: "Bakery", tags: ["v"] },
  { name: "Banana Bread", note: "Toasted, butter, cinnamon", price: 38, cat: "Bakery", tags: ["v"] },
  { name: "Sourdough Loaf", note: "Whole, take-home", price: 65, cat: "Bakery", tags: ["v"] },
  { name: "Farm Eggs on Sourdough", note: "Free-range, smashed avo, dukkah", price: 85, cat: "Breakfast", tags: ["v"] },
  { name: "Slow-Cooked Oats", note: "Honey, cinnamon, toasted seeds", price: 65, cat: "Breakfast", tags: ["v"] },
  { name: "The Big Breakfast", note: "Eggs, bacon, mushroom, toast, juice", price: 98, cat: "Breakfast" },
  { name: "Yoghurt & Granola", note: "House granola, seasonal fruit", price: 68, cat: "Breakfast", tags: ["v"] },
  { name: "Garden Sandwich", note: "Roast veg, hummus, sourdough", price: 78, cat: "Lunch", tags: ["v"] },
  { name: "Chicken Mayo Toastie", note: "Free-range, fresh herbs", price: 88, cat: "Lunch" },
  { name: "Soup of the Day", note: "With sourdough — ask us", price: 72, cat: "Lunch" },
  { name: "Beef Burger", note: "House patty, cheddar, fries", price: 145, cat: "Lunch" },
];
const CATS = ["All", "Coffee", "Bakery", "Breakfast", "Lunch"];

const MenuPage = () => {
  const [cat, setCat] = useState("All");
  const items = useMemo(() => (cat === "All" ? ITEMS : ITEMS.filter((i) => i.cat === cat)), [cat]);
  return (
    <div className="bg-cream min-h-screen">
      <section className="relative pt-40 pb-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-copper text-[10px] uppercase tracking-[0.5em] mb-8">— The Menu</div>
          <h1 className="font-display text-6xl md:text-[9rem] font-light leading-[0.85] tracking-tight">
            Made <span className="italic">today,</span><br /><span className="italic text-copper">eaten today.</span>
          </h1>
          <p className="mt-10 max-w-xl text-espresso-soft text-lg md:text-xl font-light leading-relaxed">
            A short list, done properly. Rotates with the seasons and whatever the farmers brought in this week.
          </p>
        </div>
      </section>
      <section className="px-6 md:px-10 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 mb-20 sticky top-20 z-30 bg-cream/80 backdrop-blur-md py-6 border-b border-espresso/5">
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 ${cat === c ? "bg-espresso text-cream" : "bg-transparent text-espresso/40 hover:text-espresso"}`}>{c}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-12 gap-20">
            <div className="md:col-span-4 md:sticky md:top-48 self-start">
              <img src={breakfast} alt="Breakfast spread" loading="lazy" className="w-full aspect-[3/4] object-cover shadow-xl grayscale hover:grayscale-0 transition-all duration-1000" />
              <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-espresso/40">
                <span className="text-copper font-bold">V</span> · vegetarian options available
              </div>
            </div>
            <div className="md:col-span-8 space-y-4">
              {items.map((item, i) => (
                <div key={i} className="group flex items-baseline gap-8 py-8 border-b border-espresso/5 hover:border-copper/20 transition-all duration-500">
                  <div className="flex-1">
                    <div className="font-display text-3xl md:text-4xl font-light group-hover:text-copper transition-colors flex items-center gap-4">
                      {item.name}
                      {item.tags?.includes("v") && <span className="text-[8px] uppercase tracking-[0.2em] text-copper border border-copper/30 px-2 py-0.5 rounded-full">v</span>}
                    </div>
                    <div className="text-espresso/40 text-sm md:text-base font-light mt-2 max-w-md">{item.note}</div>
                  </div>
                  <div className="font-display text-2xl text-copper tabular-nums">{s.currency}{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================================
// STORY
// ============================================================
const StoryPage = () => (
  <div className="bg-cream">
    <section className="pt-40 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-copper text-[10px] uppercase tracking-[0.5em] mb-8">— Our Story</div>
        <h1 className="font-display text-6xl md:text-[9rem] font-light leading-[0.85] tracking-tight max-w-6xl">
          A small room with a <span className="italic text-copper">very loud</span> kettle.
        </h1>
      </div>
    </section>
    <section className="px-6 md:px-10 pb-32">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-20 items-start">
        <div className="md:col-span-5"><img src={interior} alt="Interior" loading="lazy" className="w-full aspect-[4/5] object-cover shadow-2xl" /></div>
        <div className="md:col-span-6 md:col-start-7 space-y-10 text-espresso-soft text-xl md:text-2xl font-light leading-relaxed">
          <p>We started with one machine, a few tables, and a stubborn belief that a really good cup of coffee could anchor a whole neighbourhood.</p>
          <p>The tables have multiplied — the belief hasn't budged. Locally roasted beans. Bread baked before sunrise. Eggs from the farm down the road.</p>
          <p>Nothing flashy — just made with care, and served like we mean it.</p>
          <div className="pt-10 border-t border-espresso/10">
            <div className="text-[10px] uppercase tracking-[0.4em] text-copper mb-8">Our Journey</div>
            <div className="space-y-12">
              {s.milestones.map((m) => (
                <div key={m.y} className="group">
                  <div className="font-display text-5xl text-espresso/10 group-hover:text-copper/20 transition-colors duration-700">{m.y}</div>
                  <div className="font-display text-3xl mt-[-1rem] relative z-10">{m.t}</div>
                  <p className="text-base text-espresso/50 mt-3 font-light max-w-md">{m.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="py-32 px-6 md:px-10 bg-espresso text-cream text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-5xl md:text-7xl font-light mb-16 leading-[0.9]">Scenes from the shop</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <img src={barista} alt="Barista" loading="lazy" className="w-full aspect-[4/3] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" />
          <img src={breakfast} alt="Breakfast" loading="lazy" className="w-full aspect-[4/3] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" />
        </div>
      </div>
    </section>
  </div>
);

// ============================================================
// VISIT
// ============================================================
const VisitPage = () => (
  <div className="bg-cream">
    <section className="pt-40 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-copper text-[10px] uppercase tracking-[0.5em] mb-8">— Visit Us</div>
        <h1 className="font-display text-6xl md:text-[9rem] font-light leading-[0.85] tracking-tight">
          Pull up a <span className="italic text-copper">chair.</span>
        </h1>
        <p className="mt-10 max-w-xl text-espresso-soft text-lg md:text-xl font-light leading-relaxed">
          We're easiest to find by following the smell of fresh bread. Outdoor seating, room for the dog, and always a warm welcome.
        </p>
      </div>
    </section>
    <section className="px-6 md:px-10 pb-32">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
        <div>
          <div className="space-y-12">
            {[
              { Icon: MapPin, label: "Where", value: s.addressShort, href: undefined },
              { Icon: Phone, label: "Call", value: s.phone, href: s.phoneHref },
              { Icon: Clock, label: "Today", value: s.hoursToday, href: undefined },
            ].map(({ Icon, label, value, href }) => (
              <div key={label} className="group">
                <div className="flex items-center gap-4 mb-4">
                  <Icon className="w-5 h-5 text-copper" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-espresso/40">{label}</span>
                </div>
                {href ? (
                  <a href={href} className="font-display text-3xl md:text-5xl font-light hover:text-copper transition-all duration-500 block">{value}</a>
                ) : (
                  <div className="font-display text-3xl md:text-5xl font-light">{value}</div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-20 pt-10 border-t border-espresso/5">
            <div className="text-[10px] uppercase tracking-[0.4em] text-copper mb-8">Opening Hours</div>
            <div className="grid gap-4 max-w-sm">
              {s.hours.map(([d, h]) => (
                <div key={d} className="flex justify-between items-baseline group">
                  <span className="text-xs uppercase tracking-[0.2em] text-espresso/40 group-hover:text-espresso transition-colors">{d}</span>
                  <div className="flex-1 mx-4 border-b border-dashed border-espresso/10" />
                  <span className="font-light text-espresso group-hover:text-copper transition-colors">{h}</span>
                </div>
              ))}
            </div>
          </div>
          <Link to="/reserve" className="mt-16 inline-flex items-center gap-4 bg-espresso text-cream px-10 py-5 text-xs uppercase tracking-[0.3em] hover:bg-copper transition-all duration-500 shadow-xl group">
            Reserve a table <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </Link>
        </div>
        <div className="space-y-8">
          <div className="aspect-[4/3] overflow-hidden shadow-2xl relative group">
            <iframe title="Map" src={`https://www.google.com/maps?q=${encodeURIComponent(s.mapsQuery)}&output=embed`} className="w-full h-full border-0 grayscale invert contrast-75 opacity-80 group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100 transition-all duration-1000" loading="lazy" />
          </div>
          <img src={interior} alt="Interior" loading="lazy" className="w-full aspect-[16/9] object-cover shadow-xl" />
        </div>
      </div>
    </section>
  </div>
);

// ============================================================
// RESERVE
// ============================================================
type Booking = { id: string; name: string; phone: string; date: string; time: string; guests: number; notes: string; createdAt: string };
const STORAGE_KEY = "tcs_bookings_v2";
const TIMES = ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00"];
const today = () => new Date().toISOString().slice(0, 10);
const inputCls = "w-full bg-transparent border-b border-espresso/20 px-0 py-4 text-espresso text-xl font-light focus:outline-none focus:border-copper transition-all placeholder:text-espresso/20";
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block group">
    <div className="text-[10px] uppercase tracking-[0.4em] text-espresso/40 mb-2 group-focus-within:text-copper transition-colors">{label}</div>
    {children}
  </label>
);

const ReservePage = () => {
  const [form, setForm] = useState({ name: "", phone: "", date: today(), time: "09:00", guests: 2, notes: "" });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBookings(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: Booking[]) => {
    setBookings(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please add your name and phone.");
      return;
    }
    const booking: Booking = { id: crypto.randomUUID(), ...form, guests: Number(form.guests), createdAt: new Date().toISOString() };
    persist([booking, ...bookings]);
    setConfirmed(booking);
    toast.success("Table reserved — see you soon!");
    setForm({ name: "", phone: "", date: today(), time: "09:00", guests: 2, notes: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = (id: string) => {
    persist(bookings.filter((b) => b.id !== id));
    toast("Booking cancelled");
  };

  return (
    <div className="bg-cream min-h-screen">
      <section className="pt-40 pb-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-copper text-[10px] uppercase tracking-[0.5em] mb-8">— Reserve</div>
          <h1 className="font-display text-6xl md:text-[9rem] font-light leading-[0.85] tracking-tight">
            Save a <span className="italic text-copper">spot.</span>
          </h1>
          <p className="mt-10 max-w-xl text-espresso-soft text-lg md:text-xl font-light leading-relaxed">
            Tell us when you're coming and we'll have a table waiting. We'll confirm by phone if anything changes.
          </p>
        </div>
      </section>
      <section className="px-6 md:px-10 pb-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-20">
          <div className="md:col-span-7">
            {confirmed && (
              <div className="mb-12 border border-copper/20 bg-copper/5 p-8 animate-in fade-in zoom-in duration-700 flex gap-6 items-start">
                <CheckCircle2 className="w-8 h-8 text-copper shrink-0 mt-1" />
                <div>
                  <div className="font-display text-3xl">Booked, {confirmed.name}.</div>
                  <div className="text-lg text-espresso/60 mt-2 font-light">
                    {confirmed.guests} guest{confirmed.guests > 1 ? "s" : ""} · {confirmed.date} at {confirmed.time}
                  </div>
                  <button onClick={() => setConfirmed(null)} className="mt-6 text-[10px] uppercase tracking-[0.3em] text-copper border-b border-copper/30 hover:border-copper transition-all">Make another booking</button>
                </div>
              </div>
            )}
            <form onSubmit={submit} className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12">
                <Field label="Name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Your name" /></Field>
                <Field label="Phone"><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="011 000 0000" /></Field>
                <Field label="Date"><input type="date" required min={today()} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputCls} /></Field>
                <Field label="Time">
                  <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={cn(inputCls, "appearance-none")}>
                    {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Guests"><input type="number" min={1} max={20} value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} className={inputCls} /></Field>
              </div>
              <Field label="Notes (optional)">
                <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputCls} placeholder="High chair, dog-friendly spot, dietary needs…" />
              </Field>
              <button type="submit" className="w-full md:w-auto bg-espresso text-cream px-12 py-6 text-xs uppercase tracking-[0.3em] hover:bg-copper transition-all duration-500 shadow-2xl group">
                Confirm booking <ArrowUpRight className="inline-block ml-2 w-4 h-4 group-hover:rotate-45 transition-transform" />
              </button>
            </form>
          </div>
          <aside className="md:col-span-4 md:col-start-9">
            <div className="flex items-center gap-4 mb-10">
              <Calendar className="w-5 h-5 text-copper" />
              <div className="text-[10px] uppercase tracking-[0.4em] text-espresso/40">Your bookings</div>
            </div>
            {bookings.length === 0 ? (
              <div className="border border-dashed border-espresso/10 p-12 text-center text-espresso/30 text-sm font-light">No bookings yet. Reserve your first table.</div>
            ) : (
              <ul className="space-y-6">
                {bookings.map((b) => (
                  <li key={b.id} className="group border-b border-espresso/5 pb-6 flex justify-between gap-6">
                    <div>
                      <div className="font-display text-2xl font-light group-hover:text-copper transition-colors">{b.name}</div>
                      <div className="text-sm text-espresso/40 mt-1">{b.guests} guest{b.guests > 1 ? "s" : ""} · {b.date} at {b.time}</div>
                    </div>
                    <button onClick={() => remove(b.id)} aria-label="Cancel booking" className="text-espresso/20 hover:text-red-400 transition-colors p-2 self-start">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-12 text-xs text-espresso/30 leading-relaxed font-light italic">
              Bookings are saved on your device. For groups over 10, please call us directly on{" "}
              <a className="underline hover:text-copper transition-colors" href={s.phoneHref}>{s.phone}</a>.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
};

// ============================================================
// APP
// ============================================================
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="bottom-center" toastOptions={{ style: { background: "#1A1412", color: "#F9F6F1", border: "none", borderRadius: "0", fontFamily: "Outfit" } }} />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/visit" element={<VisitPage />} />
            <Route path="/reserve" element={<ReservePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
