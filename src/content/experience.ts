import type { Localized } from "@/lib/content";

export type ExperienceItem = {
  period: Localized<string>;
  title: Localized<string>;
  organization: Localized<string>;
  description: Localized<string>;
};

export const experienceItems: ExperienceItem[] = [
  {
    period: {
      en: "Current",
      es: "Actual",
    },
    title: {
      en: "Data Science and Mathematics student",
      es: "Estudiante de Ciencia de Datos y Matemáticas",
    },
    organization: {
      en: "Tecnológico de Monterrey",
      es: "Tecnológico de Monterrey",
    },
    description: {
      en: "Studying Data Science and Mathematics at Tec de Monterrey (GPA 98.2/100, expected 2029). Focused on the intersection of ML systems and applied math — building things that ship rather than sitting in notebooks.",
      es: "Estudiante de Ciencia de Datos y Matemáticas en el Tec de Monterrey (promedio 98.2/100, graduación esperada en 2029). Enfocado en la intersección entre sistemas de ML y matemática aplicada: construir cosas que lleguen a producción, no que se queden en notebooks.",
    },
  },
  {
    period: {
      en: "May 2026 - Current",
      es: "Mayo 2026 - Actual",
    },
    title: {
      en: "Technology Coordinator",
      es: "Coordinador de Tecnología",
    },
    organization: {
      en: "TEC Association for Computing Machinery (ACM)",
      es: "TEC Association for Computing Machinery (ACM)",
    },
    description: {
      en: "Building the React Native + web platform that powers HackMTY 2026 — applications, check-in, team formation, and event scheduling for Latin America's largest student hackathon (900+ participants, 1,500+ applicants).",
      es: "Construyendo la plataforma en React Native y web que impulsa HackMTY 2026: aplicaciones, check-in, formación de equipos y agenda del evento para el hackathon estudiantil más grande de América Latina (900+ participantes, 1,500+ postulantes).",
    },
  },
  {
    period: {
      en: "February 2026 - Current",
      es: "Febrero 2026 - Actual",
    },
    title: {
      en: "Competitive Programming Member",
      es: "Miembro de equipo de programación competitiva",
    },
    organization: {
      en: "TEC - RamCPP",
      es: "TEC - RamCPP",
    },
    description: {
      en: "Training weekly in algorithms, data structures, and contest problem solving through RamCPP, applying fast reasoning, precise implementation, and team coordination in ICPC-style sessions.",
      es: "Entrenando semanalmente en algoritmos, estructuras de datos y resolución de problemas de competencia con RamCPP, aplicando razonamiento rápido, implementación precisa y coordinación en equipo en sesiones estilo ICPC.",
    },
  },
  {
    period: {
      en: "February 2026 - Current",
      es: "Febrero 2026 - Actual",
    },
    title: {
      en: "Academic Mentor of Excellence",
      es: "Mentor académico de excelencia",
    },
    organization: {
      en: "MAE",
      es: "MAE",
    },
    description: {
      en: "Selected as MAE on based on top academic standing, tutoring 50+ students per semester across foundational engineering courses including Multivariable and Vector Calculus, Linear Algebra, and Electromagnetism.",
      es: "Seleccionado como MAE por alto desempeño académico, asesorando a más de 50 estudiantes por semestre en materias fundamentales de ingeniería, incluyendo Cálculo Multivariable y Vectorial, Álgebra Lineal y Electromagnetismo.",
    },
  },
  {
    period: {
      en: "2017 - 2025",
      es: "2017 - 2025",
    },
    title: {
      en: "Mathematics Olympiads Competitor",
      es: "Competidor en Olimpiadas de Matemáticas",
    },
    organization: {
      en: "ONMAPS, OMMEB, Frederich Gauss, Alexander Groetendick",
      es: "ONMAPS, OMMEB, Frederich Gauss, Alexander Groetendick",
    },
    description: {
      en: "Eight years competing at the national level in Mexican mathematics olympiads — 3× National Top-3 medalist (2nd Frederick Gauss, 3rd ONMAPS, 2nd Alexander Grothendieck). Developed the proof-based reasoning and problem-decomposition habits that still drive how I approach systems work.",
      es: "Ocho años compitiendo a nivel nacional en olimpiadas mexicanas de matemáticas: 3 veces medallista nacional Top 3 (2.º en Frederick Gauss, 3.º en ONMAPS, 2.º en Alexander Grothendieck). Desarrollé el razonamiento basado en demostraciones y los hábitos de descomposición de problemas que todavía guían cómo abordo el trabajo en sistemas.",
    },
  },
];
