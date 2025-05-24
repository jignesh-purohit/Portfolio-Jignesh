"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const certifications = [
  {
    id: 1,
    title: "Certified Ethical Hacker (CEH) v13",
    issuer: "EC-Council",
    date: "2025–2028",
    logo: <Award className="h-10 w-10 text-chart-1" />,
    score: "96.8/100",
  },
  {
    id: 2,
    title: "CCNA v7",
    issuer: "Cisco",
    date: "2025",
    logo: <Award className="h-10 w-10 text-chart-2" />,
  },
  {
    id: 3,
    title: "Qualys Vulnerability Management",
    issuer: "Qualys",
    date: "2025",
    logo: <Award className="h-10 w-10 text-chart-3" />,
  },
];

export function CertificationsSection() {
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

      // Animate the certification cards
      gsap.fromTo(
        ".cert-card",
        { 
          y: 100, 
          opacity: 0, 
          rotation: 2 
        },
        { 
          y: 0, 
          opacity: 1, 
          rotation: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".certs-container",
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
        Certifications
      </h2>

      <div className="certs-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {certifications.map((cert) => (
          <Card 
            key={cert.id} 
            className="cert-card border backdrop-blur-sm overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-1">{cert.logo}</div>
              <div>
                <CardTitle className="text-lg">{cert.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{cert.date}</span>
                </div>
                {cert.score && (
                  <Badge className="bg-primary/20">{cert.score}</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}