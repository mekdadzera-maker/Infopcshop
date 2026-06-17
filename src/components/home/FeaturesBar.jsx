import React from 'react';
import { Truck, Shield, Banknote, Headphones } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function FeaturesBar() {
  const { t } = useLang();

  const features = [
    { icon: Truck, title: t.features.shipping, desc: t.features.shippingDesc },
    { icon: Banknote, title: t.features.cod, desc: t.features.codDesc },
    { icon: Shield, title: t.features.warranty, desc: t.features.warrantyDesc },
    { icon: Headphones, title: t.features.support, desc: t.features.supportDesc },
  ];
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