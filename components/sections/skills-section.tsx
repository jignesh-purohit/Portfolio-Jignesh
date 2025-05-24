"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldAlert, Scan, Code, Clock, Users, Search, Terminal, Laptop, Brush as Virus } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skillCategories = [
  {
    id: 1,
    title: "Security Skills",
    icon: <ShieldAlert className="h-5 w-5" />,
    skills: [
      { name: "Reconnaissance & Footprinting", level: 90 },
      { name: "Network Scanning & Enumeration", level: 85 },
      { name: "Malware Analysis", level: 75 },
      { name: "Risk Analysis", level: 80 },
    ],
  },
  {
    id: 2,
    title: "Tools & Technologies",
    icon: <Laptop className="h-5 w-5" />,
    skills: [
      { name: "Kali Linux", level: 90 },
      { name: "Burp Suite", level: 85 },
      { name: "Wireshark", level: 80 },
      { name: "Nmap", level: 90 },
      { name: "Metasploit", level: 75 },
    ],
  },
  {
    id: 3,
    title: "Programming",
    icon: <Code className="h-5 w-5" />,
    skills: [
      { name: "Bash", level: 70 },
      { name: "Python", level: 60 },
      { name: "Java", level: 50 },
    ],
  }
];

const softSkills = [
  { name: "Time Management", icon: <Clock className="h-4 w-4" /> },
  { name: "Teamwork", icon: <Users className="h-4 w-4" /> },
  { name: "Curiosity", icon: <Search className="h-4 w-4" /> },
  { name: "Problem Solving", icon: <Terminal className="h-4 w-4" /> },
  { name: "Analytical Thinking", icon: <Scan className="h-4 w-4" /> },
  { name: "Attention to Detail", icon: <Virus className="h-4 w-4" /> },
];

export function SkillsSection() {
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

      // Animate the skill cards
      gsap.fromTo(
        ".skill-card",
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate the progress bars
      gsap.fromTo(
        ".skill-progress",
        { width: 0 },
        { 
          width: "100%", 
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate the soft skills
      gsap.fromTo(
        ".soft-skill",
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".soft-skills-container",
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
        Skills & Expertise
      </h2>

      <div className="skills-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {skillCategories.map((category) => (
          <Card 
            key={category.id}
            className="skill-card border backdrop-blur-sm overflow-hidden"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                {category.icon}
                <span>{category.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.skills.map((skill, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress 
                    value={skill.level} 
                    className="h-2 skill-progress" 
                    indicatorClassName={`bg-chart-${(idx % 5) + 1}`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-6 text-center">Soft Skills</h3>
        <div className="soft-skills-container flex flex-wrap justify-center gap-4">
          {softSkills.map((skill, idx) => (
            <Badge 
              key={idx}
              className="soft-skill py-2 px-4 text-base bg-card hover:bg-card/80 border"
            >
              {skill.icon}
              <span className="ml-2">{skill.name}</span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}