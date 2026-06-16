import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { LayoutDashboard, Package, ShoppingCart, ChevronLeft, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

const NAV = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Produits', path: '/admin/products', icon: Package },
  { label: 'Commandes', path: '/admin/orders', icon: ShoppingCart },
];

export default function AdminLayout() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ChevronLeft className="w-4 h-4" /> Retour au site
            </Link>
            <span className="font-display font-bold">Admin Panel</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground gap-1"
            onClick={() => base44.auth.logout()}
          >
            <LogOut className="w-4 h-4" /> Déconnexion
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Nav tabs */}
        <nav className="flex gap-1 mb-8 overflow-x-auto">
          {NAV.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={active ? 'default' : 'ghost'}
                  size="sm"
                  className={`gap-2 ${!active ? 'text-muted-foreground' : ''}`}
                >
                  <item.icon className="w-4 h-4" /> {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <Outlet />
      </div>
    </div>
  );
}