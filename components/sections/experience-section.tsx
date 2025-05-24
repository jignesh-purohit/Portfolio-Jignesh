"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExperienceSection() {
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

      // Animate the experience card
      gsap.fromTo(
        ".experience-card",
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".experience-card",
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate the bullet points
      gsap.fromTo(
        ".achievement-item",
        { x: -20, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          stagger: 0.2,
          duration: 0.6, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".achievements-list",
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
        Professional Experience
      </h2>

      <div className="max-w-4xl mx-auto">
        <Card className="experience-card border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-xl md:text-2xl">Cyber Security Intern</CardTitle>
                <CardDescription>Hactify</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10">Feb - Mar 2025</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-muted-foreground">
                During my internship at Hactify, I focused on vulnerability assessment and penetration testing, 
                working with industry-standard tools to identify and document security risks.
              </p>
              
              <div>
                <h3 className="font-medium mb-2">Key Achievements:</h3>
                <ul className="achievements-list space-y-2">
                  <li className="achievement-item flex items-start gap-2">
                    <span className="text-chart-1 mt-1">•</span>
                    <span>Identified 25+ vulnerabilities across 10+ simulated labs</span>
                  </li>
                  <li className="achievement-item flex items-start gap-2">
                    <span className="text-chart-1 mt-1">•</span>
                    <span>Utilized tools like Burp Suite, Nmap, and Metasploit for comprehensive security assessments</span>
                  </li>
                  <li className="achievement-item flex items-start gap-2">
                    <span className="text-chart-1 mt-1">•</span>
                    <span>Focused on reconnaissance, exploitation, and OWASP Top 10 vulnerabilities</span>
                  </li>
                  <li className="achievement-item flex items-start gap-2">
                    <span className="text-chart-1 mt-1">•</span>
                    <span>Documented findings and provided remediation recommendations</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/20 hover:bg-primary/30">Burp Suite</Badge>
                <Badge className="bg-primary/20 hover:bg-primary/30">Nmap</Badge>
                <Badge className="bg-primary/20 hover:bg-primary/30">Metasploit</Badge>
                <Badge className="bg-primary/20 hover:bg-primary/30">OWASP Top 10</Badge>
                <Badge className="bg-primary/20 hover:bg-primary/30">Vulnerability Assessment</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}