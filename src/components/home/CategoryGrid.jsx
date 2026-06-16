import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Cpu, Mouse, Wifi, HardDrive, Printer, Camera, Package } from 'lucide-react';

const categories = [
  { name: 'Laptops', icon: Monitor, color: 'bg-blue-500/10 text-blue-600' },
  { name: 'Desktops', icon: Monitor, color: 'bg-purple-500/10 text-purple-600' },
  { name: 'Components', icon: Cpu, color: 'bg-red-500/10 text-red-600' },
  { name: 'Peripherals', icon: Mouse, color: 'bg-green-500/10 text-green-600' },
  { name: 'Networking', icon: Wifi, color: 'bg-amber-500/10 text-amber-600' },
  { name: 'Storage', icon: HardDrive, color: 'bg-cyan-500/10 text-cyan-600' },
  { name: 'Printers', icon: Printer, color: 'bg-pink-500/10 text-pink-600' },
  { name: 'Surveillance', icon: Camera, color: 'bg-orange-500/10 text-orange-600' },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <p className="text-sm font-medium text-primary mb-1">Catégories</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold">Parcourir par catégorie</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map(cat => (
          <Link
            key={cat.name}
            to={`/products?category=${cat.name}`}
            className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
              <cat.icon className="w-7 h-7" />
            </div>
            <span className="text-sm font-medium">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}