import React, { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { FaDatabase, FaJava, FaMoon, FaSun } from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiPython,
  SiAmazonwebservices,
  SiCloudinary,
  SiVercel,
  SiDart,
  SiVite,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiAxios,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiTailwindcss,
  SiBootstrap,
  SiFlutter,
  SiGithub,
  SiGitlab,
  SiDocker,
  SiCloudflare,
  SiFigma,
  SiPhpmyadmin,
} from "react-icons/si";
import { VscJson } from "react-icons/vsc";

type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
};

type TechItem = {
  name: string;
  icon: React.ReactNode;
};

type TechGroup = {
  title: string;
  items: TechItem[];
};

const githubUsername = "lhwza007";

const projects: Project[] = [
  {
    title: "E-Commerce Platform (Mini Project)",
    description:
      "Fullstack e-commerce system with admin dashboard and order tracking.",
    tags: ["PHP", "SQL", "Bootstrap", "PHPMyAdmin"],
    github: `https://github.com/lhwza007/LazadoProject`,
  },
  {
    title: "Thesis Advisor Matching System (Mini Project)",
    description:
      "A fullstack system that matches students with thesis advisors based on shared research interests, featuring an executive dashboard for data tracking.",
    tags: ["PHP", "SQL", "Bootstrap", "PHPMyAdmin"],
    github: `https://github.com/Anadyts/AdvisorHub`,
  },
  {
    title:"Travel Planner (Mini Project)",
    description:
      "A smart travel platform featuring automated park data scraping and LLM-based data cleaning, with personalized AI recommendations and collaborative trip planning tools.",
    tags: ["React", "Node.js", "REST API", "MySQL"],
    github: `https://github.com/lhwza007/Travel-Planner`,
  },
  {
    title:"One Siam (Production)",
    description:
      "Main website of One Siam, a company that sells products and services to the public.",
    tags: ["PHP", "SQL", "PHPMyAdmin", "Docker", "GitLab CI"],
    demo: `https://onesiam.co.th/`,
  },
  {
    title:"One Siam Factory (Production)",
    description:
      "A business-tailored web application featuring a product catalog system, secure user onboarding via Clerk, and automated order updates powered by LINE Messaging API.",
    tags: ["React", "MongoDB", "Tailwind CSS", "Clerk", "LINE Messaging API","REST API"],
    demo: `https://www.onesiamfactory.com/`,
  },
  {
    title:"Arisza Thailand (Production)",
    description:
      "A corporate website for a comprehensive business advisory service, highly optimized for SEO to drive organic traffic and maximize online brand authority.",
    tags: ["React", "MongoDB", "Tailwind CSS", "REST API", "SEO Focused"],
    demo: `https://www.ariszathailand.com/`,
  },
  {
    title:"E-Learning Platform (Development)",
    description:
      "An e-learning platform currently in development, built with Next.js and Supabase, featuring secure user onboarding via integrated Google Authentication. ",
    tags: ["Next.js", "SQL","Supabase", "Webhook" ],
    demo: `https://academy.ariszathailand.com/`,
  },

  
];

const techStack: TechGroup[] = [
  {
    title: "Languages",
    items: [
      { name: "HTML", icon: <SiHtml5 /> },
      { name: "CSS", icon: <SiCss3 /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "PHP", icon: <SiPhp /> },
      { name: "Python", icon: <SiPython /> },
      { name: "Java", icon: <FaJava /> },
      { name: "Dart", icon: <SiDart /> },
      { name: "SQL", icon: <FaDatabase /> },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "Vite", icon: <SiVite /> },
      { name: "React", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "TailwindCSS", icon: <SiTailwindcss /> },
      { name: "Bootstrap", icon: <SiBootstrap /> },
      { name: "Axios", icon: <SiAxios /> },
    ],
  },
  {
    title: "Backend / API",
    items: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "REST API", icon: <VscJson /> },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "SQLite", icon: <SiSqlite /> },
      { name: "PhpMyAdmin", icon: <SiPhpmyadmin /> },
      // Workbench ไม่มี official icon ใน Simple Icons → ใช้ generic db icon ให้ดูเนียน
      { name: "MySQL Workbench", icon: <FaDatabase /> },
    ],
  },
  {
    title: "Mobile",
    items: [{ name: "Flutter", icon: <SiFlutter /> }],
  },
  {
    title: "DevOps / Tools",
    items: [
      { name: "GitHub", icon: <SiGithub /> },
      { name: "GitLab", icon: <SiGitlab /> },
      // GitHub Desktop ไม่มี icon ตรง → ใช้ GitHub icon แทน
      { name: "GitHub Desktop", icon: <SiGithub /> },
      { name: "Docker", icon: <SiDocker /> },
      { name: "Cloudflare", icon: <SiCloudflare /> },
      { name: "Figma", icon: <SiFigma /> },
      { name: "AWS EC2", icon: <SiAmazonwebservices /> },
      { name: "Cloudinary", icon: <SiCloudinary /> },
      { name: "Vercel", icon: <SiVercel /> },
    ],
    
  },
];

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

const SectionTitle = ({
  title,
  desc,
  isLightMode = false,
}: {
  title: string;
  desc?: string;
  isLightMode?: boolean;
}) => (
  <div className="mb-5 md:mb-6">
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
      {title}
    </h2>
    {desc && (
      <p className={cn("mt-2", isLightMode ? "text-zinc-600" : "text-zinc-400")}>
        {desc}
      </p>
    )}
  </div>
);

const GlassCard = ({
  children,
  className,
  isLightMode = false,
}: {
  children: React.ReactNode;
  className?: string;
  isLightMode?: boolean;
}) => (
  <div
    className={cn(
      "rounded-2xl border backdrop-blur transition-colors duration-300",
      isLightMode
        ? "border-violet-200 bg-white/80 shadow-[0_0_0_1px_rgba(139,92,246,0.06)]"
        : "border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
      className
    )}
  >
    {children}
  </div>
);

const TechIcon = ({
  icon,
  name,
  isLightMode = false,
}: {
  icon: React.ReactNode;
  name: string;
  isLightMode?: boolean;
}) => {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-xl",
        "border px-4 py-3 transition",
        isLightMode
          ? "border-violet-200 bg-white hover:bg-violet-50 hover:border-violet-300"
          : "border-white/10 bg-black/30 hover:bg-violet-500/10 hover:border-violet-400/20"
      )}
      title={name}
    >
      <span
        className={cn(
          "text-xl transition",
          isLightMode
            ? "text-violet-600 group-hover:text-violet-700"
            : "text-zinc-200 group-hover:text-violet-200"
        )}
      >
        {icon}
      </span>
      <span
        className={cn(
          "text-sm transition",
          isLightMode
            ? "text-zinc-700 group-hover:text-zinc-900"
            : "text-zinc-300 group-hover:text-white"
        )}
      >
        {name}
      </span>
    </div>
  );
};

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function Portfolio() {
  const [isLightMode, setIsLightMode] = useState(() => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 19;
  });
  const [contactForm, setContactForm] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus("error");
      setSubmitError(
        "Email service is not configured. Add EmailJS keys to your .env file."
      );
      return;
    }

    setSubmitStatus("sending");
    setSubmitError("");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: contactForm.name,
          reply_to: contactForm.email,
          message: contactForm.message,
        },
        { publicKey }
      );
      setContactForm({ name: "", email: "", message: "" });
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
      setSubmitError("Failed to send message. Please try again later.");
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        isLightMode ? "bg-[#faf7ff] text-zinc-900" : "bg-black text-white"
      )}
    >
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className={cn(
            "absolute -top-40 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full blur-[120px]",
            isLightMode ? "bg-violet-500/20" : "bg-violet-600/15"
          )}
        />
        <div
          className={cn(
            "absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full blur-[140px]",
            isLightMode ? "bg-fuchsia-400/20" : "bg-violet-500/10"
          )}
        />
      </div>

      {/* Navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 border-b backdrop-blur transition-colors",
          isLightMode
            ? "border-violet-200 bg-white/75"
            : "border-white/10 bg-black/60"
        )}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
          <a href="#home" className="font-semibold tracking-wide">
            Mark Ratchanon
            <span className="text-violet-400"></span>
          </a>

          <div
            className={cn(
              "hidden md:flex items-center gap-6 text-sm",
              isLightMode ? "text-zinc-600" : "text-zinc-300"
            )}
          >
            <a className={cn(isLightMode ? "hover:text-zinc-900" : "hover:text-white")} href="#about">
              About
            </a>
            <a className={cn(isLightMode ? "hover:text-zinc-900" : "hover:text-white")} href="#skills">
              Stack
            </a>
            <a className={cn(isLightMode ? "hover:text-zinc-900" : "hover:text-white")} href="#projects">
              Projects
            </a>
            <a className={cn(isLightMode ? "hover:text-zinc-900" : "hover:text-white")} href="#experience">
              Experience
            </a>
            <a className={cn(isLightMode ? "hover:text-zinc-900" : "hover:text-white")} href="#contact">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsLightMode((prev) => !prev)}
              className={cn(
                "relative flex h-8 w-14 cursor-pointer items-center rounded-full p-1 ring-1 transition",
                isLightMode
                  ? "bg-violet-200 ring-violet-300 hover:bg-violet-300"
                  : "bg-zinc-800 ring-white/20 hover:bg-zinc-700"
              )}
              aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
              title={isLightMode ? "Dark mode" : "Light mode"}
            >
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-[12px] shadow-sm transition-transform duration-300",
                  isLightMode
                    ? "translate-x-6 bg-white text-violet-600"
                    : "translate-x-0 bg-zinc-950 text-amber-300"
                )}
              >
                {isLightMode ? <FaSun /> : <FaMoon />}
              </span>
            </button>
            <a
              href="#contact"
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium ring-1 transition",
                isLightMode
                  ? "bg-violet-600 text-white ring-violet-500 hover:bg-violet-500"
                  : "bg-violet-500/15 text-violet-200 ring-violet-400/20 hover:bg-violet-500/20"
              )}
            >
              Hire Me
            </a>
          </div>
        </nav>
      </header>

      <main className="relative mx-auto max-w-6xl px-4">
        {/* Hero */}
        <section id="home" className="pt-4 pb-8 md:pt-16 md:pb-20">
          <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-10">
            {/* Profile Card */}
            <GlassCard
              className="order-2 p-5 md:order-1 md:p-8"
              isLightMode={isLightMode}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div
                    className=""
                    aria-hidden
                  />
                  <div
                    className={cn(
                      "relative h-36 w-36 md:h-44 md:w-44 overflow-hidden rounded-3xl ring-2 ring-violet-400/40 ring-offset-2 shadow-[0_8px_32px_rgba(139,92,246,0.25)]",
                      isLightMode ? "ring-offset-white" : "ring-offset-zinc-950"
                    )}
                  >
                    <img
                      src="/profile2.jpg"
                      alt="Mark Ratchanon Asasri"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <h2 className="mt-4 font-semibold text-xl md:mt-5 md:text-2xl">
                  Mark Ratchanon Asasri
                </h2>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    isLightMode ? "text-zinc-600" : "text-zinc-400"
                  )}
                >
                  Fullstack Developer
                </p>
              </div>

              <div
                className={cn(
                  "mt-4 space-y-2.5 text-sm md:mt-6 md:space-y-3",
                  isLightMode ? "text-zinc-700" : "text-zinc-300"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(isLightMode ? "text-zinc-600" : "text-zinc-400")}>Focus</span>
                  <span>Fullstack Web</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn(isLightMode ? "text-zinc-600" : "text-zinc-400")}>Stack</span>
                  <span className={cn(isLightMode ? "text-violet-700" : "text-violet-300")}>React + Node.js</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={cn(isLightMode ? "text-zinc-600" : "text-zinc-400")}>GitHub</span>
                  <a
                    className={cn(
                      "transition",
                      isLightMode
                        ? "text-violet-700 hover:text-violet-800"
                        : "text-violet-200 hover:text-violet-100"
                    )}
                    href={`https://github.com/${githubUsername}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @{githubUsername}
                  </a>
                </div>
              </div>

              <div className="mt-4 md:mt-6">
                <a
                  href="#contact"
                  className={cn(
                    "block w-full rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition md:py-3",
                    isLightMode
                      ? "bg-violet-600 text-white hover:bg-violet-500"
                      : "bg-violet-500 text-black hover:bg-violet-400"
                  )}
                >
                  Let’s Work Together
                </a>
              </div>
            </GlassCard>

            <div className="order-1 md:order-2">
              <p className={cn("text-sm", isLightMode ? "text-zinc-600" : "text-zinc-400")}>
                Fullstack Developer • React • Node.js
              </p>

              <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl md:mt-3 md:text-5xl">
                I build
                <span className="text-violet-400"> scalable </span>
                fullstack web apps end-to-end.
              </h1>

              <p className={cn("mt-3 leading-relaxed md:mt-5", isLightMode ? "text-zinc-700" : "text-zinc-300")}>
                I can independently deliver complete fullstack products, from UI
                and API to database, deployment, and automation.
              </p>

              <div className="mt-4 flex flex-wrap gap-2.5 md:mt-8 md:gap-3">
                <a
                  href="#projects"
                  className={cn(
                    "rounded-xl px-5 py-3 text-sm font-semibold transition",
                    isLightMode
                      ? "bg-violet-600 text-white hover:bg-violet-500"
                      : "bg-white text-black hover:bg-zinc-200"
                  )}
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className={cn(
                    "rounded-xl border px-5 py-3 text-sm font-semibold transition",
                    isLightMode
                      ? "border-violet-200 bg-white text-violet-700 hover:bg-violet-50"
                      : "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  )}
                >
                  Contact Me
                </a>
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "rounded-xl border px-5 py-3 text-sm font-semibold transition",
                    isLightMode
                      ? "border-violet-300 bg-violet-100 text-violet-700 hover:bg-violet-200"
                      : "border-violet-400/20 bg-violet-500/10 text-violet-100 hover:bg-violet-500/15"
                  )}
                >
                  <SiGithub className="inline-block mr-2 text-lg -mt-1" />
                  GitHub
                </a>
              </div>

              <div className={cn("mt-5 flex flex-wrap gap-2 text-xs md:mt-10", isLightMode ? "text-zinc-600" : "text-zinc-400")}>
                {["React", "TypeScript", "Tailwind", "Express", "MongoDB"].map(
                  (t) => (
                    <span
                      key={t}
                      className={cn(
                        "rounded-full border px-3 py-1",
                        isLightMode
                          ? "border-violet-200 bg-white"
                          : "border-white/10 bg-white/5"
                      )}
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-6 md:py-12">
          <SectionTitle
            title="About"
            desc="A quick introduction and what I enjoy building."
            isLightMode={isLightMode}
          />
          <GlassCard className="p-5 md:p-8" isLightMode={isLightMode}>
            <p
              className={cn(
                "leading-relaxed",
                isLightMode ? "text-zinc-700" : "text-zinc-300"
              )}
            >
              I build modern products end-to-end: frontend, backend, databases,
              and deployment. I care about maintainable architecture, clean UI,
              and performance.
            </p>
          </GlassCard>
        </section>

        {/* Tech Stack (Icons) */}
        <section id="skills" className="py-6 md:py-12">
          <SectionTitle
            title="Tech Stack"
            desc="Icons-based stack showcase (black + violet accent)."
            isLightMode={isLightMode}
          />

          <div className="grid gap-5 md:grid-cols-2">
            {techStack.map((group) => (
              <GlassCard key={group.title} className="p-5 md:p-6" isLightMode={isLightMode}>
                <p className="font-semibold">
                  {group.title}
                  
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {group.items.map((tech) => (
                    <TechIcon
                      key={`${group.title}-${tech.name}`}
                      icon={tech.icon}
                      name={tech.name}
                      isLightMode={isLightMode}
                    />
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-6 md:py-12">
          <SectionTitle
            title="Projects"
            desc="Some work I’m proud of — focused on real-world use cases."
            isLightMode={isLightMode}
          />

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((p) => (
              <GlassCard key={p.title} className="p-5 md:p-6" isLightMode={isLightMode}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold">{p.title}</p>
                    <p
                      className={cn(
                        "mt-2 text-sm",
                        isLightMode ? "text-zinc-600" : "text-zinc-400"
                      )}
                    >
                      {p.description}
                    </p>
                  </div>

                  {/* <div
                    className={cn(
                      "grid place-items-center h-10 w-10 shrink-0 rounded-xl ring-1",
                      isLightMode
                        ? "bg-violet-100 ring-violet-300/60"
                        : "bg-violet-500/15 ring-violet-400/20"
                    )}
                  >
                    <SiNextdotjs
                      className={cn(
                        "text-lg",
                        isLightMode ? "text-violet-700" : "text-violet-100"
                      )}
                    />
                  </div> */}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs",
                        isLightMode
                          ? "border-violet-300 bg-violet-100 text-violet-800"
                          : "border-violet-400/15 bg-violet-500/10 text-violet-100"
                      )}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "rounded-xl border px-4 py-2 text-sm transition",
                        isLightMode
                          ? "border-violet-200 bg-white text-zinc-700 hover:bg-violet-50"
                          : "border-white/15 bg-white/5 hover:bg-white/10"
                      )}
                    >
                      GitHub
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "rounded-xl px-4 py-2 text-sm font-semibold transition",
                        isLightMode
                          ? "bg-violet-600 text-white hover:bg-violet-500"
                          : "bg-white text-black hover:bg-zinc-200"
                      )}
                    >
                      View
                    </a>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-6 md:py-12">
          <SectionTitle
            title="Experience"
            desc="Simple timeline format."
            isLightMode={isLightMode}
          />

          <GlassCard className="p-5 md:p-8" isLightMode={isLightMode}>
            <ol className="space-y-6">
              {[
                {
                  year: "2025 - 2026",
                  title: "Fullstack Developer (co-operative) - ONE SIAM.,LTD",
                  desc: "Production web apps, API systems, API integration, deployments and performance optimization",
                },
                
              ].map((item) => (
                <li key={item.year} className="flex gap-4">
                  <div className="mt-1 h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_0_4px_rgba(167,139,250,0.15)]" />
                  <div>
                    <p className={cn("text-xs", isLightMode ? "text-zinc-600" : "text-zinc-400")}>{item.year}</p>
                    <p className="font-semibold">{item.title}</p>
                    <p
                      className={cn(
                        "mt-1 text-sm",
                        isLightMode ? "text-zinc-600" : "text-zinc-400"
                      )}
                    >
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </GlassCard>
        </section>

        {/* Contact */}
        <section id="contact" className="py-6 md:py-12">
          <SectionTitle
            title="Contact"
            desc="Let’s build something together."
            isLightMode={isLightMode}
          />

          <GlassCard className="p-5 md:p-8" isLightMode={isLightMode}>
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              <div>
                <p
                  className={cn(
                    "leading-relaxed",
                    isLightMode ? "text-zinc-700" : "text-zinc-300"
                  )}
                >
                  If you’re looking for a developer who can handle frontend,
                  backend, database, and deployment — let’s talk.
                </p>

                <div
                  className={cn(
                    "mt-6 space-y-2 text-sm",
                    isLightMode ? "text-zinc-700" : "text-zinc-300"
                  )}
                >
                  <p>
                    <span className={cn(isLightMode ? "text-zinc-600" : "text-zinc-400")}>
                      GitHub:
                    </span>{" "}
                    <a
                      className={cn(
                        "transition",
                        isLightMode
                          ? "text-violet-700 hover:text-violet-800"
                          : "text-violet-200 hover:text-violet-100"
                      )}
                      href={`https://github.com/${githubUsername}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      github.com/{githubUsername}
                    </a>
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  "rounded-2xl border p-5 transition-colors",
                  isLightMode
                    ? "border-violet-200 bg-white"
                    : "border-white/10 bg-black/30"
                )}
              >
                <p className="font-semibold">
                  Quick Message<span className="text-violet-400">.</span>
                </p>

                <form className="mt-4 space-y-3" onSubmit={handleContactSubmit}>
                  <input
                    className={cn(
                      "w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-500/30 placeholder-zinc-400",
                      isLightMode
                        ? "border-violet-200 bg-white text-zinc-900 placeholder-zinc-500"
                        : "border-white/10 bg-black/60 text-white placeholder-zinc-500"
                    )}
                    placeholder="Your name"
                    name="name"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                    disabled={submitStatus === "sending"}
                  />
                  <input
                    className={cn(
                      "w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-500/30 placeholder-zinc-400",
                      isLightMode
                        ? "border-violet-200 bg-white text-zinc-900 placeholder-zinc-500"
                        : "border-white/10 bg-black/60 text-white placeholder-zinc-500"
                    )}
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                    disabled={submitStatus === "sending"}
                  />
                  <textarea
                    className={cn(
                      "h-28 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-500/30 placeholder-zinc-400",
                      isLightMode
                        ? "border-violet-200 bg-white text-zinc-900 placeholder-zinc-500"
                        : "border-white/10 bg-black/60 text-white placeholder-zinc-500"
                    )}
                    placeholder="Message"
                    name="message"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    required
                    disabled={submitStatus === "sending"}
                  />
                  {submitStatus === "success" && (
                    <p className="text-sm text-emerald-400">
                      Message sent successfully. I&apos;ll get back to you soon.
                    </p>
                  )}
                  {submitStatus === "error" && submitError && (
                    <p className="text-sm text-red-400">{submitError}</p>
                  )}
                  <button
                    className={cn(
                      "w-full rounded-xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer",
                      isLightMode
                        ? "bg-violet-600 text-white hover:bg-violet-500"
                        : "bg-violet-500 text-black hover:bg-violet-400"
                    )}
                    type="submit"
                    disabled={submitStatus === "sending"}
                  >
                    {submitStatus === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Footer */}
        <footer
          className={cn(
            "py-6 text-center text-xs md:py-8",
            isLightMode ? "text-zinc-600" : "text-zinc-500"
          )}
        >
          © {new Date().getFullYear()} {githubUsername} • Mark Ratchanon Asasri
        </footer>
      </main>
    </div>
  );
}
