import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Activity } from 'lucide-react';

const experiences = [
    {
        role: "Software Development Intern",
        company: "Tech Startups Inc.",
        location: "Bangalore, India",
        type: "Internship",
        duration: "Jan 2024 - Present",
        description: [
            "Developed scalable REST APIs using Node.js and Express, improving system throughput by 20%.",
            "Collaborated with the frontend team to integrate React components with backend services.",
            "Optimized database queries in MongoDB, reducing response time by 30%.",
            "Implemented automated testing pipelines using Jest and CI/CD workflows."
        ],
        tech: ["Node.js", "Express", "MongoDB", "Jest", "CI/CD"]
    },
    {
        role: "Frontend Developer",
        company: "Freelance",
        location: "Remote",
        type: "Contract",
        duration: "Jun 2023 - Dec 2023",
        description: [
            "Built responsive and interactive user interfaces using React and Tailwind CSS.",
            "Translated Figma designs into pixel-perfect code ensuring cross-browser compatibility.",
            "Improved website performance scores by 25% through asset optimization and lazy loading.",
            "Integrated third-party APIs for payment gateways and social authentication."
        ],
        tech: ["React", "Tailwind CSS", "Figma", "REST APIs"]
    }
];

export const Experience: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="experience" className="py-24 relative bg-background border-b border-borderSubtle overflow-hidden" ref={containerRef}>
            {/* Ambient Background Details */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

                {/* Header Section */}
                <div className="flex flex-col items-start mb-20 group">
                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/20 bg-accent/5 mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 bg-accent rounded-sm shadow-[0_0_8px_rgba(var(--accent),0.6)] animate-pulse"></span>
                        <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-accent">
                            PROFESSIONAL_ODYSSEY
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent/50 tracking-tighter uppercase leading-[0.9]">
                        Experience
                    </h2>
                </div>

                {/* Timeline Section */}
                <div className="relative">
                    {/* Vertical Line Container */}
                    <div className="absolute left-[15px] md:left-[240px] top-0 bottom-0 w-[2px] bg-borderSubtle">
                        {/* Glow Behind Line */}
                        <div className="absolute inset-0 bg-accent/20 blur-sm"></div>
                        <motion.div
                            style={{ scaleY, transformOrigin: 'top' }}
                            className="absolute inset-0 w-full bg-gradient-to-b from-accent via-primary to-accent shadow-[0_0_15px_rgba(var(--accent),0.5)]"
                        />
                    </div>

                    <div className="flex flex-col gap-16 lg:gap-24 pb-16">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4 }}
                                className="relative flex flex-col md:flex-row items-start group"
                            >
                                {/* Date Column (Desktop) */}
                                <div className="hidden md:block w-[220px] pt-4 pr-12 text-right shrink-0">
                                    <span className="font-mono tabular-nums text-xs font-bold uppercase tracking-widest text-secondary group-hover:text-accent group-hover:drop-shadow-[0_0_8px_rgba(var(--accent),0.4)] transition-all duration-300 inline-block">
                                        {exp.duration}
                                    </span>
                                </div>

                                {/* Node */}
                                <div className="absolute left-0 md:left-[240px] w-8 h-8 bg-background border-2 border-borderSubtle -translate-x-[15px] md:-translate-x-[15px] mt-2 z-10 flex items-center justify-center group-hover:border-accent transition-colors duration-500 rounded-sm">
                                    <div className="w-2.5 h-2.5 bg-borderSubtle group-hover:bg-accent group-hover:shadow-[0_0_10px_rgba(var(--accent),1)] transition-all duration-500 rounded-sm scale-50 group-hover:scale-100"></div>
                                </div>

                                {/* Content Column */}
                                <div className="w-full pl-12 md:pl-16 flex flex-col pt-0">

                                    {/* Glassmorphic Content Card */}
                                    <div className="relative p-6 md:p-8 bg-surface/30 backdrop-blur-sm border border-borderSubtle group-hover:border-accent/30 group-hover:bg-surface/50 transition-all duration-500 flex flex-col gap-6 overflow-hidden">
                                        {/* Card Hover Highlight */}
                                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        {/* Date Column (Mobile) */}
                                        <div className="md:hidden font-mono tabular-nums text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
                                            {exp.duration}
                                        </div>

                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-tighter group-hover:text-white transition-colors leading-none">
                                                    {exp.role}
                                                </h3>
                                                <div className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                                                    <span className="text-accent">@</span> {exp.company}
                                                    <span className="opacity-50 mx-1">/</span>
                                                    <span className="opacity-70">{exp.location}</span>
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center gap-2 border border-borderSubtle px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-primary bg-background/50 self-start lg:self-auto group-hover:border-accent/50 transition-colors">
                                                <span className="w-1.5 h-1.5 bg-accent opacity-70"></span>
                                                {exp.type}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="mt-2 flex flex-col gap-4">
                                            {exp.description.map((point, i) => (
                                                <div key={i} className="flex items-start gap-4">
                                                    <span className="font-mono text-xs text-accent mt-1 select-none block leading-none">{'>>'}</span>
                                                    <p className="font-mono text-sm text-[#D1D1D1] leading-[1.6]">
                                                        {point}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mt-4 pt-6 border-t border-borderSubtle/50">
                                            {exp.tech.map((tech, i) => (
                                                <div key={i} className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary border border-borderSubtle px-3 py-1.5 bg-background/50 hover:bg-accent/10 hover:text-accent hover:border-accent/40 transition-all duration-300 cursor-default">
                                                    {tech}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
