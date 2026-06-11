"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Footprints,
  Layers,
  Factory,
  Globe2,
  ShieldCheck,
  Sparkles,
  Ruler,
  Recycle,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";

/* ─── Design tokens ───
   Warm sand background, deep espresso ink, burnt-clay accent —
   a craft-leather palette for a footwear maker, replacing the
   dated blue template of the original site. */
const C = {
  bg: "#FAF7F2",
  ink: "#1C1916",
  inkSoft: "#5C544B",
  clay: "#B5562C",
  clayDark: "#93431F",
  sand: "#EFE8DD",
  line: "#E3DACC",
};

/* ─── Content (from leedspolymers.com) ─── */
const nav = [
  { label: "About", href: "#about" },
  { label: "Collections", href: "#collections" },
  { label: "Materials", href: "#materials" },
  { label: "Manufacturing", href: "#manufacturing" },
  { label: "Exports", href: "#exports" },
];

const stats = [
  { value: "2002", label: "Founded in Kerala" },
  { value: "3", label: "Core materials — PU · EVA · PVC" },
  { value: "20+", label: "Years of manufacturing" },
  { value: "4+", label: "Export markets served" },
];

const collections = [
  {
    name: "Gents",
    blurb:
      "Everyday sandals, slippers and casual footwear built for long wear — tough PU soles with cushioned footbeds.",
    tag: "PU · EVA",
    gradient: "linear-gradient(135deg, #2E2823 0%, #5C4632 100%)",
  },
  {
    name: "Ladies",
    blurb:
      "Fashion-forward flats, sandals and dailywear in a wide size range, balancing lightness with durability.",
    tag: "PU · PVC",
    gradient: "linear-gradient(135deg, #B5562C 0%, #D98E5F 100%)",
  },
  {
    name: "Kids",
    blurb:
      "Lightweight, flexible EVA footwear that keeps up with growing feet — easy to clean, hard to wear out.",
    tag: "EVA",
    gradient: "linear-gradient(135deg, #7A6B4F 0%, #B3A077 100%)",
  },
];

const materials = [
  {
    icon: Layers,
    name: "PU — Polyurethane",
    desc: "Dense, springy soles with excellent abrasion resistance. The backbone of our gents and ladies ranges.",
  },
  {
    icon: Sparkles,
    name: "EVA — Ethylene-Vinyl Acetate",
    desc: "Feather-light cushioning with flex that lasts. Ideal for kids' footwear and casual slip-ons.",
  },
  {
    icon: ShieldCheck,
    name: "PVC — Polyvinyl Chloride",
    desc: "Waterproof, easy-care and economical — dependable footwear for monsoon climates and daily use.",
  },
];

const capabilities = [
  {
    icon: Factory,
    title: "In-house manufacturing",
    desc: "A well-equipped production unit in Malappuram, Kerala handles moulding, assembly and finishing under one roof.",
  },
  {
    icon: ShieldCheck,
    title: "International quality standards",
    desc: "Every batch is checked against international quality benchmarks before it leaves the factory.",
  },
  {
    icon: Ruler,
    title: "Wide size range",
    desc: "Inclusive sizing across gents, ladies and kids collections so retailers can serve every customer.",
  },
  {
    icon: Recycle,
    title: "Superior raw materials",
    desc: "We source premium-grade PU, EVA and PVC compounds for consistent comfort and durability.",
  },
];

const markets = ["United Arab Emirates", "Bahrain", "Myanmar", "Across India"];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

export default function LeedsPolymers() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="leeds-site min-h-screen"
      style={{ background: C.bg, color: C.ink, fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ─── Header ─── */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{ borderColor: C.line, background: "rgba(250,247,242,0.9)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ background: C.clay }}
            >
              <Footprints size={18} color="#fff" />
            </span>
            <span>
              <span className="block text-base font-700 font-bold leading-none tracking-tight">
                LEEDS
              </span>
              <span
                className="block text-[10px] font-medium uppercase tracking-[0.18em]"
                style={{ color: C.inkSoft }}
              >
                Polymers
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: C.inkSoft }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: C.ink }}
            >
              Get in touch
            </a>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            className="flex flex-col gap-1 border-t px-5 py-3 md:hidden"
            style={{ borderColor: C.line }}
          >
            {[...nav, { label: "Contact", href: "#contact" }].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium"
                style={{ color: C.inkSoft }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ─── Hero ─── */}
      <section id="top" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full opacity-50"
          style={{ background: `radial-gradient(circle, ${C.sand} 0%, transparent 70%)` }}
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <motion.div {...fadeUp}>
            <p
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]"
              style={{ borderColor: C.line, color: C.clay, background: "#fff" }}
            >
              <Sparkles size={13} /> Footwear manufacturer · Kerala, India
            </p>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight md:text-[3.4rem]">
              Comfort made in Kerala.
              <span style={{ color: C.clay }}> Worn across the world.</span>
            </h1>
            <p
              className="mt-6 max-w-md text-lg leading-relaxed"
              style={{ color: C.inkSoft }}
            >
              Since 2002, Leeds Polymers has manufactured durable, fashion-forward
              footwear in PU, EVA and PVC — for gents, ladies and kids — from our
              own production unit in Malappuram.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#collections"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: C.clay }}
              >
                Explore collections <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-white"
                style={{ borderColor: C.ink }}
              >
                Become a distributor
              </a>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="relative"
          >
            <div
              className="flex aspect-[4/3] items-end overflow-hidden rounded-3xl p-8"
              style={{
                background:
                  "linear-gradient(150deg, #2E2823 0%, #6B4A2E 55%, #B5562C 100%)",
              }}
            >
              <Footprints
                size={220}
                className="absolute -right-8 -top-8 opacity-10"
                color="#fff"
              />
              <div className="text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
                  The Leeds promise
                </p>
                <p className="mt-2 max-w-xs text-2xl font-bold leading-snug">
                  Durability you can feel in every step.
                </p>
              </div>
            </div>
            <div
              className="absolute -bottom-6 -left-6 hidden rounded-2xl border bg-white p-5 shadow-lg md:block"
              style={{ borderColor: C.line }}
            >
              <p className="text-3xl font-bold" style={{ color: C.clay }}>
                20+
              </p>
              <p className="text-xs font-medium" style={{ color: C.inkSoft }}>
                years of craftsmanship
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="border-y" style={{ borderColor: C.line, background: "#fff" }}>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-5 py-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold tracking-tight">{s.value}</p>
                <p className="mt-1 text-xs font-medium" style={{ color: C.inkSoft }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About ─── */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
        <div className="grid items-start gap-12 md:grid-cols-[1fr_1.2fr]">
          <motion.div {...fadeUp}>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: C.clay }}
            >
              About us
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              A footwear brand Kerala has trusted for two decades
            </h2>
          </motion.div>
          <motion.div {...fadeUp} className="space-y-5 text-lg leading-relaxed" style={{ color: C.inkSoft }}>
            <p>
              Leeds Polymers is a renowned footwear brand from Kerala, manufacturing
              and supplying a wide range of footwear made from superior-quality raw
              materials — PU, EVA and PVC. Our range covers gents, ladies and kids
              collections in inclusive sizing.
            </p>
            <p>
              From our well-equipped manufacturing unit in Malappuram, we produce
              and export footwear that adheres to international quality standards,
              pairing durability with fashion-forward design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Collections ─── */}
      <section
        id="collections"
        className="scroll-mt-24 border-y py-20 md:py-28"
        style={{ borderColor: C.line, background: "#fff" }}
      >
        <div className="mx-auto max-w-6xl px-5">
          <motion.div {...fadeUp} className="mb-12 max-w-xl">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: C.clay }}
            >
              Collections
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Footwear for the whole family
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {collections.map((c, i) => (
              <motion.div
                key={c.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="group overflow-hidden rounded-3xl border transition-shadow hover:shadow-xl"
                style={{ borderColor: C.line }}
              >
                <div
                  className="relative flex h-44 items-center justify-center"
                  style={{ background: c.gradient }}
                >
                  <Footprints
                    size={72}
                    color="#fff"
                    className="opacity-80 transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur">
                    {c.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                    {c.blurb}
                  </p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
                    style={{ color: C.clay }}
                  >
                    Enquire <ChevronRight size={15} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Materials ─── */}
      <section id="materials" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
        <motion.div {...fadeUp} className="mb-12 max-w-xl">
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: C.clay }}
          >
            Materials
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Three polymers. One standard of quality.
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {materials.map((m, i) => (
            <motion.div
              key={m.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="rounded-3xl border bg-white p-7"
              style={{ borderColor: C.line }}
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: C.sand, color: C.clay }}
              >
                <m.icon size={22} />
              </span>
              <h3 className="mt-5 text-lg font-bold">{m.name}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Manufacturing ─── */}
      <section
        id="manufacturing"
        className="scroll-mt-24 py-20 md:py-28"
        style={{ background: C.ink }}
      >
        <div className="mx-auto max-w-6xl px-5">
          <motion.div {...fadeUp} className="mb-12 max-w-xl">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: "#E0905F" }}
            >
              Manufacturing
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
              Built in Malappuram, to international standards
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {capabilities.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-7"
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "rgba(224,144,95,0.15)", color: "#E0905F" }}
                >
                  <f.icon size={20} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Exports ─── */}
      <section id="exports" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div {...fadeUp}>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: C.clay }}
            >
              Exports
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              From Kerala to markets abroad
            </h2>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: C.inkSoft }}>
              Leeds footwear ships beyond India to buyers in the Gulf and
              Southeast Asia. Our export operations follow the same quality
              standards as our domestic range.
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
            {markets.map((m) => (
              <div
                key={m}
                className="flex items-center gap-3 rounded-2xl border bg-white p-5"
                style={{ borderColor: C.line }}
              >
                <Globe2 size={18} style={{ color: C.clay }} />
                <span className="text-sm font-semibold">{m}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section
        id="contact"
        className="scroll-mt-24 border-t py-20 md:py-28"
        style={{ borderColor: C.line, background: "#fff" }}
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2">
          <motion.div {...fadeUp}>
            <p
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: C.clay }}
            >
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Partner with Leeds Polymers
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed" style={{ color: C.inkSoft }}>
              Wholesalers, retailers and export buyers — write to us for
              catalogues, pricing and distribution enquiries.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={19} className="mt-0.5 shrink-0" style={{ color: C.clay }} />
                <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                  Leeds Polymers, Vydiarangadi P.O,
                  <br />
                  Malappuram Dt., Kerala 673 633, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={19} className="shrink-0" style={{ color: C.clay }} />
                <p className="text-sm" style={{ color: C.inkSoft }}>
                  Phone available on request
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={19} className="shrink-0" style={{ color: C.clay }} />
                <p className="text-sm" style={{ color: C.inkSoft }}>
                  info@leedspolymers.com
                </p>
              </div>
            </div>
          </motion.div>

          <motion.form
            {...fadeUp}
            className="rounded-3xl border p-7"
            style={{ borderColor: C.line, background: C.bg }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide" style={{ color: C.inkSoft }}>
                  Name
                </span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2"
                  style={{ borderColor: C.line }}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide" style={{ color: C.inkSoft }}>
                  Phone / Email
                </span>
                <input
                  type="text"
                  placeholder="How do we reach you?"
                  className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2"
                  style={{ borderColor: C.line }}
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide" style={{ color: C.inkSoft }}>
                Message
              </span>
              <textarea
                rows={5}
                placeholder="Tell us about your enquiry — collection, quantity, market…"
                className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2"
                style={{ borderColor: C.line }}
              />
            </label>
            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: C.clay }}
            >
              Send enquiry <ArrowRight size={16} />
            </button>
          </motion.form>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ background: C.ink }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row">
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: C.clay }}
            >
              <Footprints size={15} color="#fff" />
            </span>
            <span className="text-sm font-bold tracking-tight text-white">
              LEEDS <span className="font-normal text-white/50">Polymers</span>
            </span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-medium text-white/50 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Leeds Polymers. Vydiarangadi, Kerala.
          </p>
        </div>
      </footer>
    </div>
  );
}
