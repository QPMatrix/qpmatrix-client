import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

import { FadeIn } from '~/components/motion/FadeIn';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-accent/10 to-transparent -z-10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn direction="up">
          <Card className="max-w-4xl mx-auto border border-border/50 bg-card/30 backdrop-blur-xl p-8 sm:p-16 text-center shadow-lg">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
              Ready to Start Your Next Project?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10">
              Whether you have a groundbreaking idea or need to scale an existing product, I&apos;m here to help. Let&apos;s discuss how we can build something amazing together.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <Button size="lg" className="rounded-full px-8 w-full sm:w-auto text-lg h-14" asChild>
                <a href="mailto:contact@qpmatrix.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Send Me an Email
                </a>
              </Button>
              <Button size="lg" variant="secondary" className="rounded-full px-8 w-full sm:w-auto text-lg h-14" asChild>
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                  Schedule a Call
                </a>
              </Button>
            </div>

            <div className="flex justify-center gap-8">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
            
            <p className="mt-12 text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Hasan / Qpmatrix. All rights reserved.
            </p>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}
