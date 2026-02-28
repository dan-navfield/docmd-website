"use client";

import { motion } from "framer-motion";
import { Activity, CheckCircle2, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GradientText } from "@/components/shared/GradientText";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const services = [
  {
    name: "Conversion API",
    status: "operational" as const,
    uptime: "99.97%",
    description: "Markdown to Word document conversion",
  },
  {
    name: "Web Application",
    status: "operational" as const,
    uptime: "99.99%",
    description: "Dashboard, editor, and template management",
  },
  {
    name: "AI Classification",
    status: "operational" as const,
    uptime: "99.95%",
    description: "Document type detection and auto-routing",
  },
  {
    name: "SharePoint Integration",
    status: "operational" as const,
    uptime: "99.90%",
    description: "OAuth connection and document export",
  },
  {
    name: "MCP Server",
    status: "operational" as const,
    uptime: "99.98%",
    description: "Claude tool integration for AI workflows",
  },
];

const statusConfig = {
  operational: {
    label: "Operational",
    color: "text-green-600",
    dot: "bg-green-500",
    bg: "bg-green-50",
  },
  degraded: {
    label: "Degraded",
    color: "text-yellow-600",
    dot: "bg-yellow-500",
    bg: "bg-yellow-50",
  },
  outage: {
    label: "Outage",
    color: "text-red-600",
    dot: "bg-red-500",
    bg: "bg-red-50",
  },
};

function StatusHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-teal/80">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-golden/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-golden bg-golden/10 px-4 py-1.5 rounded-full mb-6">
            System Status
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            All systems{" "}
            <GradientText variant="golden">operational</GradientText>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Current status of MDDoc services. We monitor everything
            continuously.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function OverallStatus() {
  return (
    <section className="py-8 bg-white border-b border-border">
      <Container>
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-green-50 border border-green-200">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              All Systems Operational
            </span>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

function ServiceList() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container size="narrow">
        <ScrollReveal>
          <div className="space-y-4">
            {services.map((service) => {
              const config = statusConfig[service.status];
              return (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-5 rounded-xl border border-border hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${config.dot}`}
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {service.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${config.color}`}>
                      {config.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {service.uptime} uptime
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

function UptimeHistory() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <Container size="narrow">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
              30-Day Uptime
            </h2>
            <p className="text-muted-foreground">
              Green bars mean 100% uptime for that day.
            </p>
          </div>

          <div className="flex items-end gap-[3px] h-16 justify-center">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="w-2.5 rounded-sm bg-green-400"
              />
            ))}
          </div>

          <div className="flex justify-between mt-4 text-xs text-muted-foreground">
            <span>30 days ago</span>
            <span>Today</span>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>
              Last checked: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

function IncidentContact() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <Container size="narrow">
        <ScrollReveal>
          <div className="text-center p-8 rounded-2xl border border-border bg-cream/50">
            <Activity className="w-8 h-8 text-forest mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Experiencing issues?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              If something isn&apos;t working, email us. We respond fast.
            </p>
            <a
              href="mailto:hello@mddoc.app"
              className="inline-flex items-center gap-2 bg-golden text-forest-dark font-semibold px-6 py-3 rounded-full text-sm hover:bg-golden-dark transition-all"
            >
              hello@mddoc.app
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

export function StatusPageClient() {
  return (
    <>
      <StatusHero />
      <OverallStatus />
      <ServiceList />
      <UptimeHistory />
      <IncidentContact />
    </>
  );
}
