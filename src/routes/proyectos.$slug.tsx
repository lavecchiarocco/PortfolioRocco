import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Globe } from "lucide-react";
import { PROJECT_DETAILS, type ProjectSection } from "@/lib/project-details";
import turnoGo from "@/assets/turnoGo.png";

const PROJECT_IMAGES: Record<string, string> = {
  turnogo: turnoGo,
};

export const Route = createFileRoute("/proyectos/$slug")({
  loader: ({ params }) => {
    const project = PROJECT_DETAILS[params.slug];
    if (!project) {
      throw redirect({ to: "/" });
    }
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Proyecto"} — Rocco Lavecchia` },
      { name: "description", content: loaderData?.summary ?? "Proyecto de Rocco Lavecchia" },
    ],
  }),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const project = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" hash="proyectos" className="group flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-display text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
              RL
            </span>
            <span className="font-display text-sm font-semibold tracking-tight">
              Rocco Lavecchia
            </span>
          </Link>
          <Link
            to="/"
            hash="proyectos"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Proyectos
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-14">
        <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
          {project.tag} · Destacado
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-border bg-elevated/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-elevated/30 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              {link.label === "Sitio web" ? (
                <Globe className="h-3.5 w-3.5" />
              ) : (
                <Github className="h-3.5 w-3.5" />
              )}
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
          ))}
        </div>

        {project.image && PROJECT_IMAGES[project.image] && (
          <div className="mt-10 overflow-hidden rounded-xl border border-border bg-elevated/30">
            <img
              src={PROJECT_IMAGES[project.image]}
              alt={`Captura de la aplicación ${project.name}`}
              className="h-auto w-full object-cover object-top"
            />
          </div>
        )}

        <div className="mt-10 flex flex-col gap-6">
          {project.sections.map((section) => (
            <SectionBlock key={section.title} section={section} />
          ))}
        </div>

        <div className="bento-cell mt-12 flex flex-col items-start gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">¿Te interesó este proyecto?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Contame tu idea y trabajemos juntos en algo similar.
            </p>
          </div>
          <Link
            to="/"
            hash="contacto"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Contactar <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </main>

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
        </div>
      </footer>
    </div>
  );
}

function SectionBlock({ section }: { section: ProjectSection }) {
  return (
    <section className="bento-cell p-7">
      <h2 className="font-display text-xl font-semibold">{section.title}</h2>
      {section.intro && (
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
          {section.intro}
        </p>
      )}
      {"bullets" in section && section.bullets && section.bullets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {section.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2.5 rounded-lg border border-border bg-elevated/30 px-3.5 py-2.5 text-sm text-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {b}
            </li>
          ))}
        </ul>
      )}
      {"cards" in section && section.cards && section.cards.length > 0 && (
        <div className="mt-4 flex flex-col gap-3">
          {section.cards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-border bg-elevated/30 px-4 py-3.5"
            >
              <h3 className="font-display text-sm font-semibold">{card.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
