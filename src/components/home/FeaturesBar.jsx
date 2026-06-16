import React from 'react';
import { Truck, Shield, Banknote, Headphones } from 'lucide-react';

const features = [
  { icon: Truck, title: 'Livraison nationale', desc: '58 wilayas couvertes' },
  { icon: Banknote, title: 'Paiement à la livraison', desc: 'الدفع عند الاستلام' },
  { icon: Shield, title: 'Garantie', desc: 'Produits garantis' },
  { icon: Headphones, title: 'Support technique', desc: 'Assistance pro' },
];

export default function FeaturesBar() {
  return (
    <section className="border-y border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}