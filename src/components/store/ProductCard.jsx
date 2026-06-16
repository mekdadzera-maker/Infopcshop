import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cartStore.jsx';
import { toast } from '@/components/ui/use-toast';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.in_stock) return;
    addItem(product);
    toast({ title: 'Ajouté au panier', description: product.name });
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
            />
          ) : null}
          <div
            className="w-full h-full flex-col items-center justify-center text-muted-foreground gap-2"
            style={{ display: product.image_url ? 'none' : 'flex' }}
          >
            <Eye className="w-12 h-12 opacity-30" />
            <span className="text-xs opacity-50">{product.category}</span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {!product.in_stock && (
              <Badge variant="destructive" className="text-xs">Rupture</Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-green-500 text-white text-xs">-{discount}%</Badge>
            )}
            {product.featured && product.in_stock && (
              <Badge className="bg-primary text-primary-foreground text-xs">Vedette</Badge>
            )}
          </div>

          {/* Quick add */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              className="rounded-full shadow-lg"
              onClick={handleAddToCart}
              disabled={!product.in_stock}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{product.brand || product.category}</p>
          <h3 className="font-heading font-semibold text-sm leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-lg">{product.price?.toLocaleString('fr-DZ')} DA</span>
            {product.original_price && (
              <span className="text-xs text-muted-foreground line-through">
                {product.original_price?.toLocaleString('fr-DZ')} DA
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}