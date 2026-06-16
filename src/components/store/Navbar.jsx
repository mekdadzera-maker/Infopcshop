import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, MapPin, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/lib/cartStore.jsx';
import { useAuth } from '@/lib/AuthContext';

const LOGO_URL = '/src/assets/logo.png';

const NAV_LINKS = [
  { label: 'Accueil', path: '/' },
  { label: 'Produits', path: '/products' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const isAdmin = user?.role === 'admin';

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> 0770 66 24 25
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Sidi Bel Abbès
            </span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden sm:inline">Bonjour, {user.full_name}</span>
                {isAdmin && (
                  <Link to="/admin" className="flex items-center gap-1 hover:underline">
                    <LayoutDashboard className="w-3 h-3" /> Dashboard
                  </Link>
                )}
                <Link to="/my-orders" className="hover:underline">Mes commandes</Link>
              </>
            ) : (
              <button onClick={() => navigate('/login')} className="flex items-center gap-1 hover:underline">
                <User className="w-3 h-3" /> Connexion
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">IP</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">INFO PC <span className="text-primary">SBA</span></span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/cart')}>
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
                {itemCount}
              </Badge>
            )}
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 mt-8">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-lg font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link to="/admin" className="text-lg font-medium text-primary" onClick={() => setOpen(false)}>
                    Admin Dashboard
                  </Link>
                )}
                {user ? (
                  <Link to="/my-orders" className="text-lg font-medium" onClick={() => setOpen(false)}>
                    Mes commandes
                  </Link>
                ) : (
                  <Button onClick={() => { navigate('/login'); setOpen(false); }}>
                    Connexion
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}