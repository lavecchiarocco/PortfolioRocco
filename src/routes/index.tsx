import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Linkedin,
  Github,
  Sparkles,
  GraduationCap,
  MapPin,
  Code2,
  Send,
  CheckCircle2,
  Menu,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import heroAurora from "@/assets/hero-aurora.jpg";

// ── Reemplazá con tu propio endpoint de Formspree (https://formspree.io) ──
// Creá un formulario nuevo, copiá el ID y pegalo acá: https://formspree.io/f/<ID>
const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id";

const NAV = [
  { label: "Sobre Mí", href: "#sobre-mi" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

const SKILLS = [
  { name: "Angular", group: "Frontend" },
  { name: "React", group: "Frontend" },
  { name: "TypeScript", group: "Frontend" },
  { name: "JavaScript", group: "Frontend" },
  { name: "HTML", group: "Frontend" },
  { name: "CSS", group: "Frontend" },
  { name: "Tailwind", group: "Frontend" },
  { name: ".NET", group: "Backend" },
  { name: "C#", group: "Backend" },
  { name: "SQL", group: "Backend" },
  { name: "Python", group: "Backend" },
  { name: "Pandas", group: "Datos" },
  { name: "Power BI", group: "Datos" },
  { name: "Git", group: "Herramientas" },
];

const PROJECTS = [
  {
    name: "Sitio Web Restaurante — Lavecchia's",
    description:
      "Sitio estático desarrollado con HTML y CSS, orientado a la presentación de un restaurante. Diseño visual atractivo, navegación clara y secciones bien definidas para mejorar la experiencia del usuario.",
    stack: ["HTML", "CSS"],
    tag: "Static",
    featured: true,
    href: "#",
  },
  {
    name: "Epotifai",
    description:
      "App en React para agregar, buscar y reproducir canciones de YouTube. El usuario carga canciones por URL, las visualiza en una lista personalizada y lleva un conteo de reproducciones por tema.",
    stack: ["React", "JavaScript"],
    tag: "Web App",
    href: "#",
  },
  {
    name: "To-do List Kanban",
    description:
      "Interfaz web con HTML y CSS enfocada en el diseño y la organización de tareas. Tablero tipo Kanban con tareas distribuidas por estados y prioridades, sin lógica JavaScript.",
    stack: ["HTML", "CSS"],
    tag: "UI",
    href: "#",
  },
  {
    name: "Giff App Angular",
    description:
      "SPA en Angular para buscar, visualizar y gestionar GIFs desde la API de Giphy. Navegación entre Trending, Búsqueda e Historial sin recargar la página.",
    stack: ["Angular", "TypeScript"],
    tag: "SPA",
    href: "#",
  },
];

const SOCIALS = [
  { label: "Email", href: "mailto:rocco@example.com", icon: Mail },
  { label: "LinkedIn", href: "https://linkedin.com/in/roccolavecchia", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/roccolavecchia", icon: Github },
];

const BUDGETS = ["$300.000", "$400.000 - $600.000", "$700.000 - $850.000", "Más de $1.000.000"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rocco Lavecchia — Desarrollador Web Full Stack" },
      {
        name: "description",
        content:
          "Portfolio de Rocco Lavecchia, desarrollador web full stack. Angular, React, .NET, TypeScript y más. Proyectos, habilidades y contacto.",
      },
      { property: "og:title", content: "Rocco Lavecchia — Desarrollador Web Full Stack" },
      {
        property: "og:description",
        content:
          "Portfolio de Rocco Lavecchia, desarrollador web full stack. Proyectos, habilidades y contacto.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rocco Lavecchia",
    jobTitle: "Desarrollador Web Full Stack",
    url: "https://miportafolioroccodev.vercel.app/",
    sameAs: ["https://linkedin.com/in/roccolavecchia", "https://github.com/roccolavecchia"],
    knowsAbout: ["Angular", "React", ".NET", "TypeScript", "Python"],
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ───────────────────────── Navbar ───────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
            RL
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">Rocco Lavecchia</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a href="#contacto">
            <Button size="sm" className="ml-2 gap-1.5">
              Contacto <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-border text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-5 py-3 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ───────────────────────── Hero (Bento) ───────────────────────── */
function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-5 pt-8 sm:pt-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] grid-glow [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] opacity-60" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[minmax(0,1fr)]">
        {/* Main hero cell */}
        <div className="bento-cell bento-cell-hover md:col-span-4 md:row-span-2 flex flex-col justify-between p-7 sm:p-10">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Disponible para proyectos freelance
          </div>

          <div className="mt-8">
            <p className="font-mono text-sm text-primary">{"// "}hola, soy</p>
            <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
              Rocco Lavecchia
            </h1>
            <p className="mt-3 text-balance text-2xl font-medium text-muted-foreground sm:text-3xl">
              Desarrollador Web <span className="text-gradient font-semibold">Full Stack</span>
            </p>
            <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Creo experiencias digitales modernas y funcionales con las últimas tecnologías web. De
              la idea al deploy, backend y frontend.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#proyectos">
                <Button className="gap-1.5">
                  Ver Proyectos <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#contacto">
                <Button variant="outline" className="gap-1.5">
                  Contactar <Mail className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Aurora visual cell */}
        <div className="bento-cell relative md:col-span-2 md:row-span-2 min-h-44 overflow-hidden">
          <img
            src={heroAurora}
            alt="Aurora índigo abstracta representando el trabajo de desarrollo de Rocco Lavecchia"
            width={1200}
            height={1408}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <div className="absolute bottom-0 p-5">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="mt-2 font-display text-sm font-medium">Diseño + Código</p>
            <p className="text-xs text-muted-foreground">interfaces con propósito</p>
          </div>
        </div>

        {/* Stat — Educación */}
        <div className="bento-cell bento-cell-hover md:col-span-2 p-5">
          <GraduationCap className="h-5 w-5 text-primary" />
          <p className="mt-3 font-display text-sm font-medium">UTN</p>
          <p className="text-xs text-muted-foreground">
            Tecnicatura Universitaria en Programación — estudiante avanzado
          </p>
        </div>

        {/* Stat — Proyectos */}
        <div className="bento-cell bento-cell-hover md:col-span-2 p-5">
          <Code2 className="h-5 w-5 text-primary" />
          <p className="mt-3 font-display text-sm font-medium">{PROJECTS.length}+ proyectos</p>
          <p className="text-xs text-muted-foreground">Angular · React · .NET · Python</p>
        </div>

        {/* Stat — Stack breadth */}
        <div className="bento-cell bento-cell-hover md:col-span-2 p-5">
          <MapPin className="h-5 w-5 text-primary" />
          <p className="mt-3 font-display text-sm font-medium">Argentina</p>
          <p className="text-xs text-muted-foreground">Trabajo remoto, en español o inglés</p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── About + Skills (Bento) ───────────────────────── */
function About() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
      <SectionHeading kicker="01" title="Sobre Mí" />
      <div id="habilidades" className="mt-8 grid scroll-mt-20 grid-cols-1 gap-4 md:grid-cols-6">
        {/* Bio */}
        <div className="bento-cell bento-cell-hover md:col-span-3 p-7">
          <h3 className="font-display text-xl font-semibold">Rocco Lavecchia</h3>
          <p className="mt-1 text-sm text-primary">Estudiante de Tecnicatura en Programación</p>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
            Soy estudiante avanzado de la Tecnicatura Universitaria en Programación (UTN). Me
            apasiona construir aplicaciones web completas: desde la lógica del backend y el modelado
            de datos hasta una interfaz pulida y accesible.
          </p>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
            Trabajo con el ecosistema .NET y bases SQL en el backend, y con Angular, React y
            TypeScript en el frontend. También incursiono en análisis de datos con Python, Pandas y
            Power BI.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              Full Stack
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              Frontend
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              Data
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="bento-cell md:col-span-3 p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold">Habilidades</h3>
            <span className="font-mono text-xs text-muted-foreground">{SKILLS.length} techs</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <span
                key={s.name}
                className="group rounded-xl border border-border bg-elevated/50 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                title={s.group}
              >
                {s.name}
                <span className="ml-1 text-muted-foreground/60">·{s.group[0]}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Projects (Bento) ───────────────────────── */
function Projects() {
  return (
    <section id="proyectos" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
      <SectionHeading kicker="02" title="Proyectos" />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-6">
        {PROJECTS.map((p) => (
          <article
            key={p.name}
            className={`bento-cell bento-cell-hover group flex flex-col p-6 ${
              p.featured ? "md:col-span-3" : "md:col-span-3"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                {p.tag}
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold leading-snug">{p.name}</h3>
            <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-border bg-elevated/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href={p.href}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
            >
              Ver proyecto <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Contact ───────────────────────── */
function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [budget, setBudget] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("budget", budget);

    if (FORMSPREE_ENDPOINT.includes("your-form-id")) {
      toast.error(
        "Falta configurar el endpoint de Formspree. Reemplazá FORMSPREE_ENDPOINT en el código.",
      );
      return;
    }

    setSending(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSent(true);
        form.reset();
        setBudget("");
        toast.success("¡Mensaje enviado! Te responderé pronto.");
      } else {
        toast.error("No se pudo enviar. Intentá de nuevo en un momento.");
      }
    } catch {
      toast.error("Error de red. Revisá tu conexión e intentá de nuevo.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contacto" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
      <SectionHeading kicker="03" title="Contacto" />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-6">
        {/* Form */}
        <div className="bento-cell md:col-span-4 p-7">
          <p className="text-sm text-muted-foreground">
            Contame sobre tu proyecto y te respondo en menos de 24 hs.
          </p>
          {sent ? (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-elevated/30 py-14 text-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <p className="font-display text-lg font-semibold">¡Gracias!</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Tu mensaje fue enviado. Te responderé a la brevedad.
              </p>
              <Button variant="outline" size="sm" onClick={() => setSent(false)}>
                Enviar otro mensaje
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" name="name" required placeholder="Tu nombre" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="vos@email.com" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Presupuesto estimado</Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar..." />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGETS.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Si no tenés un presupuesto definido, elegí la opción más cercana.
                </p>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Contame sobre tu proyecto..."
                />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" disabled={sending} className="gap-1.5">
                  {sending ? "Enviando..." : "Enviar mensaje"}
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Socials */}
        <div className="bento-cell md:col-span-2 flex flex-col p-7">
          <h3 className="font-display text-xl font-semibold">Conectemos</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            También podés escribirme directo por cualquiera de estos canales.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-border bg-elevated/30 px-4 py-3 transition-colors hover:border-primary/50"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-sm font-medium">{s.label}</span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-display text-xs font-bold text-primary-foreground">
            RL
          </span>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rocco Lavecchia
          </span>
        </div>
        <div className="flex items-center gap-4">
          {SOCIALS.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── Helpers ───────────────────────── */
function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-sm text-primary">{kicker}</span>
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <span className="ml-1 h-px flex-1 bg-border" />
    </div>
  );
}
