export type ProjectSection =
  | { title: string; intro?: string; bullets?: string[] }
  | { title: string; intro?: string; cards?: { title: string; body: string }[] };

export interface ProjectDetail {
  slug: string;
  name: string;
  tag: string;
  summary: string;
  image?: string;
  stack: string[];
  links: { label: string; href: string }[];
  sections: ProjectSection[];
}

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  turnogo: {
    slug: "turnogo",
    name: "TurnoGo",
    tag: "Full Stack",
    summary:
      "SaaS full stack para la gestión y reserva de turnos. Permite a los negocios administrar servicios, horarios y disponibilidad, mientras los usuarios pueden registrarse, consultar turnos y realizar reservas online. Incluye autenticación, validaciones de disponibilidad, API REST y persistencia de datos.",
    image: "turnogo",
    stack: ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "SQLAlchemy", "Tailwind CSS"],
    links: [
      { label: "Sitio web", href: "https://www.turnogo.app/" },
      { label: "Frontend (GitHub)", href: "https://github.com/wyn-code/TurnoGo" },
      { label: "Backend (GitHub)", href: "https://github.com/wyn-code/TurnoGo_back" },
    ],
    sections: [
      {
        title: "Arquitectura",
        intro:
          "El sistema separa claramente frontend, API y persistencia. React consume una API REST tipada servida por FastAPI, que se comunica con PostgreSQL para datos relacionales y con Supabase Storage para activos del negocio. Cada capa es stateless y escalable horizontalmente sobre Docker.",
        bullets: [
          "React + TypeScript (Frontend)",
          "FastAPI (REST API)",
          "JWT Authentication + RBAC",
          "PostgreSQL (Relational DB)",
          "Supabase Storage (Assets)",
          "Docker + Render (Deployment)",
        ],
      },
      {
        title: "Diseño de Base de Datos",
        intro:
          "Esquema PostgreSQL modelado alrededor del dominio — negocios, personal, servicios, turnos, clientes y bloques horarios. Pensado para multi-tenant con integridad referencial estricta.",
        bullets: [
          "Esquema normalizado con foreign keys e índices en las consultas más frecuentes.",
          "Detección de conflictos a nivel de base de datos para evitar turnos superpuestos.",
          "Migraciones versionadas y reproducibles entre entornos.",
        ],
      },
      {
        title: "Autenticación (JWT)",
        intro:
          "La autenticación usa JWT con rotación de refresh tokens. Las contraseñas se hashean con un algoritmo moderno y cada endpoint protegido valida rol y scope antes de tocar la base de datos.",
        bullets: [
          "Access + refresh tokens con rotación y revocación.",
          "Control de acceso por roles para admin, staff y clientes.",
          "Hashing de contraseñas con KDF tipo bcrypt y rate limiting en login.",
        ],
      },
      {
        title: "Despliegue (Docker)",
        intro:
          "API y frontend se empaquetan con Docker y se despliegan en Render. La configuración se inyecta en runtime, las imágenes son reproducibles y los rollouts son sin downtime. El storage vive en Supabase.",
      },
      {
        title: "Diseño de API",
        intro:
          "Endpoints REST orientados a recursos, con versionado claro, respuestas de error consistentes y documentación OpenAPI generada automáticamente por FastAPI. Paginación, filtros y validación se manejan con Pydantic.",
      },
      {
        title: "Desafíos y Soluciones",
        cards: [
          {
            title: "Evitar conflictos de turnos",
            body: "Resuelto con validación en servidor más un exclusion constraint en la base, para que dos turnos superpuestos sean físicamente imposibles.",
          },
          {
            title: "Flujo seguro de refresh JWT",
            body: "Los refresh tokens son de un solo uso y rotan en cada llamada, con revocación al logout para reducir el impacto de robo de tokens.",
          },
          {
            title: "Aislamiento multi-tenant",
            body: "Cada consulta se filtra por business_id en un middleware compartido, evitando fugas de datos entre cuentas.",
          },
        ],
      },
    ],
  },
};
