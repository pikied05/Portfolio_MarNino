import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Instagram, Mail, Phone, X, Menu } from "lucide-react";

import mariquitaImg from "@/imports/mariquita.png";
import marFoto from "@/imports/contraportada_Mar.jpg";
import starImg0 from "@/imports/estrellas1.png";
import starImg1 from "@/imports/estrellas2.png";
import starImg2 from "@/imports/estrellas3.png";
import starImg3 from "@/imports/estrellas4.png";
import starImg4 from "@/imports/estrellas5.png";
import img05 from "@/imports/DSC_0781.jpeg";
import img06 from "@/imports/DSC_0783.jpeg";
import img07 from "@/imports/DSC_0785.jpeg";
import img08 from "@/imports/IMG_1072.png";
import img09 from "@/imports/IMG_1073.png";
import img10 from "@/imports/IMG_1074.png";
import img11 from "@/imports/IMG_7587.webp";
import img12 from "@/imports/IMG_7588.webp";
import img13 from "@/imports/IMG_7589.webp";
import img14 from "@/imports/IMG_4248.png";
import img15 from "@/imports/IMG_0279.png";
import img16 from "@/imports/IMG_0297.png";
import img17 from "@/imports/IMG_7456.jpeg";
import img18 from "@/imports/IMG_7677.jpeg";
import img19 from "@/imports/IMG_7596.jpeg";

import img_galeria1 from "@/imports/ExistirHastaDesbordar-51.png";
import img_galeria2 from "@/imports/ExistirHastaDesbordar-77.png";
import img_galeria3 from "@/imports/ExistirHastaDesbordar-5.png";
import img_galeria4 from "@/imports/ExistirHastaDesbordar-98.png";

type Page = "inicio" | "sobre" | "portafolio" | "cv" | "contacto";

// ── Project data ─────────────────────────────────────────────────────────────

type Project = {
  id: number;
  num: string;
  title: string;
  year: string;
  medium: string;
  dimensions?: string;
  duration?: string;
  description: string;
  credit?: string;
  images: string[];
  videoUrl?: string;
  reelUrl?: string;
  imagesLabel?: string;
  images2?: string[];
  images2Label?: string;
};

const projects: Project[] = [
  {
    id: 1,
    num: "01",
    title: "Sentidos como lámpara hacia las ausencias",
    year: "2024",
    medium: "Serie fotográfica (8 fotografías digitales)",
    description:
      "Pintura corporal que explora la ausencia desde el cuerpo como mapa. A través de marcas que señalan memorias sensoriales, las líneas trazadas convierten el cuerpo en una brújula desde la cual la ausencia puede recorrerse y tomar forma.",
    credit: "Colaboración con Bugozen",
    images: [img07, img06, img05],
  },
  {
    id: 2,
    num: "02",
    title: "¿por qué nos miran si no nos ven?",
    year: "2025",
    medium: "Videoarte hecho con mixed media",
    duration: "1 min con 49 segundos",
    description:
      "Video de mixed media que interviene imágenes cinematográficas para cuestionar la representación de la intimidad sáfica. A partir de su apropiación y desplazamiento, la pieza abre una tensión entre lo que se muestra y lo que se busca recuperar desde la experiencia propia.",
    images: [ img09, img10, img08],
    videoUrl: "https://www.youtube.com/embed/GdpEdThXAIg",
  },
  {
    id: 3,
    num: "03",
    title: "Un Domingo por la mañana",
    year: "2025",
    medium: "Collage con transfer de acetato",
    dimensions: "35 × 25 cm",
    description:
      "Serie de tres collages que cruza imágenes de archivo con fragmentos de una carta de Emily Dickinson a Susan Gilbert. A través de la superposición, la pieza se acerca a una memoria afectiva fragmentada, donde lo íntimo persiste entre rastros y gestos.",
    images: [img11, img12, img13],
  },
  {
    id: 4,
    num: "04",
    title: "Una casa sin rojos ladrillos",
    year: "2025",
    medium: "Videoperformance",
    duration: "2 min con 13 segundos",
    description:
      "Videoperformance que explora el hogar como una construcción afectiva. A través de un espacio textil y una acción colectiva, el cuerpo se vuelve refugio, proponiendo el hogar como algo que se construye en los vínculos.",
    credit: "Registro: Lucero Tepox",
    images: [img15, img14, img16],
    videoUrl: "https://www.youtube.com/embed/ft_33GQWi_s?si=k42XhsZMCiu_oUow",
  },
  {
    id: 5,
    num: "05",
    title: "Existir hasta desbordar",
    year: "2026",
    medium: "Videoperformance con dispositivo textil",
    dimensions: "413 × 156 × 202 cm",
    duration: "25 minutos",
    description:
      "Video performance que explora las relaciones sáficas y la tensión de habitar el espacio público desde el afecto. A través de un dispositivo textil compartido, los cuerpos se aproximan, se sostienen y negocian su visibilidad frente a la mirada social.",
    credit: "Registro: Mar López",
    images: [img17, img18, img19],
    imagesLabel: "Dispositivo en uso",
    reelUrl: "https://www.instagram.com/reel/DaOlLPVB75J/",
    images2: [img_galeria1, img_galeria2, img_galeria3, img_galeria4],
    images2Label: "Montaje en galería",
  },
];

// ── Asset helpers ─────────────────────────────────────────────────────────────

function Mariquita({ size = 100, style = {} }: { size?: number; style?: React.CSSProperties }) {
  return (
    <img
      src={mariquitaImg}
      alt="catarina"
      width={size}
      height={size}
      style={{ mixBlendMode: "multiply", objectFit: "contain", display: "block", ...style }}
    />
  );
}

const starImgs = [starImg0, starImg1, starImg2, starImg3, starImg4];

function Star({
  v = 0, size = 80, rotate = 0, style = {},
}: {
  v?: number; size?: number; rotate?: number; style?: React.CSSProperties;
}) {
  return (
    <img
      src={starImgs[v % starImgs.length]}
      alt=""
      aria-hidden
      width={size}
      style={{
        transform: `rotate(${rotate}deg)`,
        objectFit: "contain",
        display: "block",
        pointerEvents: "none",
        userSelect: "none",
        ...style,
      }}
    />
  );
}

// ── Pill button ───────────────────────────────────────────────────────────────

function PillBtn({
  children, active, onClick, onCream,
}: {
  children: React.ReactNode; active?: boolean; onClick: () => void; onCream?: boolean;
}) {
  const base = onCream ? "#C01347" : "#F2E8A2";
  return (
    <button
      onClick={onClick}
      style={{
        border: `1px solid ${active ? base : `${base}55`}`,
        borderRadius: "999px",
        padding: "5px 20px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
        fontFamily: "Hariki",
        fontWeight: 800,
        fontSize: "0.68rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        color: active ? base : `${base}77`,
        background: "transparent",
        cursor: "pointer",
        transition: "all 0.2s",
        whiteSpace: "nowrap" as const,
      }}
    >
      {children}
    </button>
  );
}

// ── Navigation ────────────────────────────────────────────────────────────────

function Nav({ page, setPage, onCream }: { page: Page; setPage: (p: Page) => void; onCream: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 pt-3 pb-2">
        <button onClick={() => setPage("inicio")} className="flex items-center gap-1.5 group">
          <Mariquita size={66} />
          <span
            className="group-hover:opacity-60 transition-opacity"
            style={{ fontFamily: "WonderfulParty", fontSize: "1.5rem", color: onCream ? "#C01347" : "#F2E8A2", lineHeight: 1 }}
          >
            mar.
          </span>
        </button>

        <div className="hidden md:flex items-center gap-2">
          {(["sobre", "portafolio", "cv", "contacto"] as Page[]).map((id) => (
            <PillBtn key={id} active={page === id} onClick={() => setPage(id)} onCream={onCream}>
              {id === "sobre" ? "sobre mí" : id === "cv" ? "curriculum" : id}
            </PillBtn>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setOpen(true)} style={{ color: onCream ? "#1A0810" : "#F2E8A2" }}>
          <Menu size={20} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
            style={{ background: "#C01347" }}
          >
            <button className="absolute top-6 right-7" onClick={() => setOpen(false)} style={{ color: "#F2E8A2" }}>
              <X size={22} />
            </button>
            {(["inicio", "sobre", "portafolio", "cv", "contacto"] as Page[]).map((id) => (
              <button
                key={id}
                onClick={() => { setPage(id); setOpen(false); }}
                style={{ fontFamily: "WonderfulParty", fontSize: "2.8rem", color: "#F2E8A2" }}
              >
                {id === "sobre" ? "sobre mí" : id === "cv" ? "curriculum" : id}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Cover page ────────────────────────────────────────────────────────────────

function CoverPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col" style={{ background: "#E85A9D" }}>
      <div className="absolute top-20 left-8 z-10 max-w-[190px]">
        <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.7rem", color: "rgba(242,232,162,0.65)", lineHeight: 1.8, letterSpacing: "0.04em" }}>
          Mariana Hernández Niño<br />
          ilustración · fotografía<br />
          videoperformance<br />
          Veracruz / Puebla, México
        </p>
      </div>

      <div className="absolute top-10 right-8 pointer-events-none z-0"><Star v={3} size={140} rotate={-8} /></div>
      <div className="absolute top-32 right-2 pointer-events-none z-0"><Star v={1} size={70} rotate={15} /></div>
      <div className="absolute bottom-20 left-6 pointer-events-none z-0"><Star v={4} size={120} rotate={20} /></div>
      <div className="absolute bottom-10 left-44 pointer-events-none z-0"><Star v={2} size={58} rotate={-10} /></div>
      <div className="absolute bottom-14 right-6 pointer-events-none z-0"><Star v={0} size={105} rotate={-18} /></div>
      <div className="absolute bottom-44 right-36 pointer-events-none z-0"><Star v={4} size={46} rotate={8} /></div>

      <div className="flex-1 flex flex-col items-start justify-center px-6 md:px-14 z-10">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>
          <h1
            className="leading-[0.88]"
            style={{ fontFamily: "WonderfulParty", fontSize: "clamp(5rem, 22vw, 18rem)", color: "#F2E8A2", textShadow: "0 4px 60px rgba(192,19,71,0.18)" }}
          >
            mar.
          </h1>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="mt-6 flex items-center gap-6">
          <Mariquita size={72} />
          <button
            onClick={() => setPage("portafolio")}
            className="group flex items-center gap-3 hover:gap-5 transition-all duration-300"
            style={{ fontFamily: "HelveticaNeue", fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(242,232,162,0.75)" }}
          >
            ver obra
            <span className="inline-block h-px w-8 group-hover:w-12 transition-all duration-300" style={{ background: "rgba(242,232,162,0.55)" }} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// ── About page ────────────────────────────────────────────────────────────────

function AboutPage() {
  const [tab, setTab] = useState<"semblanza" | "statement">("semblanza");

  return (
    <div className="min-h-screen pt-28 pb-24" style={{ background: "#F5F0EA" }}>
      <div className="max-w-6xl mx-auto px-8 md:px-14">

        <p className="mb-1 text-xs uppercase" style={{ fontFamily: "HelveticaNeue", fontWeight: 100, letterSpacing: "0.35em", color: "#E85A9D" }}>(01)</p>
        <h2 className="mb-10" style={{ fontFamily: "Hariki", fontSize: "clamp(3.5rem, 9vw, 7.5rem)", color: "#C01347", lineHeight: 1 }}>
          sobre mí
        </h2>

        {/* Tab toggle */}
        <div className="flex gap-2 mb-12">
          {(["semblanza", "statement"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                border: `1px solid ${tab === t ? "#C01347" : "rgba(192,19,71,0.25)"}`,
                borderRadius: "999px",
                padding: "5px 20px",
                fontFamily: "HelveticaNeue",
                fontWeight: 300,
                fontSize: "0.68rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: tab === t ? "#C01347" : "rgba(192,19,71,0.38)",
                background: "transparent",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "semblanza" && (
            <motion.div
              key="semblanza"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-[1fr_1.1fr] gap-16 md:gap-24 items-start"
            >
              <div className="flex flex-col gap-7 pt-2">
                <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.95rem", color: "#2A1520", lineHeight: 1.95 }}>
                  Con eme de mariquita (Mariana Niño) nació en Xalapa, Veracruz, en 2005 y actualmente radica en Puebla. Es artista multidisciplinar en formación y cursa la Licenciatura en Arte Contemporáneo en la Universidad Iberoamericana Puebla.
                </p>
                <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.95rem", color: "#2A1520", lineHeight: 1.95 }}>
                  Su práctica se desarrolla a través del video, el cuerpo y la fotografía, desde donde investiga y construye relaciones que parten de lo autobiográfico. Trabaja con experiencias íntimas como una forma de pensar el afecto, las relaciones y la manera en que los cuerpos se hacen visibles en el espacio.
                </p>
                <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.95rem", color: "#2A1520", lineHeight: 1.95 }}>
                  Su trabajo se ha vinculado con procesos editoriales y expositivos: participó en la subasta silenciosa Todos ponen de Celia Galería-Taller en Puebla (2026) y tiene próximas publicaciones en revistas lésbicas como U-Haul Magazine (Virginia, EUA) y Violetas (Ciudad de México). En 2025 fue finalista del Premio MX en la categoría de diseño de espacios interiores con el proyecto en equipo (contra)literal.
                </p>
                <div className="w-8 h-px" style={{ background: "#C01347" }} />
                <div className="flex flex-wrap gap-2.5">
                  {["Fotografía", "Videoperformance", "Videoarte", "Collage", "Escritura"].map((s) => (
                    <span
                      key={s}
                      style={{
                        border: "1px solid #E85A9D", borderRadius: "999px",
                        padding: "4px 14px",
                        fontFamily: "HelveticaNeue", fontWeight: 300,
                        fontSize: "0.68rem", letterSpacing: "0.12em",
                        textTransform: "uppercase" as const, color: "#C01347",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <Mariquita size={72} />
                  <p style={{ fontFamily: "WonderfulParty", fontSize: "1.5rem", color: "#C01347" }}>
                    conemedemariquita
                  </p>
                </div>
              </div>

              <div className="relative md:order-2">
                <img
                  src={marFoto}
                  alt="Mariana Hernández Niño"
                  className="w-full object-cover"
                  style={{ aspectRatio: "3/4", filter: "saturate(0.85) contrast(1.05)" }}
                />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 z-[-1]" style={{ background: "#E85A9D", opacity: 0.2 }} />
                <div className="absolute -top-5 -left-5 pointer-events-none"><Star v={1} size={65} rotate={12} /></div>
              </div>
            </motion.div>
          )}

          {tab === "statement" && (
            <motion.div
              key="statement"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl"
            >
              <p className="mb-6" style={{ fontFamily: "'WonderfulParty', cursive", fontSize: "3rem", color: "#C01347", lineHeight: 1 }}>
                statement
              </p>
              <p style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", fontWeight: 300, fontSize: "0.95rem", color: "#2A1520", lineHeight: 2 }}>
                Mi práctica artística se sitúa en la exploración de las relaciones lés(bi)cas desde un lugar íntimo y autobiográfico, donde lo personal se vuelve político. Me interesa pensar la visibilidad y la ternura como formas de aparición en el espacio, atendiendo a cómo el afecto entre mujeres se construye, se oculta o se sostiene en lo cotidiano.
              </p>
              <p className="mt-6" style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", fontWeight: 300, fontSize: "0.95rem", color: "#2A1520", lineHeight: 2 }}>
                Trabajo principalmente con videoarte, videoperformance, fotografía y escritura, utilizando mi propio cuerpo como punto de partida para construir imágenes que se sitúan entre lo que se muestra y lo que permanece fuera de la imagen. Mi proceso se articula desde experiencias personales, donde también atraviesa una investigación sobre las ausencias, entendidas como aquello que falta pero sigue operando en la forma en que nos relacionamos.
              </p>
              <p className="mt-6" style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", fontWeight: 300, fontSize: "0.95rem", color: "#2A1520", lineHeight: 2 }}>
                Desde ahí, la idea de hogar aparece desplazada: no como un lugar fijo, sino como una sensación que se construye en los vínculos y en los cuerpos. En este tránsito, lo textil funciona como una extensión del cuerpo, una segunda piel que une, contiene y hace visible la relación.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

// ── CV page ───────────────────────────────────────────────────────────────────

function CVPage() {
  const trayectoria = [
    { place: "Museo de Arte Moderno", year: "2024", location: "Ciudad de México, México", desc: "Mediación cultural en torno a los contenidos de la exposición temporal Abraham Ángel: entre el asombro y la seducción." },
    { place: "Casa de la cultura Contemporánea", year: "2024", location: "Puebla, México", desc: "Montaje de la exposición de María José Benítez titulada Caer en Reverso." },
    { place: "Diseña México", year: "2025", location: "Ciudad de México, México", desc: 'Finalista en el premio MX en la categoría de diseño de espacio de interiores con el trabajo en equipo "[contra]literal".' },
    { place: "UHAUL Magazine", year: "2026", location: "Virginia, Estados Unidos", desc: 'Publicación del collage "Un domingo en la mañana" en la edición "In Bloom".' },
    { place: "Todos Ponen", year: "2026", location: "Puebla, México", desc: 'Exposición colectiva con las piezas "Interlinked" y "Amar es un acto de resistencia".' },
  ];

  const formacion = [
    { institution: "Universidad Iberoamericana Puebla", year: "2023 — presente", desc: "Licenciatura en Arte contemporáneo" },
    { institution: "Zona Opaca Ibero Puebla", year: "2024", desc: "Cocina Colaboratorio: Acuerdos con el tercer paisaje alimentario" },
    { institution: "Flash 3.0 · Museo Amparo", year: "2024", desc: "Taller de creación de proyectos" },
  ];

  const entryStyle: React.CSSProperties = { fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: "0.85rem", color: "#1A0810" };
  const yearStyle: React.CSSProperties = { fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontSize: "0.68rem", color: "#E85A9D", letterSpacing: "0.12em", whiteSpace: "nowrap" as const };
  const locStyle: React.CSSProperties = { fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(26,8,16,0.45)", fontStyle: "italic" };
  const descStyle: React.CSSProperties = { fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "rgba(26,8,16,0.68)", lineHeight: 1.8 };
  const divider: React.CSSProperties = { borderBottom: "1px solid rgba(192,19,71,0.1)" };

  return (
    <div className="min-h-screen pt-28 pb-24" style={{ background: "#F5F0EA" }}>
      <div className="max-w-6xl mx-auto px-8 md:px-14">

        <p className="mb-1 text-xs uppercase" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, letterSpacing: "0.35em", color: "#E85A9D" }}>(03)</p>
        <h2 className="mb-16" style={{ fontFamily: "WonderfulParty", fontSize: "clamp(3.5rem, 9vw, 7.5rem)", color: "#C01347", lineHeight: 1 }}>
          curriculum vitae
        </h2>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">

          {/* Trayectoria */}
          <div>
            <p className="mb-8" style={{ fontFamily: "Hariki", fontSize: "2rem", color: "#C01347" }}>
              trayectoria
            </p>
            {trayectoria.map((item, i) => (
              <div key={i} className="mb-8 pb-8" style={divider}>
                <div className="flex items-baseline justify-between gap-3 mb-0.5">
                  <p style={entryStyle}>{item.place}</p>
                  <p style={yearStyle}>{item.year}</p>
                </div>
                <p className="mb-2" style={locStyle}>{item.location}</p>
                <p style={descStyle}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Formación */}
          <div>
            <p className="mb-8" style={{ fontFamily: "Hariki", fontSize: "2rem", color: "#C01347" }}>
              formación académica
            </p>
            {formacion.map((item, i) => (
              <div key={i} className="mb-8 pb-8" style={divider}>
                <div className="flex items-baseline justify-between gap-3 mb-0.5">
                  <p style={entryStyle}>{item.institution}</p>
                  <p style={yearStyle}>{item.year}</p>
                </div>
                <p style={descStyle}>{item.desc}</p>
              </div>
            ))}

            {/* Catarina decorativa */}
            <div className="mt-12 flex justify-start">
              <Mariquita size={60} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Image carousel ──────────────────────────────────────────────────────────

function Carousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length, index]);

  if (images.length === 0) return null;

  const goTo = (i: number) => setIndex((i + images.length) % images.length);

  return (
    <div className="relative w-full">
      <div
        className="relative w-full overflow-hidden"
        style={{ background: "rgba(192,19,71,0.04)", aspectRatio: "16 / 9" }}
      >
        <AnimatePresence>
          <motion.img
            key={index}
            src={images[index]}
            alt={`${alt} — imagen ${index + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="w-full h-full"
            style={{ display: "block", objectFit: "cover", position: "absolute", inset: 0 }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Imagen anterior"
              className="absolute top-1/2 left-2 -translate-y-1/2 flex items-center justify-center transition-opacity hover:opacity-100"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(245,240,234,0.85)",
                color: "#C01347",
                opacity: 0.75,
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "1rem",
                lineHeight: 1,
              }}
            >
              ‹
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Imagen siguiente"
              className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center justify-center transition-opacity hover:opacity-100"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(245,240,234,0.85)",
                color: "#C01347",
                opacity: 0.75,
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                fontSize: "1rem",
                lineHeight: 1,
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir a imagen ${i + 1}`}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: i === index ? "#C01347" : "rgba(192,19,71,0.25)",
                transition: "background 0.2s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function VideoEmbed({ url, title }: { url: string; title: string }) {
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: "16 / 9", background: "#000" }}
    >
      <iframe
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
      />
    </div>
  );
}

function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    const w = window as any;
    if (w.instgrm) {
      w.instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [url]);

  return (
    <div className="w-full flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ background: "#FFF", border: 0, borderRadius: "3px", margin: "0 auto", maxWidth: "540px", width: "100%" }}
      ></blockquote>
    </div>
  );
}

// ── Portfolio page — 3-panel layout ─────────────────────────────────────────

function PortfolioPage() {
  const [activeId, setActiveId] = useState(1);
  const centerRef = useRef<HTMLDivElement>(null);
  const activeProject = projects.find((p) => p.id === activeId)!;

  useEffect(() => {
    if (centerRef.current) centerRef.current.scrollTop = 0;
  }, [activeId]);

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Josefin Sans', sans-serif",
    fontWeight: 100,
    letterSpacing: "0.3em",
    textTransform: "uppercase",
  };

  return (
    <>
      {/* ── Desktop 3-panel ── */}
      <div
        className="hidden md:grid"
        style={{
          position: "fixed",
          top: "68px",
          left: 0,
          right: 0,
          bottom: 0,
          gridTemplateColumns: "220px 1fr 270px",
          background: "#F5F0EA",
        }}
      >
        {/* LEFT: static index */}
        <div
          className="flex flex-col py-8 px-6 overflow-y-auto no-scrollbar"
          style={{ borderRight: "1px solid rgba(192,19,71,0.12)" }}
        >
          <p className="mb-6 text-xs" style={{ ...labelStyle, color: "#E85A9D" }}>
            portafolio 2026
          </p>
          <nav className="flex flex-col gap-0">
            {projects.map((p) => {
              const active = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className="text-left py-4 transition-all duration-200 group"
                  style={{
                    borderBottom: "1px solid rgba(192,19,71,0.1)",
                    background: active ? "rgba(232,90,157,0.06)" : "transparent",
                    paddingLeft: active ? "10px" : "0",
                  }}
                >
                  <p
                    className="text-xs mb-0.5"
                    style={{ ...labelStyle, color: active ? "#E85A9D" : "rgba(192,19,71,0.35)", fontSize: "0.6rem" }}
                  >
                    {p.num}
                  </p>
                  <p
                    className="text-xs leading-snug"
                    style={{
                      fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                      fontWeight: active ? 400 : 300,
                      color: active ? "#C01347" : "rgba(26,8,16,0.5)",
                      fontSize: "0.78rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {p.title}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", fontWeight: 300, color: "rgba(192,19,71,0.35)", fontSize: "0.65rem" }}
                  >
                    {p.year}
                  </p>
                </button>
              );
            })}
          </nav>

          {/* Catarina at bottom */}
          <div className="mt-auto pt-8 flex justify-center">
            <Mariquita size={56} />
          </div>
        </div>

        {/* CENTER: scrollable images — sin scrollbar visible */}
        <div
          ref={centerRef}
          className="overflow-y-auto no-scrollbar"
          style={{ borderRight: "1px solid rgba(192,19,71,0.12)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="p-8 flex flex-col gap-6"
            >
              {activeProject.videoUrl ? (
                <>
                  <Carousel images={activeProject.images} alt={activeProject.title} />
                  <VideoEmbed url={activeProject.videoUrl} title={activeProject.title} />
                </>
              ) : activeProject.images.length > 0 && !activeProject.reelUrl ? (
                activeProject.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${activeProject.title} — imagen ${i + 1}`}
                    className="w-full"
                    style={{ display: "block" }}
                  />
                ))
              ) : (
                <>
                  {activeProject.imagesLabel && (
                    <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(26,8,16,0.4)" }}>
                      {activeProject.imagesLabel}
                    </p>
                  )}
                  <Carousel images={activeProject.images} alt={activeProject.title} />
                </>
              )}
              {activeProject.images2 && (
                <>
                  {activeProject.images2Label && (
                    <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(26,8,16,0.4)", marginTop: "0.5rem" }}>
                      {activeProject.images2Label}
                    </p>
                  )}
                  <Carousel images={activeProject.images2} alt={`${activeProject.title} — ${activeProject.images2Label ?? "vista adicional"}`} />
                </>
              )}
              {activeProject.reelUrl && <InstagramEmbed url={activeProject.reelUrl} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT: static project info */}
        <div className="overflow-y-auto py-8 px-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-4"
            >
              <p className="text-sm" style={{ ...labelStyle, color: "#E85A9D", fontSize: "0.6rem" }}>
                {activeProject.num} / {projects.length}
              </p>

              <h5
                style={{
                  fontFamily: "Hariki",
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  color: "#C01347",
                  lineHeight: 1.15,
                }}
              >
                {activeProject.title}
              </h5>

              <div className="flex flex-col gap-1">
                <p style={{ fontFamily: "Helvetica Neue", fontWeight: 400, fontSize: "0.78rem", color: "#1A0810" }}>
                  {activeProject.year}
                </p>
                <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.75rem", color: "rgba(26,8,16,0.65)", lineHeight: 1.5 }}>
                  {activeProject.medium}
                </p>
                {activeProject.dimensions && (
                  <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.75rem", color: "rgba(26,8,16,0.55)" }}>
                    {activeProject.dimensions}
                  </p>
                )}
                {activeProject.duration && (
                  <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.75rem", color: "rgba(26,8,16,0.55)" }}>
                    {activeProject.duration}
                  </p>
                )}
              </div>

              <div className="w-8 h-px" style={{ background: "#C01347", opacity: 0.4 }} />

              <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.82rem", color: "#2A1520", lineHeight: 1.85 }}>
                {activeProject.description}
              </p>

              {activeProject.credit && (
                <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.72rem", color: "rgba(26,8,16,0.45)", fontStyle: "italic" }}>
                  {activeProject.credit}
                </p>
              )}

              {/* Nav arrows */}
              <div className="flex gap-4 mt-4">
                {activeId > 1 && (
                  <button
                    onClick={() => setActiveId((id) => id - 1)}
                    className="text-xs transition-opacity hover:opacity-60"
                    style={{ ...labelStyle, color: "#C01347", fontSize: "0.62rem" }}
                  >
                    ← anterior
                  </button>
                )}
                {activeId < projects.length && (
                  <button
                    onClick={() => setActiveId((id) => id + 1)}
                    className="text-xs transition-opacity hover:opacity-60 ml-auto"
                    style={{ ...labelStyle, color: "#C01347", fontSize: "0.62rem" }}
                  >
                    siguiente →
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile: stacked layout ── */}
      <div className="md:hidden pt-20 pb-20" style={{ background: "#F5F0EA" }}>
        {/* Horizontal project index */}
        <div className="overflow-x-auto flex gap-0 px-6 pb-4 mb-6" style={{ borderBottom: "1px solid rgba(192,19,71,0.12)" }}>
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className="flex-shrink-0 px-4 py-3 text-left"
              style={{ borderRight: "1px solid rgba(192,19,71,0.1)" }}
            >
              <p className="text-xs mb-0.5" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: p.id === activeId ? "#E85A9D" : "rgba(192,19,71,0.35)" }}>
                {p.num}
              </p>
              <p className="text-xs" style={{ fontFamily: "Helvetica Neue", fontWeight: p.id === activeId ? 400 : 300, color: p.id === activeId ? "#C01347" : "rgba(26,8,16,0.45)", fontSize: "0.72rem", maxWidth: "120px", lineHeight: 1.3 }}>
                {p.title}
              </p>
            </button>
          ))}
        </div>

        {/* Info */}
        <div className="px-6 mb-6">
          <h3 style={{ fontFamily: "WonderfulParty", fontSize: "2rem", color: "#C01347", lineHeight: 1.1, marginBottom: "0.5rem" }}>
            {activeProject.title}
          </h3>
          <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.8rem", color: "rgba(26,8,16,0.6)", lineHeight: 1.5, marginBottom: "0.25rem" }}>
            {activeProject.year} · {activeProject.medium}
          </p>
          {activeProject.duration && <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.75rem", color: "rgba(26,8,16,0.5)" }}>{activeProject.duration}</p>}
          <div className="w-6 h-px my-4" style={{ background: "#C01347", opacity: 0.4 }} />
          <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.85rem", color: "#2A1520", lineHeight: 1.85 }}>
            {activeProject.description}
          </p>
          {activeProject.credit && (
            <p className="mt-3" style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.72rem", color: "rgba(26,8,16,0.4)", fontStyle: "italic" }}>
              {activeProject.credit}
            </p>
          )}
        </div>

        {/* Video + Images */}
        <div className="px-6 flex flex-col gap-4">
          {activeProject.videoUrl ? (
            <>
              <Carousel images={activeProject.images} alt={activeProject.title} />
              <VideoEmbed url={activeProject.videoUrl} title={activeProject.title} />
            </>
          ) : activeProject.images.length > 0 && !activeProject.reelUrl ? (
            activeProject.images.map((src, i) => (
              <img key={i} src={src} alt={`${activeProject.title} — imagen ${i + 1}`} className="w-full" />
            ))
          ) : (
            <>
              {activeProject.imagesLabel && (
                <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(26,8,16,0.4)" }}>
                  {activeProject.imagesLabel}
                </p>
              )}
              <Carousel images={activeProject.images} alt={activeProject.title} />
            </>
          )}
          {activeProject.images2 && (
            <>
              {activeProject.images2Label && (
                <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(26,8,16,0.4)", marginTop: "0.5rem" }}>
                  {activeProject.images2Label}
                </p>
              )}
              <Carousel images={activeProject.images2} alt={`${activeProject.title} — ${activeProject.images2Label ?? "vista adicional"}`} />
            </>
          )}
          {activeProject.reelUrl && <InstagramEmbed url={activeProject.reelUrl} />}
        </div>
      </div>
    </>
  );
}

// ── Contact page ──────────────────────────────────────────────────────────────

function ContactPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: "#E85A9D" }}>
      <div className="absolute top-14 left-4 pointer-events-none"><Star v={2} size={125} rotate={-8} /></div>
      <div className="absolute top-6 left-36 pointer-events-none"><Star v={4} size={52} rotate={18} /></div>
      <div className="absolute top-16 right-6 pointer-events-none"><Star v={3} size={100} rotate={10} /></div>
      <div className="absolute top-3 right-44 pointer-events-none"><Star v={1} size={50} rotate={-6} /></div>
      <div className="absolute bottom-16 left-2 pointer-events-none"><Star v={0} size={90} rotate={22} /></div>
      <div className="absolute bottom-6 right-4 pointer-events-none"><Star v={2} size={118} rotate={-15} /></div>
      <div className="absolute bottom-36 right-40 pointer-events-none"><Star v={4} size={44} rotate={12} /></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center z-10 px-8"
      >
        <p className="mb-4 text-xs uppercase" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 100, letterSpacing: "0.35em", color: "rgba(242,232,162,0.5)" }}>
          (04)
        </p>
        <h2 className="mb-14" style={{ fontFamily: "WonderfulParty", fontSize: "clamp(3.5rem, 10vw, 7rem)", color: "#F2E8A2", lineHeight: 1 }}>
          contacto
        </h2>
        <div className="flex flex-col gap-5 items-center">
          <p style={{ fontFamily: "Helvetica Neue", fontWeight: 300, fontSize: "1.05rem", color: "#F2E8A2" }}>
            Mariana Hernández Niño
          </p>
          <a href="mailto:mariananino078@gmail.com" className="flex items-center gap-3 transition-opacity hover:opacity-60" style={{ fontFamily: "Helvetica Neue", fontWeight: 300, color: "#F2E8A2", fontSize: "0.9rem" }}>
            <Mail size={13} style={{ opacity: 0.6 }} /> mariananino078@gmail.com
          </a>
          <a href="https://instagram.com/conemedemariquita" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-opacity hover:opacity-60" style={{ fontFamily: "Helvetica Neue", fontWeight: 300, color: "#F2E8A2", fontSize: "0.9rem" }}>
            <Instagram size={13} style={{ opacity: 0.6 }} /> ig. @conemedemariquita
          </a>
          <a href="tel:2283149119" className="flex items-center gap-3 transition-opacity hover:opacity-60" style={{ fontFamily: "Helvetica Neue", fontWeight: 300, color: "#F2E8A2", fontSize: "0.9rem" }}>
            <Phone size={13} style={{ opacity: 0.6 }} /> 2283149119
          </a>
        </div>
        <div className="mt-14"><Mariquita size={74} /></div>
      </motion.div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("inicio");
  const onCream = page === "sobre" || page === "portafolio" || page === "cv";

  useEffect(() => {
    if (page !== "portafolio") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen">
      <Nav page={page} setPage={setPage} onCream={onCream} />
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {page === "inicio" && <CoverPage setPage={setPage} />}
          {page === "sobre" && <AboutPage />}
          {page === "portafolio" && <PortfolioPage />}
          {page === "cv" && <CVPage />}
          {page === "contacto" && <ContactPage />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}