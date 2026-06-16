import React, { useState } from 'react';
import { Cpu, Monitor, HardDrive, Database, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLang } from '@/lib/i18n';

const CATEGORIES = [
  { key: 'cpu', icon: Cpu, color: 'text-blue-500' },
  { key: 'gpu', icon: Monitor, color: 'text-purple-500' },
  { key: 'ram', icon: HardDrive, color: 'text-green-500' },
  { key: 'storage', icon: Database, color: 'text-orange-500' },
];

const MOCK_COMPONENTS = {
  cpu: [
    { label: 'Intel Core i5-13400F', price: 28000 },
    { label: 'Intel Core i7-13700K', price: 52000 },
    { label: 'AMD Ryzen 5 7600X', price: 32000 },
    { label: 'AMD Ryzen 7 7800X3D', price: 58000 },
  ],
  gpu: [
    { label: 'NVIDIA RTX 4060', price: 48000 },
    { label: 'NVIDIA RTX 4070', price: 82000 },
    { label: 'AMD RX 7700 XT', price: 62000 },
    { label: 'AMD RX 7800 XT', price: 75000 },
  ],
  ram: [
    { label: '16GB DDR4 3200MHz', price: 6000 },
    { label: '16GB DDR5 5200MHz', price: 9000 },
    { label: '32GB DDR4 3600MHz', price: 12000 },
    { label: '32GB DDR5 6000MHz', price: 18000 },
  ],
  storage: [
    { label: 'SSD 512GB NVMe', price: 5500 },
    { label: 'SSD 1TB NVMe', price: 9000 },
    { label: 'SSD 2TB NVMe', price: 18000 },
    { label: 'HDD 2TB', price: 7000 },
  ],
};

export default function PCBuilderSection() {
  const { t } = useLang();
  const [selected, setSelected] = useState({});
  const [openCat, setOpenCat] = useState(null);

  const toggleCat = (key) => {
    setOpenCat(openCat === key ? null : key);
  };

  const selectComponent = (cat, item) => {
    setSelected(prev => ({ ...prev, [cat]: item }));
    setOpenCat(null);
  };

  const total = Object.values(selected).reduce((sum, item) => sum + (item?.price || 0), 0);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">{t.pcBuilder.title}</h2>
        <p className="text-muted-foreground">{t.pcBuilder.subtitle}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {CATEGORIES.map(({ key, icon: Icon, color }) => (
          <div key={key} className="relative">
            <button
              onClick={() => toggleCat(key)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                selected[key]
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border bg-card hover:border-primary/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-medium">{t.pcBuilder[key]}</p>
                  <p className="text-sm font-semibold truncate">
                    {selected[key] ? selected[key].label : 'Choisir...'}
                  </p>
                  {selected[key] && (
                    <p className="text-xs text-primary font-semibold mt-0.5">
                      {selected[key].price.toLocaleString('fr-DZ')} DA
                    </p>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openCat === key ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {openCat === key && (
              <Card className="absolute z-20 top-full mt-1 w-full shadow-xl border-border">
                <CardContent className="p-1">
                  {MOCK_COMPONENTS[key].map((item, i) => (
                    <button
                      key={i}
                      onClick={() => selectComponent(key, item)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-muted flex justify-between ${
                        selected[key]?.label === item.label ? 'bg-primary/10 text-primary font-semibold' : ''
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-muted-foreground">{item.price.toLocaleString('fr-DZ')} DA</span>
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-4 bg-muted rounded-xl px-6 py-3 mb-4">
          <span className="text-sm text-muted-foreground">{t.pcBuilder.total}:</span>
          <span className="font-display font-bold text-xl text-primary">
            {total.toLocaleString('fr-DZ')} DA
          </span>
        </div>
      </div>
    </section>
  );
}