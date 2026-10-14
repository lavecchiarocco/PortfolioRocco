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
  totalimport: {
    slug: "totalimport",
    name: "TotalImport — Calculadora de Impuestos",
    tag: "Full Stack",
    summary:
      "Nació de un problema real: quería calcular cuánto me saldría traer un paquete a Argentina y ninguna calculadora daba números claros. Compara en paralelo los 3 regímenes aduaneros (Courier personal, Courier comercial DIS y Régimen General) y muestra costo total, desglose de tributos, % sobre CIF, conversión USD/ARS, modo Conservador/Mínimo y sensibilidad al dólar. Incluye exportación a PDF.",
    image: "totalimport1",
    stack: [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "Tailwind CSS",
      "React Query",
      "Zod",
      "Recharts",
      "jsPDF",
    ],
    links: [
      { label: "Sitio web", href: "https://calculadora-impuestos.vercel.app/" },
      {
        label: "Frontend (GitHub)",
        href: "https://github.com/lavecchiarocco/Calculadora-Impuestos/tree/main/frontend",
      },
      {
        label: "Backend (GitHub)",
        href: "https://github.com/lavecchiarocco/Calculadora-Impuestos/tree/main/backend",
      },
    ],
    sections: [
      {
        title: "Qué resuelve",
        intro:
          "Nació de un dolor de cabeza real: quería calcular cuánto me saldría traer un paquete a Argentina y me encontré con que ninguna calculadora me daba números claros. Importar a Argentina tiene tres regímenes con reglas y topes distintos. La app permite compararlos en un solo lugar, sin necesidad de conocer la normativa a fondo: ingresás los datos de tu cotización y ves el costo total puesto en país para cada régimen, con el detalle de cada impuesto.",
        bullets: [
          "Régimen Simplificado — Pequeños envíos (Courier personal / Correo Argentino)",
          "Régimen Simplificado — Courier comercial (DIS)",
          "Régimen General — Importación definitiva",
          "Alícuotas y topes configurables sin tocar código (/api/config)",
        ],
      },
      {
        title: "Capturas",
        intro:
          "Vista del formulario principal y comparativa de regímenes con desglose de tributos.",
        bullets: [
          "Formulario con cotización del proveedor, opciones avanzadas y búsqueda de dólar oficial",
          "Tarjetas de regímenes lado a lado con detalle expandible de cada tributo",
        ],
      },
      {
        title: "Arquitectura",
        intro:
          "Monorepo con frontend en React + Vite y backend en FastAPI. El frontend consume la API REST con TanStack React Query, valida formularios con React Hook Form + Zod y renderiza gráficos con Recharts. El backend expone endpoints tipados con Pydantic, usa SQLAlchemy + Alembic para la configuración persistente y obtiene el tipo de cambio oficial automáticamente.",
        bullets: [
          "React 19 + TypeScript + Vite (Frontend)",
          "FastAPI + Python 3.11+ (Backend)",
          "TanStack React Query (Server state)",
          "React Hook Form + Zod (Formularios y validación)",
          "Recharts (Visualización de comparativas)",
          "jsPDF + jsPDF-AutoTable (Exportación PDF)",
          "Tailwind CSS (Estilos)",
          "Pydantic + SQLAlchemy + Alembic (Backend)",
        ],
      },
      {
        title: "Funcionalidades clave",
        bullets: [
          "Formulario completo: precio FOB, envío, seguro, cantidad, NCM, opciones DDP y organismo externo",
          "Búsqueda automática del dólar oficial (BCRA) con fallback manual",
          "Comparativa visual de los 3 regímenes con tarjetas expandidas y detalle de tributos",
          "Selector de escenario (Conservador / Mínimo) y sensibilidad al dólar (+/- %)",
          "Exportación a PDF con el desglose completo de impuestos y totales",
          "Validaciones en cliente y servidor con mensajes claros",
        ],
      },
      {
        title: "Diseño de API",
        intro:
          "Endpoints REST versionados bajo /api. La configuración de alícuotas y topes se gestiona vía GET/PUT /api/config (YAML en disco, sin base de datos obligatoria). El cálculo principal es POST /api/calcular y devuelve el desglose por régimen, tributo y escenario. Incluye búsqueda de NCM y endpoint de tipo de cambio con actualización forzada.",
      },
      {
        title: "Despliegue",
        intro:
          "Frontend en Vercel (build estático + SSR opcional). Backend en Render (Docker) o cualquier plataforma que corra contenedores. Variables de entorno para CORS, origen del dólar y claves de config. La app funciona sin base de datos si solo se usa la config por defecto.",
      },
      {
        title: "Desafíos y Soluciones",
        cards: [
          {
            title: "Reglas que cambian según régimen y año",
            body: "Modeladas como datos (YAML) y no como código. El backend carga la config al arranque y expone /api/config para consultar o actualizar sin redeploy.",
          },
          {
            title: "Cálculos con muchos condicionales",
            body: "Separados en un motor de cálculo puro (sin I/O) con tests unitarios exhaustivos. El endpoint solo valida, llama al motor y formatea la respuesta.",
          },
          {
            title: "UX de formulario denso sin abrumar",
            body: "Acordeón para opciones avanzadas, resumen en vivo en panel lateral, validación inline y botón 'Cargar ejemplo' para onboarding rápido.",
          },
        ],
      },
    ],
  },
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
