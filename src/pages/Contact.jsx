import React from 'react';
import { Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const contactInfo = [
  {
    icon: Phone,
    label: 'Téléphone',
    values: [
      { display: '0770 66 24 25', href: 'tel:+213770662425' },
      { display: '0560 86 33 70', href: 'tel:+213560863370' },
    ],
  },
  { icon: MapPin, label: 'Adresse', value: 'N 50c Cité 345 Lgt Al-wiam Sidi Jilali, Sidi Bel Abbès' },
  { icon: Clock, label: 'Horaires', value: 'Sam–Jeu: 9h00 – 20h00' },
];

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Contactez-nous</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Notre équipe est à votre disposition pour toute question ou demande de devis.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {contactInfo.map((info, i) => (
          <Card key={i} className="text-center">
            <CardContent className="pt-8 pb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold mb-1">{info.label}</h3>
              {info.values ? (
                <div className="space-y-1">
                  {info.values.map((v, j) => (
                    <div key={j}>
                      <p className="text-sm text-muted-foreground">{v.display}</p>
                      <Button variant="link" className="mt-0 h-auto py-0 text-xs" asChild>
                        <a href={v.href}>Appeler</a>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{info.value}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-border h-80">
        <iframe
          title="INFO PC SBA Location"
          src="https://maps.google.com/maps?q=Cit%C3%A9+Al+Wiam+Sidi+Jilali+Sidi+Bel+Abb%C3%A8s&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Website link */}
      <div className="text-center mt-8">
        <Button variant="outline" className="gap-2" asChild>
          <a href="https://infopc.netlify.app" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" /> Visiter notre site web
          </a>
        </Button>
      </div>
    </div>
  );
}