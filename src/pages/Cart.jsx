import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cartStore.jsx';

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Votre panier est vide</h1>
        <p className="text-muted-foreground mb-6">Commencez à ajouter des produits pour passer commande.</p>
        <Link to="/products">
          <Button size="lg" className="gap-2">Voir les produits <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">Panier ({items.length})</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.product_id} className="flex gap-4 bg-card rounded-xl border border-border p-4">
              <Link to={`/products/${item.product_id}`} className="w-20 h-20 rounded-lg bg-muted overflow-hidden shrink-0">
                {item.product_image ? (
                  <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">N/A</div>
                )}
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.product_id}`}>
                  <h3 className="font-medium text-sm leading-tight line-clamp-2 hover:text-primary transition-colors">{item.product_name}</h3>
                </Link>
                <p className="font-display font-bold text-primary mt-1">{item.price?.toLocaleString('fr-DZ')} DA</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => removeItem(item.product_id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-24">
          <h2 className="font-heading font-semibold mb-4">Résumé</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sous-total</span>
              <span className="font-medium">{subtotal.toLocaleString('fr-DZ')} DA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Livraison</span>
              <span className="text-muted-foreground">Calculée à la commande</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-semibold">Total estimé</span>
              <span className="font-display font-bold text-lg">{subtotal.toLocaleString('fr-DZ')} DA</span>
            </div>
          </div>
          <Button className="w-full mt-6 gap-2 font-semibold" size="lg" onClick={() => navigate('/checkout')}>
            Commander <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="ghost" className="w-full mt-2 text-destructive text-sm" onClick={clearCart}>
            Vider le panier
          </Button>
        </div>
      </div>
    </div>
  );
}