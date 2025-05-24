"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Search } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    title: "DNS Enumeration Tool",
    description: "Python-based automation for DNS record (A, MX, NS, TXT, SOA) queries and reverse DNS lookups.",
    tech: ["Python", "DNS", "Network", "Automation"],
    highlights: [
      "Automates 80% of DNS information gathering in penetration testing",
      "Performs comprehensive DNS record queries (A, MX, NS, TXT, SOA)",
      "Includes reverse DNS lookup capabilities",
      "Generates detailed reports of findings"
    ],
    github: "https://github.com/jignesh-purohit/dns-enum-tool",
  }
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the section title
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate the project cards
      gsap.fromTo(
        ".project-card",
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-container",
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="container mx-auto px-4">
      <h2 
        ref={titleRef}
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
      >
        Projects
      </h2>

      <div className="projects-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card 
            key={project.id} 
            className="project-card border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 group"
          >
            <div className="relative overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-chart-1/30 to-chart-2/30 flex items-center justify-center">
                <Search className="w-12 h-12 text-primary" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Key Features:</h3>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((tech, idx) => (
                    <Badge key={idx} variant="outline" className="bg-secondary/50">{tech}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </Button>
              <Button variant="default" size="sm" asChild>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}