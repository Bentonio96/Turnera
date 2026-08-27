import { MotionConfig } from "framer-motion";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LogoMarquee } from "./components/LogoMarquee";
import { LazySection } from "./components/ui/LazySection";

const cargarFeatures = () =>
  import("./components/Features").then((mod) => ({ default: mod.Features }));
const cargarPricing = () =>
  import("./components/Pricing").then((mod) => ({ default: mod.Pricing }));
const cargarTestimonials = () =>
  import("./components/Testimonials").then((mod) => ({
    default: mod.Testimonials,
  }));
const cargarFAQ = () =>
  import("./components/FAQ").then((mod) => ({ default: mod.FAQ }));
const cargarFinalCTA = () =>
  import("./components/FinalCTA").then((mod) => ({ default: mod.FinalCTA }));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-btn focus:border focus:border-line focus:bg-surface focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:shadow-pop"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <LogoMarquee />
        <LazySection cargar={cargarFeatures} id="producto" altoEstimado="min-h-[80rem]" />
        <LazySection cargar={cargarPricing} id="planes" altoEstimado="min-h-[60rem]" />
        <LazySection cargar={cargarTestimonials} id="opiniones" altoEstimado="min-h-[36rem]" />
        <LazySection cargar={cargarFAQ} id="faq" altoEstimado="min-h-[36rem]" />
        <LazySection cargar={cargarFinalCTA} altoEstimado="min-h-[24rem]" />
      </main>
      <Footer />
    </MotionConfig>
  );
}
