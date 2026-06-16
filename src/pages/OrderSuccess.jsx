import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h1 className="font-display text-3xl font-bold mb-3">Commande envoyée !</h1>
        <p className="text-muted-foreground mb-2">
          Votre commande <span className="font-mono text-foreground">#{id?.slice(-6)}</span> est en attente de confirmation.
        </p>
        <div className="bg-accent rounded-xl p-4 text-sm text-left my-6 space-y-2">
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            <span>Notre équipe vous contactera au numéro fourni pour vérifier votre commande.</span>
          </p>
          <p className="text-muted-foreground">
            Statut actuel : <span className="font-medium text-amber-600">En attente de confirmation</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/products">
            <Button variant="outline" className="gap-2">Continuer les achats <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}