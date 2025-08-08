
import { AnimatedSection } from "../ui/animated-section";

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-accent-foreground/25">
      <div className="container mx-auto px-4 py-8">
        <AnimatedSection animation="fadeIn" duration={600}>
          <div className="text-center text-muted-foreground">
            <p>&copy; {currentYear} Kodigo Academy. Todos los derechos reservados.</p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  )
}

export default Footer