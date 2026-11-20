# Rediseño del portfolio — Rocco Lavecchia

**Versión 1.0 · 20/11/2026**
**Objetivo:** que un reclutador o líder técnico entienda en menos de 60 segundos quién sos, qué sabés hacer, qué construiste y cómo contactarte para una entrevista.

## Decisiones cerradas (no volver a discutir)

| Tema | Decisión |
|---|---|
| Dirección visual | **R · Índice oscuro v2**: índice de casos desplegable, fondo `#0c0d10`, acento violeta `#b39cff`, accordion con `aria-expanded`. |
| Posicionamiento | `Full Stack Junior · foco Backend Python`. |
| Idioma | **Español e inglés completos**, con switch y `hreflang`. Vos confirmaste nivel profesional de inglés. |
| Casos destacados | TurnoGo, TotalImport y JFR Tecno. |
| Archivo | Epotifai e iTecnología. |
| Fuera del portfolio | Giff App (Angular), Kanban y Lavecchia's. |
| Stack | Solo tecnologías con respaldo en proyecto real; el resto se marca como académico o se saca. |
| Contacto | Email + LinkedIn. Sin Calendly, sin formulario de presupuesto. |
| CV | `/cv.pdf` dentro del repo (carpeta `public/`). |
| Analytics | **Ninguno** por ahora. |

---

## 1. Diagnóstico — 8 problemas ordenados por impacto

Ordenado por qué tan rápido le cuesta una entrevista, no por orden de aparición en la página.

### 1. El mensaje está escrito para clientes, no para reclutadores — **Crítico**

**Evidencia:** `src/routes/index.tsx:299` «Disponible para proyectos freelance»; `:315-324` CTAs «Ver Proyectos» / «Contactar»; `:617` «Contame sobre tu proyecto y te respondo en menos de 24 hs»; `:183` meta description con «Angular, React, .NET».

**Por qué duele:** en los primeros 5 segundos el reclutador decide si el perfil encaja con una búsqueda de empleo. «Freelance» + «presupuesto» lo clasifica como proveedor, no como candidato. Además contradice el propio objetivo que declarás en «Sobre Mí».

### 2. El contacto no ofrece una ruta de entrevista — **Crítico**

**Evidencia:** `src/routes/index.tsx:174` (`BUDGETS`), `:566-708` (formulario con «Presupuesto estimado» y Formspree). No existe link a CV ni a un PDF público.

**Por qué duele:** el punto de conversión pide datos de cliente y no entrega el artefacto que un reclutador necesita para pasar tu perfil al equipo. La promesa de «menos de 24 hs» además es una obligación que no podés garantizar.

### 3. La jerarquía compite contra la evidencia — **Alto**

**Evidencia:** `src/routes/index.tsx:291-367` (hero con 5 celdas: aurora decorativa, UTN, «6 proyectos», ubicación), `:449-562` (6 proyectos en grilla), `:373-447` (Sobre Mí antes que los casos).

**Por qué duele:** el espacio arriba del fold se gasta en decoración y contadores, mientras los dos casos con código real quedan por debajo. Un reclutador no necesita una celda de «Diseño + Código»; necesita ver TurnoGo y TotalImport.

### 4. El stack es una lista plana de 22 tecnologías sin nivel — **Alto**

**Evidencia:** `src/routes/index.tsx:51-78` y `:429` (`22 techs`), con Angular, .NET, C#, Node.js, Supabase, Pandas y Power BI mezclados con Python/FastAPI/PostgreSQL.

**Por qué duele:** más tecnologías no comunican más experiencia; comunican menos criterio. Un líder técnico busca señales de profundidad, y una lista plana no distingue «lo uso en producción» de «lo vi en un curso». Encima el contador «6 proyectos» incluye tecnologías que ya decidimos sacar.

### 5. Los proyectos se describen como features, no como decisiones — **Alto**

**Evidencia:** `src/routes/index.tsx:91-162`. Solo TurnoGo y TotalImport tienen caso de estudio (`src/lib/project-details.ts`); los otros cuatro son párrafos de funcionalidades. Los tres que querés sacar siguen ocupando la mitad de la sección.

**Por qué duele:** «Permite a los negocios administrar servicios, horarios y disponibilidad» suena a README. Lo que demuestra criterio es *por qué* elegiste una constraint GiST en vez de validar en el handler, o por qué las alícuotas viven en YAML.

### 6. SEO y datos estructurados desalineados — **Medio-alto**

**Evidencia:** `src/routes/index.tsx:179-210`: `og:description` genérico, sin `og:image`, sin `canonical`, sin `twitter:card`, sin `hreflang`; `knowsAbout` incluye Angular y .NET; `jobTitle` dice «Desarrollador Web Full Stack». `src/lib/error-page.ts:3` tiene `<html lang="en">`.

**Por qué duele:** el enlace que se comparte en LinkedIn y Slack no vende el perfil, y los datos estructurados refuerzan exactamente el posicionamiento viejo. Para búsquedas tipo «full stack junior python argentina», el title actual no contiene «junior» ni «Python».

### 7. Accesibilidad incompleta — **Medio**

**Evidencia:** no hay skip link en `src/routes/__root.tsx:122-133`; no hay regla `prefers-reduced-motion` en `src/styles.css`; `src/routes/index.tsx:296` usa `animate-ping` infinito; `:512-516` muestra imágenes sin `width`, `height` ni `loading="lazy"`; el menú móvil (`:259-281`) no expone `aria-expanded`/`aria-controls` ni cierra con Escape.

**Por qué duele:** hay recruiters con discapacidad y, además, es un filtro de calidad técnica muy observable en una entrevista. Es de lo más barato de arreglar.

### 8. Peso y deuda de dependencias — **Medio**

**Evidencia:** `package.json` incluye ~40 paquetes `@radix-ui/*` cuando el único que se usa es `Select`; fuentes de Google en `__root.tsx:104-113`; capturas PNG sin optimizar.

**Por qué duele**: no rompe la entrevista, pero afecta el primer render en móvil y hace más lento el arranque de un proyecto al que vas a volver a meterte para mejorarlo.

---

## 2. Nueva estructura de secciones

Orden pensado para el escaneo de 60 segundos: **identidad → evidencia → contexto → contacto**.

| # | Sección | Contenido | Para qué sirve |
|---|---|---|---|
| 0 | Header | `RL`, nombre, rol corto, switch `ES / EN`, link `CV`. Tres anclas: Casos, Stack, Contacto. | Orientación y salida rápida. |
| 1 | Hero | Eyebrow de posicionamiento, h1, subtítulo de una línea, estado, 3 CTAs y una línea de pruebas. | Responde *quién sos* en 5 segundos. |
| 2 | Casos destacados (3) | Índice desplegable: TurnoGo, TotalImport, JFR Tecno. Cada fila cerrada muestra nombre + tag + un dato verificable; al abrir, problema / stack / decisión / aprendizaje / captura / links. | Responde *qué sabés hacer* con evidencia. |
| 3 | Sobre mí | 4 líneas máximo, con un dato técnico concreto. | Responde *cómo pensás* después de ya haber visto pruebas. |
| 4 | Stack | Tabla por categoría y nivel de confianza. | Responde *con qué herramientas*, sin inflar. |
| 5 | Archivo (2) | Epotifai e iTecnología en filas compactas con enlace real. | Muestra continuidad sin competir con los casos. |
| 6 | Contacto / CV | CTA de empleo, CV, email, LinkedIn. Sin formulario. | Responde *cómo seguir*. |
| 7 | Footer |Nombre, año, mismos tres enlaces. | Cierre. |

Regla de diseño: **una sola idea por pantalla**. Si una sección necesita un párrafo para explicarse, no está terminada.

---

## 3. Copy reescrito

### 3.1 Hero

**ES**

> **Full Stack Junior · foco Backend Python**
>
> # Rocco Lavecchia
>
> Construyo la API en **Python con FastAPI y PostgreSQL** y después la pantalla en **React y TypeScript**.
>
> ● Busco mi primer rol · Argentina (presencial o híbrido) o remoto para LatAm
>
> `[ Ver 3 casos ]` `[ Descargar CV ]` `Escribime →`
>
> 3 casos en producción · 122 tests en TurnoGo · Estudiante avanzado de la UTN

**EN**

> **Full Stack Junior · Backend-focused (Python)**
>
> # Rocco Lavecchia
>
> I build the API in **Python with FastAPI and PostgreSQL**, then the UI in **React and TypeScript**.
>
> ● Looking for my first role · Argentina (onsite or hybrid) or remote for LatAm
>
> `[ See 3 cases ]` `[ Download CV ]` `Email me →`
>
> 3 shipped projects · 122 tests in TurnoGo · Advanced student at UTN

Notas: «Disponible para proyectos freelance» desaparece. «Ver Proyectos» pasa a ser «Ver 3 casos» (número real, verificado). El botón secundario deja de ser «Contactar» y pasa a ser la acción concreta.

### 3.2 Sobre mí (4 líneas)

**ES**

> Estudiante avanzado de la Tecnicatura Universitaria en Programación (UTN). Trabajo el modelo de datos y la API en Python, FastAPI y PostgreSQL, y la interfaz en React y TypeScript. En TurnoGo resolví los turnos solapados con una constraint GiST y 122 tests; en TotalImport saqué las reglas aduaneras del código a archivos YAML. Busco un equipo donde aportar desde el primer día y seguir creciendo en backend.

**EN**

> Advanced student at UTN's Tecnicatura Universitaria en Programación. I work the data model and API in Python, FastAPI and PostgreSQL, and the UI in React and TypeScript. In TurnoGo I prevented overlapping bookings with a GiST constraint and 122 tests; in TotalImport I moved customs rules out of code into YAML. I'm looking for a team where I can contribute from day one and keep growing on the backend side.

Sin «apasionado», sin «me encanta», sin adjetivos vacíos. Los dos ejemplos técnicos son verificables y están en el repo.

### 3.3 Descripción de proyectos (fórmula: problema → qué construí → stack → resultado)

#### TurnoGo

- **Problema:** un negocio necesita que dos clientes no puedan tomar el mismo turno y que el panel del staff vea la disponibilidad real.
- **Qué construí:** SaaS de reserva de turnos con API REST en FastAPI y PostgreSQL, autenticación con OTP, webhooks firmados de Mercado Pago y cliente React + TypeScript con disponibilidad en vivo y panel del negocio.
- **Stack:** Python · FastAPI · PostgreSQL · SQLAlchemy · React · TypeScript · Tailwind CSS.
- **Resultado / aprendizaje:** desplegado en `turnogo.app`; 122 tests cubren el flujo de reserva. La exclusión de turnos se resolvió en la base de datos con una constraint GiST, así que la integridad no depende de que la interfaz avise.

EN: *"A business needed to make double bookings impossible and give staff a real availability view. I built a booking SaaS with a FastAPI + PostgreSQL REST API, OTP auth, signed Mercado Pago webhooks and a React + TypeScript client with live availability and a business panel. 122 tests cover the booking flow; a GiST exclusion constraint makes overlaps impossible at the database level."*

#### TotalImport

- **Problema:** calcular el costo de importar a Argentina exige cruzar tres regímenes con topes y alícuotas distintas, y las calculadoras disponibles no mostraban el desglose.
- **Qué construí:** comparador de Courier personal, Courier comercial DIS y Régimen General, con un motor de cálculo puro, reglas cargadas desde YAML y dólar del BCRA con fallback manual.
- **Stack:** React 19 · TypeScript · FastAPI · Python · TanStack Query · React Hook Form + Zod · Recharts · jsPDF · Tailwind CSS.
- **Resultado / aprendizaje:** desplegado en `calculadora-impuestos.vercel.app`; comparativa exportable a PDF y alícuotas editables desde `/api/config` sin tocar código. Separar el motor del I/O fue lo que permitió testear las reglas.

EN: *"Importing into Argentina means comparing three customs regimes with different thresholds and rates, and available calculators didn't show the breakdown. I built a comparator for Courier personal, Courier comercial DIS and Régimen General with a pure calculation engine, YAML-driven rules and BCRA exchange rate with manual fallback. Rules can be edited through `/api/config` without a redeploy; keeping the engine free of I/O is what made it testable."*

#### JFR Tecno

- **Problema:** un catálogo de monitores portátiles que había que mantener a mano y sin un camino claro de compra.
- **Qué construí:** catálogo con Sanity como CMS headless, fichas de producto y checkout por WhatsApp, con envíos a todo el país y deploy en Vercel.
- **Stack:** Sanity · Vercel · WhatsApp.
- **Resultado / aprendizaje:** sitio publicado en `catalogo-jfrtecno.vercel.app`; el contenido se actualiza desde el CMS sin cambiar código.

EN: *"A portable-monitor catalogue that had to be edited by hand and had no clear purchase path. I built it on Sanity as a headless CMS, with product pages, WhatsApp checkout, nationwide shipping and a Vercel deploy. Content is updated from the CMS without touching code."*

### 3.4 Plantilla fija de caso de estudio

Usar **la misma plantilla para los tres casos**. Ningún caso puede agregar o quitar bloques.

1. **Contexto / problema** — 2 o 3 líneas. Sin jerga.
2. **Qué construí** — un párrafo + una captura real con `alt`, `width`, `height` y `loading="lazy"`.
3. **Decisiones técnicas** — exactamente 3 ítems, cada uno con la forma «Decisión → por qué». Ejemplo: *«Constraint GiST en PostgreSQL → la integridad se garantiza aunque dos request lleguen al mismo tiempo»*.
4. **Desafío y solución** — 1 o 2 pares.
5. **Resultado** — solo hechos verificables: deploy, cantidad de tests, regímenes soportados, exportación disponible. **Nunca** métricas de uso, usuarios ni ahorro si no están medidos.
6. **Enlaces** — Demo · Repo frontend · Repo backend. Si no hay repo, decirlo; no dejar un `#`.

**TurnoGo — decisiones ya redactadas**

- JWT con refresh tokens de un solo uso, rotación y revocación al logout → reducir el impacto de un token robado.
- Aislamiento multi-tenant filtrando por `business_id` en middleware → evitar fugas entre cuentas.
- Exclusion constraint GiST en la base → imposibilitar turnos superpuestos aunque la validación de la UI falle.

**TotalImport — decisiones ya redactadas**

- Alícuotas y topes como YAML servidos por `/api/config` → cambiar reglas sin redeploy.
- Motor de cálculo puro, sin red ni base de datos → poder testear la lógica aislada.
- Dólar del BCRA con fallback manual → que la calculadora siga funcionando si falla la fuente externa.

---

## 4. Habilidades

### Por categoría y nivel de confianza

| Nivel | Tecnologías | Respaldo real |
|---|---|---|
| **Uso en casos destacados** | Python, FastAPI, PostgreSQL, SQLAlchemy, Pydantic, Alembic, React, TypeScript, Tailwind CSS, Vite, TanStack Query, React Hook Form, Zod, Recharts, jsPDF, Git, Vercel | TurnoGo y TotalImport |
| **Uso en el archivo** | JavaScript, HTML, CSS, Sanity | Epotifai, iTecnología y JFR Tecno |
| **Conocimiento académico / sin proyecto hoy** | Angular, .NET, C#, Node.js, Supabase, Pandas, Power BI, SQL como ítem suelto | Ninguno en el portfolio actual |

### Qué sacar y qué aclarar

- **Sacar del portfolio:** Angular, .NET, C#, Node.js, Pandas y Power BI. No los elimines de tu historia académica; simplemente dejan de competir con tu stack principal.
- **Aclarar:** Vercel es deploy, no un lenguaje; Sanity es CMS, no un framework propio; SQL queda cubierto por PostgreSQL, no como entrada separada.
- **Supabase:** el caso de TurnoGo en `src/lib/project-details.ts:139,145` menciona «Supabase Storage» pero no estaba en el stack que confirmaste. **Pendiente de confirmar:** si fue real, dejarlo como detalle de infraestructura dentro del caso (no como chip de skill); si no, quitarlo del caso también.
- **Docker / Render:** aparecen en la arquitectura de TurnoGo. Mantenerlos dentro del caso, no en la grilla de habilidades.

Resultado visible: de 22 chips planos pasás a **17 skills agrupadas**, con una línea que dice qué nivel tiene cada una.

---

## 5. Contacto orientado a empleo

Reemplazar `Contact()` en `src/routes/index.tsx:566-708` por un bloque sin formulario.

**ES**

> ### ¿Necesitás backend y frontend en la misma persona?
>
> Estudiante avanzado de la UTN. Argentina — presencial, híbrido o remoto para LatAm.
>
> `[ Descargar CV ]` `[ Escribime ]` `LinkedIn →`

**EN**

> ### Do you need backend and frontend in the same person?
>
> Advanced UTN student. Argentina — onsite, hybrid or remote for LatAm.
>
> `[ Download CV ]` `[ Email me ]` `LinkedIn →`

Detalles de implementación:

- `Descargar CV` → `/cv.pdf` con `download="Rocco-Lavecchia-CV.pdf"`.
- `Escribime` → `mailto:roccolavecchia.rl@gmail.com?subject=Postulación%20Full%20Stack%20—%20Rocco%20Lavecchia`. El asunto prearmado le ahorra un paso al reclutador.
- LinkedIn → `https://www.linkedin.com/in/rocco-lavecchia-58089917a/`.
- GitHub queda como enlace secundario en el footer, no como CTA principal.
- **Se eliminan** `BUDGETS`, el componente `Select`, `Textarea`, `sonner`, `Formspree` y la promesa de respuesta en 24 hs.

---

## 6. Mejoras técnicas

### SEO / Open Graph / datos estructurados

```ts
// title ES
"Rocco Lavecchia — Full Stack Junior | Backend Python"
// description ES
"Desarrollador Full Stack junior con foco en backend Python. Casos reales: TurnoGo (FastAPI + PostgreSQL, 122 tests) y TotalImport (3 regímenes aduaneros). Busco mi primer rol."
```

- `og:title`, `og:description` y `twitter:card=summary_large_image` con el mismo mensaje.
- `og:image` 1200 × 630 con captura real del proyecto, no imagen decorativa.
- `canonical` apuntando a `https://portfolio-rocco.vercel.app/` (y `/en/` para la versión inglesa).
- `hreflang="es"`, `hreflang="en"` y `hreflang="x-default"`.
- JSON-LD `Person` con `jobTitle: "Full Stack Junior · Backend Python"`, `alumniOf: "Tecnicatura Universitaria en Programación — UTN"`, `sameAs` reales y `knowsAbout` **solo con el stack verificado**. Sacar Angular y .NET.
- Corregir `src/lib/error-page.ts:3` a `lang="es"` (o renderizar el 404 en el idioma activo).

### Internacionalización

- Dos rutas: `/` (es) y `/en/`, con el mismo componente y un diccionario tipado `content.ts` por idioma. Nada de traducción en runtime.
- El switch `ES / EN` preserva el ancla y el slug de caso.
- `<html lang>` y `title`/`description` se derivan de la ruta, no hardcodeados.
- La URL del CV es la misma en ambos idiomas (`/cv.pdf`); si querés PDF en inglés, agregás `/cv-en.pdf` y apuntás cada idioma a su archivo.

### Accesibilidad

- Skip link «Saltar al contenido» como primer elemento del `<body>` (ya validado en la maqueta R).
- `:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px }` global.
- Accordion con `<button aria-expanded aria-controls>`, `inert` en paneles cerrados y una sola fila abierta — igual que la maqueta aprobada.
- Menú móvil con `aria-expanded`, `aria-controls`, cierre con Escape y foco devuelto al botón.
- `prefers-reduced-motion`: quitar altura y desplazamiento, conservar rotación del `+` y cambios de color (plan `001` de la auditoría).
- Reemplazar `animate-ping` por un punto estático; la animación infinita no aporta información.
- Capturas con `alt`, `width`, `height` y `loading="lazy"`.
- Contraste verificado del acento `#b39cff` sobre `#0c0d10`.

### Performance

- Podar `@radix-ui/*`: de ~40 paquetes a solo `@radix-ui/react-select` (o reemplazarlo por un `<select>` nativo estilizado y sacar todos).
- Convertir `turnoGo.png` y `totalimport1.png` a WebP con dimensiones explícitas.
- Precargar la fuente de display; mantener `font-display: swap`.
- No agregar analytics: es la decisión tomada. Si en el futuro querés medir, `Vercel Analytics` sin cookies es el único candidato razonable.
- Objetivos a verificar con Lighthouse (metas, no resultados actuales): Performance ≥ 90, Accessibility ≥ 95, SEO = 100.

### Ejemplo de cambio en React / TypeScript / Tailwind

El contacto pasa de un formulario con `Select` + `sonner` a tres anchors. Quedaría así:

```tsx
const CONTACT_LINKS = {
  cv: "/cv.pdf",
  email: "mailto:roccolavecchia.rl@gmail.com?subject=Postulaci%C3%B3n%20Full%20Stack%20%E2%80%94%20Rocco%20Lavecchia",
  linkedin: "https://www.linkedin.com/in/rocco-lavecchia-58089917a/",
} as const;

function Contact() {
  return (
    <section id="contacto" className="scroll-mt-20 border-t border-white/10 py-16">
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        ¿Necesitás backend y frontend en la misma persona?
      </h2>
      <p className="mt-3 max-w-xl text-sm text-white/60">
        Estudiante avanzado de la UTN. Argentina — presencial, híbrido o remoto para LatAm.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={CONTACT_LINKS.cv} download="Rocco-Lavecchia-CV.pdf"
           className="rounded-md bg-[#b39cff] px-4 py-2.5 text-sm font-medium text-[#0c0d10] transition-colors hover:bg-[#c4b3ff]">
          Descargar CV
        </a>
        <a href={CONTACT_LINKS.email}
           className="rounded-md border border-white/15 px-4 py-2.5 text-sm font-medium transition-colors hover:border-[#b39cff] hover:text-[#b39cff]">
          Escribime
        </a>
        <a href={CONTACT_LINKS.linkedin} target="_blank" rel="noopener noreferrer"
           className="rounded-md px-4 py-2.5 text-sm text-white/60 transition-colors hover:text-[#b39cff]">
          LinkedIn ↗
        </a>
      </div>
    </section>
  );
}
```

**Cambios explicados:** (1) se eliminan `useState`, `FormEvent` y el POST a Formspree porque ya no hay formulario; (2) el `mailto` lleva asunto prearmado para que el reclutador solo escriba el mensaje; (3) `download` fuerza un nombre de archivo limpio; (4) los colores salen del sistema oscuro aprobado (`#0c0d10` / `#b39cff`); (5) `target="_blank"` siempre con `rel="noopener noreferrer"`.

---

## 7. Plan de acción

### Hacer hoy (1–2 h) — desbloquea postular

1. Reemplazar hero, Sobre Mí y el contacto con el copy de esta sección 3 y 5.
2. Borrar `BUDGETS`, el formulario y el texto de freelance en `index.tsx`.
3. Sacar Giff App, Kanban y Lavecchia's del array `PROJECTS`; agregar JFR Tecno e iTecnología.
4. Copiar el PDF validado a `public/cv.pdf` y actualizar el botón.
5. Ajustar `title`, `meta description`, `og:*` y `knowsAbout` del JSON-LD.

### Esta semana — deja el portfolio listo para entrevista

6. Implementar R oscuro v2 en TanStack Start: índice con accordion accesible, superficie de fila abierta, stagger escalonado y reduced motion (planes `001`–`004` ya escritos).
7. Crear la plantilla de caso y llenar los tres con el contenido de la sección 3.4.
8. Reagrupar habilidades por nivel; resolver el pendiente de Supabase.
9. Agregar `/en/` con diccionario tipado, `hreflang`, `canonical` y switch que preserve anclas.
10. Skip link, foco visible, menú móvil con Escape, imágenes con dimensiones y lazy loading.
11. Correr `npx tsc -p tsconfig.json --noEmit`, `npm run lint` y `npm run build`. El error preexistente en `src/routes/__root.tsx:119` (`error: Error` vs `unknown`) hay que corregirlo en este paso.

### Después — pulido y medición

12. Podar dependencias Radix y convertir capturas a WebP.
13. Correr Lighthouse y verificar las metas de la sección 6.
14. Alinear el titular del CV con `Full Stack Junior · foco Backend Python` y subir la versión en inglés si se usa `/cv-en.pdf`.
15. Commitear, pushear y deployar; recién ahí actualizar el link de LinkedIn con la URL definitiva.

---

## Apéndice — Hechos verificados (no salir de acá)

- **TurnoGo:** `turnogo.app`; React + TypeScript, FastAPI, PostgreSQL, SQLAlchemy; 122 tests; OTP, webhooks firmados de Mercado Pago, exclusion constraint GiST, JWT con refresh rotativo, multi-tenant por `business_id`; repos `wyn-code/TurnoGo` y `wyn-code/TurnoGo_back`.
- **TotalImport:** `calculadora-impuestos.vercel.app`; 3 regímenes; reglas en YAML servidas por `/api/config`; motor puro; React 19, TanStack Query, RHF + Zod, Recharts, jsPDF; dólar BCRA con fallback; repos `lavecchiarocco/Calculadora-Impuestos` (frontend y backend).
- **JFR Tecno:** `catalogo-jfrtecno.vercel.app`; Sanity headless; checkout por WhatsApp; envíos a todo el país; Vercel.
- **Epotifai:** `react-project-seven-tan.vercel.app`; React SPA con `localStorage`, YouTube, búsqueda y orden por reproducciones.
- **iTecnología:** `itecnologia.vercel.app`; HTML/CSS/JS vanilla; formulario que valida capacidad y batería y arma un mensaje para `wa.me`; WhatsApp `5493364511370`; Rosario / San Nicolás de los Arroyos. Cliente distinto de JFR Tecno.
- **Cuentas:** `github.com/lavecchiarocco`; LinkedIn `rocco-lavecchia-58089917a`; portfolio `portfolio-rocco.vercel.app`.
- **Prohibido inventar:** métricas de usuarios, tráfico, ahorro, tiempo de desarrollo, clientes, salario, ni tecnologías que no estén en la tabla de "Uso en casos destacados" o "Uso en el archivo".
