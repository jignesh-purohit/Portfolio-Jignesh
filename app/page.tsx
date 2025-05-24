import { HeroSection } from '@/components/sections/hero-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { CertificationsSection } from '@/components/sections/certifications-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <section id="hero" className="min-h-screen">
        <HeroSection />
      </section>

      <section id="experience" className="py-20">
        <ExperienceSection />
      </section>

      <section id="projects" className="py-20 bg-muted/30">
        <ProjectsSection />
      </section>

      <section id="certifications" className="py-20">
        <CertificationsSection />
      </section>

      <section id="skills" className="py-20 bg-muted/30">
        <SkillsSection />
      </section>

      <section id="contact" className="py-20">
        <ContactSection />
      </section>

      <Footer />
    </main>
  );
}
