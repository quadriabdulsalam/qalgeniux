import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowRight, ArrowUpRight, Braces, Check, ChevronRight, Code2, Cpu, Facebook,
  Figma, Globe2, Instagram, Layers3, Mail, Menu, MonitorSmartphone,
  Moon, Phone, Rocket, Sparkles, Sun, AtSign, WandSparkles, X,
} from "lucide-react";
import logoAsset from "@/assets/algbg.png";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projects, siteConfig, testimonials, type Project, type ProjectCategory } from "@/data/site";

const nav = ["Home", "About", "Services", "Skills", "Projects", "Process", "Contact"];
const filters: Array<"All" | ProjectCategory> = ["All", "Websites", "Web Apps", "Frontend", "UI/UX", "Full Stack"];
const skills = ["React", "JavaScript", "TypeScript", "Next.js", "Node.js", "HTML5", "CSS3", "Tailwind CSS", "Material UI", "Git", "GitHub", "REST APIs", "SQL", "C#", "Figma"];
const visualStyles: Record<Project["visual"], string> = {
  commerce: "from-brand-violet/50 via-brand-blue/25 to-brand-cyan/20",
  business: "from-brand-blue/45 via-surface to-brand-violet/25",
  property: "from-brand-cyan/30 via-brand-blue/25 to-surface",
  food: "from-accent/40 via-brand-violet/20 to-surface",
  analytics: "from-brand-violet/40 via-surface to-brand-cyan/25",
  finance: "from-brand-blue/35 via-brand-cyan/20 to-surface",
  education: "from-brand-cyan/30 via-surface to-brand-violet/30",
  health: "from-brand-cyan/35 via-brand-blue/20 to-surface",
  events: "from-brand-violet/40 via-brand-blue/30 to-surface",
  travel: "from-brand-blue/40 via-brand-cyan/25 to-surface",
  portfolio: "from-brand-violet/45 via-brand-blue/25 to-surface",
  agency: "from-brand-blue/40 via-brand-violet/30 to-surface",
  photography: "from-brand-cyan/35 via-surface to-brand-violet/25",
  "3d": "from-brand-violet/50 via-brand-cyan/30 to-brand-blue/20",
  animation: "from-accent/45 via-brand-violet/25 to-surface",
  hardware: "from-brand-blue/40 via-surface to-brand-cyan/25",
  fashion: "from-brand-violet/40 via-brand-blue/20 to-surface",
  blog: "from-brand-cyan/30 via-surface to-brand-violet/30",
  landing: "from-brand-blue/45 via-brand-cyan/20 to-surface",
  video: "from-brand-violet/45 via-brand-blue/30 to-surface",
  music: "from-brand-cyan/40 via-brand-violet/25 to-surface",
  product: "from-brand-blue/40 via-accent/30 to-surface",
  coffee: "from-accent/40 via-brand-violet/20 to-surface",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Algeniux | Software Engineer & Web Developer" },
      { name: "description", content: "Algeniux builds modern websites, web applications and digital experiences using modern web technologies." },
      { property: "og:title", content: "Algeniux | Software Engineer & Web Developer" },
      { property: "og:description", content: "Modern websites, web applications and premium digital experiences." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 42, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

function SectionHead({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <Reveal className="mb-12 max-w-3xl"><div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase text-brand-cyan"><span className="h-px w-10 brand-gradient" />{eyebrow}</div><h2 className="text-3xl font-semibold text-foreground sm:text-5xl">{title}</h2>{body && <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">{body}</p>}</Reveal>;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <a href="#home" aria-label="Algeniux home" className="flex shrink-0 items-center"><img src={logoAsset} alt="Algeniux circuit brain logo" className={compact ? "h-12 w-auto" : "h-20 w-auto"} /></a>;
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    const saved = window.localStorage.getItem("algeniux-theme");
    const next = saved === "light" || saved === "dark" ? saved : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    window.localStorage.setItem("algeniux-theme", next);
  };
  return <Button variant="outline" size="icon" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} className="min-h-11 min-w-11 bg-background/60 backdrop-blur"><AnimatePresence mode="wait" initial={false}>{theme === "dark" ? <motion.span key="sun" initial={{ rotate: -45, scale: .6, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: 45, scale: .6, opacity: 0 }}><Sun className="size-4"/></motion.span> : <motion.span key="moon" initial={{ rotate: 45, scale: .6, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: -45, scale: .6, opacity: 0 }}><Moon className="size-4"/></motion.span>}</AnimatePresence></Button>;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 30); fn(); addEventListener("scroll", fn, { passive: true }); return () => removeEventListener("scroll", fn); }, []);
  return <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled ? "border-b border-border bg-background/80 py-2 backdrop-blur-xl" : "py-4"}`}>
    <nav aria-label="Primary navigation" className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 lg:grid-cols-[auto_1fr_auto] lg:px-8">
      <Logo compact />
      <div className="hidden justify-center gap-7 lg:flex">{nav.map(item => <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-muted-foreground transition hover:text-foreground">{item}</a>)}</div>
      <div className="flex items-center justify-end gap-2"><ThemeToggle/><Button asChild className="hidden h-11 brand-gradient text-primary-foreground lg:inline-flex"><a href="#contact">Start a Project <ArrowUpRight /></a></Button>
      <Button variant="ghost" size="icon" aria-label="Open navigation" className="min-h-11 min-w-11 lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div>
    </nav>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-b border-border bg-background/95 px-5 py-5 backdrop-blur-xl lg:hidden">{nav.map(item => <a key={item} onClick={() => setOpen(false)} href={`#${item.toLowerCase()}`} className="block border-b border-border py-3 text-foreground">{item}</a>)}<Button asChild className="mt-5 w-full brand-gradient"><a href="#contact">Start a Project</a></Button></motion.div>}</AnimatePresence>
  </header>;
}

function Hero() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110]);
  const visualRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 8]);
  const fade = useTransform(scrollYProgress, [0, .82], [1, .15]);
  return <section ref={section} id="home" className="relative flex min-h-[92vh] items-center overflow-hidden pt-28">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,color-mix(in_oklab,var(--brand-blue)_16%,transparent),transparent_35%)]" />
    <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-16 lg:grid-cols-[1.12fr_.88fr] lg:px-8">
      <motion.div style={{ y: copyY, opacity: fade }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}>
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 text-sm text-muted-foreground"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-cyan opacity-60"/><span className="relative size-2 rounded-full bg-brand-cyan"/></span>Available for new projects</div>
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.06] text-foreground sm:text-6xl lg:text-7xl">Building Digital Experiences That <span className="brand-text">Think, Perform & Inspire.</span></h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">I’m a software engineer focused on building modern websites, web applications, and digital experiences that combine clean engineering with exceptional design.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-12 brand-gradient px-6"><a href="#projects">View My Work <ArrowRight /></a></Button><Button asChild size="lg" variant="outline" className="h-12 border-border bg-surface/50 px-6"><a href="#contact">Let's Work Together</a></Button></div>
      </motion.div>
      <motion.div style={{ y: visualY, rotate: visualRotate }} className="relative mx-auto aspect-square w-full max-w-[560px]" aria-label="Interactive connected technology network"><motion.div animate={reduce ? false : { rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-[12%] rounded-full border border-dashed border-brand-cyan/25"/><motion.div animate={reduce ? false : { rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="absolute inset-[24%] rounded-full border border-dashed border-brand-violet/25"/><img src={logoAsset.url} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-4 left-1/2 w-36 -translate-x-1/2 opacity-80" /></motion.div>
    </div>
  </section>;
}

const services = [
  [Code2, "WEB DEVELOPMENT", "Modern, responsive and scalable websites built for businesses and organizations."],
  [Globe2, "WEB APPLICATIONS", "Interactive web applications designed to solve real-world problems."],
  [Braces, "FRONTEND ENGINEERING", "Modern React-based interfaces with clean architecture and excellent user experience."],
  [Layers3, "UI IMPLEMENTATION", "Transforming designs and ideas into polished, functional interfaces."],
  [WandSparkles, "WEBSITE REDESIGN", "Modernizing outdated websites into professional digital experiences."],
  [Rocket, "PERFORMANCE & RESPONSIVENESS", "Fast, responsive and optimized experiences across devices."],
] as const;

function Services() { return <section id="services" className="border-y border-border bg-surface/55 py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHead eyebrow="Services" title="What I Build" body="Digital products engineered for clarity, resilience and measurable impact."/><div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{services.map(([Icon,title,description],i)=><Reveal key={title} className="group circuit-surface bg-card p-7 transition hover:bg-surface-raised"><div className="flex items-start justify-between"><span className="text-xs font-bold text-brand-cyan">{String(i+1).padStart(2,"0")}</span><Icon className="size-6 text-brand-violet transition group-hover:text-brand-cyan"/></div><h3 className="mt-14 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p></Reveal>)}</div></div></section> }

function About() { const stats=[["20+","Projects"],["Modern","Technologies"],["Responsive","Experiences"],["Client","Focused"]]; return <section id="about" className="py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-14 lg:grid-cols-2"><SectionHead eyebrow="About Algeniux" title="Engineering Ideas Into Digital Reality." body="Algeniux is a software engineering brand focused on transforming ideas into modern, functional and visually engaging digital experiences. From responsive websites to business platforms and interactive products, every build balances thoughtful design with maintainable engineering."/><Reveal><div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">{stats.map(([value,label])=><div key={label} className="bg-card p-6 sm:p-8"><strong className="block text-2xl font-semibold brand-text sm:text-3xl">{value}</strong><span className="mt-2 block text-sm text-muted-foreground">{label}</span></div>)}</div></Reveal></div></div></section> }

function Skills() { return <section id="skills" className="py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHead eyebrow="Capabilities" title="Tools I Use To Build" body="A practical toolkit for designing, engineering and shipping modern digital products."/><Reveal className="flex flex-wrap gap-3">{skills.map((skill,i)=><motion.div whileHover={{ y: -4 }} key={skill} className="flex items-center gap-3 rounded-md border border-border bg-card px-5 py-4 text-sm font-semibold glow-border"><span className={`size-2 rounded-full ${i%3===0?"bg-brand-violet":i%3===1?"bg-brand-blue":"bg-brand-cyan"}`}/>{skill}</motion.div>)}</Reveal></div></section> }

const shotSrc = (id: number) => `/shots/${String(id).padStart(2, "0")}.webp`;

function ProjectVisual({ project, large=false, priority=false }: { project: Project; large?: boolean; priority?: boolean }) {
  const [failed,setFailed]=useState(false); const [loaded,setLoaded]=useState(false);
  const imgRef=useRef<HTMLImageElement>(null);
  const src=shotSrc(project.id);
  useEffect(()=>{ const el=imgRef.current; if(el?.complete){ el.naturalWidth>0?setLoaded(true):setFailed(true); } },[src]);
  return <div className={`relative overflow-hidden bg-gradient-to-br ${visualStyles[project.visual]} ${large?"aspect-video":"aspect-[16/10]"}`}>
    {!failed && <img ref={imgRef} src={src} srcSet={`${src} 1x, ${src.replace(".webp","@2x.webp")} 2x`} sizes={large?"(max-width: 900px) 100vw, 900px":"(max-width: 640px) 100vw, 420px"} width={1200} height={750} alt={`${project.title} homepage screenshot`} loading={priority?"eager":"lazy"} decoding="async" fetchPriority={priority?"high":"low"} onLoad={()=>setLoaded(true)} onError={()=>setFailed(true)} className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-500 ${loaded?"opacity-100":"opacity-0"}`}/>}
    {!failed && !loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-foreground/5 to-transparent"/>}
    {failed && <div className="absolute inset-6 rounded-md border border-foreground/10 bg-background/55 p-4 shadow-2xl backdrop-blur"><div className="flex gap-1.5"><i className="size-2 rounded-full bg-brand-violet"/><i className="size-2 rounded-full bg-brand-blue"/><i className="size-2 rounded-full bg-brand-cyan"/></div><div className="mt-5 grid h-[70%] grid-cols-[.3fr_1fr] gap-3"><div className="rounded-sm bg-surface/80"/><div className="grid grid-cols-2 gap-3"><div className="col-span-2 rounded-sm border border-brand-cyan/20 bg-surface-raised/80"/><div className="rounded-sm border border-brand-violet/20 bg-surface/80"/><div className="rounded-sm border border-brand-blue/20 bg-surface/80"/></div></div></div>}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"/>
    <span className="absolute bottom-4 right-5 font-display text-5xl font-bold text-foreground/25 mix-blend-luminosity">{String(project.id).padStart(2,"0")}</span>
  </div>;
}

function ProjectCard({ project, onOpen, priority=false }: { project: Project; onOpen: (p:Project)=>void; priority?: boolean }) { return <motion.article layout initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.97}} className="group overflow-hidden rounded-lg border border-border bg-card glow-border"><div className="overflow-hidden"><motion.div className="transition duration-500 group-hover:scale-[1.035]"><ProjectVisual project={project} priority={priority}/></motion.div></div><div className="p-6"><div className="flex items-center justify-between text-xs font-semibold uppercase text-brand-cyan"><span>{project.category}</span><span>{String(project.id).padStart(2,"0")}</span></div><h3 className="mt-3 text-xl font-semibold transition group-hover:translate-x-1">{project.title}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{project.description}</p><div className="mt-5 flex flex-wrap gap-2 opacity-80 transition group-hover:opacity-100">{project.technologies.map(t=><span key={t} className="rounded-sm bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">{t}</span>)}</div><div className="mt-6 flex items-center gap-2"><Button onClick={()=>onOpen(project)} variant="ghost" className="px-0 text-foreground hover:bg-transparent hover:text-brand-cyan">View Project <ArrowUpRight className="transition group-hover:translate-x-1"/></Button></div></div></motion.article> }

function ProjectModal({ project, close }: { project: Project | null; close:()=>void }) { return <Dialog open={!!project} onOpenChange={v=>!v&&close()}>{project&&<DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-border bg-background p-0"><ProjectVisual project={project} large/><div className="p-6 sm:p-9"><div className="text-xs font-bold uppercase text-brand-cyan">{project.category} / {String(project.id).padStart(2,"0")}</div><DialogTitle className="mt-3 text-3xl font-semibold">{project.title}</DialogTitle><DialogDescription className="mt-4 text-base leading-7">{project.description}</DialogDescription><div className="mt-8 grid gap-7 sm:grid-cols-2"><div><h4 className="font-semibold">The problem</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">{project.problem}</p></div><div><h4 className="font-semibold">The solution</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">{project.solution}</p></div></div><h4 className="mt-8 font-semibold">Key features</h4><ul className="mt-3 grid gap-2 sm:grid-cols-2">{project.features.map(f=><li key={f} className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="size-4 text-brand-cyan"/>{f}</li>)}</ul><div className="mt-8 flex flex-wrap gap-3"><Button asChild className="brand-gradient"><a href={project.liveUrl}>Live Demo <ArrowUpRight/></a></Button></div></div></DialogContent>}</Dialog> }

function Projects() { const [filter,setFilter]=useState<(typeof filters)[number]>("All"); const [selected,setSelected]=useState<Project|null>(null); const [expanded,setExpanded]=useState(false); const filtered=useMemo(()=>filter==="All"?projects:projects.filter(p=>p.category===filter),[filter]); const visible=useMemo(()=>expanded?filtered:filtered.slice(0,5),[filtered,expanded]); const hasMore=filtered.length>5; useEffect(()=>{setExpanded(false);},[filter]); return <section id="projects" className="border-y border-border bg-surface/55 py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHead eyebrow="Portfolio" title="Selected Work" body="A collection of digital products, websites and applications I've designed and built as portfolio concepts and independent work."/><div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">{filters.map(f=><Button key={f} onClick={()=>setFilter(f)} variant={filter===f?"default":"outline"} className={filter===f?"brand-gradient":"bg-background/50"}>{f}</Button>)}</div><motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"><AnimatePresence mode="popLayout">{visible.map((p,i)=><ProjectCard key={p.id} project={p} onOpen={setSelected} priority={i<3}/>)}</AnimatePresence></motion.div>{hasMore&&<motion.div initial={false} animate={{opacity:1,y:0}} className="mt-12 flex justify-center"><Button onClick={()=>setExpanded(v=>!v)} variant="outline" size="lg" className="h-12 gap-2 bg-background/50 px-8">{expanded?"Show Less":"View More Projects"}<motion.span animate={{rotate:expanded?180:0}}><ChevronRight className="size-4"/></motion.span></Button></motion.div>}<ProjectModal project={selected} close={()=>setSelected(null)}/></div></section> }

function Process() { const steps=[["DISCOVER","Understand the idea, goals and target audience."],["PLAN & DESIGN","Plan the structure, user experience and visual direction."],["DEVELOP","Build the product using modern technologies and clean code."],["LAUNCH","Test, optimize and deploy the finished product."]]; return <section id="process" className="py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHead eyebrow="The Process" title="From Idea To Launch."/><div className="relative grid gap-8 lg:grid-cols-4 before:absolute before:left-0 before:right-0 before:top-6 before:hidden before:h-px before:bg-border lg:before:block">{steps.map(([title,body],i)=><Reveal key={title} className="relative"><span className="grid size-12 place-items-center rounded-full border border-brand-cyan/40 bg-background font-display text-sm text-brand-cyan">{String(i+1).padStart(2,"0")}</span><h3 className="mt-6 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p></Reveal>)}</div></div></section> }

function Why() { const items=[[Code2,"Clean Code"],[Cpu,"Modern Technologies"],[MonitorSmartphone,"Responsive Design"],[Rocket,"Performance Focus"],[Sparkles,"Creative Problem Solving"],[Mail,"Professional Communication"]] as const; return <section className="bg-surface/55 py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHead eyebrow="The Difference" title="Why Work With Algeniux?"/><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map(([Icon,label])=><Reveal key={label} className="flex items-center gap-4 rounded-lg border border-border bg-card p-5"><span className="grid size-11 shrink-0 place-items-center rounded-md bg-secondary"><Icon className="size-5 text-brand-cyan"/></span><h3 className="font-semibold">{label}</h3></Reveal>)}</div></div></section> }

function Testimonials() { return <section className="py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHead eyebrow="Client Perspective" title="Built On Thoughtful Collaboration" body="Placeholder testimonials — ready to replace with verified client feedback."/><div className="grid gap-5 lg:grid-cols-3">{testimonials.map(t=><Reveal key={t.quote} className="rounded-lg border border-border bg-card p-7"><div className="text-3xl brand-text">“</div><blockquote className="mt-4 leading-7 text-foreground">{t.quote}</blockquote><div className="mt-8 border-t border-border pt-5"><div className="font-semibold">{t.name}</div><div className="mt-1 text-xs text-muted-foreground">{t.role}</div></div></Reveal>)}</div></div></section> }

function Contact() { const [state,setState]=useState<"idle"|"loading"|"success"|"error">("idle"); const submit=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault(); const form=e.currentTarget; if(!form.checkValidity()){setState("error");form.reportValidity();return;} setState("loading");setTimeout(()=>setState("success"),900)}; return <section id="contact" className="border-t border-border bg-surface/60 py-24"><div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div><SectionHead eyebrow="Start a Conversation" title="Have An Idea? Let's Build It." body="Whether you need a professional website, web application, or a completely new digital experience, Algeniux is ready to turn your idea into reality."/><div className="space-y-3 text-sm text-muted-foreground"><a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 hover:text-brand-cyan"><Mail className="size-4"/>{siteConfig.email}</a><a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 hover:text-brand-cyan"><Phone className="size-4"/>{siteConfig.phone}</a></div></div><Reveal><form onSubmit={submit} className="grid gap-5 rounded-lg border border-border bg-card p-6 glow-border sm:grid-cols-2" noValidate><label className="text-sm">Name<Input required maxLength={100} name="name" className="mt-2 h-11 bg-background/50" placeholder="Your name"/></label><label className="text-sm">Email<Input required type="email" maxLength={255} name="email" className="mt-2 h-11 bg-background/50" placeholder="you@example.com"/></label><label className="text-sm">Project Type<Input required maxLength={80} name="type" className="mt-2 h-11 bg-background/50" placeholder="Website, app, redesign..."/></label><label className="text-sm">Budget<Input required maxLength={80} name="budget" className="mt-2 h-11 bg-background/50" placeholder="Your preferred range"/></label><label className="text-sm sm:col-span-2">Message<Textarea required minLength={10} maxLength={2000} name="message" className="mt-2 min-h-36 bg-background/50" placeholder="Tell me about your goals..."/></label><div className="sm:col-span-2"><Button disabled={state==="loading"} className="h-12 w-full brand-gradient sm:w-auto">{state==="loading"?"Sending...":state==="success"?"Inquiry Ready":"Send Project Inquiry"}<ArrowRight/></Button>{state==="success"&&<p role="status" className="mt-3 text-sm text-brand-cyan">Thanks — the form is validated and ready to connect to your email service.</p>}{state==="error"&&<p role="alert" className="mt-3 text-sm text-destructive">Please complete all fields with valid information.</p>}</div></form></Reveal></div></section> }

function Footer() { const socials=[[Instagram,siteConfig.social.instagram,"Instagram"],[X,siteConfig.social.twitter,"Twitter / X"],[Facebook,siteConfig.social.facebook,"Facebook"],[AtSign,siteConfig.social.threads,"Threads"]] as const; return <footer className="border-t border-border bg-background"><div className="mx-auto max-w-7xl px-5 py-14 lg:px-8"><div className="grid gap-10 md:grid-cols-[1fr_auto_auto]"><div><Logo/><p className="mt-4 max-w-sm text-sm text-muted-foreground">Building the future, one digital experience at a time.</p></div><div><h2 className="text-sm font-semibold">Navigate</h2><div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">{nav.map(n=><a className="text-sm text-muted-foreground hover:text-brand-cyan" href={`#${n.toLowerCase()}`} key={n}>{n}</a>)}</div></div><div><h2 className="text-sm font-semibold">Connect</h2><div className="mt-4 flex gap-2">{socials.map(([Icon,url,label])=><Button key={label} asChild variant="outline" size="icon" aria-label={label} className="min-h-11 min-w-11"><a href={url}><Icon/></a></Button>)}</div><div className="mt-4 text-sm text-muted-foreground">{siteConfig.email}<br/>{siteConfig.phone}</div></div></div><div className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">© 2026 Algeniux. All rights reserved.</div></div></footer> }

function Portfolio() { const { scrollYProgress } = useScroll(); const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: .001 }); return <><motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left brand-gradient" style={{ scaleX }}/><Navbar/><main><Hero/><About/><Services/><Skills/><Projects/><Process/><Why/><Testimonials/><Contact/></main><Footer/></>; }
