import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/i18n';

const HERO_IMAGE = 'https://media.base44.com/images/public/6a3176065c179e117d336ad5/93a2a0fd4_generated_image.png';

export default function HeroSection() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" /> {t.hero.badge}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              {t.hero.title1}
              <br />
              <span className="text-primary">{t.hero.title2}</span>
              <br />
              {t.hero.title3}
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products">
                <Button size="lg" className="gap-2 font-semibold text-base px-8">
                  {t.hero.cta} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="font-semibold text-base px-8">
                  {t.hero.contact}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:block">
            
            <div className="relative">
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl pointer-events-none" />
              <img src="https://media.base44.com/images/public/6a3176065c179e117d336ad5/1d952c25b_microsoft-copilot-pqMPnPo4_ZA-unsplash__1_.jpg"

              alt="PC Hardware Components"
              className="rounded-3xl w-full object-cover shadow-2xl" />
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}