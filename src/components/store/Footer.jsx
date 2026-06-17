import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">IP</span>
              </div>
              <span className="font-display font-bold text-lg">INFO PC SBA</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">{t.footer.quickLinks}</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.home}</Link>
              <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.products}</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.nav.contact}</Link>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-heading font-semibold mb-4">{t.footer.contact}</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" /> 0770 66 24 25
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> N 50c Cité 345 Lgt Al-wiam, Sidi Bel Abbès
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> {t.footer.satThu}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} INFO PC SBA. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}