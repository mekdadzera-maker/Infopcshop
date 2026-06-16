import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/store/ProductCard';
import HeroSection from '@/components/home/HeroSection';
import FeaturesBar from '@/components/home/FeaturesBar';
import CategoryGrid from '@/components/home/CategoryGrid';
import PCBuilderSection from '@/components/home/PCBuilderSection';
import FAQSection from '@/components/home/FAQSection';

const HARDWARE_IMAGE = 'https://media.base44.com/images/public/6a3176065c179e117d336ad5/481442ec6_generated_image.png';

export default function Home() {
  const { data: featuredProducts = [] } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => base44.entities.Product.filter({ featured: true }, '-created_date', 8),
  });

  return (
    <div>
      <HeroSection />
      <FeaturesBar />
      <CategoryGrid />

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-medium text-primary mb-1">Sélection</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold">Produits vedettes</h2>
            </div>
            <Link to="/products">
              <Button variant="ghost" className="gap-2 text-primary">
                Voir tout <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* PC Hardware Banner */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-2xl overflow-hidden relative h-56 md:h-72">
          <img src={HARDWARE_IMAGE} alt="PC Hardware" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center px-8 md:px-14">
            <div>
              <p className="text-primary font-semibold text-sm mb-1">INFO PC SBA</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-3">
                PC Hardware<br />Components
              </h2>
              <Link to="/products">
                <Button size="sm" className="gap-2">
                  <ArrowRight className="w-4 h-4" /> Explorer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PC Builder */}
      <PCBuilderSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Besoin d'un conseil technique ?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
            Notre équipe d'experts est disponible pour vous guider dans vos choix informatiques.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="gap-2 font-semibold">
              <Headphones className="w-5 h-5" /> Contactez-nous
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}