import React, { useRef, useState } from "react";
import type { FormEvent } from "react";
import emailjs from '@emailjs/browser';
import Toast from '../components/Toast';
import { FaJava } from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiPython,
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
import { FaDatabase } from "react-icons/fa";
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
    title: "E-Commerce Platform",
    description:
      "Fullstack e-commerce system with admin dashboard, payment, and order tracking.",
    tags: ["React", "Node.js", "REST API", "MongoDB", "Docker"],
    github: `https://github.com/${githubUsername}`,
  },
  {
    title: "SaaS Landing + Auth",
    description:
      "Modern SaaS landing page with authentication, subscription, and user dashboard.",
    tags: ["Next.js", "TypeScript", "Tailwind", "REST API"],
    github: `https://github.com/${githubUsername}`,
  },
  {
    title: "Company CRM",
    description:
      "Internal CRM with role-based access, sales pipelines, and activity logging.",
    tags: ["React", "Express", "MySQL", "Cloudflare"],
    github: `https://github.com/${githubUsername}`,
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
    ],
  },
];

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

const SectionTitle = ({ title, desc }: { title: string; desc?: string }) => (
  <div className="mb-8">
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
      {title}
      <span className="text-violet-400">.</span>
    </h2>
    {desc && <p className="mt-2 text-zinc-400">{desc}</p>}
  </div>
);

const GlassCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "rounded-2xl border border-white/10 bg-white/5 backdrop-blur",
      "shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
      className
    )}
  >
    {children}
  </div>
);

const TechIcon = ({
  icon,
  name,
}: {
  icon: React.ReactNode;
  name: string;
}) => {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-xl",
        "border border-white/10 bg-black/30 px-4 py-3",
        "hover:bg-violet-500/10 hover:border-violet-400/20 transition"
      )}
      title={name}
    >
      <span className="text-xl text-zinc-200 group-hover:text-violet-200 transition">
        {icon}
      </span>
      <span className="text-sm text-zinc-300 group-hover:text-white transition">
        {name}
      </span>
    </div>
  );
};

export default function Portfolio() {
  const form = useRef<HTMLFormElement>(null);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({ show: false, message: "", type: "info" });

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ show: true, message, type });
  };

  const closeToast = () => {
    setToast({ show: false, message: "", type: "info" });
  };
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // เช็คก่อนว่ามี form หรือยัง (ป้องกัน error)
    if (!form.current) {
      showToast("เกิดข้อผิดพลาด กรุณาลองใหม่", "error");
      return;
    }

    // ดึงค่าจาก form
    const formData = new FormData(form.current);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    // ตรวจสอบว่าทุกฟิลด์มีค่า
    if (!name || !name.trim()) {
      showToast("กรุณากรอกชื่อของคุณ", "error");
      return;
    }

    if (!email || !email.trim()) {
      showToast("กรุณากรอกอีเมล", "error");
      return;
    }

    if (!message || !message.trim()) {
      showToast("กรุณากรอกข้อความ", "error");
      return;
    }

    // ตรวจสอบรูปแบบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("กรุณากรอกอีเมลให้ถูกต้อง", "error");
      return;
    }

    emailjs
      .sendForm(
        'service_e94dlab',
        'template_dj1nbz3',
        form.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          showToast("ส่งข้อความสำเร็จ! เราจะติดต่อกลับเร็วๆ นี้", "success");
          form.current?.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          showToast("เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง", "error");
        }
      );
  };
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[140px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#home" className="font-semibold tracking-wide">
            {githubUsername}
            <span className="text-violet-400">.</span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
            <a className="hover:text-white" href="#about">
              About
            </a>
            <a className="hover:text-white" href="#skills">
              Stack
            </a>
            <a className="hover:text-white" href="#projects">
              Projects
            </a>
            <a className="hover:text-white" href="#experience">
              Experience
            </a>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>
          </div>

          <a
            href="#contact"
            className="rounded-full bg-violet-500/15 px-4 py-2 text-sm font-medium text-violet-200 ring-1 ring-violet-400/20 hover:bg-violet-500/20"
          >
            Hire Me
          </a>
        </nav>
      </header>

      <main className="relative mx-auto max-w-6xl px-4">
        {/* Hero */}
        <section id="home" className="py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm text-zinc-400">
                Fullstack Developer • React • Node.js
              </p>

              <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
                I build
                <span className="text-violet-400"> scalable </span>
                web apps & clean UI.
              </h1>

              <p className="mt-5 text-zinc-300 leading-relaxed">
                Fullstack developer who ships complete products: UI, API,
                database, deployment, and automation.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-200"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Contact Me
                </a>
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-violet-400/20 bg-violet-500/10 px-5 py-3 text-sm font-semibold text-violet-100 hover:bg-violet-500/15"
                >
                  <SiGithub className="inline-block mr-2 text-lg -mt-1" />
                  GitHub
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-2 text-xs text-zinc-400">
                {["React", "TypeScript", "Tailwind", "Express", "MongoDB"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Profile Card */}
            <GlassCard className="p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-2xl ring-1 ring-violet-400/20">
                  <img
                    src="/profile.jpg"
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-xl">Mark Ratchanon Asasri</h2>
                  <p className="text-sm text-zinc-400">Fullstack Developer • Thailand</p>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-zinc-300">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Focus</span>
                  <span>Fullstack Web</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Stack</span>
                  <span className="text-violet-300">React + Node.js</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">GitHub</span>
                  <a
                    className="text-violet-200 hover:text-violet-100"
                    href={`https://github.com/${githubUsername}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    @{githubUsername}
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="#contact"
                  className="block w-full rounded-xl bg-violet-500 px-4 py-3 text-center text-sm font-semibold text-black hover:bg-violet-400"
                >
                  Let’s Work Together
                </a>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-16">
          <SectionTitle
            title="About"
            desc="A quick introduction and what I enjoy building."
          />
          <GlassCard className="p-6 md:p-8">
            <p className="text-zinc-300 leading-relaxed">
              I build modern products end-to-end: frontend, backend, databases,
              and deployment. I care about maintainable architecture, clean UI,
              and performance.
            </p>
          </GlassCard>
        </section>

        {/* Tech Stack (Icons) */}
        <section id="skills" className="py-16">
          <SectionTitle
            title="Tech Stack"
            desc="Icons-based stack showcase (black + violet accent)."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {techStack.map((group) => (
              <GlassCard key={group.title} className="p-6">
                <p className="font-semibold">
                  {group.title}
                  <span className="text-violet-400">.</span>
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {group.items.map((tech) => (
                    <TechIcon
                      key={`${group.title}-${tech.name}`}
                      icon={tech.icon}
                      name={tech.name}
                    />
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-16">
          <SectionTitle
            title="Projects"
            desc="Some work I’m proud of — focused on real-world use cases."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((p) => (
              <GlassCard key={p.title} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold">{p.title}</p>
                    <p className="mt-2 text-sm text-zinc-400">
                      {p.description}
                    </p>
                  </div>

                  <div className="grid place-items-center h-10 w-10 shrink-0 rounded-xl bg-violet-500/15 ring-1 ring-violet-400/20">
                    <SiNextdotjs className="text-lg text-violet-100" />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-violet-400/15 bg-violet-500/10 px-3 py-1 text-xs text-violet-100"
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
                      className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                    >
                      GitHub
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-16">
          <SectionTitle
            title="Experience"
            desc="Simple timeline format."
          />

          <GlassCard className="p-6 md:p-8">
            <ol className="space-y-6">
              {[
                {
                  year: "2024 - Present",
                  title: "Fullstack Developer (Freelance)",
                  desc: "SaaS, admin dashboard, API systems, deployments.",
                },
                {
                  year: "2022 - 2024",
                  title: "Web Developer",
                  desc: "Production web apps, API integration, performance optimization.",
                },
              ].map((item) => (
                <li key={item.year} className="flex gap-4">
                  <div className="mt-1 h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_0_4px_rgba(167,139,250,0.15)]" />
                  <div>
                    <p className="text-xs text-zinc-400">{item.year}</p>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </GlassCard>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16">
          <SectionTitle title="Contact" desc="Let’s build something together." />

          <GlassCard className="p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-zinc-300 leading-relaxed">
                  If you’re looking for a developer who can handle frontend,
                  backend, database, and deployment — let’s talk.
                </p>

                <div className="mt-6 space-y-2 text-sm text-zinc-300">
                  <p>
                    <span className="text-zinc-400">GitHub:</span>{" "}
                    <a
                      className="text-violet-200 hover:text-violet-100"
                      href={`https://github.com/${githubUsername}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      github.com/{githubUsername}
                    </a>
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="font-semibold">
                  Quick Message<span className="text-violet-400">.</span>
                </p>

                <form
                  ref={form}
                  className="mt-4 space-y-3"
                  onSubmit={sendEmail}
                >
                  <input
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-500/30"
                    placeholder="Your name"
                    name='name'
                  />
                  <input
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-500/30"
                    placeholder="Email"
                    name='email'
                  />
                  <textarea
                    className="h-28 w-full resize-none rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-500/30"
                    placeholder="Message"
                    name='message'
                  />
                  <button
                    className="w-full rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-black hover:bg-violet-400 cursor-pointer"
                    type="submit"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} {githubUsername} • Mark Ratchanon Arsasri • Fullstack Developer • Built with React +
          Tailwind
        </footer>
      </main>

      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
}
