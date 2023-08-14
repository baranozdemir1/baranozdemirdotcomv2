import React from "react";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { BiLogoWordpress } from "react-icons/bi";

export const links = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Skills",
    href: "#skills",
  },
  {
    name: "Experience",
    href: "#experience",
  },
  {
    name: "Contact",
    href: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "IQMotion (WordPress Developer)",
    location: "Izmir, Turkiye",
    description:
      "Creating new WordPress websites and updating existing customers' WordPress websites using Elementor.",
    icon: React.createElement(BiLogoWordpress),
    date: "2022 - present",
  },
  {
    title: "Mucizefikir (WordPress Developer)",
    location: "Istanbul, Turkiye",
    description:
      "My responsibility is to integrate website designs from HTML to WordPress, build websites and update existing clients' WordPress websites.",
    icon: React.createElement(BiLogoWordpress),
    date: "2021 - 2022",
  },
  {
    title: "Manisa Celal Bayar University",
    location: "Manisa, Turkiye",
    description: "Associate Degree Computer Programming",
    icon: React.createElement(LuGraduationCap),
    date: "2017 - 2019",
  },
] as const;

export const projectsData = [
  {
    title: "SEO AI",
    description:
      "A tool that I created with GPT-3.5 Turbo that creates meta title, meta description and meta keywords according to the post content or subject the user enters.",
    tags: ["ChatGPT", "Next.js", "TypeScript", "AI", "TailwindCSS"],
    link: "seometa.io",
    image: "seoai.png",
  },
  {
    title: "Istanbul Tech Week Ticket Sales",
    description:
      "Helpful website that allows us to buy event tickets on WordPress site using RESTApi and Webhook.",
    tags: ["WordPress", "Next.js", "TypeScript", "TailwindCSS"],
    link: "bilet.istanbultechweek.com",
    image: "itwticket.jpg",
  },
  {
    title: "Paw Points",
    description:
      "Mobile application to check food and water points of street animals.",
    tags: ["Flutter", "Dart", "Firebase", "Google Auth"],
    link: "github.com/baranozdemir1/paw_points",
    image: "pawpoints.jpg",
  },
] as const;

export const skillsData = [
  "WordPress",
  "HTML",
  "CSS",
  "SCSS",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Git",
  "Bootstrap",
  "TailwindCSS",
  "Prisma",
  "MongoDB",
  "Redux",
  "GraphQL",
  "Express",
  "PostgreSQL",
  "Framer Motion",
  "Flutter",
  "React Native",
  "Firebase",
] as const;
