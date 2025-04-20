"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import Glow from "@/components/ui/glow";
import Image from "next/image";
import Github from "@/components/logos/github";

export default function Hero() {
  return (
    <Section className="fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0">
      <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          <Badge variant="outline" className="animate-appear">
            <span className="text-muted-foreground">New version is out!</span>
            <a href="/dashboard" className="flex items-center gap-1">
              Get started
              <ArrowRightIcon className="h-3 w-3" />
            </a>
          </Badge>
          <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-foreground bg-clip-text text-transparent text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight drop-shadow-2xl dark:to-muted-foreground">
            Transform Invoice Processing with AI Automation
          </h1>
          <p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground opacity-0 delay-100 sm:text-xl">
            Seamlessly extract, validate, and process invoices with AI-powered
            automation, reducing manual effort and improving accuracy.
          </p>
          <div className="relative z-10 flex animate-appear justify-center gap-4 opacity-0 delay-300">
            <Button variant="default" size="lg" asChild>
              <a href="/">Get Started</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/">
                <Github className="mr-2 h-4 w-4" /> Github
              </a>
            </Button>
          </div>
          <div className="relative pt-12">
            <MockupFrame
              className="animate-appear opacity-0 delay-700"
              size="small"
            >
              <Mockup type="responsive">
                <Image
                  src="/app.png"
                  alt="app landing page"
                  width={1248}
                  height={765}
                />
              </Mockup>
            </MockupFrame>
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute left-1/2 top-0 h-[500px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,165,0,0.3)_0%,_transparent_90%)] blur-[120px]" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
