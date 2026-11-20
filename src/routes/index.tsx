import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Mail, Linkedin, Github, Menu, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import turnoGo from "@/assets/turnoGo.png";
import totalImport1 from "@/assets/totalimport1.png";
import jfrTecno from "@/assets/jfr.jpeg";

const FEATURED_IMAGES: Record<string, string> = {
  turnogo: turnoGo,
  totalimport: totalImport1,
  jfr: jfrTecno,
};

const NAV = [
  { label: "Sobre Mí", href: "#sobre-mi" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

type TechItem = { name: string; projects?: string[]; note?: string };
type StackGroup = {
  label: string;
  description?: string;
  footnote?: string;
  items: TechItem[];
};

const BACKEND_STACK: StackGroup = {
  label: "Backend",
  items: [
    { name: "Python", projects: ["TurnoGo", "TotalImport"] },
    { name: "FastAPI", projects: ["TurnoGo", "TotalImport"] },
    { name: "SQLAlchemy", projects: ["TurnoGo", "TotalImport"] },
    { name: "Pydantic", projects: ["TurnoGo", "TotalImport"] },
    { name: "Alembic", projects: ["TotalImport"] },
  ],
};

const DATA_STACK: StackGroup = {
  label: "Datos",
  description: "Integridad y consultas",
  footnote: "Constraint GiST para evitar turnos solapados en TurnoGo",
  items: [
    { name: "PostgreSQL", note: "constraint GiST", projects: ["TurnoGo"] },
    { name: "SQL", projects: ["TurnoGo"] },
  ],
};

const FRONTEND_STACK: StackGroup = {
  label: "Frontend",
  description: "La interfaz que consume la API",
  items: [
    { name: "React", projects: ["TurnoGo", "TotalImport", "Epotifai"] },
    { name: "TypeScript", projects: ["TurnoGo", "TotalImport"] },
    { name: "Tailwind", projects: ["TurnoGo", "TotalImport"] },
    { name: "TanStack Query", projects: ["TotalImport"] },
    { name: "Vite", projects: ["TurnoGo", "TotalImport"] },
  ],
};

const TOOLS_STACK: StackGroup = {
  label: "Herramientas",
  items: [
    { name: "Git" },
    { name: "Vercel", projects: ["JFR Tecno", "iTecnología"] },
    { name: "Sanity", projects: ["JFR Tecno"] },
  ],
};

const CORE_STACK = [BACKEND_STACK, DATA_STACK, FRONTEND_STACK, TOOLS_STACK] as const;
const ALSO_USED = ["HTML", "CSS", "JavaScript"];

interface Project {
  name: string;
  description: string;
  stack: string[];
  tag: string;
  href: string;
  featured?: boolean;
  slug?: string;
  github?: { frontend: string; backend: string };
}

const PROJECTS: Project[] = [
  {
    name: "TurnoGo",
    description:
      "SaaS de reserva de turnos: dos clientes no pueden tomar el mismo horario. API en FastAPI con PostgreSQL, autenticación con OTP, webhooks firmados de Mercado Pago y cliente React + TypeScript. Una constraint GiST en la base garantiza la integridad y 122 tests cubren el flujo de reserva.",
    stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "React", "TypeScript", "Tailwind CSS"],
    tag: "Backend + Frontend",
    featured: true,
    slug: "turnogo",
    href: "https://www.turnogo.app/",
    github: {
      frontend: "https://github.com/wyn-code/TurnoGo",
      backend: "https://github.com/wyn-code/TurnoGo_back",
    },
  },
  {
    name: "TotalImport — Calculadora de Impuestos",
    description:
      "Compara en paralelo los 3 regímenes aduaneros para importar a Argentina. Motor de cálculo puro, alícuotas como YAML editables sin redeploy, dólar del BCRA con fallback y comparativa exportable a PDF.",
    stack: [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "Tailwind CSS",
      "TanStack Query",
      "Zod",
      "Recharts",
      "jsPDF",
    ],
    tag: "Backend + Frontend",
    featured: true,
    slug: "totalimport",
    href: "https://calculadora-impuestos.vercel.app/",
    github: {
      frontend: "https://github.com/lavecchiarocco/Calculadora-Impuestos/tree/main/frontend",
      backend: "https://github.com/lavecchiarocco/Calculadora-Impuestos/tree/main/backend",
    },
  },
  {
    name: "JFR Tecno",
    description:
      "Catálogo de monitores portátiles con Sanity como CMS headless: productos y precios se actualizan sin tocar código. Fichas de producto, checkout por WhatsApp, envíos a todo el país y deploy en Vercel.",
    stack: ["Sanity", "Vercel", "WhatsApp"],
    tag: "Frontend + CMS",
    featured: true,
    slug: "jfr",
    href: "https://catalogo-jfrtecno.vercel.app/",
  },
  {
    name: "Epotifai",
    description:
      "App en React para agregar, buscar y reproducir canciones de YouTube. El usuario carga canciones por URL, las visualiza en una lista personalizada y lleva un conteo de reproducciones por tema.",
    stack: ["React", "JavaScript"],
    tag: "Web App",
    href: "https://react-project-seven-tan.vercel.app/",
  },
  {
    name: "iTecnología",
    description:
      "Link-in-bio para una Apple Premium Store con formulario de plan de canje: valida capacidad y batería y arma el mensaje listo para WhatsApp. HTML, CSS y JavaScript vanilla, deployado en Vercel.",
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
    tag: "Frontend",
    href: "https://itecnologia.vercel.app/",
  },
];

const SOCIALS = [
  { label: "Email", href: "mailto:roccolavecchia.rl@gmail.com", icon: Mail },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rocco-lavecchia-58089917a/",
    icon: Linkedin,
  },
  { label: "GitHub", href: "https://github.com/lavecchiarocco", icon: Github },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rocco Lavecchia — Full Stack Junior | Backend Python" },
      {
        name: "description",
        content:
          "Desarrollador Full Stack junior con foco en backend Python. Graduado de la UTN. Casos reales: TurnoGo (FastAPI + PostgreSQL, 122 tests), TotalImport y JFR Tecno. Busco mi primer rol.",
      },
      {
        property: "og:title",
        content: "Rocco Lavecchia — Full Stack Junior | Backend Python",
      },
      {
        property: "og:description",
        content:
          "Graduado de la UTN. Backend en Python, FastAPI y PostgreSQL; frontend en React y TypeScript. Tres casos en producción. Busco mi primer rol.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://portfolio-rocco.vercel.app/" },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rocco Lavecchia",
    jobTitle: "Full Stack Junior · foco Backend Python",
    url: "https://portfolio-rocco.vercel.app/",
    sameAs: [
      "https://www.linkedin.com/in/rocco-lavecchia-58089917a/",
      "https://github.com/lavecchiarocco",
    ],
    alumniOf: "Tecnicatura Universitaria en Programación — UTN",
    knowsAbout: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Sanity",
    ],
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

/* ───────────────────────── Hero (Stack Flow) ───────────────────────── */
const HERO_FLOW = [
  { n: "01", title: "Python · FastAPI", detail: "API REST y reglas de negocio" },
  { n: "02", title: "PostgreSQL", detail: "Modelo de datos e integridad GiST" },
  { n: "03", title: "React · TypeScript", detail: "Interfaz y disponibilidad en vivo" },
];

function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-5 pt-8 sm:pt-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] grid-glow [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] opacity-60" />
      <div className="bento-cell relative overflow-hidden p-7 sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Busco mi primer rol · Full Stack Junior
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            perfil / 2026 · argentina → latam
          </span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="font-mono text-sm text-primary">{"// hola, soy"}</p>
            <h1 className="mt-3 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
              Rocco <span className="text-gradient">Lavecchia</span>
            </h1>
            <p className="mt-5 text-balance text-2xl font-medium text-muted-foreground sm:text-3xl">
              Full Stack Junior · <span className="text-foreground">foco Backend Python</span>
            </p>
            <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              Construyo la API en Python con FastAPI y PostgreSQL y después la pantalla en React y
              TypeScript. Graduado de la UTN, busco mi primera oportunidad en Argentina o remoto
              para LatAm.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#proyectos">
                <Button className="gap-1.5">
                  Ver 3 casos <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#contacto">
                <Button variant="outline" className="gap-1.5">
                  Escribime <Mail className="h-4 w-4" />
                </Button>
              </a>
            </div>
            <p className="mt-6 font-mono text-[11px] text-muted-foreground">
              3 casos en producción · 122 tests en TurnoGo · Graduado UTN
            </p>
          </div>

          <div className="relative rounded-2xl border border-border bg-background/60 p-5 shadow-[var(--shadow-glow)] sm:p-6">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>stack / flow</span>
              <span>01 → 03</span>
            </div>

            <div className="mt-6 space-y-5">
              {HERO_FLOW.map((step, i) => (
                <div key={step.n} className="relative flex gap-4">
                  {i < HERO_FLOW.length - 1 && (
                    <span
                      className="absolute left-[13px] top-8 h-[calc(100%+4px)] w-px bg-gradient-to-b from-primary/60 to-transparent"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-primary/40 bg-background font-mono text-[10px] text-primary">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 font-mono text-xs">
              <p className="text-primary">POST /api/turnos</p>
              <p className="mt-1 text-foreground">201 Created</p>
              <p className="mt-2 text-muted-foreground">// solapes: 0 · constraint GiST</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] text-muted-foreground">
              <span className="rounded-md bg-elevated px-2 py-1">122 tests</span>
              <span className="rounded-md bg-elevated px-2 py-1">OTP</span>
              <span className="rounded-md bg-elevated px-2 py-1">webhooks firmados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── About (Decision Profile) ───────────────────────── */
const ABOUT_PRINCIPLES = [
  {
    n: "01",
    title: "Integridad en la base",
    body: "En TurnoGo los turnos solapados se previenen con una constraint GiST, no solo con validación en la UI.",
    tag: "TurnoGo",
  },
  {
    n: "02",
    title: "Reglas como datos",
    body: "En TotalImport las alícuotas viven en YAML y se editan desde /api/config, sin redeploy.",
    tag: "TotalImport",
  },
  {
    n: "03",
    title: "Contenido fuera del código",
    body: "En JFR Tecno el catálogo se actualiza desde Sanity, separando el CMS de la interfaz.",
    tag: "JFR Tecno",
  },
];

function StackList({ items }: { items: TechItem[] }) {
  return (
    <ul className="mt-4 space-y-1.5">
      {items.map((item) => (
        <li
          key={item.name}
          className="flex items-center rounded-lg border border-primary/30 bg-background/50 px-3 py-2"
        >
          <span className="text-xs font-medium text-foreground">{item.name}</span>
        </li>
      ))}
    </ul>
  );
}

function TechPill({ item, id }: { item: TechItem; id: string }) {
  const detail = [item.note, item.projects?.join(" · ")].filter(Boolean).join(" — ");

  return (
    <li className="group relative md:hover:z-10 md:focus-within:z-10">
      <span
        tabIndex={0}
        aria-describedby={detail ? id : undefined}
        className="inline-flex cursor-default items-center rounded-md border border-border bg-background/60 px-2 py-1 text-xs text-foreground outline-none transition-colors duration-200 motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {item.name}
      </span>
      {detail ? (
        <span
          id={id}
          className="mt-1 block text-[10px] leading-snug text-muted-foreground transition-opacity duration-200 motion-reduce:transition-none md:pointer-events-none md:absolute md:left-0 md:top-full md:z-20 md:mt-1 md:w-max md:max-w-64 md:rounded-lg md:border md:border-border md:bg-popover md:px-2 md:py-1.5 md:opacity-0 md:shadow-lg md:group-hover:opacity-100 md:group-focus-within:opacity-100"
        >
          {detail}
        </span>
      ) : null}
    </li>
  );
}

function StackCard({ group, primary = false }: { group: StackGroup; primary?: boolean }) {
  const groupId = group.label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-5 sm:p-6 ${
        primary ? "border-primary/40 bg-primary/5" : "border-border bg-background/40"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p
          className={`font-mono text-[10px] uppercase tracking-widest ${
            primary ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {primary && <span className="text-primary/70">core / </span>}
          {group.label}
        </p>
        {group.description ? (
          <span className="text-[10px] text-muted-foreground">{group.description}</span>
        ) : null}
      </div>
      {primary ? (
        <StackList items={group.items} />
      ) : (
        <ul className="mt-4 flex flex-wrap gap-x-1.5 gap-y-3">
          {group.items.map((item, index) => (
            <TechPill key={item.name} item={item} id={`stack-${groupId}-${index}`} />
          ))}
        </ul>
      )}
      {group.footnote ? (
        <p className="mt-auto pt-3 text-[10px] leading-snug text-muted-foreground">
          {group.footnote}
        </p>
      ) : null}
    </div>
  );
}

function Stack() {
  const [backend, datos, frontend, herramientas] = CORE_STACK;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-display text-lg font-semibold">Stack</h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          cada tecnología tiene al menos un proyecto detrás
        </span>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">
        <div className="lg:col-span-5 lg:row-span-2">
          <StackCard group={backend} primary />
        </div>
        <div className="lg:col-span-7">
          <StackCard group={datos} />
        </div>
        <div className="lg:col-span-4">
          <StackCard group={frontend} />
        </div>
        <div className="lg:col-span-3">
          <StackCard group={herramientas} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          también uso
        </span>
        <span className="text-xs text-muted-foreground">{ALSO_USED.join(" · ")}</span>
      </div>
    </>
  );
}

function About() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
      <SectionHeading kicker="01" title="Sobre Mí" />

      <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bento-cell p-7 sm:p-9">
          <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
            perfil / 01
          </p>
          <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">
            Rocco Lavecchia
          </h3>
          <p className="mt-2 text-sm text-primary">Full Stack Junior · foco Backend Python</p>
          <p className="mt-5 text-pretty text-sm leading-relaxed text-muted-foreground">
            Graduado de la Tecnicatura Universitaria en Programación (UTN). Trabajo el modelo de
            datos y la API en Python, FastAPI y PostgreSQL, y la interfaz en React y TypeScript.
          </p>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
            Busco mi primer rol en un equipo donde pueda aportar desde el primer día y seguir
            creciendo en backend.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-primary">
              Graduado UTN
            </span>
            <span className="rounded-lg border border-border bg-elevated/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Argentina · remoto LatAm
            </span>
          </div>
        </div>

        <div className="bento-cell p-7 sm:p-9">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-xl font-semibold">Cómo pienso</h3>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              3 decisiones
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {ABOUT_PRINCIPLES.map((item) => (
              <div
                key={item.n}
                className="rounded-xl border border-border bg-background/50 p-4 transition-colors hover:border-primary/40"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-primary/40 bg-background font-mono text-[10px] text-primary">
                    {item.n}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium">{item.title}</p>
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-primary">
                        {item.tag}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        id="habilidades"
        className="mt-4 scroll-mt-20 rounded-2xl border border-border bg-elevated/20 p-6 sm:p-7"
      >
        <Stack />
      </div>
    </section>
  );
}

/* ───────────────────────── Projects (Bento) ───────────────────────── */
function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="proyectos" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
      <SectionHeading kicker="02" title="Proyectos" />

      {featured.length > 0 && (
        <div className="mt-8">
          <SubHeading kicker="★" title="Destacados" />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-6">
            {featured.map((p) => (
              <article
                key={p.name}
                className="bento-cell bento-cell-hover group relative flex flex-col gap-6 overflow-hidden p-6 sm:p-8 md:col-span-6 lg:flex-row lg:items-center"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-primary/15 to-transparent" />
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      <Star className="h-3.5 w-3.5 fill-current" /> Destacado
                    </span>
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-snug sm:text-3xl">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
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
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      to="/proyectos/$slug"
                      params={{ slug: p.slug! }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Ver caso de estudio <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-elevated/30 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      Sitio web <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-xl border border-border bg-elevated/30 lg:w-[42%] lg:shrink-0">
                  <img
                    src={FEATURED_IMAGES[p.slug!] ?? turnoGo}
                    alt={`Captura de la aplicación ${p.name}`}
                    className="h-52 w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] sm:h-60 lg:h-64"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <SubHeading kicker="—" title="Todos los proyectos" />
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-6">
          {others.map((p) => (
            <article
              key={p.name}
              className="bento-cell bento-cell-hover group flex flex-col p-6 md:col-span-3"
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
      </div>
    </section>
  );
}

/* ───────────────────────── Contact ───────────────────────── */
function Contact() {
  return (
    <section id="contacto" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16">
      <SectionHeading kicker="03" title="Contacto" />
      <div className="bento-cell mt-8 p-7 sm:p-9">
        <h3 className="font-display text-2xl font-semibold leading-snug sm:text-3xl">
          ¿Necesitás backend y frontend en la misma persona?
        </h3>
        <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
          Soy graduado de la UTN y busco mi primer rol como Full Stack Junior, con foco en backend
          Python. Argentina — presencial, híbrido o remoto para LatAm.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="mailto:roccolavecchia.rl@gmail.com?subject=Postulaci%C3%B3n%20Full%20Stack%20%E2%80%94%20Rocco%20Lavecchia"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Escribime <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/rocco-lavecchia-58089917a/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-elevated/30 px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
          >
            LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://github.com/lavecchiarocco"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-elevated/30 px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
          >
            GitHub <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <p className="mt-6 font-mono text-xs text-muted-foreground">roccolavecchia.rl@gmail.com</p>
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

function SubHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-xs text-primary">{kicker}</span>
      <h3 className="font-display text-xl font-semibold tracking-tight">{title}</h3>
      <span className="ml-1 h-px flex-1 bg-border" />
    </div>
  );
}
