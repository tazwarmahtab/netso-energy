import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Factory, Globe2, Menu, ShieldCheck, Sun, Wallet, X, Zap } from "lucide-react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const ASSET_BASE = "https://api.getlayers.ai/storage/v1/object/public/public/assets/lumora-e8b711fc68";
const BASE_IMAGE = `${ASSET_BASE}/hero/after.jpg`;
const REVEAL_IMAGE = `${ASSET_BASE}/hero/before.jpg`;

const projects = [
  { name: "Chittagong Grammar School", type: "Institutional", size: "80 kWp", text: "A zero-upfront rooftop solar deployment structured around a 20-year PPA.", image: BASE_IMAGE },
  { name: "Industrial Rooftop Program", type: "RMG / Manufacturing", size: "100–500 kWp", text: "Distributed generation designed around factory daytime load and long-term energy savings.", image: REVEAL_IMAGE },
  { name: "Commercial Canopy", type: "Commercial", size: "50–250 kWp", text: "Solar infrastructure that creates shade while turning idle rooftop space into an energy asset.", image: BASE_IMAGE },
];

const services = [
  ["01", "Project Development", "Site screening, energy analysis, customer contracting and bankable project preparation."],
  ["02", "Solar Canopies", "Pergola-style structures engineered for industrial rooftops and demanding operating environments."],
  ["03", "Project Finance", "Contracted solar assets packaged for debt, institutional capital and scalable deployment."],
  ["04", "Operations", "Monitoring, maintenance, performance management and lifecycle asset operations."],
] as const;

const revealVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={{ hidden: revealVariants.hidden, visible: { ...revealVariants.visible, transition: { ...revealVariants.visible.transition, delay } } }} className={className}>{children}</motion.div>;
}

function Logo({ light = false }: { light?: boolean }) {
  return <span className={`inline-flex items-center gap-2 font-semibold tracking-tight ${light ? "text-white" : "text-neutral-950"}`}><span className="grid h-7 w-7 place-items-center rounded-full bg-[#b15f2c] text-white"><Sun size={15} /></span>NETSO</span>;
}

function usePageLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => { html.style.overflow = previousHtmlOverflow; body.style.overflow = previousBodyOverflow; };
  }, [locked]);
}

function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const started = performance.now();
    let raf = 0;
    let exitTimer = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / 1300);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else exitTimer = window.setTimeout(onDone, 550);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(exitTimer); };
  }, [onDone]);

  return <motion.div initial={{ y: 0 }} animate={{ y: "-100%" }} transition={{ delay: 1.85, duration: 0.72, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 z-[120] flex items-center justify-center rounded-b-[2rem] bg-[#0a0a0a] text-white" aria-hidden="true"><div className="w-[min(26rem,80vw)]"><Logo light /><p className="mt-6 max-w-sm text-sm leading-6 text-white/45">Powering Bangladesh's next generation of distributed energy.</p><div className="mt-10 h-px bg-white/10"><motion.div className="h-full bg-[#cf8047]" animate={{ width: `${progress}%` }} /></div><div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.18em] text-white/40"><span>Initializing</span><span className="tabular-nums text-white/75">{String(progress).padStart(3, "0")}</span></div></div></motion.div>;
}

function LiquidHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const revealImage = new Image();
    revealImage.crossOrigin = "anonymous";
    revealImage.src = REVEAL_IMAGE;
    const coverCanvas = document.createElement("canvas");
    const coverCtx = coverCanvas.getContext("2d");
    const brushCanvas = document.createElement("canvas");
    const brushCtx = brushCanvas.getContext("2d");
    if (!coverCtx || !brushCtx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const brushRadius = 143 * dpr;
    const brushDiameter = Math.ceil(brushRadius * 2);
    brushCanvas.width = brushDiameter;
    brushCanvas.height = brushDiameter;

    let width = 0;
    let height = 0;
    let idle = 0;
    let frame = 0;
    let lastPoint: { x: number; y: number } | null = null;
    const points: Array<{ x: number; y: number }> = [];

    const redrawCover = () => {
      coverCtx.clearRect(0, 0, coverCanvas.width, coverCanvas.height);
      if (!revealImage.naturalWidth || !revealImage.naturalHeight) return;
      const scale = Math.max(width / revealImage.naturalWidth, height / revealImage.naturalHeight);
      const drawW = revealImage.naturalWidth * scale;
      const drawH = revealImage.naturalHeight * scale;
      coverCtx.drawImage(revealImage, ((width - drawW) / 2) * dpr, ((height - drawH) / 2) * dpr, drawW * dpr, drawH * dpr);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      coverCanvas.width = canvas.width;
      coverCanvas.height = canvas.height;
      redrawCover();
    };

    const onMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) * dpr;
      const y = (event.clientY - rect.top) * dpr;
      const maxX = width * dpr;
      const maxY = height * dpr;
      if (x < -brushRadius || y < -brushRadius || x > maxX + brushRadius || y > maxY + brushRadius) {
        lastPoint = null;
        return;
      }
      if (!lastPoint) {
        points.push({ x, y });
        lastPoint = { x, y };
        return;
      }
      const dx = x - lastPoint.x;
      const dy = y - lastPoint.y;
      const count = Math.min(Math.ceil(Math.hypot(dx, dy) / Math.max(brushRadius * 0.3, 1)), 60);
      for (let i = 1; i <= count; i += 1) {
        const t = i / count;
        points.push({ x: lastPoint.x + dx * t, y: lastPoint.y + dy * t });
      }
      lastPoint = { x, y };
    };

    const stamp = (x: number, y: number) => {
      const center = brushRadius;
      brushCtx.clearRect(0, 0, brushDiameter, brushDiameter);
      const gradient = brushCtx.createRadialGradient(center, center, 0, center, center, brushRadius);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.55, "rgba(255,255,255,0.82)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      brushCtx.globalCompositeOperation = "source-over";
      brushCtx.fillStyle = gradient;
      brushCtx.fillRect(0, 0, brushDiameter, brushDiameter);
      brushCtx.globalCompositeOperation = "source-in";
      brushCtx.drawImage(coverCanvas, x - brushRadius, y - brushRadius, brushDiameter, brushDiameter, 0, 0, brushDiameter, brushDiameter);
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(brushCanvas, x - brushRadius, y - brushRadius);
    };

    const loop = () => {
      const drawing = points.length > 0;
      if (drawing) idle = 0; else idle += 1;
      const fade = drawing ? 0.016 : Math.min(0.016 + idle * 0.004, 0.5);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (drawing) {
        for (const point of points) stamp(point.x, point.y);
        points.length = 0;
      }
      if (idle >= 120) ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame = requestAnimationFrame(loop);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    revealImage.addEventListener("load", redrawCover);
    window.addEventListener("pointermove", onMove);
    resize();
    frame = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(frame); resizeObserver.disconnect(); revealImage.removeEventListener("load", redrawCover); window.removeEventListener("pointermove", onMove); };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden"><img src={BASE_IMAGE} alt="Industrial rooftop solar infrastructure" className="h-full w-full object-cover" /><canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0" /><div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/15" /><div className="pointer-events-none absolute inset-x-0 bottom-8 text-center text-[clamp(5rem,16vw,13rem)] font-bold leading-none tracking-[-0.08em] text-white/30">NETSO</div></div>;
}

function Stat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const spring = useSpring(0, { stiffness: 90, damping: 25 });
  useEffect(() => { if (inView) spring.set(value); }, [inView, spring, value]);
  const display = useTransform(spring, (n) => Math.round(n));
  return <div ref={ref}><div className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl"><motion.span>{display}</motion.span>{suffix}</div><p className="mt-3 text-sm text-white/45">{label}</p></div>;
}

function RequestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);
  useEffect(() => {
    if (!open) {
      const timer = window.setTimeout(() => setSubmitted(false), 300);
      return () => window.clearTimeout(timer);
    }
  }, [open]);
  if (!open) return null;
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); window.setTimeout(() => setSubmitted(true), 450); };
  return <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/30 p-4 backdrop-blur-xl sm:items-center" role="dialog" aria-modal="true" onMouseDown={onClose}>
    <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }} className="relative w-full max-w-xl overflow-hidden rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8" onMouseDown={(event) => event.stopPropagation()}>
      <button onClick={onClose} aria-label="Close project request" className="absolute right-5 top-5 rounded-full bg-[#f1f0ee] p-2 text-black/60 transition hover:bg-[#e3e2df] hover:text-black"><X size={17} /></button>
      {submitted ? <div className="flex flex-col items-center gap-4 py-12 text-center"><div className="grid h-14 w-14 place-items-center rounded-full bg-[#0a0a0a] text-[#cf8047]"><Sun size={24} /></div><h2 className="text-3xl font-semibold tracking-tight">Request received</h2><p className="max-w-md text-sm leading-6 text-black/55">Thanks for reaching out — we'll get back to you within one business day.</p><button onClick={onClose} className="mt-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-medium text-white">Close</button></div> : <>
        <div className="text-sm font-medium text-black/55"><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#b15f2c]" />Start a project</div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Tell us about the site.</h2>
        <form className="mt-8 space-y-4" onSubmit={submit}>
          {[["Name", "text", "Your name"], ["Email", "email", "you@company.com"], ["Site / Company", "text", "Factory, school or commercial property"]].map(([label, type, placeholder]) => <label key={label} className="block text-xs font-medium uppercase tracking-[0.05em] text-black/45">{label}<input required type={type} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-black/10 bg-[#f1f0ee]/60 px-4 py-3 text-sm outline-none transition focus:border-black/30 focus:bg-white" /></label>)}
          <label className="block text-xs font-medium uppercase tracking-[0.05em] text-black/45">Message<textarea required rows={4} placeholder="Tell us about your electricity demand, rooftop and timeline." className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-[#f1f0ee]/60 px-4 py-3 text-sm outline-none transition focus:border-black/30 focus:bg-white" /></label>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-black/40">We reply within one business day.</p><button type="submit" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#0a0a0a] py-3 pl-6 pr-4 text-sm font-medium text-white">Send request <ArrowUpRight size={16} /></button></div>
        </form>
      </>}
    </motion.div>
  </div>;
}

export function NetsoWorldClassHome() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  usePageLock(!ready || menuOpen || modalOpen);
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape" && menuOpen) setMenuOpen(false); }; window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); }, [menuOpen]);
  const go = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  return <div className="min-h-screen bg-white text-[#111] selection:bg-[#b15f2c] selection:text-white">
    {!ready && <Loader onDone={() => setReady(true)} />}
    <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-lg focus:bg-[#0a0a0a] focus:px-4 focus:py-2 focus:text-sm focus:text-white">Skip to content</a>
    <header className="fixed inset-x-0 top-0 z-40"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8"><button onClick={() => go("home")} aria-label="Netso Energy home"><Logo /></button><nav className="hidden items-center gap-7 text-sm font-medium lg:flex">{[["Home", "home"], ["Why Netso", "why-netso"], ["Solutions", "solutions"], ["Projects", "projects"], ["About", "about"], ["Contact", "contact"]].map(([label, id]) => <button key={id} onClick={() => id === "contact" ? setModalOpen(true) : go(id)} className="transition hover:-translate-y-0.5 hover:opacity-60">{label}</button>)}</nav><div className="flex items-center gap-2"><div className="hidden rounded-xl border border-black/10 bg-white/50 px-3 py-2 text-xs text-black/55 backdrop-blur md:block">Distributed energy · Bangladesh</div><button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/60 px-3 py-2 text-xs font-medium backdrop-blur transition hover:bg-white"><Menu size={15} /> <span className="hidden sm:inline">Menu</span></button></div></div></header>
    <main id="home">
      <section className="relative flex min-h-[100svh] items-end overflow-hidden rounded-b-[2rem] bg-[#c9c9c9] px-5 pb-6 pt-32 sm:px-8 sm:pb-8"><LiquidHero /><div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><Reveal><div className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-black/60"><span className="h-1.5 w-1.5 rounded-full bg-[#b15f2c]" /> Industrial Energy Infrastructure</div></Reveal><Reveal delay={0.08}><h1 className="max-w-4xl text-[clamp(3.1rem,8vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.065em]">Make your rooftop<br /><span className="text-black/45">work harder.</span></h1></Reveal><Reveal delay={0.16}><p className="mt-7 max-w-2xl text-base leading-7 text-black/65 sm:text-lg">Netso develops, finances and operates solar infrastructure for Bangladesh's factories, institutions and commercial buildings — without upfront customer CAPEX.</p></Reveal><Reveal delay={0.24}><div className="mt-7 flex flex-wrap gap-3"><button onClick={() => go("solutions")} className="group inline-flex items-center gap-3 rounded-full bg-[#0a0a0a] py-1.5 pl-6 pr-1.5 text-sm font-medium text-white">Explore the model <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-black transition group-hover:translate-x-1"><ArrowRight size={16} /></span></button><button onClick={() => setModalOpen(true)} className="rounded-full border border-black/15 bg-white/55 px-6 py-3 text-sm font-medium backdrop-blur transition hover:bg-white">Start a project</button></div></Reveal></div><Reveal delay={0.3} className="lg:col-span-4"><div className="ml-auto max-w-sm rounded-[1.5rem] border border-white/40 bg-white/65 p-2 shadow-2xl backdrop-blur-xl"><div className="rounded-[1.15rem] bg-[#0a0a0a] p-5 text-white"><div className="flex items-center justify-between"><span className="text-xs uppercase tracking-[0.15em] text-white/45">Netso Energy</span><Zap className="text-[#cf8047]" size={18} /></div><div className="mt-12 text-3xl font-medium tracking-tight">Solar as infrastructure.</div><p className="mt-3 text-sm leading-6 text-white/45">20-year energy assets designed around real industrial load.</p></div><div className="flex items-center justify-between px-3 py-3 text-xs text-black/50"><span>BOO / RESCO / PPA</span><span>Bangladesh</span></div></div></Reveal></div><div className="relative z-10 mx-auto mt-7 flex w-full max-w-7xl items-center justify-between border-t border-black/10 pt-4 text-[10px] uppercase tracking-[0.12em] text-black/45"><span>Chattogram · Gazipur · Narayanganj</span><span className="hidden items-center gap-2 sm:flex">Scroll to explore <ArrowDown size={12} /></span></div></section>
      <section id="why-netso" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:py-36"><div className="lg:col-span-4"><Reveal><p className="text-sm font-medium uppercase tracking-[0.15em] text-black/40">01 — Why Netso</p><div className="mt-16 hidden text-black/[0.05] lg:block"><Globe2 size={150} strokeWidth={1} /></div></Reveal></div><div className="lg:col-span-8"><Reveal><h2 className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] sm:text-6xl">Underused rooftops are a distributed energy opportunity. <span className="text-black/30">We turn them into productive infrastructure.</span></h2></Reveal><Reveal delay={0.12}><div className="mt-16 grid gap-8 border-t border-black/10 pt-8 sm:grid-cols-3"><div><Factory className="mb-5" size={22} /><h3 className="font-medium">Industrial first</h3><p className="mt-2 text-sm leading-6 text-black/50">Designed around factories and commercial loads where daytime solar creates immediate value.</p></div><div><Wallet className="mb-5" size={22} /><h3 className="font-medium">Zero upfront</h3><p className="mt-2 text-sm leading-6 text-black/50">Customers buy electricity, not equipment. Netso owns and operates the asset.</p></div><div><ShieldCheck className="mb-5" size={22} /><h3 className="font-medium">Built to last</h3><p className="mt-2 text-sm leading-6 text-black/50">Engineering, monitoring and lifecycle operations are treated as one system.</p></div></div></Reveal></div></section>
      <section id="solutions" className="bg-[#f1f0ee] py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8"><Reveal><div className="flex items-end justify-between gap-6"><div><p className="text-sm font-medium uppercase tracking-[0.15em] text-black/40">02 — The platform</p><h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">From rooftop to<br />operating asset.</h2></div><span className="hidden text-sm text-black/40 md:block">Development · Finance · Deploy · Operate</span></div></Reveal><div className="mt-16 grid gap-4 md:grid-cols-2">{services.map(([number, title, description], index) => <Reveal key={number} delay={index * 0.06}><article className="group min-h-72 rounded-[2rem] bg-white p-7 transition duration-500 hover:-translate-y-2 hover:bg-[#0a0a0a] hover:text-white sm:p-9"><div className="flex justify-between text-xs text-black/35 transition group-hover:text-white/35"><span>{number}</span><ArrowUpRight size={18} /></div><div className="mt-24"><h3 className="text-2xl font-medium tracking-tight sm:text-3xl">{title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-black/50 transition group-hover:text-white/50">{description}</p></div></article></Reveal>)}</div></div></section>
      <section id="projects" className="py-24 sm:py-36"><div className="mx-auto max-w-7xl px-5 sm:px-8"><Reveal><p className="text-sm font-medium uppercase tracking-[0.15em] text-black/40">03 — Projects</p><div className="mt-5 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Solar assets,<br />built around demand.</h2><p className="max-w-sm text-sm leading-6 text-black/50">A deployment pipeline focused on high-load industrial and institutional rooftops across Bangladesh.</p></div></Reveal><div className="mt-14 grid gap-4 md:grid-cols-3">{projects.map((project, index) => <Reveal key={project.name} delay={index * 0.08}><article className="group relative min-h-[28rem] overflow-hidden rounded-[2rem] bg-[#0a0a0a] p-7 text-white sm:p-9"><div className="absolute inset-0 opacity-30 transition duration-700 group-hover:scale-105 group-hover:opacity-45" style={{ backgroundImage: `url(${project.image})`, backgroundSize: "cover", backgroundPosition: "center" }} /><div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" /><div className="relative z-10 flex h-full flex-col justify-between"><div className="flex justify-between text-xs uppercase tracking-[0.12em] text-white/40"><span>{project.type}</span><span>{project.size}</span></div><div><div className="mb-8 grid h-14 w-14 place-items-center rounded-full bg-white/10 backdrop-blur"><Sun className="text-[#cf8047]" size={24} /></div><h3 className="text-2xl font-medium">{project.name}</h3><p className="mt-3 text-sm leading-6 text-white/50">{project.text}</p></div></div></article></Reveal>)}</div></div></section>
      <section id="about" className="bg-[#0a0a0a] py-24 text-white sm:py-36"><div className="mx-auto max-w-7xl px-5 sm:px-8"><Reveal><p className="text-sm font-medium uppercase tracking-[0.15em] text-white/40">04 — About Netso</p><h2 className="mt-8 max-w-5xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] sm:text-6xl">We are building an energy company for a country moving from <span className="text-white/30">centralized generation toward distributed infrastructure.</span></h2></Reveal><Reveal delay={0.12}><div className="mt-20 grid gap-10 border-t border-white/10 pt-8 md:grid-cols-4"><div><p className="text-xs uppercase tracking-[0.12em] text-white/35">Model</p><p className="mt-3 font-medium">BOO / RESCO / PPA</p></div><div><p className="text-xs uppercase tracking-[0.12em] text-white/35">Customer</p><p className="mt-3 font-medium">Industrial & commercial</p></div><div><p className="text-xs uppercase tracking-[0.12em] text-white/35">Geography</p><p className="mt-3 font-medium">Bangladesh</p></div><div><p className="text-xs uppercase tracking-[0.12em] text-white/35">Mission</p><p className="mt-3 font-medium">Make distributed energy financeable</p></div></div></Reveal></div></section>
      <section className="py-24 sm:py-32"><div className="mx-auto max-w-7xl px-5 sm:px-8"><Reveal><div className="flex flex-col gap-4 sm:flex-row">{["We", "Deploy", "→", "Better Energy"].map((item, index) => <div key={item} className={`flex h-28 flex-1 items-center justify-center rounded-full text-3xl font-medium ${index === 1 ? "bg-gradient-to-br from-[#cf8047] to-[#97501f] text-white" : index === 2 ? "bg-[#0a0a0a] text-white" : "bg-[#f1f0ee]"}`}>{index === 2 ? <ArrowRight size={40} /> : item}</div>)}</div></Reveal></div></section>
      <section className="pb-24 sm:pb-36"><div className="mx-auto max-w-7xl px-5 sm:px-8"><Reveal><div className="rounded-[2rem] bg-[#0a0a0a] p-8 text-white sm:p-14"><p className="text-sm font-medium uppercase tracking-[0.15em] text-white/45">05 — By the numbers</p><h2 className="mt-6 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl">The economics are designed to compound.</h2><div className="mt-16 grid grid-cols-2 gap-y-12 lg:grid-cols-4"><Stat value={20} label="Years of PPA structure" /><Stat value={80} label="Project debt target" suffix="%" /><Stat value={10} label="BDT/kWh target PPA" /><Stat value={4} label="Core deployment stages" /></div></div></Reveal></div></section>
      <section id="contact" className="bg-[#f1f0ee] py-24 sm:py-36"><div className="mx-auto max-w-7xl px-5 sm:px-8"><Reveal><div className="grid gap-12 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="text-sm font-medium uppercase tracking-[0.15em] text-black/40">06 — Start a project</p><h2 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl">Your rooftop is already an asset. <span className="text-black/35">Let's make it productive.</span></h2></div><div className="lg:col-span-4 lg:text-right"><p className="text-sm leading-6 text-black/50">Tell us about the site, electricity demand and building. We'll assess whether a Netso solar deployment makes sense.</p><button onClick={() => setModalOpen(true)} className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#0a0a0a] py-1.5 pl-6 pr-1.5 text-sm font-medium text-white">Start a project <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-black"><ArrowUpRight size={16} /></span></button></div></div></Reveal></div></section>
    </main>
    <footer className="rounded-t-[2rem] bg-[#0a0a0a] py-16 text-white sm:py-24"><div className="mx-auto max-w-7xl px-5 sm:px-8"><div className="flex flex-col justify-between gap-12 border-b border-white/10 pb-14 lg:flex-row lg:items-end"><div><Logo light /><h2 className="mt-8 max-w-2xl text-4xl font-medium tracking-[-0.04em] sm:text-5xl">Building the distributed energy layer for Bangladesh.</h2></div><button onClick={() => setModalOpen(true)} className="inline-flex w-fit items-center gap-3 rounded-full bg-[#f1f0ee] py-1.5 pl-6 pr-1.5 text-sm font-medium text-black">Let's talk <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0a0a0a] text-white"><ArrowUpRight size={16} /></span></button></div><div className="grid gap-10 py-14 md:grid-cols-4"><div><p className="max-w-xs text-sm leading-6 text-white/45">Netso Energy Limited develops, finances and operates distributed rooftop solar infrastructure across Bangladesh.</p></div><div><p className="text-xs uppercase tracking-[0.15em] text-white/35">Company</p><div className="mt-5 space-y-3"><button onClick={() => go("why-netso")} className="block text-sm text-white/65 transition hover:translate-x-1 hover:text-white">Why Netso</button><button onClick={() => go("projects")} className="block text-sm text-white/65 transition hover:translate-x-1 hover:text-white">Projects</button><button onClick={() => go("about")} className="block text-sm text-white/65 transition hover:translate-x-1 hover:text-white">About</button></div></div><div><p className="text-xs uppercase tracking-[0.15em] text-white/35">Solutions</p><div className="mt-5 space-y-3"><button onClick={() => go("solutions")} className="block text-sm text-white/65 transition hover:translate-x-1 hover:text-white">Solar canopies</button><button onClick={() => go("solutions")} className="block text-sm text-white/65 transition hover:translate-x-1 hover:text-white">Project finance</button><button onClick={() => go("solutions")} className="block text-sm text-white/65 transition hover:translate-x-1 hover:text-white">Operations</button></div></div><div><p className="text-xs uppercase tracking-[0.15em] text-white/35">Contact</p><div className="mt-5 space-y-3"><a href="mailto:hello@netsoenergy.com" className="block text-sm text-white/65 transition hover:translate-x-1 hover:text-white">hello@netsoenergy.com</a><button onClick={() => go("contact")} className="block text-sm text-white/65 transition hover:translate-x-1 hover:text-white">Start a project</button></div></div></div><div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/30 sm:flex-row"><span>© 2026 Netso Energy Limited. All rights reserved.</span><span>Chattogram · Dhaka · Bangladesh</span></div></div></footer>
    {menuOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[115] flex flex-col bg-[#0a0a0a] text-white"><div className="flex items-center justify-between px-5 py-5 sm:px-8"><Logo light /><button onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.05em] text-white/70 transition hover:border-white/40 hover:text-white"><X size={15} /> Close</button></div><nav className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-1 px-5 sm:px-8">{[["01", "Home", "home"], ["02", "Why Netso", "why-netso"], ["03", "Solutions", "solutions"], ["04", "Projects", "projects"], ["05", "About", "about"], ["06", "Contact", "contact"]].map(([number, label, id], index) => <motion.button key={id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + index * 0.045 }} onClick={() => id === "contact" ? (setMenuOpen(false), setModalOpen(true)) : go(id)} className="flex items-center gap-5 py-2 text-left text-4xl font-semibold tracking-[-0.03em] text-white/65 transition hover:text-white sm:text-6xl"><span className="text-sm font-normal text-[#cf8047]">{number}</span>{label}</motion.button>)}</nav><div className="border-t border-white/10 px-5 py-5 text-xs uppercase tracking-[0.08em] text-white/35 sm:px-8">Netso Energy · Distributed solar infrastructure</div></motion.div>}
    <RequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
  </div>;
}
