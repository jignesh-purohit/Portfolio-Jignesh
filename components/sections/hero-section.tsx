"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, Shield } from "lucide-react";
import dynamic from "next/dynamic";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const gsapInstance = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsapInstance.gsap.registerPlugin(ScrollTrigger);

      const ctx = gsapInstance.gsap.context(() => {
        // Matrix rain effect
        const createMatrixRain = () => {
          if (!matrixRef.current) return;
          const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
          const raindrop = document.createElement("div");
          raindrop.className = "matrix-rain";
          raindrop.style.left = `${Math.random() * 100}%`;
          raindrop.style.animationDuration = `${Math.random() * 2 + 1}s`;
          raindrop.textContent = characters[Math.floor(Math.random() * characters.length)];
          matrixRef.current.appendChild(raindrop);

          setTimeout(() => {
            if (matrixRef.current?.contains(raindrop)) {
              matrixRef.current.removeChild(raindrop);
            }
          }, 3000);
        };

        // Create matrix rain drops periodically
        const matrixInterval = setInterval(createMatrixRain, 100);

        // Animate the heading with a typewriter effect
        const heading = headingRef.current;
        if (heading) {
          const text = heading.textContent || "";
          heading.textContent = "";
          heading.style.opacity = "1";
          
          let i = 0;
          const typeWriter = () => {
            if (i < text.length && heading) {
              heading.textContent += text.charAt(i);
              i++;
              setTimeout(typeWriter, 100);
            }
          };
          typeWriter();
        }

        // Enhanced animations
        gsapInstance.gsap.fromTo(
          descriptionRef.current,
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            delay: 1.5,
            ease: "power3.out" 
          }
        );

        gsapInstance.gsap.fromTo(
          ".stat-item",
          { 
            y: 20, 
            opacity: 0,
            scale: 0.9,
            rotateX: -30
          },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            rotateX: 0,
            stagger: 0.2, 
            duration: 0.8, 
            delay: 2,
            ease: "back.out(1.7)" 
          }
        );

        gsapInstance.gsap.fromTo(
          ctaRef.current,
          { 
            y: 20, 
            opacity: 0,
            scale: 0.9
          },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.8, 
            delay: 2.5,
            ease: "back.out(1.7)" 
          }
        );

        // Enhanced parallax effect
        gsapInstance.gsap.to(".parallax-bg", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: (i, el) => -ScrollTrigger.maxScroll(window) * 0.15,
          scale: 1.1,
          opacity: 0.8,
        });

        return () => {
          clearInterval(matrixInterval);
        };
      }, sectionRef);

      return () => ctx.revert();
    };

    initGSAP();
  }, []);

  const scrollToNextSection = () => {
    const experienceSection = document.querySelector("#experience");
    if (experienceSection) {
      window.scrollTo({
        top: experienceSection.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      <div ref={matrixRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden" />
      
      <div className="parallax-bg absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-chart-1/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-chart-2/20 blur-3xl"></div>
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 pt-20 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="col-span-1 md:col-span-7">
            <h1 
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-chart-1 via-chart-2 to-chart-1 opacity-0"
            >
              Jignesh Purohit
            </h1>
            <p 
              ref={descriptionRef}
              className="text-xl mb-8 text-muted-foreground leading-relaxed max-w-2xl"
            >
              Cyber Security B.Tech student passionate about ethical hacking, 
              system security, and staying ahead of emerging cyber threats. 
              CEH v13 Certified with hands-on experience in vulnerability assessment.
            </p>

            <div 
              ref={statsRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8"
            >
              <div className="stat-item p-4 rounded-lg border bg-card/50 backdrop-blur-sm hover:border-chart-1/50 transition-colors duration-300 glow-effect">
                <div className="font-mono text-sm text-muted-foreground">University</div>
                <div className="font-medium">Parul University</div>
                <div className="text-xs text-muted-foreground">2022–2026</div>
              </div>
              <div className="stat-item p-4 rounded-lg border bg-card/50 backdrop-blur-sm hover:border-chart-1/50 transition-colors duration-300 glow-effect">
                <div className="font-mono text-sm text-muted-foreground">CGPA</div>
                <div className="font-medium">7.92/10</div>
                <div className="text-xs text-muted-foreground">B.Tech</div>
              </div>
              <div className="stat-item p-4 rounded-lg border bg-card/50 backdrop-blur-sm hover:border-chart-1/50 transition-colors duration-300 glow-effect">
                <div className="font-mono text-sm text-muted-foreground">CEH v13</div>
                <div className="font-medium">96.8/100</div>
                <div className="text-xs text-muted-foreground">Certified</div>
              </div>
            </div>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={scrollToNextSection}
                className="group bg-chart-1 hover:bg-chart-1/90 glow-effect"
              >
                Explore My Work
                <ArrowDownIcon className="ml-2 h-4 w-4 group-hover:animate-bounce" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="border-chart-1 hover:bg-chart-1/10 glow-effect"
              >
                <a href="#contact">Get In Touch</a>
              </Button>
            </div>
          </div>

          <div className="col-span-1 md:col-span-5 flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-chart-1 to-chart-2 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative bg-card border rounded-full p-8 flex items-center justify-center glow-effect">
                <Shield className="w-32 h-32 md:w-48 md:h-48 text-chart-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}